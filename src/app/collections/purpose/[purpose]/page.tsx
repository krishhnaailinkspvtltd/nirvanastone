import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionView, type SearchParams } from "@/components/CollectionView";
import { byPurpose } from "@/lib/catalog";
import { PURPOSE_SLUGS, PURPOSES } from "@/lib/taxonomy";
import type { Purpose } from "@/lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return PURPOSE_SLUGS.map((purpose) => ({ purpose }));
}

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
  return (
    <CollectionView
      title={`For ${p.label}`}
      blurb={p.line}
      products={byPurpose(purpose as Purpose)}
      basePath={`/collections/purpose/${purpose}`}
      searchParams={await searchParams}
      showPurposeFilter={false}
    />
  );
}
