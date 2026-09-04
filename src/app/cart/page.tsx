"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart, useCartLines } from "@/context/cart";
import { formatINR, isGeneratedArt } from "@/lib/catalog";

export default function CartPage() {
  const { setQty, remove, hydrated } = useCart();
  const { lines, subtotal, settings, loading } = useCartLines();
  const [code, setCode] = useState("");
  const [promo, setPromo] = useState<{ code: string; discount: number; description: string } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [checking, setChecking] = useState(false);

  // Restore a previously applied promo, and revalidate it as the cart changes.
  useEffect(() => {
    const saved = localStorage.getItem("nrv-promo");
    if (saved && !promo && subtotal > 0) applyCode(saved, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtotal]);

  async function applyCode(c: string, silent = false) {
    if (!c.trim()) return;
    setChecking(true);
    setPromoError("");
    try {
      const res = await fetch(
        `/api/promo?code=${encodeURIComponent(c)}&subtotal=${subtotal}`,
      );
      const data = await res.json();
      if (data.ok) {
        setPromo({ code: data.code, discount: data.discount, description: data.description });
        localStorage.setItem("nrv-promo", data.code);
      } else {
        setPromo(null);
        localStorage.removeItem("nrv-promo");
        if (!silent) setPromoError(data.error);
      }
    } catch {
      if (!silent) setPromoError("Couldn't check the code — try again.");
    } finally {
      setChecking(false);
    }
  }

  const freeAbove = settings?.freeShippingAbove ?? 999;
  const fee = settings?.shippingFee ?? 79;
  const discount = promo?.discount ?? 0;
  const shipping =
    subtotal - discount >= freeAbove || subtotal === 0 ? 0 : fee;
  const total = Math.max(0, subtotal - discount) + shipping;

  if (!hydrated || (loading && lines.length === 0)) {
    return <div className="mx-auto max-w-3xl px-4 py-20 text-center text-mist">Loading your cart…</div>;
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-maroon-deep">
          Your cart is empty
        </h1>
        <p className="mt-3 text-sm text-mist">
          Browse the collection, or let the AI guide suggest something for your intention.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/collections/bracelets" className="btn btn-primary">
            Shop bestsellers
          </Link>
          <Link href="/recommend" className="btn btn-outline">
            Ask the AI guide
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8">
      <h1 className="font-display text-3xl font-semibold text-maroon-deep">Your cart</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ul className="space-y-3">
          {lines.map((l) => (
            <li
              key={`${l.productId}:${l.variantId}`}
              className="flex gap-4 rounded-xl border border-sand bg-parchment p-3"
            >
              <Link href={`/products/${l.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-parchment">
                <Image
                  src={l.image.url}
                  alt={l.image.alt}
                  fill
                  sizes="96px"
                  unoptimized={isGeneratedArt(l.image.url)}
                  className="object-cover"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <Link href={`/products/${l.slug}`} className="font-display text-[15px] leading-snug text-maroon-deep hover:text-gold">
                  {l.name}
                </Link>
                {l.variant_name && (
                  <p className="text-xs text-mist">{l.variant_name}</p>
                )}
                <p className="mt-1 text-sm font-bold text-ink">{formatINR(l.unitPrice)}</p>
                <div className="mt-auto flex items-center gap-3 pt-2">
                  <div className="flex items-center rounded-full border border-sand">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="px-2.5 py-1 font-bold text-gold"
                      onClick={() => setQty(l.productId, l.variantId, l.qty - 1)}
                    >
                      −
                    </button>
                    <span className="w-7 text-center text-sm font-bold">{l.qty}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="px-2.5 py-1 font-bold text-gold"
                      onClick={() => setQty(l.productId, l.variantId, l.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-bold text-mist hover:text-gold"
                    onClick={() => remove(l.productId, l.variantId)}
                  >
                    Remove
                  </button>
                  <span className="ml-auto text-sm font-bold text-maroon-deep">
                    {formatINR(l.lineTotal)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl border border-sand bg-parchment p-5">
          <h2 className="font-display text-xl font-semibold text-maroon-deep">Summary</h2>

          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              applyCode(code);
            }}
          >
            <input
              className="field !py-2 text-sm"
              placeholder="Promo code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              aria-label="Promo code"
            />
            <button type="submit" className="btn btn-outline !px-4 !py-2 text-sm" disabled={checking}>
              Apply
            </button>
          </form>
          {promo && (
            <p className="mt-2 text-xs font-bold text-jade">
              {promo.code} applied — {promo.description}
            </p>
          )}
          {promoError && <p className="mt-2 text-xs font-bold text-maroon">{promoError}</p>}

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-mist">Subtotal</dt>
              <dd className="font-bold">{formatINR(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-jade">
                <dt>Discount</dt>
                <dd className="font-bold">−{formatINR(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-mist">Shipping</dt>
              <dd className="font-bold">{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-sand pt-2 text-base">
              <dt className="font-bold text-maroon-deep">Total</dt>
              <dd className="font-bold text-maroon-deep">{formatINR(total)}</dd>
            </div>
          </dl>
          {shipping > 0 && (
            <p className="mt-2 text-xs text-mist">
              Add {formatINR(freeAbove - (subtotal - discount))} more for free shipping.
            </p>
          )}
          <Link href="/checkout" className="btn btn-primary mt-5 w-full">
            Proceed to checkout
          </Link>
          <p className="mt-3 text-center text-xs text-mist">
            COD available on eligible pincodes · UPI, cards & netbanking via Razorpay
          </p>
        </aside>
      </div>
      <div className="h-6" />
    </div>
  );
}
