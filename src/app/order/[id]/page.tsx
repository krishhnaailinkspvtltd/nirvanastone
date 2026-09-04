import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MalaDivider } from "@/components/MalaDivider";
import { StatusTimeline } from "@/components/StatusTimeline";
import { whatsappLink } from "@/config/site";
import { formatINR } from "@/lib/catalog";
import { getOrder } from "@/lib/orders";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(id.toUpperCase());
  if (!order) notFound();

  const isCod = order.payment_method === "cod";

  return (
    <div className="mx-auto max-w-3xl px-4 pt-10">
      <div className="text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl text-[#2b1608]">✓</span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-maroon-deep">
          {isCod ? "Order received" : "Order confirmed"}
        </h1>
        <p className="mt-2 text-sm text-mist">
          Order ID: <strong className="text-ink">{order.id}</strong> — save this for tracking.
        </p>
        {isCod && (
          <p className="mx-auto mt-3 max-w-md rounded-xl bg-parchment p-3 text-sm text-ink">
            This is a Cash on Delivery order. We'll message you on WhatsApp at{" "}
            <strong>{order.shipping_address.phone}</strong> to confirm before dispatch —
            a quick yes keeps your delivery on schedule.
          </p>
        )}
      </div>

      <MalaDivider className="my-8" />

      <StatusTimeline status={order.order_status} paymentMethod={order.payment_method} />

      <section className="mt-8 rounded-xl border border-sand bg-white p-5">
        <h2 className="font-display text-xl font-semibold text-maroon-deep">Items</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {order.items.map((i) => (
            <li key={`${i.product_id}:${i.variant_name}`} className="flex justify-between gap-3">
              <span>
                <Link href={`/products/${i.slug}`} className="font-bold text-maroon hover:underline">
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
            <div className="flex justify-between text-[#1d7a3f]"><dt>Discount ({order.promo_code})</dt><dd>−{formatINR(order.discount)}</dd></div>
          )}
          <div className="flex justify-between"><dt className="text-mist">Shipping</dt><dd>{order.shipping_fee === 0 ? "Free" : formatINR(order.shipping_fee)}</dd></div>
          <div className="flex justify-between text-base font-bold text-maroon-deep">
            <dt>{isCod ? "To pay on delivery" : "Paid"}</dt>
            <dd>{formatINR(order.total)}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-4 rounded-xl border border-sand bg-white p-5 text-sm">
        <h2 className="font-display text-xl font-semibold text-maroon-deep">Delivering to</h2>
        <p className="mt-2 leading-relaxed text-ink">
          {order.shipping_address.full_name}<br />
          {order.shipping_address.line1}
          {order.shipping_address.line2 ? <>, {order.shipping_address.line2}</> : null}<br />
          {order.shipping_address.city}, {order.shipping_address.state} — {order.shipping_address.pincode}
        </p>
      </section>

      <div className="mt-6 flex flex-wrap justify-center gap-3 pb-6">
        <Link href="/track-order" className="btn btn-outline">Track this order</Link>
        <a
          href={whatsappLink(`Namaste! I just placed order ${order.id}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold"
        >
          Chat on WhatsApp
        </a>
        <Link href="/" className="btn btn-primary">Continue shopping</Link>
      </div>
    </div>
  );
}
