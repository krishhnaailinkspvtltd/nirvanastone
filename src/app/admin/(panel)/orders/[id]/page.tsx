import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderActions } from "@/components/admin/OrderActions";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatINR } from "@/lib/catalog";
import { getOrder } from "@/lib/orders";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(id.toUpperCase());
  if (!order) notFound();

  return (
    <div>
      <Link href="/admin/orders" className="text-xs font-bold text-mist hover:text-gold">
        ← All orders
      </Link>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-2xl font-semibold text-maroon-deep">{order.id}</h1>
        <StatusBadge status={order.order_status} />
        <span className="text-xs uppercase text-mist">
          {order.payment_method} · {order.payment_status}
          {order.payment_method === "cod" && (order.cod_confirmed ? " · COD confirmed" : " · COD not confirmed")}
        </span>
      </div>
      <p className="mt-1 text-xs text-mist">
        Placed {new Date(order.created_at).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}
        {" · "}last updated {new Date(order.updated_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <section className="rounded-xl border border-sand bg-parchment p-5">
            <h2 className="font-display text-xl font-semibold text-maroon-deep">Items</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {order.items.map((i) => (
                <li key={`${i.product_id}:${i.variant_name}`} className="flex justify-between gap-3">
                  <span>
                    <Link href={`/products/${i.slug}`} className="font-bold text-gold hover:underline">
                      {i.name}
                    </Link>
                    {i.variant_name ? ` (${i.variant_name})` : ""} ×{i.qty}
                  </span>
                  <span className="shrink-0 font-bold">{formatINR(i.unit_price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-1.5 border-t border-sand pt-3 text-sm">
              <div className="flex justify-between"><dt className="text-mist">Subtotal</dt><dd>{formatINR(order.subtotal)}</dd></div>
              {order.discount > 0 && (
                <div className="flex justify-between text-jade"><dt>Discount ({order.promo_code})</dt><dd>−{formatINR(order.discount)}</dd></div>
              )}
              <div className="flex justify-between"><dt className="text-mist">Shipping</dt><dd>{order.shipping_fee === 0 ? "Free" : formatINR(order.shipping_fee)}</dd></div>
              <div className="flex justify-between text-base font-bold text-maroon-deep">
                <dt>{order.payment_method === "cod" && order.payment_status === "unpaid" ? "To collect on delivery" : "Total"}</dt>
                <dd>{formatINR(order.total)}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-sand bg-parchment p-5 text-sm">
            <h2 className="font-display text-xl font-semibold text-maroon-deep">Customer</h2>
            <p className="mt-2 leading-relaxed">
              <strong>{order.shipping_address.full_name}</strong><br />
              {order.shipping_address.line1}
              {order.shipping_address.line2 ? <>, {order.shipping_address.line2}</> : null}<br />
              {order.shipping_address.city}, {order.shipping_address.state} — {order.shipping_address.pincode}
            </p>
            <p className="mt-3">
              <a href={`tel:${order.shipping_address.phone}`} className="font-bold text-gold">
                {order.shipping_address.phone}
              </a>
              {order.shipping_address.email && (
                <span className="text-mist"> · {order.shipping_address.email}</span>
              )}
            </p>
            <a
              href={`https://wa.me/91${order.shipping_address.phone.replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent(`Namaste ${order.shipping_address.full_name}! Regarding your Nirvana order ${order.id}: `)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline mt-4 !py-2 text-sm"
            >
              WhatsApp the customer
            </a>
          </section>
        </div>

        <OrderActions order={order} />
      </div>
    </div>
  );
}
