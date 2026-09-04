"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CATEGORIES, PLANETS, PURPOSES, ZODIACS } from "@/lib/taxonomy";
import type { Product } from "@/lib/types";

interface VariantRow {
  id?: string;
  variant_name: string;
  price_delta: number;
  stock_qty: number;
}

interface Props {
  mode: "create" | "edit";
  product?: Product;
  flags?: { edited: boolean; hidden: boolean; custom: boolean };
}

/** The full product editor — every field the storefront renders is editable. */
export function ProductForm({ mode, product, flags }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    category: product?.category ?? "bracelets",
    subcategory: product?.subcategory ?? "",
    price: product?.price ?? 0,
    mrp: product?.mrp ?? 0,
    stock_qty: product?.stock_qty ?? 0,
    description: product?.description ?? "",
    benefits: (product?.benefits ?? []).join("\n"),
    care_instructions: product?.care_instructions ?? "",
    purpose_tags: new Set(product?.purpose_tags ?? []),
    zodiac_tags: new Set(product?.zodiac_tags ?? []),
    planet_tags: new Set(product?.planet_tags ?? []),
    certificate_available: product?.certificate_available ?? false,
    bestseller: product?.bestseller ?? false,
    image_urls: (product?.images ?? []).map((i) => i.url).join("\n"),
    variants: (product?.variants ?? []).map(
      (v): VariantRow => ({
        id: v.id,
        variant_name: v.variant_name,
        price_delta: v.price_delta,
        stock_qty: v.stock_qty,
      }),
    ),
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleTag = (key: "purpose_tags" | "zodiac_tags" | "planet_tags", tag: string) =>
    setForm((f) => {
      const next = new Set(f[key] as Set<string>);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return { ...f, [key]: next };
    });

  async function save() {
    setBusy(true);
    setError("");
    setSaved(false);
    const payload = {
      name: form.name,
      slug: form.slug,
      category: form.category,
      subcategory: form.subcategory,
      price: form.price,
      mrp: form.mrp,
      stock_qty: form.stock_qty,
      description: form.description,
      benefits: form.benefits.split("\n").map((b) => b.trim()).filter(Boolean),
      care_instructions: form.care_instructions,
      purpose_tags: [...form.purpose_tags],
      zodiac_tags: [...form.zodiac_tags],
      planet_tags: [...form.planet_tags],
      certificate_available: form.certificate_available,
      bestseller: form.bestseller,
      image_urls: form.image_urls.split("\n").map((u) => u.trim()).filter(Boolean),
      variants: form.variants,
    };
    try {
      const res = await fetch(
        mode === "create" ? "/api/admin/products" : `/api/admin/products/${product!.id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Save failed.");
      } else if (mode === "create") {
        router.push(`/admin/products/${data.id}`);
        router.refresh();
        return;
      } else {
        setSaved(true);
        router.refresh();
      }
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setBusy(false);
    }
  }

  async function act(action: "delete" | "reset") {
    const messages = {
      delete: flags?.custom
        ? "Permanently remove this product?"
        : "Hide this product from the store? (You can restore it with Reset.)",
      reset: "Discard all edits and restore this product to its original state?",
    };
    if (!confirm(messages[action])) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/products/${product!.id}`, {
        method: action === "delete" ? "DELETE" : "PATCH",
        headers: { "content-type": "application/json" },
        body: action === "reset" ? JSON.stringify({ action: "reset" }) : undefined,
      });
      const data = await res.json();
      if (!data.ok) setError(data.error ?? "Action failed.");
      else {
        router.push("/admin/products");
        router.refresh();
        return;
      }
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setBusy(false);
    }
  }

  const chip = (active: boolean) =>
    `rounded-full border px-2.5 py-1 text-[11px] font-bold ${
      active ? "border-gold bg-gold text-[#2b1608]" : "border-sand bg-parchment text-ink hover:border-gold"
    }`;

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <section className="rounded-xl border border-sand bg-parchment p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="field-label">Product name</label>
            <input className="field" required value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          {mode === "create" && (
            <div>
              <label className="field-label">Slug (URL, optional)</label>
              <input className="field" value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from name" />
            </div>
          )}
          <div>
            <label className="field-label">Category</label>
            <select
              className="field"
              value={form.category}
              onChange={(e) => set("category", e.target.value as Product["category"])}
            >
              {Object.entries(CATEGORIES).map(([slug, c]) => (
                <option key={slug} value={slug}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Subcategory</label>
            <input className="field" value={form.subcategory} onChange={(e) => set("subcategory", e.target.value)} />
          </div>
          <div>
            <label className="field-label">Price (₹)</label>
            <input className="field" type="number" min={0} value={form.price} onChange={(e) => set("price", Number(e.target.value))} />
          </div>
          <div>
            <label className="field-label">MRP (₹)</label>
            <input className="field" type="number" min={0} value={form.mrp} onChange={(e) => set("mrp", Number(e.target.value))} />
          </div>
          <div>
            <label className="field-label">Stock quantity</label>
            <input className="field" type="number" min={0} value={form.stock_qty} onChange={(e) => set("stock_qty", Number(e.target.value))} />
          </div>
          <div className="flex items-end gap-5 pb-1">
            <label className="flex items-center gap-2 text-sm font-bold">
              <input type="checkbox" className="accent-[#d9a94e]" checked={form.bestseller} onChange={(e) => set("bestseller", e.target.checked)} />
              Bestseller
            </label>
            <label className="flex items-center gap-2 text-sm font-bold">
              <input type="checkbox" className="accent-[#d9a94e]" checked={form.certificate_available} onChange={(e) => set("certificate_available", e.target.checked)} />
              Lab certified
            </label>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-sand bg-parchment p-5 space-y-4">
        <div>
          <label className="field-label">Description</label>
          <textarea className="field min-h-24" value={form.description} onChange={(e) => set("description", e.target.value)} />
        </div>
        <div>
          <label className="field-label">Benefits (one per line)</label>
          <textarea className="field min-h-20" value={form.benefits} onChange={(e) => set("benefits", e.target.value)} />
        </div>
        <div>
          <label className="field-label">Care instructions</label>
          <textarea className="field min-h-16" value={form.care_instructions} onChange={(e) => set("care_instructions", e.target.value)} />
        </div>
      </section>

      <section className="rounded-xl border border-sand bg-parchment p-5 space-y-3">
        <div>
          <p className="field-label">Purposes</p>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(PURPOSES).map(([slug, p]) => (
              <button key={slug} type="button" className={chip(form.purpose_tags.has(slug as never))} onClick={() => toggleTag("purpose_tags", slug)}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="field-label">Zodiac signs</p>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(ZODIACS).map(([slug, z]) => (
              <button key={slug} type="button" className={chip(form.zodiac_tags.has(slug as never))} onClick={() => toggleTag("zodiac_tags", slug)}>
                {z.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="field-label">Planets</p>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(PLANETS).map(([slug, p]) => (
              <button key={slug} type="button" className={chip(form.planet_tags.has(slug as never))} onClick={() => toggleTag("planet_tags", slug)}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-sand bg-parchment p-5">
        <label className="field-label">Image URLs (one per line — first is the main image)</label>
        <textarea
          className="field min-h-20 font-mono text-xs"
          value={form.image_urls}
          onChange={(e) => set("image_urls", e.target.value)}
          placeholder={"/products/my-photo.jpg\nhttps://images.unsplash.com/…"}
        />
        <p className="mt-1.5 text-xs text-mist">
          Use files in <code>/public/products/</code>, an https URL, or generated art:{" "}
          <code>/api/placeholder?kind=crystal&label=Name&ratio=square</code>
        </p>
      </section>

      <section className="rounded-xl border border-sand bg-parchment p-5">
        <div className="flex items-center justify-between">
          <p className="field-label !mb-0">Variants (size / option / rashi)</p>
          <button
            type="button"
            className="btn btn-outline !px-3 !py-1 text-xs"
            onClick={() => set("variants", [...form.variants, { variant_name: "", price_delta: 0, stock_qty: 0 }])}
          >
            + Add variant
          </button>
        </div>
        {form.variants.length > 0 && (
          <div className="mt-3 space-y-2">
            {form.variants.map((v, i) => (
              <div key={i} className="grid grid-cols-[1fr_90px_80px_32px] items-center gap-2">
                <input
                  className="field !py-1.5 text-sm"
                  placeholder="Variant name"
                  value={v.variant_name}
                  onChange={(e) => {
                    const next = [...form.variants];
                    next[i] = { ...v, variant_name: e.target.value };
                    set("variants", next);
                  }}
                />
                <input
                  className="field !py-1.5 text-sm"
                  type="number"
                  title="Price delta (₹)"
                  value={v.price_delta}
                  onChange={(e) => {
                    const next = [...form.variants];
                    next[i] = { ...v, price_delta: Number(e.target.value) };
                    set("variants", next);
                  }}
                />
                <input
                  className="field !py-1.5 text-sm"
                  type="number"
                  min={0}
                  title="Stock"
                  value={v.stock_qty}
                  onChange={(e) => {
                    const next = [...form.variants];
                    next[i] = { ...v, stock_qty: Number(e.target.value) };
                    set("variants", next);
                  }}
                />
                <button
                  type="button"
                  aria-label="Remove variant"
                  className="text-lg font-bold text-mist hover:text-maroon"
                  onClick={() => set("variants", form.variants.filter((_, j) => j !== i))}
                >
                  ×
                </button>
              </div>
            ))}
            <p className="text-[11px] text-mist">Columns: name · price delta (₹) · stock</p>
          </div>
        )}
      </section>

      {error && <p className="rounded-xl border border-maroon/40 bg-maroon/10 p-3 text-sm font-bold text-[#e08a94]">{error}</p>}
      {saved && <p className="rounded-xl border border-jade/40 bg-jade/10 p-3 text-sm font-bold text-jade">Saved — the store is already showing the update.</p>}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn btn-gold" disabled={busy}>
          {busy ? "Saving…" : mode === "create" ? "Create product" : "Save changes"}
        </button>
        {mode === "edit" && product && (
          <>
            <a href={`/products/${product.slug}`} target="_blank" className="btn btn-outline">
              View on store ↗
            </a>
            {flags?.edited && !flags.custom && (
              <button type="button" className="btn btn-outline" disabled={busy} onClick={() => act("reset")}>
                Reset to original
              </button>
            )}
            <button
              type="button"
              className="btn border-[1.5px] border-maroon text-[#e08a94] hover:bg-maroon/20"
              disabled={busy}
              onClick={() => act("delete")}
            >
              {flags?.custom ? "Delete product" : flags?.hidden ? "Hidden (reset to restore)" : "Hide from store"}
            </button>
          </>
        )}
      </div>
    </form>
  );
}
