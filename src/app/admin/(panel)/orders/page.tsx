import Link from "next/link";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatINR } from "@/lib/catalog";
import { listOrders } from "@/lib/orders";
import type { OrderStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "cod_confirmation_pending", label: "COD to confirm" },
  { key: "pending", label: "Payment pending" },
  { key: "confirmed", label: "To ship" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const all = await listOrders();
  const orders =
    status && status !== "all"
      ? all.filter((o) => o.order_status === (status as OrderStatus))
      : all;

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-maroon-deep">Orders</h1>

      <div className="scroller -mx-4 mt-4 flex gap-2 overflow-x-auto px-4">
        {FILTERS.map((f) => {
          const active = (status ?? "all") === f.key;
          return (
            <Link
              key={f.key}
              href={f.key === "all" ? "/admin/orders" : `/admin/orders?status=${f.key}`}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-bold ${
                active
                  ? "border-gold bg-gold text-[#2b1608]"
                  : "border-sand bg-parchment text-ink hover:border-gold"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {orders.length === 0 ? (
        <p className="mt-6 rounded-xl border border-sand bg-parchment p-6 text-sm text-mist">
          No orders in this view yet.
        </p>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-xl border border-sand">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-parchment text-left text-xs uppercase tracking-wider text-mist">
              <tr>
                <th className="px-4 py-2.5">Order</th>
                <th className="px-4 py-2.5">Customer</th>
                <th className="px-4 py-2.5">Items</th>
                <th className="px-4 py-2.5">Total</th>
                <th className="px-4 py-2.5">Payment</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-sand hover:bg-parchment/60">
                  <td className="px-4 py-2.5">
                    <Link href={`/admin/orders/${o.id}`} className="font-bold text-gold">
                      {o.id}
                    </Link>
                    <p className="text-[11px] text-mist">
                      {new Date(o.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </p>
                  </td>
                  <td className="px-4 py-2.5">
                    {o.shipping_address.full_name}
                    <p className="text-[11px] text-mist">
                      {o.shipping_address.phone} · {o.shipping_address.city}
                    </p>
                  </td>
                  <td className="px-4 py-2.5">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                  <td className="px-4 py-2.5 font-bold">{formatINR(o.total)}</td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs uppercase">{o.payment_method}</span>
                    <p className="text-[11px] text-mist">{o.payment_status}</p>
                  </td>
                  <td className="px-4 py-2.5"><StatusBadge status={o.order_status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
