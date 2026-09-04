import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/catalog";
import { getCatalog } from "@/lib/catalog-store";
import { getSettings } from "@/lib/settings";

/**
 * Resolves cart items (ids + qty from localStorage) against the LIVE
 * catalog and settings, so prices, names, images and shipping estimates
 * always reflect the current admin-managed state.
 */
export async function POST(req: NextRequest) {
  let items: { productId: string; variantId: string | null; qty: number }[];
  try {
    const body = await req.json();
    items = Array.isArray(body.items) ? body.items : [];
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const [catalog, settings] = await Promise.all([getCatalog(), getSettings()]);

  const lines = items.flatMap((i) => {
    const product = getProductById(catalog, i.productId);
    if (!product) return [];
    const variant = product.variants?.find((v) => v.id === i.variantId) ?? null;
    const qty = Math.max(1, Math.min(10, Number(i.qty) || 1));
    const unitPrice = product.price + (variant?.price_delta ?? 0);
    return [
      {
        productId: product.id,
        variantId: variant?.id ?? null,
        qty,
        slug: product.slug,
        name: product.name,
        variant_name: variant?.variant_name ?? null,
        unitPrice,
        lineTotal: unitPrice * qty,
        image: product.images[0],
        in_stock: product.stock_qty > 0 && (variant ? variant.stock_qty > 0 : true),
      },
    ];
  });

  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);

  return NextResponse.json({
    ok: true,
    lines,
    subtotal,
    settings: {
      shippingFee: settings.shippingFee,
      freeShippingAbove: settings.freeShippingAbove,
      codOrderCap: settings.codOrderCap,
    },
  });
}
