import type { Product } from "@/lib/types";
import { CARE, mk } from "./shared";

/** Natural-stone anklets. */

const A = (
  id: string,
  slug: string,
  name: string,
  description: string,
  benefits: string[],
  price: number,
  mrp: number,
  extra: Partial<Parameters<typeof mk>[0]> = {},
) =>
  mk({
    id, slug, name,
    category: "anklets",
    subcategory: "Anklet",
    description,
    benefits,
    care: CARE.crystal,
    price, mrp,
    art: "anklet",
    ...extra,
  });

export const ankletProducts: Product[] = [
  A("an01", "raw-pyrite-anklet", "Raw Pyrite Anklet",
    "Raw pyrite chips on a durable anklet cord — the wealth mineral worn at the step, in the belief that fortune follows the walker.",
    ["The Dhan Yog intention, anklet form", "Raw chips — brighter and heavier than beads", "Adjustable 22–26 cm fit"],
    599, 1499, { purposes: ["wealth"], planets: ["sun"], bestseller: true }),
  A("an02", "tiger-eye-anklet", "Tiger Eye Anklet",
    "Golden tiger eye beads at the ankle — grounded courage that travels with every step.",
    ["Traditionally worn for confidence and protection", "Natural chatoyant tiger eye, 6 mm", "Strong stretch cord with extension"],
    549, 1399, { purposes: ["career", "protection"], zodiac: ["leo"], planets: ["sun"] }),
  A("an03", "lapis-lazuli-anklet", "Lapis Lazuli Anklet",
    "Deep-blue lapis at the ankle — calm, clarity and a colour that carries any outfit.",
    ["Traditionally associated with wisdom and calm expression", "Natural lapis with golden pyrite flecks", "Adjustable fit"],
    599, 1499, { purposes: ["peace", "career"], zodiac: ["libra"], planets: ["saturn"] }),
  A("an04", "dhan-yog-anklet", "Dhan Yog Anklet",
    "The signature pyrite-citrine-tiger eye trio sized for the ankle — sold single or as a pair.",
    ["The store's signature wealth trio, anklet form", "Choose single or pair", "Adjustable 22–26 cm fit"],
    649, 1699, {
      purposes: ["wealth", "career"],
      variants: [
        { id: "an04-v1", variant_name: "Single", price_delta: 0, stock_qty: 35 },
        { id: "an04-v2", variant_name: "Pair (set of 2)", price_delta: 500, stock_qty: 20 },
      ],
    }),
  A("an05", "love-money-anklet", "Love & Money Anklet",
    "Rose quartz and pyrite alternating on one cord — the two most-asked-for intentions, one anklet.",
    ["Love and wealth stones in a single strand", "Natural rose quartz and Peruvian pyrite", "Adjustable fit with charm drop"],
    649, 1699, { purposes: ["love", "wealth"], planets: ["venus"] }),
];
