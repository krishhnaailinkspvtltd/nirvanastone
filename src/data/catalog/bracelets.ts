import type { Planet, Product, Purpose, Zodiac } from "@/lib/types";
import { CARE, mk } from "./shared";

/** Crystal, metal and signature bracelets — the widest family in the store. */

interface Stone {
  key: string;
  label: string;
  purposes: Purpose[];
  zodiac: Zodiac[];
  planets: Planet[];
  line: string;
  benefit: string;
  price: number;
  mrp: number;
  bestseller?: boolean;
}

const STONES: Stone[] = [
  { key: "lapis-lazuli", label: "Lapis Lazuli", purposes: ["career", "peace"], zodiac: ["libra"], planets: ["saturn"], line: "the deep-blue stone of truth and clear speech, beloved of thinkers and speakers", benefit: "Traditionally associated with wisdom, honest expression and mental clarity", price: 699, mrp: 1899 },
  { key: "turquoise", label: "Turquoise", purposes: ["protection", "health"], zodiac: ["sagittarius"], planets: ["jupiter"], line: "the traveller's stone, carried for safe journeys and calm nerves for millennia", benefit: "Traditionally associated with protection in travel and general wellbeing", price: 799, mrp: 1999 },
  { key: "green-aventurine", label: "Green Aventurine", purposes: ["wealth", "love"], zodiac: ["taurus"], planets: ["mercury"], line: "the stone of opportunity — the classic pick before interviews, bets and new ventures", benefit: "Traditionally associated with luck, opportunity and an open heart", price: 599, mrp: 1599 },
  { key: "black-tourmaline", label: "Black Tourmaline", purposes: ["protection"], zodiac: ["capricorn"], planets: ["saturn"], line: "the heaviest-duty protection stone in the crystal tradition, worn like armour", benefit: "Traditionally used to ground and shield against negative energy", price: 699, mrp: 1799 },
  { key: "sphatik-clear-quartz", label: "Sphatik (Clear Quartz)", purposes: ["peace", "health"], zodiac: [], planets: ["venus"], line: "the sphatik of the Indian tradition and the 'master healer' of the crystal one — clarity, amplification, cooling calm", benefit: "Traditionally associated with clarity, cooling calm and amplifying intention", price: 549, mrp: 1499 },
  { key: "selenite", label: "Selenite", purposes: ["peace"], zodiac: ["cancer"], planets: ["moon"], line: "the moon-white cleansing stone practitioners use to clear other crystals — and themselves", benefit: "Traditionally used for cleansing, calm and light-filled spaces", price: 649, mrp: 1699 },
  { key: "moonstone", label: "Moonstone", purposes: ["love", "peace"], zodiac: ["cancer"], planets: ["moon"], line: "the Moon's own shimmer, worn for emotional balance and new beginnings", benefit: "Traditionally associated with emotional balance and intuition", price: 749, mrp: 1899 },
  { key: "sunstone", label: "Sunstone", purposes: ["career"], zodiac: ["leo"], planets: ["sun"], line: "glittering with the Sun's spark, the stone of optimism and visible confidence", benefit: "Traditionally associated with optimism, leadership and vitality", price: 699, mrp: 1799 },
  { key: "red-jasper", label: "Red Jasper", purposes: ["health", "protection"], zodiac: ["aries"], planets: ["mars"], line: "the grounding stone of endurance, favoured by athletes and anyone rebuilding strength", benefit: "Traditionally associated with stamina, grounding and steady courage", price: 599, mrp: 1599 },
  { key: "carnelian", label: "Carnelian", purposes: ["career", "love"], zodiac: ["virgo"], planets: ["mars"], line: "the artist's ember — warmth, boldness and creative fire on the wrist", benefit: "Traditionally associated with creativity, motivation and bold action", price: 599, mrp: 1599 },
  { key: "garnet", label: "Garnet", purposes: ["love", "health"], zodiac: ["capricorn"], planets: ["mars"], line: "the deep-red stone of devotion and revitalised passion", benefit: "Traditionally associated with passion, loyalty and renewed energy", price: 749, mrp: 1899 },
  { key: "howlite", label: "Howlite", purposes: ["peace", "health"], zodiac: [], planets: ["moon"], line: "the pillow-soft calming stone, reached for by overthinkers at bedtime", benefit: "Traditionally used for calm, patience and restful sleep", price: 549, mrp: 1449 },
];

