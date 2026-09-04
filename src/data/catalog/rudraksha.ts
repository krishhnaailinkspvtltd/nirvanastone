import type { Planet, Product, Purpose, Zodiac } from "@/lib/types";
import { CARE, mk } from "./shared";

/**
 * Full Nepal-origin rudraksha range: collector beads 1–14 mukhi plus the
 * special formations, bracelets, malas and pendants.
 */

interface Mukhi {
  key: string;
  label: string;
  deity: string;
  planets: Planet[];
  purposes: Purpose[];
  zodiac: Zodiac[];
  line: string;
  benefit: string;
  price: number;
  mrp: number;
}

const MUKHIS: Mukhi[] = [
  { key: "1-mukhi", label: "1 Mukhi (Indian, Kaju Shape)", deity: "Lord Shiva", planets: ["sun"], purposes: ["career", "peace"], zodiac: ["leo"], line: "the rarest and most focused of the family, associated with clarity, leadership and one-pointed devotion", benefit: "Traditionally associated with focus, confidence and detachment from the unnecessary", price: 1099, mrp: 2999 },
  { key: "2-mukhi", label: "2 Mukhi", deity: "Ardhanarishvara", planets: ["moon"], purposes: ["love", "peace"], zodiac: ["cancer"], line: "the bead of union — Shiva and Shakti on one seed, worn for harmony in every partnership", benefit: "Traditionally associated with unity, empathy and harmonious relationships", price: 749, mrp: 1999 },
  { key: "3-mukhi", label: "3 Mukhi", deity: "Agni Dev", planets: ["mars"], purposes: ["health", "career"], zodiac: ["aries"], line: "the fire bead, worn to burn through old guilt and hesitation and start fresh", benefit: "Traditionally associated with energy, self-confidence and release from past burdens", price: 849, mrp: 2199 },
  { key: "4-mukhi", label: "4 Mukhi", deity: "Lord Brahma", planets: ["mercury"], purposes: ["career"], zodiac: ["gemini", "virgo"], line: "the student's bead, connected with learning, memory and clear speech", benefit: "Traditionally associated with learning, communication and creative thinking", price: 849, mrp: 2199 },
  { key: "5-mukhi", label: "5 Mukhi", deity: "Kalagni Rudra", planets: ["jupiter"], purposes: ["peace", "health"], zodiac: ["sagittarius", "pisces"], line: "the universal bead — safe for everyone, the traditional starting point for daily wear and japa", benefit: "Traditionally associated with general wellbeing, calm focus and steady practice", price: 499, mrp: 1299 },
  { key: "6-mukhi", label: "6 Mukhi", deity: "Lord Kartikeya", planets: ["venus"], purposes: ["love", "career"], zodiac: ["taurus", "libra"], line: "the bead of willpower and charm, worn for grounded confidence in front of people", benefit: "Traditionally associated with willpower, charisma and emotional steadiness", price: 999, mrp: 2499 },
  { key: "7-mukhi", label: "7 Mukhi", deity: "Goddess Mahalakshmi", planets: ["saturn"], purposes: ["wealth"], zodiac: ["capricorn", "aquarius"], line: "Mahalakshmi's bead, the classic choice for those working through financial obstacles", benefit: "Traditionally associated with prosperity and the removal of financial obstacles", price: 1199, mrp: 2999 },
  { key: "8-mukhi", label: "8 Mukhi", deity: "Lord Ganesha", planets: ["rahu"], purposes: ["career", "protection"], zodiac: [], line: "Ganesha's bead, kept by those beginning big ventures — the remover of obstacles at the start of things", benefit: "Traditionally associated with removing obstacles and steadying Rahu's influence", price: 2499, mrp: 5999 },
  { key: "9-mukhi", label: "9 Mukhi", deity: "Goddess Durga", planets: ["ketu"], purposes: ["protection"], zodiac: ["scorpio"], line: "Durga's bead of fearlessness, traditionally worn by those facing hostility or fear", benefit: "Traditionally associated with courage, fearlessness and shakti", price: 2999, mrp: 6999 },
  { key: "10-mukhi", label: "10 Mukhi", deity: "Lord Vishnu", planets: [], purposes: ["protection", "peace"], zodiac: [], line: "Vishnu's bead, regarded as a shield against negative energies from all ten directions", benefit: "Traditionally associated with all-round protection and peace of mind", price: 3499, mrp: 7999 },
  { key: "11-mukhi", label: "11 Mukhi", deity: "Lord Hanuman", planets: ["mars"], purposes: ["protection", "career"], zodiac: [], line: "the Ekadash Rudra bead, worn for Hanuman-like resolve, discipline and kept vows", benefit: "Traditionally associated with courage, discipline and success in undertakings", price: 3999, mrp: 8999 },
  { key: "12-mukhi", label: "12 Mukhi", deity: "Lord Surya", planets: ["sun"], purposes: ["career", "wealth"], zodiac: ["leo"], line: "the Sun's bead, chosen by leaders and administrators for radiance and authority", benefit: "Traditionally associated with leadership, vitality and name-and-fame", price: 4499, mrp: 9999 },
  { key: "13-mukhi", label: "13 Mukhi", deity: "Kamadeva & Indra", planets: ["venus"], purposes: ["love", "wealth"], zodiac: [], line: "the bead of charisma and attainment, associated with attraction and fulfilled desires", benefit: "Traditionally associated with charisma, persuasion and material comfort", price: 5999, mrp: 12999 },
  { key: "14-mukhi", label: "14 Mukhi (Deva Mani)", deity: "Lord Hanuman & Shiva", planets: ["saturn"], purposes: ["protection", "peace"], zodiac: [], line: "the Deva Mani — the jewel of the gods, worn on the forehead or throat by serious practitioners for intuition", benefit: "Traditionally associated with intuition, sound judgement and protection from misfortune", price: 9999, mrp: 19999 },
  { key: "nirakar", label: "Nirakar (0 Mukhi)", deity: "Formless Shiva", planets: [], purposes: ["peace"], zodiac: [], line: "the formless bead without a single mukhi line — prized by meditators as a symbol of the attributeless", benefit: "Traditionally kept for deep meditation and detachment", price: 1499, mrp: 3499 },
  { key: "ganesh-mukhi", label: "Ganesh Mukhi", deity: "Lord Ganesha", planets: [], purposes: ["career", "protection"], zodiac: [], line: "a natural trunk-like formation on the bead's body, revered as Ganesha's own mark", benefit: "Traditionally associated with removing obstacles before new beginnings", price: 1999, mrp: 4499 },
  { key: "gauri-shankar", label: "Gauri Shankar", deity: "Shiva & Parvati", planets: ["moon"], purposes: ["love"], zodiac: [], line: "two beads naturally joined as one — the marriage bead, kept in homes for harmony between partners", benefit: "Traditionally associated with marital harmony and family unity", price: 4999, mrp: 10999 },
  { key: "garbh-gauri", label: "Garbh Gauri", deity: "Gauri with Ganesha", planets: ["moon"], purposes: ["love", "health"], zodiac: [], line: "a smaller bead nestled against a larger one — traditionally gifted to mothers and those praying for children", benefit: "Traditionally associated with motherhood and the mother-child bond", price: 3499, mrp: 7499 },
];

