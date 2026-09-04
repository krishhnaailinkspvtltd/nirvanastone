import { NextRequest, NextResponse } from "next/server";
import { site } from "@/config/site";
import { getProductById } from "@/lib/catalog";
import { adjustStockForOrder, getCatalog } from "@/lib/catalog-store";
import { codEligible } from "@/lib/cod";
import { newOrderId, saveOrder } from "@/lib/orders";
import { computeDiscount } from "@/lib/promos";
import { getSettings } from "@/lib/settings";
import type { Order, OrderItem, PaymentMethod, ShippingAddress } from "@/lib/types";
import { fireWebhook } from "@/lib/webhooks";

interface CheckoutBody {
  items: { productId: string; variantId: string | null; qty: number }[];
  promoCode?: string | null;
  paymentMethod: PaymentMethod;
  address: ShippingAddress;
}

export async function POST(req: NextRequest) {
  let body: CheckoutBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { items, promoCode, paymentMethod, address } = body ?? {};
  if (!Array.isArray(items) || items.length === 0)
    return NextResponse.json({ ok: false, error: "Your cart is empty." }, { status: 400 });
  for (const k of ["full_name", "phone", "line1", "city", "state", "pincode"] as const) {
    if (!address?.[k]?.trim())
      return NextResponse.json({ ok: false, error: "Please fill the full delivery address." }, { status: 400 });
  }
  if (!/^\d{10}$/.test(address.phone.replace(/\D/g, "").slice(-10)))
    return NextResponse.json({ ok: false, error: "Enter a valid 10-digit phone number." }, { status: 400 });

  // Re-price everything server-side against the LIVE catalog and settings
  // (both are runtime-editable from /admin) — never trust client totals.
  const [catalog, settings] = await Promise.all([getCatalog(), getSettings()]);
  const orderItems: OrderItem[] = [];
  let subtotal = 0;
  for (const i of items) {
    const product = getProductById(catalog, i.productId);
    if (!product)
      return NextResponse.json({ ok: false, error: "A cart item no longer exists." }, { status: 400 });
    if (product.stock_qty <= 0)
      return NextResponse.json({ ok: false, error: `${product.name} is out of stock.` }, { status: 400 });
    const variant = product.variants?.find((v) => v.id === i.variantId) ?? null;
    const qty = Math.max(1, Math.min(10, Number(i.qty) || 1));
    const unit = product.price + (variant?.price_delta ?? 0);
    subtotal += unit * qty;
    orderItems.push({
      product_id: product.id,
      slug: product.slug,
      name: product.name,
      variant_name: variant?.variant_name ?? null,
      unit_price: unit,
      qty,
    });
  }

  let discount = 0;
  let appliedPromo: string | null = null;
  if (promoCode) {
    const res = computeDiscount(promoCode, subtotal, settings.promos);
    if (res.ok) {
      discount = res.discount;
      appliedPromo = res.promo.code;
    }
  }

  const shipping_fee =
    subtotal - discount >= settings.freeShippingAbove ? 0 : settings.shippingFee;
  const total = Math.max(0, subtotal - discount) + shipping_fee;

  if (paymentMethod === "cod") {
    const gate = codEligible(address.pincode, total, settings.codOrderCap);
    if (!gate.ok)
      return NextResponse.json({ ok: false, error: gate.reason }, { status: 400 });
  }

  const now = new Date().toISOString();
  const order: Order = {
    id: newOrderId(),
    user_id: null,
    items: orderItems,
    subtotal,
    discount,
    promo_code: appliedPromo,
    shipping_fee,
    total,
    payment_method: paymentMethod,
    payment_status: "unpaid",
    // COD gets its own status flow — it is NOT equivalent to a paid order.
    order_status: paymentMethod === "cod" ? "cod_confirmation_pending" : "pending",
    shipping_address: address,
    tracking_id: null,
    cod_confirmed: false,
    razorpay_order_id: null,
    created_at: now,
    updated_at: now,
  };

  if (paymentMethod === "cod") {
    await saveOrder(order);
    await adjustStockForOrder(orderItems);
    await fireWebhook("order-placed", { order_id: order.id, total, payment_method: "cod", phone: address.phone });
    await fireWebhook("cod-confirmation-needed", {
      order_id: order.id,
      total,
      phone: address.phone,
      customer: address.full_name,
      items: orderItems.map((i) => `${i.name} ×${i.qty}`),
    });
    return NextResponse.json({ ok: true, orderId: order.id, flow: "cod" });
  }

  // Razorpay prepaid flow
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    // Dev fallback: no gateway keys yet — order is created and the client
    // completes it through /api/payment/simulate (blocked in production).
    await saveOrder(order);
    await adjustStockForOrder(orderItems);
    return NextResponse.json({ ok: true, orderId: order.id, flow: "simulate" });
  }

  const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization:
        "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
    },
    body: JSON.stringify({
      amount: total * 100, // paise
      currency: "INR",
      receipt: order.id,
      notes: { order_id: order.id },
    }),
  });
  if (!rzpRes.ok) {
    const detail = await rzpRes.text();
    console.error("[razorpay] order create failed:", detail);
    return NextResponse.json(
      { ok: false, error: "Payment gateway is unavailable right now — please try again or choose COD." },
      { status: 502 },
    );
  }
  const rzpOrder = (await rzpRes.json()) as { id: string };
  order.razorpay_order_id = rzpOrder.id;
  await saveOrder(order);
  await adjustStockForOrder(orderItems);

  return NextResponse.json({
    ok: true,
    orderId: order.id,
    flow: "razorpay",
    razorpay: {
      key: keyId,
      order_id: rzpOrder.id,
      amount: total * 100,
      currency: "INR",
      name: site.name,
      prefill: {
        name: address.full_name,
        contact: address.phone,
        email: address.email ?? "",
      },
    },
  });
}
