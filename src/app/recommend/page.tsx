"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MalaDivider } from "@/components/MalaDivider";
import { formatINR } from "@/lib/catalog";
import { PURPOSES, ZODIACS } from "@/lib/taxonomy";
import type { Purpose, Zodiac } from "@/lib/types";

interface PickCard {
  product: {
    id: string;
    slug: string;
    name: string;
    category: string;
    price: number;
    mrp: number;
    image: { url: string; alt: string; is_placeholder: boolean };
    certificate_available: boolean;
  };
  reason: string;
}

type Budget = "under-1000" | "1000-3000" | "3000-5000" | "5000-plus";

const BUDGET_LABELS: Record<Budget, string> = {
  "under-1000": "Under ₹1,000",
  "1000-3000": "₹1,000 – ₹3,000",
  "3000-5000": "₹3,000 – ₹5,000",
  "5000-plus": "₹5,000+",
};

export default function RecommendPage() {
  const [mode, setMode] = useState<"guided" | "free">("guided");
  const [concern, setConcern] = useState<Purpose | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [zodiac, setZodiac] = useState<Zodiac | null>(null);
  const [freeText, setFreeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ picks: PickCard[]; note: string; source: string } | null>(null);

  const canAsk = mode === "free" ? freeText.trim().length >= 5 : concern !== null;

  async function ask() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          concern: mode === "guided" ? concern : null,
          budget,
          zodiac,
          freeText: mode === "free" ? freeText.trim() : null,
        }),
      });
      const data = await res.json();
      if (data.ok) setResult(data);
      else setError(data.error ?? "Something went wrong — please try again.");
    } catch {
      setError("Couldn't reach the guide — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
      active
        ? "border-gold bg-gold text-[#2b1608]"
        : "border-sand bg-parchment text-ink hover:border-gold"
    }`;

  return (
    <div className="mx-auto max-w-3xl px-4 pt-10">
      <header className="text-center">
        <p className="eyebrow">AI product guide</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-deep sm:text-4xl">
          Tell us what's going on.
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-mist">
          Three quick questions — or your own words — and we'll suggest two or
          three pieces from our actual catalog, with the reasoning spelled out.
          No pressure, no auto-add-to-cart.
        </p>
        <MalaDivider className="mt-5" />
      </header>

      <div className="mt-8 rounded-2xl border border-sand bg-parchment p-5 sm:p-7">
        <div className="flex gap-2">
          <button type="button" className={chip(mode === "guided")} onClick={() => setMode("guided")}>
            Quick questions
          </button>
          <button type="button" className={chip(mode === "free")} onClick={() => setMode("free")}>
            In my own words
          </button>
        </div>

        {mode === "guided" ? (
          <div className="mt-6 space-y-6">
            <fieldset>
              <legend className="field-label !text-sm">1. What's your main concern right now?</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {(Object.entries(PURPOSES) as [Purpose, (typeof PURPOSES)[Purpose]][]).map(
                  ([slug, p]) => (
                    <button
                      key={slug}
                      type="button"
                      className={chip(concern === slug)}
                      onClick={() => setConcern(concern === slug ? null : slug)}
                    >
                      {p.label}
                    </button>
                  ),
                )}
              </div>
            </fieldset>
          </div>
        ) : (
          <div className="mt-6">
            <label className="field-label !text-sm" htmlFor="freetext">
              What's going on? A sentence or two is plenty.
            </label>
            <textarea
              id="freetext"
              className="field min-h-24"
              placeholder="e.g. New business is struggling, money going out faster than it comes in. Also not sleeping well…"
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              maxLength={600}
            />
          </div>
        )}

        <fieldset className="mt-6">
          <legend className="field-label !text-sm">
            {mode === "guided" ? "2." : ""} Budget <span className="font-normal text-mist">(optional)</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {(Object.keys(BUDGET_LABELS) as Budget[]).map((b) => (
              <button
                key={b}
                type="button"
                className={chip(budget === b)}
                onClick={() => setBudget(budget === b ? null : b)}
              >
                {BUDGET_LABELS[b]}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="field-label !text-sm">
            {mode === "guided" ? "3." : ""} Your rashi / sign{" "}
            <span className="font-normal text-mist">(optional — helps astrological matching)</span>
          </legend>
          <div className="mt-2">
            <select
              className="field max-w-xs"
              aria-label="Zodiac sign"
              value={zodiac ?? ""}
              onChange={(e) => setZodiac((e.target.value || null) as Zodiac | null)}
            >
              <option value="">I'd rather skip this</option>
              {(Object.entries(ZODIACS) as [Zodiac, (typeof ZODIACS)[Zodiac]][]).map(
                ([slug, z]) => (
                  <option key={slug} value={slug}>
                    {z.label} ({z.hindi}) · {z.dates}
                  </option>
                ),
              )}
            </select>
          </div>
        </fieldset>

        <button
          type="button"
          className="btn btn-gold mt-7 w-full sm:w-auto"
          disabled={!canAsk || loading}
          onClick={ask}
        >
          {loading ? "Thinking it over…" : "Get my recommendations"}
        </button>
        {!canAsk && (
          <p className="mt-2 text-xs text-mist">
            {mode === "guided"
              ? "Pick a concern to continue."
              : "Write a few words about what you're looking for."}
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-xl border border-maroon/30 bg-maroon/5 p-4 text-sm font-bold text-maroon">
          {error}
        </p>
      )}

      {result && (
        <section className="mt-10" aria-live="polite">
          <h2 className="text-center font-display text-2xl font-semibold text-maroon-deep">
            {result.picks.length > 0 ? "Our suggestions for you" : "Hmm — nothing fits yet"}
          </h2>
          {result.note && (
            <p className="mx-auto mt-2 max-w-lg text-center text-sm text-mist">{result.note}</p>
          )}
          <div className="mt-6 space-y-4">
            {result.picks.map((pk, idx) => (
              <article
                key={pk.product.id}
                className="flex flex-col gap-4 rounded-2xl border border-sand bg-parchment p-4 sm:flex-row sm:p-5"
              >
                <Link
                  href={`/products/${pk.product.slug}`}
                  className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-parchment sm:h-36 sm:w-36"
                >
                  <Image
                    src={pk.product.image.url}
                    alt={pk.product.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 144px"
                    unoptimized={pk.product.image.url.startsWith("/api/")}
                    className="object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <p className="eyebrow">Suggestion {idx + 1}</p>
                  <Link
                    href={`/products/${pk.product.slug}`}
                    className="mt-1 block font-display text-xl text-maroon-deep hover:text-maroon"
                  >
                    {pk.product.name}
                  </Link>
                  <p className="mt-1 text-sm font-bold text-ink">
                    {formatINR(pk.product.price)}{" "}
                    {pk.product.mrp > pk.product.price && (
                      <s className="font-normal text-mist">{formatINR(pk.product.mrp)}</s>
                    )}
                    {pk.product.certificate_available && (
                      <span className="ml-2 rounded-full bg-maroon/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-maroon">
                        Lab certified
                      </span>
                    )}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    <span className="font-bold text-gold">Why this: </span>
                    {pk.reason}
                  </p>
                  <Link href={`/products/${pk.product.slug}`} className="btn btn-outline mt-3 !px-4 !py-1.5 text-xs">
                    View product →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-mist">
            {result.source === "ai"
              ? "Recommendations generated by our AI guide from the live catalog — always described by traditional association, never as a promise."
              : "Matched from our catalog by your answers."}
          </p>
        </section>
      )}
      <div className="h-10" />
    </div>
  );
}
