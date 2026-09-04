"use client";

import { useState } from "react";
import { useCart } from "@/context/cart";
import type { Product } from "@/lib/types";

/** Grid-card quick-add. Products with variants route to the PDP instead. */
export function QuickAdd({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (product.stock_qty <= 0) {
    return (
      <span className="inline-flex rounded-full bg-sand px-4 py-2 text-xs font-bold text-mist">
        Out of stock
      </span>
    );
  }

  if (product.variants?.length) {
    // Variant choice happens on the PDP — the whole card links there.
    return (
      <span className="inline-flex rounded-full border border-maroon px-4 py-2 text-xs font-bold text-maroon">
        Choose options
      </span>
    );
  }

  return (
    <button
      type="button"
      className="btn btn-primary !px-4 !py-2 !text-xs"
      onClick={(e) => {
        e.preventDefault();
        add(product.id, null, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
    >
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}
