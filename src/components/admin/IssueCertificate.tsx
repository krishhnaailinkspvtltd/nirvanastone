"use client";

import { useState } from "react";
import type { OrderItem } from "@/lib/types";

/** Issue a verifiable certificate code for a dispatched unit of this order. */
export function IssueCertificate({
  orderId,
  items,
}: {
  orderId: string;
  items: OrderItem[];
}) {
  const [productId, setProductId] = useState(items[0]?.product_id ?? "");
  const [lab, setLab] = useState("Rudra Gem Testing Laboratory, Jaipur");
  const [busy, setBusy] = useState(false);
  const [issued, setIssued] = useState<string[]>([]);
  const [error, setError] = useState("");

  async function issue() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          order_item_id: `${orderId}:${productId}`,
          lab_name: lab,
        }),
      });
      const data = await res.json();
      if (data.ok) setIssued((prev) => [data.certificate.certificate_code, ...prev]);
      else setError(data.error ?? "Couldn't issue the certificate.");
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-5 rounded-xl border border-sand bg-parchment p-5">
      <h2 className="font-display text-xl font-semibold text-maroon-deep">
        Certificates
      </h2>
      <p className="mt-1 text-xs text-mist">
        Issue a unique code for the unit you're dispatching — the customer
        verifies it at /verify-certificate. Print the code on the certificate card.
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <select className="field !py-2 text-sm" value={productId} onChange={(e) => setProductId(e.target.value)} aria-label="Item">
          {items.map((i) => (
            <option key={`${i.product_id}:${i.variant_name}`} value={i.product_id}>
              {i.name}
            </option>
          ))}
        </select>
        <input className="field !py-2 text-sm" value={lab} onChange={(e) => setLab(e.target.value)} aria-label="Lab name" />
        <button type="button" className="btn btn-outline !px-4 !py-2 text-sm" disabled={busy || !productId} onClick={issue}>
          {busy ? "Issuing…" : "Issue code"}
        </button>
      </div>
      {issued.length > 0 && (
        <ul className="mt-3 space-y-1">
          {issued.map((code) => (
            <li key={code} className="rounded-lg bg-jade/10 px-3 py-2 font-mono text-sm font-bold text-jade">
              {code}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-3 text-sm font-bold text-maroon">{error}</p>}
    </div>
  );
}
