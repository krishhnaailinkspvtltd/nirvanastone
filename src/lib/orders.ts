import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import type { Order } from "./types";

/**
 * Order persistence with two backends:
 *  - Supabase (production) when NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *    are set — table defined in supabase/schema.sql
 *  - Local JSON file (development fallback) at .data/orders.json so the full
 *    browse → cart → checkout → track flow works before Supabase is provisioned
 */

// On Vercel the deployment filesystem is read-only — only /tmp is writable,
// and it does not persist between invocations. Fine for demos; configure
// Supabase for real order persistence in production.
const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "nirvana-data")
  : path.join(process.cwd(), ".data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function readLocal(): Promise<Order[]> {
  try {
    const raw = await fs.readFile(ORDERS_FILE, "utf8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

async function writeLocal(orders: Order[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
}

export function newOrderId(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `NRV-${ymd}-${rand}`;
}

export async function saveOrder(order: Order): Promise<void> {
  const sb = supabase();
  if (sb) {
    const { error } = await sb.from("orders").upsert({
      id: order.id,
      user_id: order.user_id,
      items: order.items,
      subtotal: order.subtotal,
      discount: order.discount,
      promo_code: order.promo_code,
      shipping_fee: order.shipping_fee,
      total: order.total,
      payment_method: order.payment_method,
      payment_status: order.payment_status,
      order_status: order.order_status,
      shipping_address: order.shipping_address,
      tracking_id: order.tracking_id,
      cod_confirmed: order.cod_confirmed,
      razorpay_order_id: order.razorpay_order_id ?? null,
      created_at: order.created_at,
      updated_at: order.updated_at,
    });
    if (error) throw new Error(`Supabase order save failed: ${error.message}`);
    return;
  }
  const orders = await readLocal();
  const idx = orders.findIndex((o) => o.id === order.id);
  if (idx >= 0) orders[idx] = order;
  else orders.push(order);
  await writeLocal(orders);
}

export async function getOrder(id: string): Promise<Order | null> {
  const sb = supabase();
  if (sb) {
    const { data, error } = await sb.from("orders").select("*").eq("id", id).maybeSingle();
    if (error) throw new Error(`Supabase order read failed: ${error.message}`);
    return (data as Order | null) ?? null;
  }
  const orders = await readLocal();
  return orders.find((o) => o.id === id) ?? null;
}

/** Guest tracking: order id + phone must both match. */
export async function trackOrder(id: string, phone: string): Promise<Order | null> {
  const order = await getOrder(id.trim().toUpperCase());
  if (!order) return null;
  const clean = (s: string) => s.replace(/\D/g, "").slice(-10);
  if (clean(order.shipping_address.phone) !== clean(phone)) return null;
  return order;
}
