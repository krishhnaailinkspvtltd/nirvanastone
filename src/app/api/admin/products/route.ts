import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createProduct } from "@/lib/catalog-store";
import { CATEGORIES } from "@/lib/taxonomy";
import type { Category, Product } from "@/lib/types";
import { sanitizeProductFields } from "./sanitize";

/** Create a brand-new product from the admin panel. */
export async function POST(req: NextRequest) {
  if (await requireAdmin())
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.category || !CATEGORIES[body.category as Category])
    return NextResponse.json(
      { ok: false, error: "Name and a valid category are required." },
      { status: 400 },
    );

  const fields = sanitizeProductFields(body);
  const slug =
    (typeof body.slug === "string" && body.slug.trim()
      ? body.slug.trim()
      : String(body.name))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || `product-${Date.now()}`;

  const art = CATEGORIES[body.category as Category].art;
  const product: Product = {
    id: `cu${Date.now().toString(36)}`,
    slug,
    name: String(body.name).slice(0, 120),
    category: body.category as Category,
    subcategory: fields.subcategory ?? "General",
    description: fields.description ?? "",
    benefits: fields.benefits ?? [],
    care_instructions: fields.care_instructions ?? "",
    price: fields.price ?? 0,
    mrp: fields.mrp ?? fields.price ?? 0,
    purpose_tags: fields.purpose_tags ?? [],
    zodiac_tags: fields.zodiac_tags ?? [],
    planet_tags: fields.planet_tags ?? [],
    is_combo: false,
    combo_item_ids: null,
    certificate_available: fields.certificate_available ?? false,
    stock_qty: fields.stock_qty ?? 0,
    images: fields.images?.length
      ? fields.images
      : [
          {
            url: `/api/placeholder?kind=${art}&label=${encodeURIComponent(String(body.name))}&ratio=square`,
            alt: `${body.name} — product photo pending`,
            is_placeholder: true,
          },
        ],
    variants: fields.variants,
    bestseller: fields.bestseller,
  };

  try {
    await createProduct(product);
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Create failed." },
      { status: 400 },
    );
  }
  return NextResponse.json({ ok: true, id: product.id, slug: product.slug });
}
