import "server-only";
import { site } from "@/config/site";
import { promos as seedPromos, type Promo } from "./promos";
import { getKV, setKV } from "./kv";

/** Runtime store settings, editable in /admin — code defaults until saved. */
export interface StoreSettings {
  shippingFee: number;
  freeShippingAbove: number;
  codOrderCap: number;
  promos: Promo[];
}

const DEFAULTS: StoreSettings = {
  shippingFee: site.shippingFee,
  freeShippingAbove: site.freeShippingAbove,
  codOrderCap: site.codOrderCap,
  promos: seedPromos,
};

export async function getSettings(): Promise<StoreSettings> {
  const saved = await getKV<Partial<StoreSettings>>("settings");
  return { ...DEFAULTS, ...saved, promos: saved?.promos ?? DEFAULTS.promos };
}

export async function saveSettings(next: StoreSettings): Promise<void> {
  await setKV("settings", next);
}
