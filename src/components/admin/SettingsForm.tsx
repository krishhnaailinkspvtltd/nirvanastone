"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Promo } from "@/lib/promos";
import type { StoreSettings } from "@/lib/settings";

export function SettingsForm({ initial }: { initial: StoreSettings }) {
  const router = useRouter();
  const [form, setForm] = useState<StoreSettings>(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const setPromo = (i: number, patch: Partial<Promo>) =>
    setForm((f) => ({
      ...f,
      promos: f.promos.map((p, j) => (j === i ? { ...p, ...patch } : p)),
    }));

  async function save() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMsg(
        data.ok
          ? { ok: true, text: "Saved — live on the store now." }
          : { ok: false, text: data.error ?? "Save failed." },
      );
      if (data.ok) router.refresh();
    } catch {
      setMsg({ ok: false, text: "Couldn't reach the server." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <section className="rounded-xl border border-sand bg-parchment p-5">
        <h2 className="font-display text-xl font-semibold text-maroon-deep">Shipping & COD</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <label className="field-label">Shipping fee (₹)</label>
            <input className="field" type="number" min={0} value={form.shippingFee}
              onChange={(e) => setForm((f) => ({ ...f, shippingFee: Number(e.target.value) }))} />
          </div>
          <div>
            <label className="field-label">Free shipping above (₹)</label>
            <input className="field" type="number" min={0} value={form.freeShippingAbove}
              onChange={(e) => setForm((f) => ({ ...f, freeShippingAbove: Number(e.target.value) }))} />
          </div>
          <div>
            <label className="field-label">COD order cap (₹)</label>
            <input className="field" type="number" min={0} value={form.codOrderCap}
              onChange={(e) => setForm((f) => ({ ...f, codOrderCap: Number(e.target.value) }))} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-sand bg-parchment p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-maroon-deep">Promo codes</h2>
          <button
            type="button"
            className="btn btn-outline !px-3 !py-1 text-xs"
            onClick={() =>
              setForm((f) => ({
                ...f,
                promos: [
                  ...f.promos,
                  { code: "", description: "", type: "percent", value: 10, minSubtotal: 0 },
                ],
              }))
            }
          >
            + Add code
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {form.promos.map((p, i) => (
            <div key={i} className="grid grid-cols-2 items-center gap-2 sm:grid-cols-[110px_1fr_92px_80px_90px_32px]">
              <input className="field !py-1.5 text-sm uppercase" placeholder="CODE" value={p.code}
                onChange={(e) => setPromo(i, { code: e.target.value.toUpperCase() })} />
              <input className="field !py-1.5 text-sm" placeholder="Description shown to customer" value={p.description}
                onChange={(e) => setPromo(i, { description: e.target.value })} />
              <select className="field !py-1.5 text-sm" value={p.type}
                onChange={(e) => setPromo(i, { type: e.target.value as Promo["type"] })}>
                <option value="percent">% off</option>
                <option value="flat">₹ flat</option>
              </select>
              <input className="field !py-1.5 text-sm" type="number" min={0} title="Value" value={p.value}
                onChange={(e) => setPromo(i, { value: Number(e.target.value) })} />
              <input className="field !py-1.5 text-sm" type="number" min={0} title="Min order (₹)" value={p.minSubtotal}
                onChange={(e) => setPromo(i, { minSubtotal: Number(e.target.value) })} />
              <button type="button" aria-label="Remove code" className="text-lg font-bold text-mist hover:text-maroon"
                onClick={() => setForm((f) => ({ ...f, promos: f.promos.filter((_, j) => j !== i) }))}>
                ×
              </button>
            </div>
          ))}
          <p className="text-[11px] text-mist">Columns: code · description · type · value · minimum order</p>
        </div>
      </section>

      {msg && (
        <p className={`rounded-xl border p-3 text-sm font-bold ${msg.ok ? "border-jade/40 bg-jade/10 text-jade" : "border-maroon/40 bg-maroon/10 text-[#e08a94]"}`}>
          {msg.text}
        </p>
      )}

      <button type="submit" className="btn btn-gold" disabled={busy}>
        {busy ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
