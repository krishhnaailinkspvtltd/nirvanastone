"use client";

import { useState } from "react";
import { StatusTimeline } from "@/components/StatusTimeline";
import { formatINR } from "@/lib/catalog";
import type { OrderItem, OrderStatus, PaymentMethod } from "@/lib/types";

interface TrackedOrder {
  id: string;
  items: OrderItem[];
  total: number;
  payment_method: PaymentMethod;
  payment_status: string;
  order_status: OrderStatus;
  tracking_id: string | null;
  created_at: string;
  city: string;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function track(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch(
        `/api/track?id=${encodeURIComponent(orderId)}&phone=${encodeURIComponent(phone)}`,
      );
      const data = await res.json();
      if (data.ok) setOrder(data.order);
      else setError(data.error);
    } catch {
      setError("Couldn't reach the server — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pt-10">
      <h1 className="text-center font-display text-3xl font-semibold text-maroon-deep">
        Track your order
      </h1>
      <p className="mt-2 text-center text-sm text-mist">
        No account needed — just your order ID and the phone number used at checkout.
      </p>

      <form onSubmit={track} className="mt-7 grid gap-3 rounded-xl border border-sand bg-parchment p-5 sm:grid-cols-[1fr_1fr_auto]">
        <div>
          <label className="field-label" htmlFor="oid">Order ID</label>
          <input id="oid" className="field" placeholder="NRV-20260904-XXXXX" required value={orderId} onChange={(e) => setOrderId(e.target.value)} />
        </div>
        <div>
          <label className="field-label" htmlFor="ph">Phone number</label>
          <input id="ph" className="field" placeholder="10-digit mobile" required inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary self-end" disabled={loading}>
          {loading ? "Checking…" : "Track"}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-maroon/30 bg-maroon/5 p-4 text-sm font-bold text-maroon">
          {error}
        </p>
      )}

      {order && (
        <section className="mt-6 rounded-xl border border-sand bg-parchment p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl font-semibold text-maroon-deep">{order.id}</h2>
            <p className="text-xs text-mist">
              Placed {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · to {order.city}
            </p>
          </div>
          <div className="mt-5">
            <StatusTimeline status={order.order_status} paymentMethod={order.payment_method} />
          </div>
          {order.tracking_id && (
            <p className="mt-4 rounded-lg bg-parchment p-3 text-sm">
              Courier tracking ID: <strong>{order.tracking_id}</strong>
            </p>
          )}
          <ul className="mt-4 space-y-1.5 border-t border-sand pt-3 text-sm">
            {order.items.map((i) => (
              <li key={`${i.product_id}:${i.variant_name}`} className="flex justify-between gap-3">
                <span>{i.name}{i.variant_name ? ` (${i.variant_name})` : ""} ×{i.qty}</span>
                <span className="font-bold">{formatINR(i.unit_price * i.qty)}</span>
              </li>
            ))}
            <li className="flex justify-between border-t border-sand pt-2 font-bold text-maroon-deep">
              <span>{order.payment_method === "cod" ? "To pay on delivery" : "Total"}</span>
              <span>{formatINR(order.total)}</span>
            </li>
          </ul>
        </section>
      )}
      <div className="h-10" />
    </div>
  );
}
