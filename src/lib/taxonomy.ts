import type { Category, Planet, Purpose, Zodiac } from "./types";

export const CATEGORIES: Record<
  Category,
  { label: string; blurb: string; art: string }
> = {
  rudraksha: {
    label: "Rudraksha",
    blurb: "Nepal-origin beads 1–14 mukhi, bracelets, malas & pendants",
    art: "rudraksha",
  },
  karungali: {
    label: "Karungali",
    blurb: "Genuine ebony-wood malas and kavach bracelets of the southern tradition",
    art: "mala",
  },
  bracelets: {
    label: "Bracelets",
    blurb: "Natural crystal and metal bracelets for every intention",
    art: "crystal",
  },
  malas: {
    label: "Malas & Necklaces",
    blurb: "108-bead japa malas and everyday spiritual necklaces",
    art: "mala",
  },
  pendants: {
    label: "Pendants",
    blurb: "Deity and stone pendants, ready to wear",
    art: "pendant",
  },
  anklets: {
    label: "Anklets",
    blurb: "Natural-stone anklets — wealth and love at every step",
    art: "anklet",
  },
  gemstones: {
    label: "Gemstones",
    blurb: "The nine planetary stones and beyond, lab-certified",
    art: "gem",
  },
  murtis: {
    label: "Divine Murtis",
    blurb: "Idols in pyrite, brass and resin — energised before dispatch",
    art: "murti",
  },
  yantras: {
    label: "Yantras & Frames",
    blurb: "Precision-etched yantras and pyrite-dust divine frames",
    art: "yantra",
  },
  vastu: {
    label: "Vastu & Decor",
    blurb: "Tortoises, pyramids, trees, towers and tumbles for the home",
    art: "pyramid",
  },
  zodiac: {
    label: "Zodiac & Mulank",
    blurb: "Rashi stone bracelets, pendants and numerology mulank bands",
    art: "zodiac",
  },
  accessories: {
    label: "Rings & Accessories",
    blurb: "Sun rings, crystal perfumes and everyday carry",
    art: "ring",
  },
  combos: {
    label: "Combos",
    blurb: "Curated sets that work together, priced together",
    art: "combo",
  },
};

export const PURPOSES: Record<Purpose, { label: string; line: string }> = {
  wealth: { label: "Wealth", line: "Prosperity, abundance and money flow" },
  love: { label: "Love", line: "Relationships, harmony and self-worth" },
  health: { label: "Health", line: "Vitality, sleep and inner balance" },
  protection: { label: "Protection", line: "Shielding from negativity and evil eye" },
  career: { label: "Career", line: "Focus, growth and new opportunities" },
  peace: { label: "Peace", line: "Calm, clarity and meditation" },
};

export const ZODIACS: Record<Zodiac, { label: string; hindi: string; dates: string }> = {
  aries: { label: "Aries", hindi: "Mesh", dates: "Mar 21 – Apr 19" },
  taurus: { label: "Taurus", hindi: "Vrishabh", dates: "Apr 20 – May 20" },
  gemini: { label: "Gemini", hindi: "Mithun", dates: "May 21 – Jun 20" },
  cancer: { label: "Cancer", hindi: "Kark", dates: "Jun 21 – Jul 22" },
  leo: { label: "Leo", hindi: "Singh", dates: "Jul 23 – Aug 22" },
  virgo: { label: "Virgo", hindi: "Kanya", dates: "Aug 23 – Sep 22" },
  libra: { label: "Libra", hindi: "Tula", dates: "Sep 23 – Oct 22" },
  scorpio: { label: "Scorpio", hindi: "Vrishchik", dates: "Oct 23 – Nov 21" },
  sagittarius: { label: "Sagittarius", hindi: "Dhanu", dates: "Nov 22 – Dec 21" },
  capricorn: { label: "Capricorn", hindi: "Makar", dates: "Dec 22 – Jan 19" },
  aquarius: { label: "Aquarius", hindi: "Kumbh", dates: "Jan 20 – Feb 18" },
  pisces: { label: "Pisces", hindi: "Meen", dates: "Feb 19 – Mar 20" },
};

export const PLANETS: Record<Planet, { label: string; hindi: string; governs: string }> = {
  sun: { label: "Sun", hindi: "Surya", governs: "authority, vitality, father" },
  moon: { label: "Moon", hindi: "Chandra", governs: "mind, emotions, mother" },
  mars: { label: "Mars", hindi: "Mangal", governs: "courage, energy, property" },
  mercury: { label: "Mercury", hindi: "Budh", governs: "intellect, speech, trade" },
  jupiter: { label: "Jupiter", hindi: "Brihaspati", governs: "wisdom, wealth, fortune" },
  venus: { label: "Venus", hindi: "Shukra", governs: "love, luxury, arts" },
  saturn: { label: "Saturn", hindi: "Shani", governs: "discipline, karma, longevity" },
  rahu: { label: "Rahu", hindi: "Rahu", governs: "ambition, foreign gains" },
  ketu: { label: "Ketu", hindi: "Ketu", governs: "detachment, moksha, intuition" },
};

export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as Category[];
export const PURPOSE_SLUGS = Object.keys(PURPOSES) as Purpose[];
export const ZODIAC_SLUGS = Object.keys(ZODIACS) as Zodiac[];
export const PLANET_SLUGS = Object.keys(PLANETS) as Planet[];
