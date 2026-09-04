import { NextRequest, NextResponse } from "next/server";
import { getOrder, saveOrder } from "@/lib/orders";
import { fireWebhook } from "@/lib/webhooks";

/**
 * Dev-only payment simulation, used when Razorpay keys are not configured
 * so the full checkout flow stays demonstrable. Hard-blocked once keys exist.
 */
export async function POST(req: NextRequest) {
  if (process.env.RAZORPAY_KEY_SECRET)
    return NextResponse.json(
      { ok: false, error: "Simulation disabled — live gateway configured." },
      { status: 403 },
    );

  const { orderId } = await req.json();
  const order = await getOrder(orderId);
  if (!order)
    return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });
  if (order.payment_method !== "razorpay" || order.payment_status !== "unpaid")
    return NextResponse.json({ ok: false, error: "Order isn't awaiting payment." }, { status: 400 });

  order.payment_status = "simulated";
  order.order_status = "confirmed";
  order.updated_at = new Date().toISOString();
  await saveOrder(order);
  await fireWebhook("order-placed", {
    order_id: order.id,
    total: order.total,
    payment_method: "razorpay (simulated)",
    phone: order.shipping_address.phone,
  });

  return NextResponse.json({ ok: true, orderId: order.id });
}
