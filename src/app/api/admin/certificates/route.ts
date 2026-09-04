import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getProductById } from "@/lib/catalog";
import { getCatalog } from "@/lib/catalog-store";
import { issueCertificate } from "@/lib/cert-store";

/** Issue a unique, verifiable certificate code for a dispatched unit. */
export async function POST(req: NextRequest) {
  if (await requireAdmin())
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  const body = await req.json().catch(() => null);
  const productId = String(body?.product_id ?? "");
  const labName = String(body?.lab_name ?? "").trim().slice(0, 120);
  if (!labName)
    return NextResponse.json({ ok: false, error: "Lab name is required." }, { status: 400 });
  const product = getProductById(await getCatalog(), productId);
  if (!product)
    return NextResponse.json({ ok: false, error: "Product not found." }, { status: 404 });

  const cert = await issueCertificate({
    product_id: product.id,
    order_item_id: body?.order_item_id ? String(body.order_item_id).slice(0, 80) : null,
    lab_name: labName,
  });
  return NextResponse.json({ ok: true, certificate: cert });
}
