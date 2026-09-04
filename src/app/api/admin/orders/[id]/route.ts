import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getOrder, updateOrder } from "@/lib/orders";
import type { Order, OrderStatus } from "@/lib/types";
import { fireWebhook } from "@/lib/webhooks";

const STATUSES: OrderStatus[] = [
  "pending",
  "cod_confirmation_pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

/** Admin order management: status flow, tracking id, COD confirmation. */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (await requireAdmin())
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body)
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });

  const existing = await getOrder(id);
  if (!existing)
    return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });

  const patch: Partial<Order> = {};
  if (typeof body.order_status === "string" && STATUSES.includes(body.order_status))
    patch.order_status = body.order_status as OrderStatus;
  if (typeof body.tracking_id === "string")
    patch.tracking_id = body.tracking_id.trim().slice(0, 60) || null;
  if (typeof body.cod_confirmed === "boolean") {
    patch.cod_confirmed = body.cod_confirmed;
    // Confirming a pending COD order moves it forward in the flow.
    if (
      body.cod_confirmed &&
      existing.order_status === "cod_confirmation_pending" &&
      !patch.order_status
    )
      patch.order_status = "confirmed";
  }
  // Delivered COD orders are paid in cash on the doorstep.
  if (
    patch.order_status === "delivered" &&
    existing.payment_method === "cod" &&
    existing.payment_status === "unpaid"
  )
    patch.payment_status = "paid";

  const updated = await updateOrder(id, patch);
  if (!updated)
    return NextResponse.json({ ok: false, error: "Update failed." }, { status: 500 });

  // Lifecycle webhooks for the n8n/WhatsApp phase.
  if (patch.order_status === "shipped" && existing.order_status !== "shipped")
    await fireWebhook("order-shipped", {
      order_id: updated.id,
      tracking_id: updated.tracking_id,
      phone: updated.shipping_address.phone,
    });
  if (patch.order_status === "delivered" && existing.order_status !== "delivered")
    await fireWebhook("order-delivered", {
      order_id: updated.id,
      phone: updated.shipping_address.phone,
    });

  return NextResponse.json({ ok: true, order: updated });
}
