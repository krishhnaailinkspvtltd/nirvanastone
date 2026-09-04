import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionView, type SearchParams } from "@/components/CollectionView";
import { byCategory } from "@/lib/catalog";
import { CATEGORIES, CATEGORY_SLUGS } from "@/lib/taxonomy";
import type { Category } from "@/lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

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
  return (
    <CollectionView
      title={c.label}
      blurb={c.blurb}
      products={byCategory(category as Category)}
      basePath={`/collections/${category}`}
      searchParams={await searchParams}
    />
  );
}
