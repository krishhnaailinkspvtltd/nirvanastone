import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

/**
 * Tiny key→JSON store powering the admin panel (catalog overrides, settings).
 * Supabase `kv_store` table when configured; local JSON files otherwise
 * (/tmp on Vercel, where the deploy filesystem is read-only).
 */

const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "nirvana-data", "kv")
  : path.join(process.cwd(), ".data", "kv");

function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function getKV<T>(key: string): Promise<T | null> {
  const sb = supabase();
  if (sb) {
    const { data, error } = await sb
      .from("kv_store")
      .select("value")
      .eq("key", key)
      .maybeSingle();
    if (error) throw new Error(`kv read failed: ${error.message}`);
    return (data?.value as T) ?? null;
  }
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, `${key}.json`), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setKV<T>(key: string, value: T): Promise<void> {
  const sb = supabase();
  if (sb) {
    const { error } = await sb
      .from("kv_store")
      .upsert({ key, value, updated_at: new Date().toISOString() });
    if (error) throw new Error(`kv write failed: ${error.message}`);
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(
    path.join(DATA_DIR, `${key}.json`),
    JSON.stringify(value, null, 2),
    "utf8",
  );
}
