import "server-only";
import { products as seedProducts } from "@/data/products";
import type { Product } from "./types";
import { getKV, setKV } from "./kv";

/**
 * Runtime catalog = compiled seed catalog + admin overrides.
 * The admin panel writes patches (per product id), brand-new products, and
 * deletions into the KV store; every storefront read merges them in, so
 * edits go live immediately without a rebuild.
 */

export type ProductPatch = Partial<Product> & { deleted?: boolean };

interface Overrides {
  patches: Record<string, ProductPatch>;
  custom: Product[];
}

const KEY = "catalog-overrides";

async function getOverrides(): Promise<Overrides> {
  const o = await getKV<Overrides>(KEY);
  return { patches: o?.patches ?? {}, custom: o?.custom ?? [] };
}

async function saveOverrides(o: Overrides): Promise<void> {
  await setKV(KEY, o);
}

/** Storefront catalog: merged, deleted items removed. */
export async function getCatalog(): Promise<Product[]> {
  const { patches, custom } = await getOverrides();
  const merged = seedProducts
    .map((p) => {
      const patch = patches[p.id];
      if (!patch) return p;
      if (patch.deleted) return null;
      const { deleted: _deleted, ...fields } = patch;
      return { ...p, ...fields };
    })
    .filter((p): p is Product => p !== null);
  return [...merged, ...custom.filter((c) => !patches[c.id]?.deleted)];
}

export interface AdminRow {
  product: Product;
  edited: boolean;
  hidden: boolean;
  custom: boolean;
}

/** Admin view: everything, including hidden items, with provenance flags. */
export async function getAdminCatalog(): Promise<AdminRow[]> {
  const { patches, custom } = await getOverrides();
  const seedRows: AdminRow[] = seedProducts.map((p) => {
    const patch = patches[p.id];
    const { deleted, ...fields } = patch ?? {};
    return {
      product: patch ? { ...p, ...fields } : p,
      edited: !!patch && Object.keys(fields).length > 0,
      hidden: !!deleted,
      custom: false,
    };
  });
  const customRows: AdminRow[] = custom.map((p) => ({
    product: p,
    edited: false,
    hidden: !!patches[p.id]?.deleted,
    custom: true,
  }));
  return [...seedRows, ...customRows];
}

export async function findProduct(id: string): Promise<Product | null> {
  const all = await getCatalog();
  return all.find((p) => p.id === id) ?? null;
}

/** Patch a seed or custom product. Empty patch clears nothing — use resetProduct. */
export async function patchProduct(id: string, patch: ProductPatch): Promise<void> {
  const o = await getOverrides();
  const customIdx = o.custom.findIndex((c) => c.id === id);
  if (customIdx >= 0) {
    const { deleted: _deleted, ...fields } = patch;
    o.custom[customIdx] = { ...o.custom[customIdx], ...fields };
  } else {
    const { deleted: _d, ...prev } = o.patches[id] ?? {};
    o.patches[id] = { ...prev, ...patch };
  }
  await saveOverrides(o);
}

export async function createProduct(product: Product): Promise<void> {
  const o = await getOverrides();
  const all = [...seedProducts, ...o.custom];
  if (all.some((p) => p.id === product.id))
    throw new Error(`Product id ${product.id} already exists`);
  if (all.some((p) => p.slug === product.slug))
    throw new Error(`Slug "${product.slug}" is already in use`);
  o.custom.push(product);
  await saveOverrides(o);
}

/** Hide a seed product / remove a custom one. */
export async function deleteProduct(id: string): Promise<void> {
  const o = await getOverrides();
  const customIdx = o.custom.findIndex((c) => c.id === id);
  if (customIdx >= 0) {
    o.custom.splice(customIdx, 1);
    delete o.patches[id];
  } else {
    o.patches[id] = { ...(o.patches[id] ?? {}), deleted: true };
  }
  await saveOverrides(o);
}

/** Un-hide + drop all edits, returning a seed product to its shipped state. */
export async function resetProduct(id: string): Promise<void> {
  const o = await getOverrides();
  delete o.patches[id];
  await saveOverrides(o);
}

/** Decrement stock after an order (product-level and, where used, variant-level). */
export async function adjustStockForOrder(
  items: { product_id: string; variant_name: string | null; qty: number }[],
): Promise<void> {
  const all = await getCatalog();
  for (const item of items) {
    const p = all.find((x) => x.id === item.product_id);
    if (!p) continue;
    const patch: ProductPatch = {
      stock_qty: Math.max(0, p.stock_qty - item.qty),
    };
    if (item.variant_name && p.variants?.length) {
      patch.variants = p.variants.map((v) =>
        v.variant_name === item.variant_name
          ? { ...v, stock_qty: Math.max(0, v.stock_qty - item.qty) }
          : v,
      );
    }
    await patchProduct(item.product_id, patch);
  }
}
