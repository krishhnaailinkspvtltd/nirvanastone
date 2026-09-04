import type { Product } from "@/lib/types";
import { applyPhotos } from "./photos";
import { accessoryProducts } from "./catalog/accessories";
import { ankletProducts } from "./catalog/anklets";
import { braceletProducts } from "./catalog/bracelets";
import { comboProducts } from "./catalog/combos";
import { coreProducts } from "./catalog/core";
import { gemstoneProducts } from "./catalog/gemstones";
import { karungaliProducts } from "./catalog/karungali";
import { malaProducts } from "./catalog/malas";
import { murtiProducts } from "./catalog/murtis";
import { pendantProducts } from "./catalog/pendants";
import { rudrakshaProducts } from "./catalog/rudraksha";
import { vastuProducts } from "./catalog/vastu";
import { yantraProducts } from "./catalog/yantras";
import { zodiacProducts } from "./catalog/zodiac";

/**
 * Full catalog aggregator. Families live in ./catalog/* — see the
 * TODO block in ./catalog/core.ts for the real-photography checklist,
 * which applies to every product here (all imagery is placeholder SVG
 * from /api/placeholder until real photos land).
 */
export const products: Product[] = applyPhotos([
  ...coreProducts,
  ...rudrakshaProducts,
  ...karungaliProducts,
  ...braceletProducts,
  ...malaProducts,
  ...pendantProducts,
  ...ankletProducts,
  ...gemstoneProducts,
  ...murtiProducts,
  ...yantraProducts,
  ...vastuProducts,
  ...zodiacProducts,
  ...accessoryProducts,
  ...comboProducts,
]);

if (process.env.NODE_ENV !== "production") {
  // Guard against id/slug collisions as families grow.
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const p of products) {
    if (ids.has(p.id)) throw new Error(`Duplicate product id: ${p.id}`);
    if (slugs.has(p.slug)) throw new Error(`Duplicate product slug: ${p.slug}`);
    ids.add(p.id);
    slugs.add(p.slug);
  }
}
