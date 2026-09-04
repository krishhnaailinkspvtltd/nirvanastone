import { site } from "@/config/site";

/**
 * Policy page content.
 * TODO(client): have these reviewed by a lawyer before launch — this is a
 * sensible starting draft, not legal advice.
 */
export interface Policy {
  slug: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}

export const policies: Policy[] = [
  {
    slug: "shipping",
    title: "Shipping Policy",
    updated: "2026-09-01",
    sections: [
      {
        heading: "Dispatch & delivery times",
        body: [
          "Orders are dispatched within 24–48 hours of confirmation (COD orders dispatch after WhatsApp confirmation). Delivery typically takes 3–7 working days depending on your pincode.",
          "Ring sizing and made-to-order settings add 1–2 working days before dispatch; we tell you on WhatsApp when that applies.",
        ],
      },
      {
        heading: "Shipping charges",
        body: [
          `Shipping is a flat ₹${site.shippingFee} and free on orders of ₹${site.freeShippingAbove} or more.`,
          "Cash on Delivery carries no extra fee, but COD orders must be confirmed on WhatsApp before we dispatch.",
        ],
      },
      {
        heading: "Tracking",
        body: [
          "Every dispatched order gets a courier tracking ID, visible on the Track Order page with your order ID and phone number — no account needed.",
        ],
      },
      {
        heading: "International shipping",
        body: [
          "The website currently ships within India only. For international orders, message us on WhatsApp and we'll arrange shipping and payment manually.",
        ],
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns & Replacement Policy",
    updated: "2026-09-01",
    sections: [
      {
        heading: "7-day easy replacement",
        body: [
          "If your item arrives damaged, defective, or isn't what you ordered, tell us within 7 days of delivery and we'll replace it. An unboxing video makes claims instant, but it isn't mandatory.",
          "For combos, each piece is covered individually — if one item is damaged, we replace that item, not the whole set.",
        ],
      },
      {
        heading: "Gemstone exchange",
        body: [
          "Remedial gemstone rings and pendants can be exchanged within 7 days if your astrologer advises against the stone after purchase. The stone must be unworn beyond trial and returned with its certificate.",
        ],
      },
      {
        heading: "What isn't returnable",
        body: [
          "Energised yantras and rudraksha that have been worn (for hygiene and ritual reasons) aren't returnable unless defective. Made-to-order and resized items are exchange-only.",
        ],
      },
      {
        heading: "Refunds",
        body: [
          "Where a replacement isn't possible, prepaid orders are refunded to the original payment method within 5–7 working days of us receiving the return. COD orders are refunded by UPI/bank transfer.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "2026-09-01",
    sections: [
      {
        heading: "What we collect",
        body: [
          "When you place an order: your name, phone number, delivery address, and optionally your email. When you use the AI guide: the answers and text you choose to share, used only to generate recommendations.",
          "We don't collect birth details unless you explicitly enter them, and we don't require an account to shop.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "To fulfil and deliver your order, to send order updates (including on WhatsApp), and to respond when you contact us. Payment card/UPI details are handled entirely by Razorpay — they never touch our servers.",
          "We do not sell or rent your personal information to anyone.",
        ],
      },
      {
        heading: "Retention & your rights",
        body: [
          "Order records are retained as required for accounting and tax law. You can ask us to correct or delete your personal data at any time by writing to " +
            site.supportEmail +
            ".",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    updated: "2026-09-01",
    sections: [
      {
        heading: "About our products",
        body: [
          "Our products are offered in keeping with traditional, cultural and spiritual beliefs. Descriptions state traditional associations — they are not promises of specific outcomes, and nothing on this website is medical, financial, or legal advice. Spiritual products complement professional care; they never replace it.",
        ],
      },
      {
        heading: "Pricing & orders",
        body: [
          "All prices are in Indian Rupees, inclusive of taxes. MRP comparisons reflect the maximum retail price printed for the product. We may cancel and fully refund any order affected by a clear pricing or stock error.",
          "COD orders require confirmation (typically on WhatsApp) before dispatch. Unconfirmed COD orders may be cancelled after 7 days.",
        ],
      },
      {
        heading: "Certificates",
        body: [
          "Certificates are issued by independent testing laboratories and speak to material authenticity (species, treatment, mukhi count) — not to astrological effect. Each certificate code is unique to a dispatched unit and verifiable on this website.",
        ],
      },
      {
        heading: "Jurisdiction",
        body: [
          `These terms are governed by the laws of India. Disputes are subject to the courts of ${site.address.split(",")[0]}.`,
        ],
      },
    ],
  },
];
