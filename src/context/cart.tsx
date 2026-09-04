"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProductImage } from "@/lib/types";

export interface CartItem {
  productId: string;
  variantId: string | null;
  qty: number;
}

/** A cart line as resolved by /api/cart/resolve against the LIVE catalog. */
export interface ResolvedLine extends CartItem {
  slug: string;
  name: string;
  variant_name: string | null;
  unitPrice: number;
  lineTotal: number;
  image: ProductImage;
  in_stock: boolean;
}

export interface CartSettings {
  shippingFee: number;
  freeShippingAbove: number;
  codOrderCap: number;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  add: (productId: string, variantId?: string | null, qty?: number) => void;
  setQty: (productId: string, variantId: string | null, qty: number) => void;
  remove: (productId: string, variantId: string | null) => void;
  clear: () => void;
  hydrated: boolean;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "nrv-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved: CartItem[] = JSON.parse(raw);
        // Don't clobber anything added before hydration completed.
        setItems((prev) => (prev.length > 0 ? prev : saved));
      }
    } catch {
      /* fresh cart */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items, hydrated]);

  const add = useCallback(
    (productId: string, variantId: string | null = null, qty = 1) => {
      setItems((prev) => {
        const idx = prev.findIndex(
          (i) => i.productId === productId && i.variantId === variantId,
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: Math.min(next[idx].qty + qty, 10) };
          return next;
        }
        return [...prev, { productId, variantId, qty }];
      });
    },
    [],
  );

  const setQty = useCallback(
    (productId: string, variantId: string | null, qty: number) => {
      setItems((prev) =>
        qty <= 0
          ? prev.filter((i) => !(i.productId === productId && i.variantId === variantId))
          : prev.map((i) =>
              i.productId === productId && i.variantId === variantId
                ? { ...i, qty: Math.min(qty, 10) }
                : i,
            ),
      );
    },
    [],
  );

  const remove = useCallback(
    (productId: string, variantId: string | null) =>
      setQty(productId, variantId, 0),
    [setQty],
  );

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  const value = useMemo(
    () => ({ items, count, add, setQty, remove, clear, hydrated }),
    [items, count, add, setQty, remove, clear, hydrated],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

/** Server-resolved cart lines + live store settings (prices from /admin apply). */
export function useCartLines() {
  const { items, hydrated } = useCart();
  const [lines, setLines] = useState<ResolvedLine[]>([]);
  const [settings, setSettings] = useState<CartSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hydrated) return;
    let cancelled = false;
    setLoading(true);
    fetch("/api/cart/resolve", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ items }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || !data.ok) return;
        setLines(data.lines);
        setSettings(data.settings);
      })
      .catch(() => {
        /* keep previous state; totals recompute on next change */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [items, hydrated]);

  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.lineTotal, 0),
    [lines],
  );

  return { lines, subtotal, settings, loading };
}

/** Order ids placed from this browser — powers /account/orders without auth. */
const ORDERS_KEY = "nrv-my-orders-v1";

export function rememberOrder(orderId: string, phone: string) {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const list: { id: string; phone: string; at: string }[] = raw ? JSON.parse(raw) : [];
    list.unshift({ id: orderId, phone, at: new Date().toISOString() });
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list.slice(0, 20)));
  } catch {
    /* non-fatal */
  }
}

export function myOrders(): { id: string; phone: string; at: string }[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