const stoneBracelets: Product[] = STONES.map((s, i) =>
  mk({
    id: `br${String(i + 1).padStart(2, "0")}`,
    slug: `${s.key}-bracelet`,
    name: `${s.label} Bracelet`,
    category: "bracelets",
    subcategory: s.label,
    description: `Natural ${s.label.toLowerCase()} beads on double-strung elastic — ${s.line}.`,
    benefits: [
      s.benefit,
      "Natural stone — slight colour variation bead to bead, as real crystal should have",
      "8 mm beads, fits wrists 15–19 cm",
    ],
    care: CARE.crystal,
    price: s.price,
    mrp: s.mrp,
    purposes: s.purposes,
    zodiac: s.zodiac,
    planets: s.planets,
    art: "crystal",
    variants: [
      { id: `br${String(i + 1).padStart(2, "0")}-v1`, variant_name: "8 mm beads", price_delta: 0, stock_qty: 40 },
      { id: `br${String(i + 1).padStart(2, "0")}-v2`, variant_name: "6 mm beads (slim)", price_delta: 0, stock_qty: 25 },
    ],
    bestseller: s.bestseller,
  }),
);

const signature: Product[] = [
  mk({
    id: "bs01",
    slug: "dhan-yog-bracelet",
    name: "Dhan Yog Bracelet",
    category: "bracelets",
    subcategory: "Signature",
    description:
      "Our signature wealth combination: pyrite, citrine and tiger eye in one band — the merchant's mineral, the merchant's stone and grounded confidence to act on both.",
    benefits: [
      "The three classic wealth stones of the trade in one bracelet",
      "Lab-certified natural stones, 8 mm",
      "The single most gifted piece in the store",
    ],
    care: CARE.crystal,
    price: 899,
    mrp: 2499,
    purposes: ["wealth", "career"],
    planets: ["jupiter", "sun"],
    cert: true,
    art: "crystal",
    bestseller: true,
  }),
  mk({
    id: "bs02",
    slug: "love-attraction-bracelet",
    name: "Love Attraction Bracelet",
    category: "bracelets",
    subcategory: "Signature",
    description:
      "Rose quartz with strawberry quartz chips — the heart-stone pairing practitioners recommend for self-love first and companionship after.",
    benefits: [
      "The classic heart-chakra pairing in crystal practice",
      "Natural rose and strawberry quartz",
      "Gift-boxed with an intention card",
    ],
    care: CARE.crystal,
    price: 699,
    mrp: 1899,
    purposes: ["love"],
    zodiac: ["taurus", "libra"],
    planets: ["venus"],
    art: "crystal",
    bestseller: true,
  }),
  mk({
    id: "bs03",
    slug: "money-maker-chips-bracelet",
    name: "Money Maker Chips Bracelet",
    category: "bracelets",
    subcategory: "Signature",
    description:
      "Raw citrine chips packed dense on elastic — more stone per wrist than a bead build, at a starter price.",
    benefits: [
      "Maximum natural citrine at the entry price point",
      "Raw-chip build — every bracelet unique",
      "Pairs with the pyrite bracelet for the classic wealth stack",
    ],
    care: CARE.crystal,
    price: 649,
    mrp: 1699,
    purposes: ["wealth"],
    planets: ["jupiter"],
    art: "crystal",
  }),
  mk({
    id: "bs04",
    slug: "raw-pyrite-bracelet",
    name: "Raw Pyrite Nugget Bracelet",
    category: "bracelets",
    subcategory: "Pyrite",
    description:
      "Unpolished pyrite nuggets straight from the Peruvian mines, drilled and strung raw — the wealth mineral in its most honest form.",
    benefits: [
      "Raw, unpolished pyrite — heavier and brighter than tumbled beads",
      "Popular in practice for attracting wealth and shielding ambition",
      "Each nugget unique; no two bracelets match",
    ],
    care: CARE.crystal,
    price: 799,
    mrp: 2199,
    purposes: ["wealth", "career"],
    planets: ["sun"],
    art: "crystal",
    variants: [
      { id: "bs04-v1", variant_name: "Unisex 8 mm", price_delta: 0, stock_qty: 45 },
      { id: "bs04-v2", variant_name: "Women 6 mm", price_delta: 0, stock_qty: 30 },
    ],
    bestseller: true,
  }),
  mk({
    id: "bs05",
    slug: "evil-eye-hamsa-bracelet",
    name: "Evil Eye Hamsa Bracelet",
    category: "bracelets",
    subcategory: "Protection",
    description:
      "The hamsa hand and evil-eye charm on a black-bead band — two of the world's oldest protection symbols, worn together.",
    benefits: [
      "Hamsa and nazar charms in one protective band",
      "Black obsidian beads ground the symbolism in stone",
      "Rhodium-plated charms resist tarnish",
    ],
    care: CARE.crystal,
    price: 499,
    mrp: 1299,
    purposes: ["protection"],
    art: "crystal",
  }),
  mk({
    id: "bs06",
    slug: "metal-dhan-yog-bracelet",
    name: "Metal Dhan Yog Bracelet",
    category: "bracelets",
    subcategory: "Metal",
    description:
      "The Dhan Yog intention in a sleek metal cuff with a single pyrite accent — for wrists that live in office dress codes.",
    benefits: [
      "Office-friendly metal build with a genuine pyrite centre",
      "Choose gold, silver or black finish",
      "Water-safe plating, adjustable fit",
    ],
    care: CARE.metal,
    price: 799,
    mrp: 1999,
    purposes: ["wealth", "career"],
    art: "crystal",
    variants: [
      { id: "bs06-v1", variant_name: "Gold finish", price_delta: 0, stock_qty: 30 },
      { id: "bs06-v2", variant_name: "Silver finish", price_delta: 0, stock_qty: 30 },
      { id: "bs06-v3", variant_name: "Matte black", price_delta: 0, stock_qty: 30 },
    ],
  }),
  mk({
    id: "bs07",
    slug: "metal-rudraksha-karungali-bracelet",
    name: "Metal Rudraksha & Karungali Bracelet",
    category: "bracelets",
    subcategory: "Metal",
    description:
      "Rudraksha and karungali beads on an adjustable metal-accent band — tradition, dressed for the workday.",
    benefits: [
      "Genuine rudraksha and ebony with modern metal detailing",
      "Choose gold, silver or black hardware",
      "Adjustable slider fit",
    ],
    care: CARE.wood,
    price: 849,
    mrp: 2199,
    purposes: ["protection", "peace"],
    art: "crystal",
    variants: [
      { id: "bs07-v1", variant_name: "Gold hardware", price_delta: 0, stock_qty: 25 },
      { id: "bs07-v2", variant_name: "Silver hardware", price_delta: 0, stock_qty: 25 },
      { id: "bs07-v3", variant_name: "Black hardware", price_delta: 0, stock_qty: 25 },
    ],
  }),
  mk({
    id: "bs08",
    slug: "love-money-couple-bracelets",
    name: "Love & Money Couple Bracelets (Pair)",
    category: "bracelets",
    subcategory: "Couple",
    description:
      "A matched pair — rose quartz for one wrist, pyrite-citrine for the other — the gift couples actually share instead of argue over.",
    benefits: [
      "Two full bracelets: Love Attraction + Dhan Yog intentions",
      "His-and-hers sizing in the box",
      "The anniversary gift of this catalog",
    ],
    care: CARE.crystal,
    price: 999,
    mrp: 2599,
    purposes: ["love", "wealth"],
    planets: ["venus"],
    art: "crystal",
    bestseller: true,
  }),
  mk({
    id: "bs09",
    slug: "nazar-kavach-band",
    name: "Nazar Kavach Band",
    category: "bracelets",
    subcategory: "Protection",
    description:
      "A slim black thread-and-bead kavach against nazar, tied in the old style — choose the intention it guards: career, relationship, or a sibling's rakhi-style band.",
    benefits: [
      "The traditional black nazar band, made to last",
      "Single evil-eye bead with waxed adjustable thread",
      "Pick the intention — career, relationship or sibling",
    ],
    care: CARE.crystal,
    price: 349,
    mrp: 899,
    purposes: ["protection"],
    art: "crystal",
    variants: [
      { id: "bs09-v1", variant_name: "Career Nazar Kavach", price_delta: 0, stock_qty: 40 },
      { id: "bs09-v2", variant_name: "Relationship Nazar Kavach", price_delta: 0, stock_qty: 40 },
      { id: "bs09-v3", variant_name: "Rakhi Nazar Kavach", price_delta: 0, stock_qty: 40 },
    ],
  }),
];

export const braceletProducts: Product[] = [...stoneBracelets, ...signature];
