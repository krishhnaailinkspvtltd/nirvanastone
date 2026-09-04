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
import { getProductById } from "@/lib/catalog";
import type { Product, ProductVariant } from "@/lib/types";

export interface CartItem {
  productId: string;
  variantId: string | null;
  qty: number;
}

export interface CartLine extends CartItem {
  product: Product;
  variant: ProductVariant | null;
  unitPrice: number;
  lineTotal: number;
}

interface CartCtx {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
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

  const lines = useMemo<CartLine[]>(
    () =>
      items.flatMap((i) => {
        const product = getProductById(i.productId);
        if (!product) return [];
        const variant =
          product.variants?.find((v) => v.id === i.variantId) ?? null;
        const unitPrice = product.price + (variant?.price_delta ?? 0);
        return [{ ...i, product, variant, unitPrice, lineTotal: unitPrice * i.qty }];
      }),
    [items],
  );

  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.lineTotal, 0),
    [lines],
  );
  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);

  const value = useMemo(
    () => ({ items, lines, count, subtotal, add, setQty, remove, clear, hydrated }),
    [items, lines, count, subtotal, add, setQty, remove, clear, hydrated],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
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
