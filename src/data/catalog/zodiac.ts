import type { Planet, Product, Zodiac } from "@/lib/types";
import { CARE, mk } from "./shared";

/** Per-sign rashi bracelets, the metal zodiac line, and mulank (numerology) bands. */

const SIGN_STONES: Record<Zodiac, { stones: string; hindi: string; line: string }> = {
  aries: { stones: "Red Jasper & Tiger Eye", hindi: "Mesh", line: "Mars-ruled fire needs grounding and aim — endurance from jasper, focus from tiger eye" },
  taurus: { stones: "Rose Quartz & Carnelian", hindi: "Vrishabh", line: "Venus-ruled earth softens with rose quartz's heart and lights up with carnelian's spark" },
  gemini: { stones: "Green Aventurine & Milky Quartz", hindi: "Mithun", line: "Mercury's twins get opportunity from aventurine and clarity from milky quartz" },
  cancer: { stones: "Howlite & Milky Quartz", hindi: "Karka", line: "the Moon's sign settles with howlite's calm and quartz's soft light" },
  leo: { stones: "Tiger Eye & Citrine", hindi: "Simha", line: "the Sun's sign doubles down — tiger eye's golden courage, citrine's radiant abundance" },
  virgo: { stones: "Carnelian & Milky Quartz", hindi: "Kanya", line: "Mercury's perfectionist gains warmth from carnelian and ease from quartz" },
  libra: { stones: "Lapis Lazuli & Howlite", hindi: "Tula", line: "Venus's scales balance on lapis's honest speech and howlite's patience" },
  scorpio: { stones: "Black Onyx & White Howlite", hindi: "Vrishchik", line: "Mars-ruled depth is grounded by black onyx and cooled by howlite's patience" },
  sagittarius: { stones: "Black Obsidian & Lapis Lazuli", hindi: "Dhanu", line: "Jupiter's archer stays grounded with obsidian while lapis keeps the aim true" },
  capricorn: { stones: "Carnelian & Milky Quartz", hindi: "Makar", line: "Saturn's climber is fuelled by carnelian's drive and steadied by milky quartz" },
  aquarius: { stones: "Amethyst & Sodalite", hindi: "Kumbh", line: "Saturn's visionary thinks clearer with amethyst's calm and sodalite's insight" },
  pisces: { stones: "Citrine & Tiger Eye", hindi: "Meen", line: "Jupiter's dreamer gets sunshine from citrine and follow-through from tiger eye" },
};

/** Signs with real product creatives in /public/products/zodiac/. */
const PHOTO_SIGNS = new Set<Zodiac>([
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "scorpio", "capricorn", "aquarius", "pisces",
]);

const signBracelets: Product[] = (Object.entries(SIGN_STONES) as [Zodiac, (typeof SIGN_STONES)[Zodiac]][]).map(
  ([sign, s], i) => {
    const label = sign[0].toUpperCase() + sign.slice(1);
    const p = mk({
      id: `zs${String(i + 1).padStart(2, "0")}`,
      slug: `${sign}-rashi-bracelet`,
      name: `${label} (${s.hindi} Rashi) Bracelet — ${s.stones}`,
      category: "zodiac",
      subcategory: `${label} Rashi`,
      description: `The classical stone pairing for ${label} (${s.hindi} rashi): ${s.line}. Natural 8 mm beads around a black onyx centre bead engraved with the ${label} glyph in gold — and a free raw selenite plate in the box to rest it on overnight.`,
      benefits: [
        `${s.stones} — the pairing traditionally prescribed for ${label}`,
        `Black onyx centre bead with the ${label} sign engraved in gold`,
        "Free raw selenite plate included — the cleansing base for your bracelet",
      ],
      care: CARE.crystal,
      price: 749,
      mrp: 1899,
      purposes: ["protection", "peace"],
      zodiac: [sign],
      art: "zodiac",
      bestseller: sign === "leo" || sign === "capricorn",
    });
    if (PHOTO_SIGNS.has(sign)) {
      p.images = [
        {
          url: `/products/zodiac/${sign}.jpg`,
          alt: `${label} (${s.hindi}) rashi bracelet — ${s.stones} with free raw selenite plate`,
          is_placeholder: false,
        },
        p.images[0],
      ];
    }
    return p;
  },
);

const MULANK: [number, string, Planet, string][] = [
  [1, "Sun (Surya)", "sun", "leaders and originals — mulank 1 carries the Sun's authority"],
  [2, "Moon (Chandra)", "moon", "feelers and peacemakers — mulank 2 flows with the Moon"],
  [3, "Jupiter (Guru)", "jupiter", "teachers and optimists — mulank 3 expands with Jupiter"],
  [4, "Rahu", "rahu", "rule-breakers and builders — mulank 4 channels Rahu's drive"],
  [5, "Mercury (Budh)", "mercury", "communicators and traders — mulank 5 moves with Mercury"],
  [6, "Venus (Shukra)", "venus", "artists and hosts — mulank 6 glows with Venus"],
  [7, "Ketu", "ketu", "seekers and analysts — mulank 7 questions with Ketu"],
  [8, "Saturn (Shani)", "saturn", "grinders and late bloomers — mulank 8 endures with Saturn"],
  [9, "Mars (Mangal)", "mars", "fighters and finishers — mulank 9 burns with Mars"],
];

const mulankBracelets: Product[] = MULANK.map(([n, planetLabel, planet, line]) =>
  mk({
    id: `zm${String(n).padStart(2, "0")}`,
    slug: `mulank-${n}-bracelet`,
    name: `Mulank ${n} Bracelet — ${planetLabel}`,
    category: "zodiac",
    subcategory: "Mulank",
    description: `For those whose birth-date digits reduce to ${n}: ${line}. Stones matched to the ruling planet of your mulank, with a numeral charm.`,
    benefits: [
      `Numerology's remedy line for mulank ${n} (${planetLabel})`,
      "Stone mix matched to the ruling planet",
      "Your mulank = day of birth reduced to one digit (e.g. 23 → 2+3 = 5)",
    ],
    care: CARE.crystal,
    price: 699,
    mrp: 1799,
    purposes: ["career", "protection"],
    planets: [planet],
    art: "zodiac",
  }),
);

const metalZodiac: Product[] = [
  mk({
    id: "zx01",
    slug: "zodiac-metal-bracelet",
    name: "Zodiac Metal Bracelet (All 12 Signs)",
    category: "zodiac",
    subcategory: "Metal",
    description:
      "Your sign's glyph on a brushed-metal band — the zodiac for wrists that prefer steel to stone. Choose your sign; unisex sizing.",
    benefits: [
      "All twelve glyphs available in one clean metal design",
      "Brushed stainless finish, water-safe",
      "Adjustable fit, unisex",
    ],
    care: CARE.metal,
    price: 699,
    mrp: 1799,
    purposes: ["protection"],
    zodiac: ["aries","taurus","gemini","cancer","leo","virgo","libra","scorpio","sagittarius","capricorn","aquarius","pisces"],
    art: "zodiac",
    variants: [
      "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
      "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces",
    ].map((s, i) => ({
      id: `zx01-v${String(i + 1).padStart(2, "0")}`,
      variant_name: s,
      price_delta: 0,
      stock_qty: 10,
    })),
  }),
];

export const zodiacProducts: Product[] = [...signBracelets, ...mulankBracelets, ...metalZodiac];
