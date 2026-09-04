import { site } from "@/config/site";

/** Pincode-serviceability + order-value gate for Cash on Delivery. */
export function codEligible(pincode: string, orderValue: number) {
  const clean = pincode.replace(/\D/g, "");
  if (clean.length !== 6)
    return { ok: false, reason: "Enter a valid 6-digit pincode." };
  const serviceable = site.codPincodePrefixes.some((p) => clean.startsWith(p));
  if (!serviceable)
    return {
      ok: false,
      reason: "COD isn't serviceable at this pincode yet — prepaid works everywhere.",
    };
  if (orderValue > site.codOrderCap)
    return {
      ok: false,
      reason: `COD is available up to ₹${site.codOrderCap.toLocaleString("en-IN")}. Please pay online for this order.`,
    };
  return { ok: true, reason: "" };
}
