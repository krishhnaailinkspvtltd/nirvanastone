import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import {
  deleteProduct,
  findProduct,
  patchProduct,
  resetProduct,
} from "@/lib/catalog-store";
import { sanitizeProductFields } from "../sanitize";

type Params = { params: Promise<{ id: string }> };

/** Edit any product (seed or custom) — the patch overlays the seed data. */
export async function PATCH(req: NextRequest, { params }: Params) {
  if (await requireAdmin())
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body)
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });

  if (body.action === "reset") {
    await resetProduct(id);
    return NextResponse.json({ ok: true });
  }

  const existing = await findProduct(id);
  if (!existing)
    return NextResponse.json({ ok: false, error: "Product not found." }, { status: 404 });

  const fields = sanitizeProductFields(body);
  if (Object.keys(fields).length === 0)
    return NextResponse.json({ ok: false, error: "Nothing to update." }, { status: 400 });

  await patchProduct(id, fields);
  return NextResponse.json({ ok: true });
}

/** Hide a seed product from the store / remove a custom product entirely. */
export async function DELETE(_req: NextRequest, { params }: Params) {
  if (await requireAdmin())
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  const { id } = await params;
  await deleteProduct(id);
  return NextResponse.json({ ok: true });
}
