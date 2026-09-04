export interface Promo {
  code: string;
  description: string;
  type: "percent" | "flat";
  value: number;
  minSubtotal: number;
  maxDiscount?: number;
}

/** TODO(client): manage live promo codes in Supabase/admin in Phase 3. */
export const promos: Promo[] = [
  {
    code: "WELCOME10",
    description: "10% off your first order",
    type: "percent",
    value: 10,
    minSubtotal: 499,
    maxDiscount: 500,
  },
  {
    code: "SHUBH100",
    description: "Flat ₹100 off orders above ₹999",
    type: "flat",
    value: 100,
    minSubtotal: 999,
  },
];

export function computeDiscount(
  code: string,
  subtotal: number,
  promoList: Promo[] = promos,
) {
  const promo = promoList.find((p) => p.code === code.trim().toUpperCase());
  if (!promo) return { ok: false as const, error: "That code isn't valid." };
  if (subtotal < promo.minSubtotal)
    return {
      ok: false as const,
      error: `This code needs a minimum order of ₹${promo.minSubtotal}.`,
    };
  const raw =
    promo.type === "percent" ? Math.round((subtotal * promo.value) / 100) : promo.value;
  const discount = Math.min(raw, promo.maxDiscount ?? raw, subtotal);
  return { ok: true as const, promo, discount };
}
