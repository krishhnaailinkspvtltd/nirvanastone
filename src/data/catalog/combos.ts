import type { Product } from "@/lib/types";
import { CARE, mk } from "./shared";

/** Curated combos beyond the three core sets. */

const C = (
  id: string,
  slug: string,
  name: string,
  subcategory: string,
  description: string,
  benefits: string[],
  price: number,
  mrp: number,
  comboIds: string[],
  extra: Partial<Parameters<typeof mk>[0]> = {},
) =>
  mk({
    id, slug, name,
    category: "combos",
    subcategory,
    description,
    benefits,
    care: CARE.crystal,
    price, mrp,
    comboIds,
    art: "combo",
    stock: 20,
    ...extra,
  });

export const comboProducts: Product[] = [
  C("cb01", "love-money-combo", "Love & Money Combo", "Love",
    "The two things everyone asks the guide about, boxed together: the Love Attraction bracelet for one intention, the Dhan Yog bracelet for the other.",
    ["Love Attraction Bracelet — rose & strawberry quartz", "Dhan Yog Bracelet — pyrite, citrine, tiger eye", "Gift-boxed pair at a set price"],
    1299, 3499, ["bs02", "bs01"], { purposes: ["love", "wealth"], bestseller: true }),
  C("cb02", "career-power-combo", "Career Power Combo", "Career",
    "Interview-to-promotion kit: tiger eye for the wrist, a certified 7 mukhi bead for the chain, citrine pyramid for the desk.",
    ["Tiger Eye Bracelet — grounded confidence daily", "7 Mukhi Rudraksha collector bead — obstacle clearing", "Citrine Pyramid — the desk anchor"],
    1799, 4599, ["p14", "rb07", "vp02"], { purposes: ["career", "wealth"] }),
  C("cb03", "super-money-combo", "Super Money Combo", "Wealth",
    "The maximal wealth stack: Dhan Yog bracelet on the wrist, pyrite tortoise on the counter, Kuber yantra in the drawer.",
    ["Dhan Yog Bracelet — the signature wealth trio", "Vastu Pyrite Tortoise — stability over the cashflow", "Kuber Yantra — the treasurer's plate"],
    1999, 5499, ["bs01", "vt01", "p23"], { purposes: ["wealth"], bestseller: true }),
  C("cb04", "education-success-combo", "Education Success Combo", "Career",
    "For students and exam-takers: the 4 mukhi bead of Brahma for learning, sphatik for cool clarity through long nights.",
    ["4 Mukhi Rudraksha bead — learning and memory", "Sphatik Bracelet — cool-headed clarity", "Boxed with an exam-day note that actually helps"],
    1299, 3299, ["rb04", "br05"], { purposes: ["career", "peace"] }),
  C("cb05", "couple-dhan-yog-combo", "Couple Dhan Yog Metal Combo", "Couple",
    "Matched metal Dhan Yog bracelets in his-and-hers finishes — building wealth is better as a team sport.",
    ["Two Metal Dhan Yog Bracelets — choose finishes at confirmation", "Office-friendly builds with genuine pyrite", "Anniversary-ready gift box"],
    1399, 3599, ["bs06"], { purposes: ["wealth", "love"] }),
  C("cb06", "navgraha-shanti-combo", "Navgraha Shanti Combo", "Protection",
    "When the chart is noisy everywhere: the nine-planet yantra for the shelf and the universal 5 mukhi mala for the practice.",
    ["Navgraha Yantra — all nine grahas on one plate", "5 Mukhi Rudraksha Mala — the universal daily wear", "The calm-everything-down set"],
    1699, 4299, ["p24", "p01"], { purposes: ["protection", "peace"] }),
  C("cb07", "vastu-shakti-combo", "Vastu Shakti Combo", "Vastu",
    "The office-warming set: seven horses in raw pyrite for the south wall, the pyrite tortoise for the desk that faces the door.",
    ["7 Horses on Raw Pyrite Frame — momentum on the wall", "Vastu Pyrite Tortoise — stability at the desk", "The new-office gift of this catalog"],
    3199, 7999, ["yn07", "vt01"], { purposes: ["career", "wealth"] }),
];
