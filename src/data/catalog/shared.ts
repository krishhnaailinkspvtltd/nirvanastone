import type { Planet, Product, ProductVariant, Purpose, Zodiac } from "@/lib/types";

/** Local designed-SVG placeholder (see src/app/api/placeholder/route.ts). */
export const ph = (
  kind: string,
  label: string,
  ratio: "square" | "portrait" = "square",
) =>
  `/api/placeholder?kind=${kind}&label=${encodeURIComponent(label)}&ratio=${ratio}`;

export const imgs = (kind: string, label: string) => [
  { url: ph(kind, label, "square"), alt: `${label} — product photo pending`, is_placeholder: true },
  { url: ph(kind, label, "portrait"), alt: `${label} — detail photo pending`, is_placeholder: true },
];

export const CARE = {
  rudraksha:
    "Keep away from soap and perfume. Oil lightly with coconut or sandalwood oil every few months. Remove before swimming.",
  gemstone:
    "Wipe with a soft dry cloth. Avoid harsh chemicals and ultrasonic cleaners. Re-energise on the recommended weekday if you follow the tradition.",
  crystal:
    "Cleanse monthly under running water or moonlight. Avoid prolonged direct sunlight — some stones fade. Store separately to prevent scratches.",
  metal:
    "Dust with a dry cloth. For copper and brass, a lemon-salt rub restores shine. Keep the placement direction consistent once set.",
  wood:
    "Wipe with a soft dry cloth and oil occasionally with coconut oil. Keep away from prolonged water contact.",
  perfume:
    "Store upright, away from direct sunlight and heat. Crystal chips inside are decorative and stay in the bottle.",
};

interface MkInput {
  id: string;
  slug: string;
  name: string;
  category: Product["category"];
  subcategory: string;
  description: string;
  benefits: string[];
  care: string;
  price: number;
  mrp: number;
  purposes?: Purpose[];
  zodiac?: Zodiac[];
  planets?: Planet[];
  comboIds?: string[];
  cert?: boolean;
  stock?: number;
  art: string;
  variants?: ProductVariant[];
  bestseller?: boolean;
}

/** Compact product factory with sensible defaults. */
export const mk = (o: MkInput): Product => ({
  id: o.id,
  slug: o.slug,
  name: o.name,
  category: o.category,
  subcategory: o.subcategory,
  description: o.description,
  benefits: o.benefits,
  care_instructions: o.care,
  price: o.price,
  mrp: o.mrp,
  purpose_tags: o.purposes ?? [],
  zodiac_tags: o.zodiac ?? [],
  planet_tags: o.planets ?? [],
  is_combo: !!o.comboIds,
  combo_item_ids: o.comboIds ?? null,
  certificate_available: o.cert ?? false,
  stock_qty: o.stock ?? 40,
  images: imgs(o.art, o.name),
  variants: o.variants,
  bestseller: o.bestseller,
});
