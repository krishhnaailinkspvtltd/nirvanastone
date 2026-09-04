import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionView, type SearchParams } from "@/components/CollectionView";
import { byPlanet } from "@/lib/catalog";
import { getCatalog } from "@/lib/catalog-store";
import { PLANETS } from "@/lib/taxonomy";
import type { Planet } from "@/lib/types";

// Catalog is runtime-editable from /admin — render per request.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ planet: string }>;
}): Promise<Metadata> {
  const { planet } = await params;
  const p = PLANETS[planet as Planet];
  if (!p) return {};
  return {
    title: `${p.label} (${p.hindi}) remedies — stones & yantras`,
    description: `Remedial pieces traditionally associated with ${p.label} (${p.hindi}): ${p.governs}.`,
  };
}

export default async function PlanetPage({
  params,
  searchParams,
}: {
  params: Promise<{ planet: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { planet } = await params;
  const p = PLANETS[planet as Planet];
  if (!p) notFound();
  const catalog = await getCatalog();
  return (
    <CollectionView
      title={`${p.label} · ${p.hindi}`}
      blurb={`Governs ${p.governs}. Pieces traditionally associated with strengthening or pacifying ${p.label} in the chart.`}
      products={byPlanet(catalog, planet as Planet)}
      basePath={`/collections/planet/${planet}`}
      searchParams={await searchParams}
    />
  );
}
