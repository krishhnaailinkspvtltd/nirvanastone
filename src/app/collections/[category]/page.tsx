import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionView, type SearchParams } from "@/components/CollectionView";
import { byCategory } from "@/lib/catalog";
import { getCatalog } from "@/lib/catalog-store";
import { CATEGORIES } from "@/lib/taxonomy";
import type { Category } from "@/lib/types";

// Catalog is runtime-editable from /admin — render per request.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = CATEGORIES[category as Category];
  if (!c) return {};
  return {
    title: `${c.label} — buy certified online`,
    description: `${c.blurb}. Verifiable certification, COD available, 7-day replacement.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { category } = await params;
  const c = CATEGORIES[category as Category];
  if (!c) notFound();
  const catalog = await getCatalog();
  return (
    <CollectionView
      title={c.label}
      blurb={c.blurb}
      products={byCategory(catalog, category as Category)}
      basePath={`/collections/${category}`}
      searchParams={await searchParams}
    />
  );
}
