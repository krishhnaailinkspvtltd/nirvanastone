import { NextRequest, NextResponse } from "next/server";
import { computeDiscount } from "@/lib/promos";
import { getSettings } from "@/lib/settings";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code") ?? "";
  const subtotal = Number(req.nextUrl.searchParams.get("subtotal") ?? 0);
  const settings = await getSettings();
  const result = computeDiscount(code, subtotal, settings.promos);
  if (!result.ok) return NextResponse.json({ ok: false, error: result.error });
  return NextResponse.json({
    ok: true,
    code: result.promo.code,
    description: result.promo.description,
    discount: result.discount,
  });
}
