"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/config/site";
import { useCart } from "@/context/cart";
import { formatINR } from "@/lib/catalog";
import type { Product } from "@/lib/types";
import { Price } from "./Price";

export function BuyBox({ product }: { product: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const [variantId, setVariantId] = useState<string | null>(
    product.variants?.[0]?.id ?? null,
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Marks the page as carrying a sticky buy bar so the global WhatsApp
  // float hides on mobile (see globals.css).
  useEffect(() => {
    document.body.dataset.stickyBar = "1";
    return () => {
      delete document.body.dataset.stickyBar;
    };
  }, []);

  const variant = product.variants?.find((v) => v.id === variantId) ?? null;
  const unitPrice = product.price + (variant?.price_delta ?? 0);
  const inStock = product.stock_qty > 0 && (variant ? variant.stock_qty > 0 : true);

  const doAdd = () => {
    add(product.id, variantId, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const buyNow = () => {
    add(product.id, variantId, qty);
    router.push("/checkout");
  };

  return (
    <>
      <div className="mt-5 space-y-5">
        {product.variants && product.variants.length > 0 && (
          <fieldset>
            <legend className="field-label">Choose option</legend>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => {
                const active = v.id === variantId;
                const out = v.stock_qty <= 0;
                return (
                  <button
                    key={v.id}
                    type="button"
                    disabled={out}
                    aria-pressed={active}
                    onClick={() => setVariantId(v.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors ${
                      active
                        ? "border-maroon bg-maroon text-cream"
                        : out
                          ? "border-sand text-mist line-through"
                          : "border-sand bg-parchment text-ink hover:border-gold"
                    }`}
                  >
                    {v.variant_name}
                    {v.price_delta > 0 && ` (+${formatINR(v.price_delta)})`}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-full border border-sand bg-parchment">
            <button
              type="button"
              aria-label="Decrease quantity"
              className="px-3.5 py-2 text-lg font-bold text-maroon disabled:text-mist"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-bold">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              className="px-3.5 py-2 text-lg font-bold text-maroon disabled:text-mist"
              onClick={() => setQty((q) => Math.min(10, q + 1))}
              disabled={qty >= 10}
            >
              +
            </button>
          </div>
          {inStock ? (
            <>
              <button type="button" className="btn btn-primary flex-1" onClick={doAdd}>
                {added ? "Added to cart ✓" : "Add to cart"}
              </button>
              <button type="button" className="btn btn-gold flex-1" onClick={buyNow}>
                Buy now
              </button>
            </>
          ) : (
            <span className="rounded-full bg-sand px-5 py-2.5 text-sm font-bold text-mist">
              Out of stock — message us for a restock alert
            </span>
          )}
        </div>

        <a
          href={whatsappLink(
            `Namaste! I have a question about "${product.name}" (${formatINR(unitPrice)}).`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#128C4A] hover:underline"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z" />
          </svg>
          Ask about this product on WhatsApp
        </a>
      </div>

      {/* Sticky mobile add-to-cart + WhatsApp */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2 border-t border-sand bg-night/95 px-3 py-2.5 backdrop-blur md:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-ink">{product.name}</p>
          <Price price={unitPrice} mrp={product.mrp + (variant?.price_delta ?? 0)} />
        </div>
        {inStock ? (
          <button type="button" className="btn btn-primary !px-4 !py-2.5 text-sm" onClick={doAdd}>
            {added ? "✓" : "Add to cart"}
          </button>
        ) : (
          <span className="rounded-full bg-sand px-4 py-2 text-xs font-bold text-mist">
            Out of stock
          </span>
        )}
        <a
          href={whatsappLink(`Namaste! Question about "${product.name}".`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden>
            <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z" />
          </svg>
        </a>
      </div>
      {/* Spacer so the sticky bar never covers page content on mobile */}
      <div className="h-16 md:hidden" />
    </>
  );
}
