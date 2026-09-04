"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Order, OrderStatus } from "@/lib/types";

/** Move an order through its lifecycle; fires the WhatsApp-phase webhooks server-side. */
export function OrderActions({ order }: { order: Order }) {
  const router = useRouter();
  const [tracking, setTracking] = useState(order.tracking_id ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function patch(body: Record<string, unknown>) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.ok) setError(data.error ?? "Update failed.");
      router.refresh();
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setBusy(false);
    }
  }

  const s = order.order_status;
  const next: { label: string; body: Record<string, unknown>; tone?: "danger" }[] = [];
  if (s === "cod_confirmation_pending")
    next.push({ label: "Mark COD confirmed", body: { cod_confirmed: true } });
  if (s === "pending")
    next.push({ label: "Mark confirmed (paid)", body: { order_status: "confirmed" } });
  if (s === "confirmed")
    next.push({
      label: "Mark shipped",
      body: { order_status: "shipped", tracking_id: tracking },
    });
  if (s === "shipped")
    next.push({ label: "Mark delivered", body: { order_status: "delivered" } });
  if (s !== "cancelled" && s !== "delivered")
    next.push({ label: "Cancel order", body: { order_status: "cancelled" }, tone: "danger" });

  return (
    <div className="rounded-xl border border-sand bg-parchment p-5">
      <h2 className="font-display text-xl font-semibold text-maroon-deep">Manage</h2>

      {(s === "confirmed" || s === "shipped") && (
        <div className="mt-4">
          <label className="field-label" htmlFor="tracking">Courier tracking ID</label>
          <div className="flex gap-2">
            <input
              id="tracking"
              className="field !py-2 text-sm"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder="e.g. DELHIVERY-123456"
            />
            {s === "shipped" && (
              <button
                type="button"
                className="btn btn-outline !px-4 !py-2 text-sm"
                disabled={busy}
                onClick={() => patch({ tracking_id: tracking })}
              >
                Save
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {next.map((a) => (
          <button
            key={a.label}
            type="button"
            disabled={busy}
            onClick={() => {
              if (a.tone === "danger" && !confirm("Cancel this order?")) return;
              patch(a.body);
            }}
            className={
              a.tone === "danger"
                ? "btn border-[1.5px] border-maroon text-[#e08a94] hover:bg-maroon/20"
                : "btn btn-gold"
            }
          >
            {a.label}
          </button>
        ))}
        {next.length === 0 && (
          <p className="text-sm text-mist">This order is {s} — nothing left to do.</p>
        )}
      </div>

      {(s === "shipped" || s === "confirmed") && (
        <p className="mt-3 text-xs text-mist">
          Status changes fire the order-shipped / order-delivered webhooks for
          the WhatsApp automation phase.
        </p>
      )}
      {error && <p className="mt-3 text-sm font-bold text-maroon">{error}</p>}
    </div>
  );
}
