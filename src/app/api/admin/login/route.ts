import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminPassword,
  createSessionToken,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const { password: expected } = adminPassword();
  if (typeof password !== "string" || password !== expected) {
    return NextResponse.json(
      { ok: false, error: "Wrong password." },
      { status: 401 },
    );
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 3600,
  });
  return res;
}