const beadDescription = (m: Mukhi) =>
  `A collector-grade ${m.label} rudraksha (17–22 mm unless noted), ${m.line}. Dedicated to ${m.deity}, X-ray verified for natural mukhi formation, and supplied with thread and a wearing guide.`;

const beads: Product[] = MUKHIS.map((m, i) =>
  mk({
    id: `rb${String(i + 1).padStart(2, "0")}`,
    slug: `${m.key}-rudraksha-bead`,
    name: `${m.label} Rudraksha — Nepal Collector Bead`.replace("(Indian, Kaju Shape) Rudraksha — Nepal Collector Bead", "Rudraksha (Indian, Kaju Shape)"),
    category: "rudraksha",
    subcategory: m.label,
    description: beadDescription(m),
    benefits: [
      m.benefit,
      `Dedicated to ${m.deity}${m.planets.length ? ` and linked to ${m.planets[0][0].toUpperCase() + m.planets[0].slice(1)} in Vedic astrology` : ""}`,
      "X-ray tested, individually photographed and certified before dispatch",
    ],
    care: CARE.rudraksha,
    price: m.price,
    mrp: m.mrp,
    purposes: m.purposes,
    zodiac: m.zodiac,
    planets: m.planets,
    cert: true,
    stock: m.price > 4000 ? 6 : 25,
    art: "rudraksha",
    bestseller: m.key === "5-mukhi" || m.key === "7-mukhi",
  }),
);

