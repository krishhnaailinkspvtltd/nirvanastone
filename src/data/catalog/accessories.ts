import type { Product } from "@/lib/types";
import { CARE, mk } from "./shared";

/** Rings, crystal perfumes and everyday carry. */

const SUN_RINGS: [string, string, string][] = [
  ["citrine", "Citrine Sun Ring", "the merchant's stone in a sunburst setting"],
  ["pyrite", "Pyrite Sun Ring", "the wealth mineral radiating from the finger"],
  ["tiger-eye", "Tiger Eye Sun Ring", "grounded golden courage in the sun motif"],
];

const sunRings: Product[] = SUN_RINGS.map(([key, name, line], i) =>
  mk({
    id: `ac${String(i + 1).padStart(2, "0")}`,
    slug: `${key}-sun-ring`,
    name,
    category: "accessories",
    subcategory: "Sun Ring",
    description: `An adjustable sunburst ring holding a natural ${key.replace("-", " ")} cabochon — ${line}. One size fits most.`,
    benefits: [
      line[0].toUpperCase() + line.slice(1),
      "Natural stone cabochon in a tarnish-resistant setting",
      "Adjustable band — one size fits most",
    ],
    care: CARE.crystal,
    price: 449,
    mrp: 1199,
    purposes: ["wealth", "career"],
    planets: ["sun"],
    art: "ring",
  }),
);

const PERFUMES: [string, string, string][] = [
  ["dhan-yog", "Dhan Yog Crystal Perfume", "amber-oud warmth over a bed of real pyrite chips"],
  ["citrine", "Citrine Crystal Perfume", "citrus-neroli brightness charged on citrine"],
  ["rose-quartz", "Rose Quartz Crystal Perfume", "rose-musk softness resting on rose quartz"],
  ["tiger-eye", "Tiger Eye Crystal Perfume", "vetiver-leather confidence over tiger eye"],
];

const perfumes: Product[] = PERFUMES.map(([key, name, line], i) =>
  mk({
    id: `ac${String(i + 5).padStart(2, "0")}`,
    slug: `${key}-crystal-perfume`,
    name,
    category: "accessories",
    subcategory: "Crystal Perfume",
    description: `A fine-mist eau de parfum bottled over genuine crystal chips — ${line}. Wear the intention; the stones stay in the bottle, charging every spray.`,
    benefits: [
      line[0].toUpperCase() + line.slice(1),
      "Genuine crystal chips sealed in every bottle",
      "50 ml fine-mist spray, IFRA-compliant fragrance",
    ],
    care: CARE.perfume,
    price: 699,
    mrp: 1499,
    purposes: key === "rose-quartz" ? ["love"] : key === "tiger-eye" ? ["career"] : ["wealth"],
    art: "perfume",
  }),
);

const extras: Product[] = [
  mk({
    id: "ac09",
    slug: "pyrite-stud-ring",
    name: "Pyrite Stud Ring",
    category: "accessories",
    subcategory: "Ring",
    description:
      "A raw pyrite stud on a minimal adjustable band — the smallest possible daily dose of the wealth mineral.",
    benefits: [
      "Raw pyrite point in a minimal setting",
      "Adjustable band, unisex",
      "Stacks with the sun rings",
    ],
    care: CARE.crystal,
    price: 549,
    mrp: 1399,
    purposes: ["wealth"],
    planets: ["sun"],
    art: "ring",
  }),
  mk({
    id: "ac10",
    slug: "evil-eye-keychain",
    name: "Evil Eye Keychain",
    category: "accessories",
    subcategory: "Keychain",
    description:
      "The nazar bead on a sturdy keyring — protection for the keys, the bag, and whoever carries them.",
    benefits: [
      "The classic nazar charm in carry-everywhere form",
      "Glass evil-eye bead with steel hardware",
      "The under-₹300 gift that always lands",
    ],
    care: CARE.metal,
    price: 249,
    mrp: 599,
    purposes: ["protection"],
    art: "ring",
    stock: 80,
  }),
];

export const accessoryProducts: Product[] = [...sunRings, ...perfumes, ...extras];
