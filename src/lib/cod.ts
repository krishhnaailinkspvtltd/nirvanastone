import { site } from "@/config/site";

/** Pincode-serviceability + order-value gate for Cash on Delivery.
 *  The cap defaults to the code constant; callers with runtime settings
 *  (checkout API, checkout page) pass the admin-configured value. */
export function codEligible(
  pincode: string,
  orderValue: number,
  cap: number = site.codOrderCap,
) {
  const clean = pincode.replace(/\D/g, "");
  if (clean.length !== 6)
    return { ok: false, reason: "Enter a valid 6-digit pincode." };
  const serviceable = site.codPincodePrefixes.some((p) => clean.startsWith(p));
  if (!serviceable)
    return {
      ok: false,
      reason: "COD isn't serviceable at this pincode yet — prepaid works everywhere.",
    };
  if (orderValue > cap)
    return {
      ok: false,
      reason: `COD is available up to ₹${cap.toLocaleString("en-IN")}. Please pay online for this order.`,
    };
  return { ok: true, reason: "" };
}