const pieces: Product[] = [
  mk({
    id: "rk01",
    slug: "5-mukhi-rudraksha-bracelet",
    name: "5 Mukhi Rudraksha Bracelet",
    category: "rudraksha",
    subcategory: "5 Mukhi",
    description:
      "Ten five-faced Nepal rudraksha beads on strong elastic — the everyday bracelet of the tradition, wearable by everyone without consultation.",
    benefits: [
      "Traditionally associated with calm, clarity and steady daily practice",
      "Linked to Jupiter (Brihaspati) in Vedic astrology",
      "Nepal-origin beads, mukhi lines inspected by hand",
    ],
    care: CARE.rudraksha,
    price: 599,
    mrp: 1499,
    purposes: ["peace", "health"],
    zodiac: ["sagittarius", "pisces"],
    planets: ["jupiter"],
    cert: true,
    art: "rudraksha",
    variants: [
      { id: "rk01-v1", variant_name: "8 mm beads", price_delta: 0, stock_qty: 50 },
      { id: "rk01-v2", variant_name: "10 mm beads", price_delta: 150, stock_qty: 30 },
    ],
    bestseller: true,
  }),
  mk({
    id: "rk02",
    slug: "dhan-rudraksha-bracelet",
    name: "Dhan Rudraksha Bracelet (7 Mukhi + Pyrite)",
    category: "rudraksha",
    subcategory: "7 Mukhi",
    description:
      "Mahalakshmi's seven mukhi rudraksha alternating with golden pyrite — the tradition's wealth bead paired with the merchant's mineral on one wrist.",
    benefits: [
      "Pairs the 7 mukhi's prosperity association with pyrite's money-magnet reputation",
      "Linked to Saturn (Shani) in Vedic astrology",
      "Nepal-origin rudraksha with natural Peruvian pyrite",
    ],
    care: CARE.rudraksha,
    price: 899,
    mrp: 2299,
    purposes: ["wealth", "career"],
    planets: ["saturn"],
    cert: true,
    art: "rudraksha",
    bestseller: true,
  }),
  mk({
    id: "rk03",
    slug: "trishul-damru-rudraksha-kavach-bracelet",
    name: "Mahadev Trishul Damru Rudraksha Kavach Bracelet",
    category: "rudraksha",
    subcategory: "Kavach",
    description:
      "A protection kavach for the wrist: five mukhi rudraksha with karungali spacers and steel trishul-damru charms of Mahadev. The piece we recommend for daily-commute protection.",
    benefits: [
      "A wearable kavach in the Shaiva tradition — protection on the move",
      "Rudraksha and genuine karungali ebony on heavy-duty elastic",
      "Stainless trishul and damru charms that don't tarnish",
    ],
    care: CARE.rudraksha,
    price: 999,
    mrp: 2499,
    purposes: ["protection"],
    planets: ["saturn"],
    art: "rudraksha",
  }),
  mk({
    id: "rk04",
    slug: "7-mukhi-rudraksha-mala-108",
    name: "7 Mukhi Rudraksha Mala (108 beads)",
    category: "rudraksha",
    subcategory: "7 Mukhi",
    description:
      "A full japa mala of 108 seven-faced beads for those whose practice centres on Mahalakshmi — hand-knotted, with a guru bead and cotton tassel.",
    benefits: [
      "Traditionally associated with prosperity and steady fortune",
      "Linked to Saturn (Shani) in Vedic astrology",
      "Hand-knotted between beads so a break never scatters the mala",
    ],
    care: CARE.rudraksha,
    price: 2499,
    mrp: 5999,
    purposes: ["wealth", "peace"],
    planets: ["saturn"],
    cert: true,
    art: "mala",
  }),
  mk({
    id: "rk05",
    slug: "shiv-rudraksha-mala-trishul-pendant",
    name: "Shiv Rudraksha Mala with Trishul Pendant",
    category: "rudraksha",
    subcategory: "Shiv Mala",
    description:
      "Five mukhi rudraksha mala carrying a trishul-and-damru pendant of Mahadev — devotional wear for the neck, sized to sit at the chest.",
    benefits: [
      "Daily-wear devotional mala in the Shaiva tradition",
      "Nepal-origin 5 mukhi beads with an antiqued trishul pendant",
      "Adjustable cord fits all sizes",
    ],
    care: CARE.rudraksha,
    price: 1299,
    mrp: 3299,
    purposes: ["protection", "peace"],
    planets: ["jupiter"],
    art: "mala",
  }),
  mk({
    id: "rk06",
    slug: "om-bead-rudraksha-mala",
    name: "OM Bead Rudraksha Mala",
    category: "rudraksha",
    subcategory: "Shiv Mala",
    description:
      "Rudraksha mala punctuated with engraved OM metal beads — the sound of the beginning, carried through the day.",
    benefits: [
      "Rudraksha and engraved OM beads in one strand",
      "Traditionally worn for calm and remembrance through the workday",
      "Adjustable length, unisex",
    ],
    care: CARE.rudraksha,
    price: 1199,
    mrp: 2999,
    purposes: ["peace"],
    planets: ["jupiter"],
    art: "mala",
  }),
  mk({
    id: "rk07",
    slug: "1-14-mukhi-siddha-rudraksha-mala",
    name: "1–14 Mukhi Siddha Rudraksha Mala (Collector)",
    category: "rudraksha",
    subcategory: "Collector",
    description:
      "Every mukhi from one to fourteen strung in a single siddha mala with five mukhi spacer beads — the complete rudraksha family worn together. Each collector bead is individually certified.",
    benefits: [
      "All fourteen mukhis in one energised mala — the tradition's complete set",
      "Each collector bead X-ray verified and listed on the certificate",
      "The definitive piece for serious practitioners",
    ],
    care: CARE.rudraksha,
    price: 24999,
    mrp: 49999,
    purposes: ["protection", "peace", "wealth"],
    cert: true,
    stock: 3,
    art: "mala",
  }),
  mk({
    id: "rk08",
    slug: "adiyogi-7-mukhi-pendant",
    name: "Adiyogi 7 Mukhi Rudraksha Pendant",
    category: "rudraksha",
    subcategory: "Pendant",
    description:
      "A certified seven mukhi bead capped below an Adiyogi Shiva face pendant — Mahalakshmi's bead under Mahadev's gaze.",
    benefits: [
      "Traditionally associated with prosperity and removal of financial obstacles",
      "Antiqued Adiyogi cap with a certified Nepal 7 mukhi bead",
      "Ships on an adjustable black cord",
    ],
    care: CARE.rudraksha,
    price: 1099,
    mrp: 2799,
    purposes: ["wealth", "protection"],
    planets: ["saturn"],
    cert: true,
    art: "pendant",
  }),
  mk({
    id: "rk09",
    slug: "hanuman-gada-rudraksha-pendant",
    name: "Rudraksha Hanuman Gada Pendant",
    category: "rudraksha",
    subcategory: "Pendant",
    description:
      "A five mukhi rudraksha set into a gada (mace) pendant of Lord Hanuman — strength you can wear, in the bhakti tradition.",
    benefits: [
      "Traditionally associated with strength, discipline and fearlessness",
      "Gada-form cap in tarnish-resistant alloy with genuine rudraksha",
      "Adjustable cord, unisex",
    ],
    care: CARE.rudraksha,
    price: 1299,
    mrp: 3299,
    purposes: ["protection", "career"],
    planets: ["mars"],
    art: "pendant",
  }),
];

export const rudrakshaProducts: Product[] = [...beads, ...pieces];
