import Image from "next/image";
import Link from "next/link";
import { formatINR, isGeneratedArt } from "@/lib/catalog";
import { getAdminCatalog } from "@/lib/catalog-store";
import { CATEGORIES } from "@/lib/taxonomy";
import type { Category } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; stock?: string }>;
}) {
  const { q, category, stock } = await searchParams;
  let rows = await getAdminCatalog();

  if (category && CATEGORIES[category as Category])
    rows = rows.filter((r) => r.product.category === category);
  if (q?.trim()) {
    const needle = q.trim().toLowerCase();
    rows = rows.filter(
      (r) =>
        r.product.name.toLowerCase().includes(needle) ||
        r.product.id.toLowerCase() === needle,
    );
  }
  if (stock === "low") rows = rows.filter((r) => r.product.stock_qty <= 5);

  const catHref = (c: string | null) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (c) p.set("category", c);
    const qs = p.toString();
    return qs ? `/admin/products?${qs}` : "/admin/products";
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold text-maroon-deep">
          Products <span className="text-base text-mist">({rows.length})</span>
        </h1>
        <Link href="/admin/products/new" className="btn btn-gold !py-2 text-sm">
          + Add product
        </Link>
      </div>

      <form className="mt-4 flex gap-2" action="/admin/products" method="get">
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search by name or id…"
          className="field max-w-xs !py-2 text-sm"
        />
        {category && <input type="hidden" name="category" value={category} />}
        <button type="submit" className="btn btn-outline !px-4 !py-2 text-sm">
          Search
        </button>
      </form>

      <div className="scroller -mx-4 mt-3 flex gap-2 overflow-x-auto px-4">
        <Link
          href={catHref(null)}
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${!category ? "border-gold bg-gold text-[#2b1608]" : "border-sand bg-parchment text-ink"}`}
        >
          All
        </Link>
        {Object.entries(CATEGORIES).map(([slug, c]) => (
          <Link
            key={slug}
            href={catHref(slug)}
            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${category === slug ? "border-gold bg-gold text-[#2b1608]" : "border-sand bg-parchment text-ink"}`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-sand">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-parchment text-left text-xs uppercase tracking-wider text-mist">
            <tr>
              <th className="px-4 py-2.5">Product</th>
              <th className="px-4 py-2.5">Category</th>
              <th className="px-4 py-2.5">Price</th>
              <th className="px-4 py-2.5">Stock</th>
              <th className="px-4 py-2.5">Flags</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {rows.map(({ product: p, edited, hidden, custom }) => (
              <tr key={p.id} className={`border-t border-sand hover:bg-parchment/60 ${hidden ? "opacity-50" : ""}`}>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-sand">
                      <Image
                        src={p.images[0].url}
                        alt=""
                        fill
                        sizes="40px"
                        unoptimized={isGeneratedArt(p.images[0].url)}
                        className="object-cover"
                      />
                    </span>
                    <span>
                      <Link href={`/admin/products/${p.id}`} className="font-bold text-ink hover:text-gold">
                        {p.name}
                      </Link>
                      <p className="text-[11px] text-mist">{p.id} · /{p.slug}</p>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 text-xs">{CATEGORIES[p.category].label}</td>
                <td className="px-4 py-2">
                  <span className="font-bold">{formatINR(p.price)}</span>{" "}
                  <s className="text-xs text-mist">{formatINR(p.mrp)}</s>
                </td>
                <td className={`px-4 py-2 font-bold ${p.stock_qty === 0 ? "text-maroon" : p.stock_qty <= 5 ? "text-gold" : ""}`}>
                  {p.stock_qty}
                </td>
                <td className="px-4 py-2 text-[10px] font-bold uppercase tracking-wide">
                  {hidden && <span className="mr-1 rounded bg-maroon/30 px-1.5 py-0.5 text-[#e08a94]">Hidden</span>}
                  {custom && <span className="mr-1 rounded bg-jade/20 px-1.5 py-0.5 text-jade">Custom</span>}
                  {edited && <span className="rounded bg-gold/20 px-1.5 py-0.5 text-gold">Edited</span>}
                  {p.bestseller && <span className="ml-1 rounded bg-sand px-1.5 py-0.5 text-mist">Bestseller</span>}
                </td>
                <td className="px-4 py-2 text-right">
                  <Link href={`/admin/products/${p.id}`} className="font-bold text-gold">
                    Edit →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
