import { PLANETS, PURPOSES, ZODIACS } from "@/lib/taxonomy";
import type {
  Planet,
  Product,
  ProductImage,
  ProductVariant,
  Purpose,
  Zodiac,
} from "@/lib/types";

/** Whitelist + coerce editable product fields coming from the admin UI. */
export function sanitizeProductFields(body: Record<string, unknown>) {
  const out: Partial<Product> = {};

  const str = (v: unknown, max = 4000) =>
    typeof v === "string" ? v.slice(0, max) : undefined;
  const num = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? Math.round(n) : undefined;
  };

  const name = str(body.name, 120)?.trim();
  if (name) out.name = name;
  const subcategory = str(body.subcategory, 60)?.trim();
  if (subcategory) out.subcategory = subcategory;
  const description = str(body.description);
  if (description !== undefined) out.description = description;
  const care = str(body.care_instructions, 600);
  if (care !== undefined) out.care_instructions = care;

  const price = num(body.price);
  if (price !== undefined) out.price = price;
  const mrp = num(body.mrp);
  if (mrp !== undefined) out.mrp = mrp;
  const stock = num(body.stock_qty);
  if (stock !== undefined) out.stock_qty = stock;

  if (Array.isArray(body.benefits))
    out.benefits = body.benefits
      .map((b) => String(b).trim())
      .filter(Boolean)
      .slice(0, 8);

  if (Array.isArray(body.purpose_tags))
    out.purpose_tags = body.purpose_tags.filter(
      (t): t is Purpose => typeof t === "string" && t in PURPOSES,
    );
  if (Array.isArray(body.zodiac_tags))
    out.zodiac_tags = body.zodiac_tags.filter(
      (t): t is Zodiac => typeof t === "string" && t in ZODIACS,
    );
  if (Array.isArray(body.planet_tags))
    out.planet_tags = body.planet_tags.filter(
      (t): t is Planet => typeof t === "string" && t in PLANETS,
    );

  if (typeof body.certificate_available === "boolean")
    out.certificate_available = body.certificate_available;
  if (typeof body.bestseller === "boolean") out.bestseller = body.bestseller;

  if (Array.isArray(body.image_urls)) {
    const urls = body.image_urls
      .map((u) => String(u).trim())
      .filter((u) => u.startsWith("/") || u.startsWith("https://"))
      .slice(0, 6);
    if (urls.length)
      out.images = urls.map(
        (url): ProductImage => ({
          url,
          alt: `${name ?? "Product"} — product image`,
          is_placeholder: url.startsWith("/api/placeholder"),
        }),
      );
  }

  if (Array.isArray(body.variants)) {
    const variants = body.variants
      .map((v, i): ProductVariant | null => {
        const vn = str((v as Record<string, unknown>)?.variant_name, 60)?.trim();
        if (!vn) return null;
        return {
          id:
            str((v as Record<string, unknown>)?.id, 40) ||
            `v${Date.now().toString(36)}-${i}`,
          variant_name: vn,
          price_delta: Number((v as Record<string, unknown>)?.price_delta) || 0,
          stock_qty: num((v as Record<string, unknown>)?.stock_qty) ?? 0,
        };
      })
      .filter((v): v is ProductVariant => v !== null)
      .slice(0, 20);
    out.variants = variants.length ? variants : undefined;
  }

  return out;
}
