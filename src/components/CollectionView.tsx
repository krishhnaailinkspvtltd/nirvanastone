import Link from "next/link";
import {
  applyFilters,
  PRICE_BUCKETS,
  type CollectionFilters,
  type SortKey,
} from "@/lib/catalog";
import { PURPOSES } from "@/lib/taxonomy";
import type { Product, Purpose } from "@/lib/types";
import { MalaDivider } from "./MalaDivider";
import { ProductCard } from "./ProductCard";

export type SearchParams = Record<string, string | string[] | undefined>;

export function parseFilters(sp: SearchParams): CollectionFilters {
  const one = (k: string) => (Array.isArray(sp[k]) ? sp[k]![0] : sp[k]) as string | undefined;
  const f: CollectionFilters = {};
  const price = one("price");
  if (price) {
    const [min, max] = price.split("-").map(Number);
    if (!Number.isNaN(min)) f.minPrice = min;
    if (!Number.isNaN(max)) f.maxPrice = max;
  }
  const purpose = one("purpose");
  if (purpose && purpose in PURPOSES) f.purpose = purpose as Purpose;
  if (one("stock") === "1") f.inStock = true;
  const sort = one("sort");
  if (sort && ["bestselling", "price-asc", "price-desc", "newest"].includes(sort))
    f.sort = sort as SortKey;
  return f;
}

function href(base: string, sp: SearchParams, patch: Record<string, string | null>) {
  const params = new URLSearchParams();
  for (const k of ["price", "purpose", "stock", "sort"]) {
    const v = Array.isArray(sp[k]) ? sp[k]![0] : (sp[k] as string | undefined);
    if (v) params.set(k, v);
  }
  for (const [k, v] of Object.entries(patch)) {
    if (v === null) params.delete(k);
    else params.set(k, v);
  }
  const q = params.toString();
  return q ? `${base}?${q}` : base;
}

const SORTS: { key: SortKey; label: string }[] = [
  { key: "bestselling", label: "Bestselling" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "newest", label: "Newest" },
];

export function CollectionView({
  title,
  blurb,
  products,
  basePath,
  searchParams,
  showPurposeFilter = true,
}: {
  title: string;
  blurb: string;
  products: Product[];
  basePath: string;
  searchParams: SearchParams;
  showPurposeFilter?: boolean;
}) {
  const filters = parseFilters(searchParams);
  const filtered = applyFilters(products, filters);
  const activePrice =
    filters.minPrice !== undefined || filters.maxPrice !== undefined
      ? `${filters.minPrice ?? 0}-${filters.maxPrice ?? 1000000}`
      : undefined;
  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
      active
        ? "border-gold bg-gold text-[#2b1608]"
        : "border-sand bg-parchment text-ink hover:border-gold"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <header className="text-center">
        <h1 className="font-display text-3xl font-semibold text-maroon-deep sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-mist">{blurb}</p>
        <MalaDivider className="mt-4" />
      </header>

      {/* Filters */}
      <div className="mt-7 flex flex-wrap items-center gap-2">
        <span className="eyebrow mr-1">Price</span>
        {PRICE_BUCKETS.map((b) => {
          const val = `${b.min}-${b.max}`;
          const active = activePrice === val;
          return (
            <Link
              key={b.label}
              href={href(basePath, searchParams, { price: active ? null : val })}
              className={chip(active)}
            >
              {b.label}
            </Link>
          );
        })}
        <Link
          href={href(basePath, searchParams, { stock: filters.inStock ? null : "1" })}
          className={chip(!!filters.inStock)}
        >
          In stock
        </Link>
      </div>

      {showPurposeFilter && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">Purpose</span>
          {Object.entries(PURPOSES).map(([slug, p]) => {
            const active = filters.purpose === slug;
            return (
              <Link
                key={slug}
                href={href(basePath, searchParams, { purpose: active ? null : slug })}
                className={chip(active)}
              >
                {p.label}
              </Link>
            );
          })}
        </div>
      )}

      {/* Sort + count */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-sand pt-4">
        <p className="text-sm text-mist">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {SORTS.map((s) => {
            const active = (filters.sort ?? "bestselling") === s.key;
            return (
              <Link
                key={s.key}
                href={href(basePath, searchParams, {
                  sort: s.key === "bestselling" ? null : s.key,
                })}
                className={`rounded-md px-2.5 py-1 text-xs font-bold ${
                  active ? "bg-parchment text-maroon" : "text-mist hover:text-maroon"
                }`}
              >
                {s.label}
              </Link>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="my-16 text-center">
          <p className="font-display text-xl text-maroon-deep">
            Nothing matches these filters
          </p>
          <p className="mt-2 text-sm text-mist">
            Clear a filter above, or ask the AI guide for a personal pick.
          </p>
          <Link href="/recommend" className="btn btn-outline mt-5">
            Ask the AI guide
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
