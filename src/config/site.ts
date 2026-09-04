/**
 * Single source of truth for brand identity.
 *
 * TODO(client) — replace every value marked [PLACEHOLDER] before launch:
 *   - name / legalName / domain  → confirmed brand ([CLIENT_BRAND_NAME], [DOMAIN])
 *   - whatsappNumber             → live business WhatsApp ([WHATSAPP_NUMBER])
 *   - colors                     → pull from client logo/packaging if they exist
 *     (palette lives in src/app/globals.css @theme block)
 */
export const site = {
  name: "Nirvana",
  tagline: "Rudraksha, gemstones & vastu — certified, energised, delivered",
  legalName: "Nirvana Wellness Pvt. Ltd.", // [PLACEHOLDER] confirm the registered entity name
  domain: "nirvana.example", // [PLACEHOLDER]
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsappNumber: "919999999999", // [PLACEHOLDER] country code + number, digits only
  supportEmail: "care@nirvana.example", // [PLACEHOLDER]
  address: "Jaipur, Rajasthan, India", // [PLACEHOLDER]
  /** COD is offered only up to this order value (₹). */
  codOrderCap: 5000,
  /** Flat shipping fee (₹); free above the threshold. */
  shippingFee: 79,
  freeShippingAbove: 999,
  /** First two digits of serviceable pincodes for COD. Broad by default —
   * tighten to the courier partner's actual COD coverage before launch. */
  codPincodePrefixes: [
    "11", "12", "13", "14", "15", "16", "17", "18", "19", // North
    "20", "21", "22", "23", "24", "25", "26", "28",
    "30", "31", "32", "33", "34", "36", "38", "39",
    "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
    "50", "51", "52", "53", "56", "57", "58", "59",
    "60", "62", "63", "64", "68", "69",
    "70", "71", "72", "73", "74", "75", "76", "78",
    "80", "81", "82", "83", "84",
  ],
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${site.whatsappNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
