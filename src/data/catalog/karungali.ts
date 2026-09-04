import type { Product } from "@/lib/types";
import { CARE, mk } from "./shared";

/** Karungali (South Indian ebony) — malas, bracelets and kavach pieces. */

const base = {
  category: "karungali" as const,
  care: CARE.wood,
  art: "mala",
};

export const karungaliProducts: Product[] = [
  mk({
    ...base,
    id: "kg01",
    slug: "karungali-bracelet-8mm",
    name: "Karungali Bracelet (8 mm)",
    subcategory: "Bracelet",
    art: "crystal",
    description:
      "Dense, matte-black karungali ebony beads on strong elastic — the southern tradition's everyday shield, now sized for the wrist.",
    benefits: [
      "Traditionally worn for protection from negativity and drishti",
      "Genuine heartwood ebony — sinks in water, unlike painted imitations",
      "8 mm beads, unisex fit",
    ],
    price: 649,
    mrp: 1699,
    purposes: ["protection"],
    planets: ["saturn"],
    bestseller: true,
  }),
  mk({
    ...base,
    id: "kg02",
    slug: "karungali-mala-silver-capped-54",
    name: "Silver-Capped Karungali Mala (54+1 beads)",
    subcategory: "Mala",
    description:
      "A 54+1 bead karungali mala with sterling-silver caps on each bead — the heirloom form of the southern protection mala.",
    benefits: [
      "The classic Tamil-tradition raksha mala in its premium finish",
      "Genuine ebony with hallmark-grade silver capping",
      "54+1 beads — the traditional half-mala count for wear",
    ],
    price: 1299,
    mrp: 3299,
    purposes: ["protection", "peace"],
    planets: ["saturn"],
    cert: true,
  }),
  mk({
    ...base,
    id: "kg03",
    slug: "karungali-mala-kids-6mm",
    name: "Kids' Karungali Mala (6 mm, 108+1 beads)",
    subcategory: "Mala",
    description:
      "A lighter 6 mm karungali mala sized for children — the mala grandmothers ask for, in a build small wrists and necks can actually wear.",
    benefits: [
      "Traditionally worn by children for protection from nazar",
      "Light 6 mm beads on soft, strong cord",
      "Genuine ebony, smoothed edge-free for daily wear",
    ],
    price: 749,
    mrp: 1899,
    purposes: ["protection"],
  }),
  mk({
    ...base,
    id: "kg04",
    slug: "divya-raksha-rudraksha-karungali-mala",
    name: "Divya Raksha Rudraksha & Karungali Mala",
    subcategory: "Mala",
    description:
      "Rudraksha and karungali alternating through a full 108-bead mala — the northern and southern protection traditions strung together.",
    benefits: [
      "Two protection traditions — rudraksha and ebony — in one strand",
      "Nepal 5 mukhi beads with genuine karungali",
      "Hand-knotted with a guru bead",
    ],
    price: 1499,
    mrp: 3699,
    purposes: ["protection", "peace"],
    planets: ["jupiter", "saturn"],
    cert: true,
    bestseller: true,
  }),
  mk({
    ...base,
    id: "kg05",
    slug: "mahadev-trishul-damru-karungali-kavach-bracelet",
    name: "Mahadev Trishul Damru Karungali Kavach Bracelet",
    subcategory: "Kavach",
    art: "crystal",
    description:
      "Karungali beads flanking steel trishul and damru charms — a wrist kavach in Mahadev's name for those who want the southern shield with Shaiva iconography.",
    benefits: [
      "Wearable kavach combining ebony's shield with Shiva's symbols",
      "Stainless charms that never tarnish",
      "Heavy-duty double-strung elastic",
    ],
    price: 999,
    mrp: 2499,
    purposes: ["protection"],
    planets: ["saturn"],
  }),
  mk({
    ...base,
    id: "kg06",
    slug: "karungali-murugan-vel-mala",
    name: "Karungali Murugan Vel Mala (54 beads)",
    subcategory: "Mala",
    description:
      "A karungali mala carrying the vel — Lord Murugan's spear — as its pendant, in the devotional style of Tamil Nadu's hill temples.",
    benefits: [
      "Murugan bhakti in the traditional Tamil form",
      "Vel pendant in tarnish-resistant alloy",
      "54-bead ebony strand, adjustable cord",
    ],
    price: 1199,
    mrp: 2999,
    purposes: ["protection", "career"],
    planets: ["mars"],
  }),
  mk({
    ...base,
    id: "kg07",
    slug: "om-bead-karungali-mala",
    name: "OM Bead Karungali Mala",
    subcategory: "Mala",
    description:
      "Matte ebony beads set off by engraved OM metal beads — quiet devotional wear that pairs with anything.",
    benefits: [
      "Ebony's protection with the OM's remembrance",
      "Engraved metal OM beads at intervals",
      "Adjustable length, unisex",
    ],
    price: 1299,
    mrp: 3299,
    purposes: ["peace", "protection"],
  }),
  mk({
    ...base,
    id: "kg08",
    slug: "karungali-copper-wire-mala",
    name: "Karungali Mala with Copper Wire (54+1 beads)",
    subcategory: "Mala",
    description:
      "Karungali beads hand-linked on copper wire rather than thread — the old artisan build that lasts decades and develops a living patina.",
    benefits: [
      "Copper-wire linking — the most durable traditional build",
      "Copper itself is prized in the tradition for conductivity of energy",
      "54+1 genuine ebony beads",
    ],
    price: 999,
    mrp: 2599,
    purposes: ["protection", "health"],
  }),
];
