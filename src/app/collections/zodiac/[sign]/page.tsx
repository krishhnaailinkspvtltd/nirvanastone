import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionView, type SearchParams } from "@/components/CollectionView";
import { byZodiac } from "@/lib/catalog";
import { ZODIAC_SLUGS, ZODIACS } from "@/lib/taxonomy";
import type { Zodiac } from "@/lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return ZODIAC_SLUGS.map((sign) => ({ sign }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sign: string }>;
}): Promise<Metadata> {
  const { sign } = await params;
  const z = ZODIACS[sign as Zodiac];
  if (!z) return {};
  return {
    title: `${z.label} (${z.hindi} rashi) — stones & bracelets`,
    description: `Rudraksha, gemstones and crystals traditionally matched to ${z.label} (${z.hindi}).`,
  };
}

export default async function ZodiacPage({
  params,
  searchParams,
}: {
  params: Promise<{ sign: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { sign } = await params;
  const z = ZODIACS[sign as Zodiac];
  if (!z) notFound();
  return (
    <CollectionView
      title={`${z.label} · ${z.hindi} Rashi`}
      blurb={`${z.dates}. Stones traditionally matched to ${z.label} through its ruling planet — plus the all-rashi pieces that fit everyone.`}
      products={byZodiac(sign as Zodiac)}
      basePath={`/collections/zodiac/${sign}`}
      searchParams={await searchParams}
    />
  );
}
