import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/catalog";
import { getCatalog } from "@/lib/catalog-store";
import { addReview } from "@/lib/reviews-store";

/** Public review submission — held for moderation in /admin/reviews. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim().slice(0, 60);
  const text = String(body?.text ?? "").trim().slice(0, 1200);
  const rating = Number(body?.rating);
  const productId = String(body?.productId ?? "");

  if (!name || text.length < 10 || !(rating >= 1 && rating <= 5))
    return NextResponse.json(
      { ok: false, error: "Please add your name, a rating, and at least a sentence." },
      { status: 400 },
    );
  const product = getProductById(await getCatalog(), productId);
  if (!product)
    return NextResponse.json({ ok: false, error: "Product not found." }, { status: 404 });

  await addReview({
    product_id: product.id,
    customer_name: name,
    rating: Math.round(rating) as 1 | 2 | 3 | 4 | 5,
    review_text: text,
  });
  return NextResponse.json({
    ok: true,
    message: "Thank you! Your review will appear after a quick moderation check.",
  });
}
