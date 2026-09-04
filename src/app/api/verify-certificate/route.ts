import { NextRequest, NextResponse } from "next/server";
import { certificates } from "@/data/certificates";
import { getProductById } from "@/lib/catalog";
import { getCatalog } from "@/lib/catalog-store";

/**
 * Certificate lookup — backed by a real dataset (seed today, the Supabase
 * `certificates` table in production), not a static badge.
 */
export async function GET(req: NextRequest) {
  const code = (req.nextUrl.searchParams.get("code") ?? "").trim().toUpperCase();
  if (!code)
    return NextResponse.json({ ok: false, error: "Enter a certificate code." }, { status: 400 });

  const cert = certificates.find((c) => c.certificate_code === code);
  if (!cert)
    return NextResponse.json({
      ok: true,
      found: false,
    });

  const product = getProductById(await getCatalog(), cert.product_id);
  return NextResponse.json({
    ok: true,
    found: true,
    certificate: {
      code: cert.certificate_code,
      lab_name: cert.lab_name,
      issue_date: cert.issue_date,
      pdf_url: cert.pdf_url,
      product: product
        ? { name: product.name, slug: product.slug, image: product.images[0] }
        : null,
    },
  });
}
