import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getOrder, saveOrder } from "@/lib/orders";
import { fireWebhook } from "@/lib/webhooks";

/** Verifies the Razorpay checkout signature and confirms the order. */
export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret)
    return NextResponse.json({ ok: false, error: "Gateway not configured." }, { status: 400 });

  const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    await req.json();
  if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
    return NextResponse.json({ ok: false, error: "Missing payment details." }, { status: 400 });

  const order = await getOrder(orderId);
  if (!order || order.razorpay_order_id !== razorpay_order_id)
    return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");
  const valid =
    expected.length === String(razorpay_signature).length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(String(razorpay_signature)));
  if (!valid)
    return NextResponse.json({ ok: false, error: "Payment verification failed." }, { status: 400 });

  order.payment_status = "paid";
  order.order_status = "confirmed";
  order.updated_at = new Date().toISOString();
  await saveOrder(order);
  await fireWebhook("order-placed", {
    order_id: order.id,
    total: order.total,
    payment_method: "razorpay",
    phone: order.shipping_address.phone,
  });

  return NextResponse.json({ ok: true, orderId: order.id });
}
