import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import type { Promo } from "@/lib/promos";
import { getSettings, saveSettings } from "@/lib/settings";

export async function GET() {
  if (await requireAdmin())
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  return NextResponse.json({ ok: true, settings: await getSettings() });
}

export async function PUT(req: NextRequest) {
  if (await requireAdmin())
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body)
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });

  const num = (v: unknown, fallback: number) => {
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? Math.round(n) : fallback;
  };
  const current = await getSettings();

  const promos: Promo[] = Array.isArray(body.promos)
    ? body.promos
        .map((p: Record<string, unknown>): Promo | null => {
          const code = String(p?.code ?? "").trim().toUpperCase().slice(0, 20);
          if (!code) return null;
          const type = p?.type === "flat" ? "flat" : "percent";
          return {
            code,
            description: String(p?.description ?? "").slice(0, 120),
            type,
            value: num(p?.value, 0),
            minSubtotal: num(p?.minSubtotal, 0),
            maxDiscount: p?.maxDiscount ? num(p?.maxDiscount, 0) : undefined,
          };
        })
        .filter((p: Promo | null): p is Promo => p !== null)
        .slice(0, 20)
    : current.promos;

  const settings = {
    shippingFee: num(body.shippingFee, current.shippingFee),
    freeShippingAbove: num(body.freeShippingAbove, current.freeShippingAbove),
    codOrderCap: num(body.codOrderCap, current.codOrderCap),
    promos,
  };
  await saveSettings(settings);
  return NextResponse.json({ ok: true, settings });
}
