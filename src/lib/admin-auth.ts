import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * Password-based admin auth with an HMAC-signed session cookie.
 * Set ADMIN_PASSWORD in the environment; without it a clearly-flagged
 * development default applies (change it before real orders flow).
 */

export const ADMIN_COOKIE = "nrv-admin";
const SESSION_HOURS = 24 * 7;

export function adminPassword(): { password: string; isDefault: boolean } {
  const env = process.env.ADMIN_PASSWORD?.trim();
  if (env) return { password: env, isDefault: false };
  return { password: "admin123", isDefault: true };
}

function sign(payload: string): string {
  const { password } = adminPassword();
  return crypto
    .createHmac("sha256", `nrv-admin:${password}`)
    .update(payload)
    .digest("hex");
}

export function createSessionToken(): string {
  const exp = Date.now() + SESSION_HOURS * 3600 * 1000;
  return `${exp}.${sign(String(exp))}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  if (!expStr || !sig) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = sign(expStr);
  try {
    return (
      sig.length === expected.length &&
      crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
    );
  } catch {
    return false;
  }
}

/** For server components/pages. */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

/** For API routes: returns null when authed, else a 401 body. */
export async function requireAdmin(): Promise<{ ok: false; status: 401 } | null> {
  return (await isAdmin()) ? null : { ok: false, status: 401 };
}
