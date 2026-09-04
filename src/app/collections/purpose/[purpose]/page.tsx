import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionView, type SearchParams } from "@/components/CollectionView";
import { byPurpose } from "@/lib/catalog";
import { getCatalog } from "@/lib/catalog-store";
import { PURPOSES } from "@/lib/taxonomy";
import type { Purpose } from "@/lib/types";

// Catalog is runtime-editable from /admin — render per request.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ purpose: string }>;
}): Promise<Metadata> {
  const { purpose } = await params;
  const p = PURPOSES[purpose as Purpose];
  if (!p) return {};
  return {
    title: `For ${p.label.toLowerCase()} — rudraksha, gemstones & crystals`,
    description: `${p.line}. Every relevant piece across our catalog, gathered by intention.`,
  };
}

export default async function PurposePage({
  params,
  searchParams,
}: {
  params: Promise<{ purpose: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { purpose } = await params;
  const p = PURPOSES[purpose as Purpose];
  if (!p) notFound();
  const catalog = await getCatalog();
  return (
    <CollectionView
      title={`For ${p.label}`}
      blurb={p.line}
      products={byPurpose(catalog, purpose as Purpose)}
      basePath={`/collections/purpose/${purpose}`}
      searchParams={await searchParams}
      showPurposeFilter={false}
    />
  );
}
