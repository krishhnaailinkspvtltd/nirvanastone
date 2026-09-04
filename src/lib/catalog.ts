import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import type { Category, Planet, Product, Purpose, Zodiac } from "./types";

export const allProducts = products;

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);

export const byCategory = (category: Category) =>
  products.filter((p) => p.category === category);

export const byPurpose = (purpose: Purpose) =>
  products.filter((p) => p.purpose_tags.includes(purpose));

export const byZodiac = (sign: Zodiac) =>
  products.filter((p) => p.zodiac_tags.includes(sign));

export const byPlanet = (planet: Planet) =>
  products.filter((p) => p.planet_tags.includes(planet));

export const bestsellers = () => products.filter((p) => p.bestseller);

export function ratingSummary(productId: string) {
  const rs = reviews.filter((r) => r.product_id === productId);
  if (rs.length === 0) return { count: 0, avg: 0 };
  const avg = rs.reduce((s, r) => s + r.rating, 0) / rs.length;
  return { count: rs.length, avg: Math.round(avg * 10) / 10 };
}

export const productReviews = (productId: string) =>
  reviews
    .filter((r) => r.product_id === productId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));

/** Related products: shared purpose or category, excluding self and combos containing self. */
export function relatedProducts(p: Product, limit = 4): Product[] {
  const scored = products
    .filter((x) => x.id !== p.id && x.stock_qty > 0)
    .map((x) => {
      let score = 0;
      if (x.category === p.category) score += 2;
      score += x.purpose_tags.filter((t) => p.purpose_tags.includes(t)).length * 3;
      score += x.planet_tags.filter((t) => p.planet_tags.includes(t)).length;
      if (x.is_combo && x.combo_item_ids?.includes(p.id)) score += 6;
      return { x, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.x);
}

export const discountPct = (p: { price: number; mrp: number }) =>
  p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;

export const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

/** Local generated SVG art bypasses the Next image optimizer; photos don't. */
export const isGeneratedArt = (url: string) => url.startsWith("/api/");

export type SortKey = "bestselling" | "price-asc" | "price-desc" | "newest";

export interface CollectionFilters {
  minPrice?: number;
  maxPrice?: number;
  purpose?: Purpose;
  zodiac?: Zodiac;
  inStock?: boolean;
  sort?: SortKey;
}

export function applyFilters(list: Product[], f: CollectionFilters): Product[] {
  let out = list;
  if (f.minPrice !== undefined) out = out.filter((p) => p.price >= f.minPrice!);
  if (f.maxPrice !== undefined) out = out.filter((p) => p.price <= f.maxPrice!);
  if (f.purpose) out = out.filter((p) => p.purpose_tags.includes(f.purpose!));
  if (f.zodiac) out = out.filter((p) => p.zodiac_tags.includes(f.zodiac!));
  if (f.inStock) out = out.filter((p) => p.stock_qty > 0);
  switch (f.sort) {
    case "price-asc":
      out = [...out].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      out = [...out].sort((a, b) => b.price - a.price);
      break;
    case "newest":
      out = [...out].sort((a, b) => b.id.localeCompare(a.id));
      break;
    case "bestselling":
    default:
      out = [...out].sort(
        (a, b) =>
          (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0) ||
          ratingSummary(b.id).count - ratingSummary(a.id).count,
      );
  }
  return out;
}

export const PRICE_BUCKETS = [
  { label: "Under ₹999", min: 0, max: 999 },
  { label: "₹1,000 – ₹3,000", min: 1000, max: 3000 },
  { label: "₹3,000 – ₹5,000", min: 3000, max: 5000 },
  { label: "Premium (₹5,000+)", min: 5000, max: 1000000 },
];
