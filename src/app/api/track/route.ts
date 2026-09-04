import { NextRequest, NextResponse } from "next/server";
import { trackOrder } from "@/lib/orders";

/** Guest order tracking: order id + phone, no account required. */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") ?? "";
  const phone = req.nextUrl.searchParams.get("phone") ?? "";
  if (!id || !phone)
    return NextResponse.json({ ok: false, error: "Order ID and phone are required." }, { status: 400 });

  const order = await trackOrder(id, phone);
  if (!order)
    return NextResponse.json(
      { ok: false, error: "No order found for that ID and phone combination." },
      { status: 404 },
    );

  // Return only what tracking needs — not the full address.
  return NextResponse.json({
    ok: true,
    order: {
      id: order.id,
      items: order.items,
      total: order.total,
      payment_method: order.payment_method,
      payment_status: order.payment_status,
      order_status: order.order_status,
      tracking_id: order.tracking_id,
      created_at: order.created_at,
      updated_at: order.updated_at,
      city: order.shipping_address.city,
    },
  });
}
