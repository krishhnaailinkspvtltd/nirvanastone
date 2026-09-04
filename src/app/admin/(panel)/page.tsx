import Link from "next/link";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getAdminCatalog } from "@/lib/catalog-store";
import { formatINR } from "@/lib/catalog";
import { listOrders } from "@/lib/orders";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [orders, rows] = await Promise.all([listOrders(), getAdminCatalog()]);

  const active = orders.filter((o) => o.order_status !== "cancelled");
  const revenue = active.reduce((s, o) => s + o.total, 0);
  const codPending = orders.filter(
    (o) => o.order_status === "cod_confirmation_pending",
  ).length;
  const toShip = orders.filter((o) => o.order_status === "confirmed").length;
  const visible = rows.filter((r) => !r.hidden);
  const lowStock = visible.filter((r) => r.product.stock_qty <= 5);

  const stats = [
    { label: "Orders", value: String(orders.length), href: "/admin/orders" },
    { label: "Order value", value: formatINR(revenue), href: "/admin/orders" },
    { label: "COD to confirm", value: String(codPending), href: "/admin/orders?status=cod_confirmation_pending" },
    { label: "Ready to ship", value: String(toShip), href: "/admin/orders?status=confirmed" },
    { label: "Products live", value: String(visible.length), href: "/admin/products" },
    { label: "Low stock (≤5)", value: String(lowStock.length), href: "/admin/products?stock=low" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-maroon-deep">Dashboard</h1>

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="lift glass rounded-2xl p-4">
            <p className="text-aurum font-display text-2xl font-semibold">{s.value}</p>
            <p className="mt-1 text-xs text-mist">{s.label}</p>
          </Link>
        ))}
      </div>

      <section className="mt-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-xl font-semibold text-maroon-deep">
            Recent orders
          </h2>
          <Link href="/admin/orders" className="text-sm font-bold text-gold">
            All orders →
          </Link>
        </div>
        {orders.length === 0 ? (
          <p className="mt-4 rounded-xl border border-sand bg-parchment p-5 text-sm text-mist">
            No orders yet — they'll appear here the moment someone buys.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-xl border border-sand">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-parchment text-left text-xs uppercase tracking-wider text-mist">
                <tr>
                  <th className="px-4 py-2.5">Order</th>
                  <th className="px-4 py-2.5">Customer</th>
                  <th className="px-4 py-2.5">Total</th>
                  <th className="px-4 py-2.5">Payment</th>
                  <th className="px-4 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 8).map((o) => (
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
                      <p className="text-[11px] text-mist">{o.shipping_address.phone}</p>
                    </td>
                    <td className="px-4 py-2.5 font-bold">{formatINR(o.total)}</td>
                    <td className="px-4 py-2.5 uppercase text-xs">{o.payment_method}</td>
                    <td className="px-4 py-2.5"><StatusBadge status={o.order_status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {lowStock.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-maroon-deep">
            Low stock
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {lowStock.slice(0, 8).map((r) => (
              <li key={r.product.id}>
                <Link
                  href={`/admin/products/${r.product.id}`}
                  className="flex items-center justify-between rounded-xl border border-sand bg-parchment px-4 py-2.5 text-sm hover:border-gold"
                >
                  <span className="truncate pr-3">{r.product.name}</span>
                  <span className={`font-bold ${r.product.stock_qty === 0 ? "text-maroon" : "text-gold"}`}>
                    {r.product.stock_qty} left
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
