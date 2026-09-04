import type { Planet, Product, Purpose, Zodiac } from "@/lib/types";
import { CARE, mk } from "./shared";

/**
 * Loose certified gemstones — the nine planetary stones (navratna) and their
 * accepted alternates, sold per piece at a stated weight with size variants.
 * (Set rings live in the core catalog: pukhraj, panna, moonga, neelam, moti.)
 */

interface Gem {
  key: string;
  label: string;
  hindi: string;
  origin: string;
  planets: Planet[];
  purposes: Purpose[];
  zodiac: Zodiac[];
  line: string;
  caution?: string;
  price: number;
  mrp: number;
}

const GEMS: Gem[] = [
  { key: "ceylon-yellow-sapphire", label: "Ceylon Yellow Sapphire", hindi: "Pukhraj", origin: "Sri Lanka", planets: ["jupiter"], purposes: ["wealth", "career"], zodiac: ["sagittarius", "pisces"], line: "Jupiter's principal stone — wisdom, fortune and the classic remedy for delayed prosperity", price: 14999, mrp: 22999 },
  { key: "white-sapphire", label: "White Sapphire", hindi: "Safed Pukhraj", origin: "Sri Lanka", planets: ["venus"], purposes: ["love", "wealth"], zodiac: ["taurus", "libra"], line: "Venus's colourless fire — the diamond-alternative remedy for love, luxury and the arts", price: 8999, mrp: 13999 },
  { key: "ceylon-blue-sapphire", label: "Ceylon Blue Sapphire", hindi: "Neelam", origin: "Sri Lanka", planets: ["saturn"], purposes: ["career", "protection"], zodiac: ["capricorn", "aquarius"], line: "Saturn's fast-acting stone — discipline and breakthrough, worn only after a trial period", caution: "The tradition insists on a chart consultation and trial wear before committing to neelam.", price: 12999, mrp: 19999 },
  { key: "peetambari-neelam", label: "Peetambari Neelam", hindi: "Peetambari", origin: "Sri Lanka", planets: ["saturn", "jupiter"], purposes: ["wealth", "career"], zodiac: [], line: "the rare bi-colour sapphire carrying both Saturn's blue and Jupiter's yellow — prescribed when both grahas need strengthening", price: 15999, mrp: 23999 },
  { key: "zambian-emerald", label: "Zambian Emerald", hindi: "Panna", origin: "Zambia", planets: ["mercury"], purposes: ["career"], zodiac: ["gemini", "virgo"], line: "Mercury's green stone — intellect, commerce and clear speech, the trader's and student's remedy", price: 9999, mrp: 15999 },
  { key: "burmese-ruby", label: "Burmese Ruby", hindi: "Manik", origin: "Myanmar", planets: ["sun"], purposes: ["career", "health"], zodiac: ["leo"], line: "the Sun's stone at its finest origin — authority, vitality and the father's blessing", price: 19999, mrp: 29999 },
  { key: "african-ruby", label: "African Ruby", hindi: "Manik", origin: "Mozambique", planets: ["sun"], purposes: ["career", "health"], zodiac: ["leo"], line: "the accessible Sun remedy — genuine ruby fire at a first-remedy price", price: 7999, mrp: 12999 },
  { key: "italian-red-coral", label: "Italian Red Coral", hindi: "Moonga", origin: "Mediterranean", planets: ["mars"], purposes: ["health", "protection"], zodiac: ["aries", "scorpio"], line: "Mars's ox-blood coral from the Mediterranean beds the tradition prizes most", price: 6999, mrp: 10999 },
  { key: "south-sea-pearl", label: "South Sea Pearl", hindi: "Moti", origin: "South Seas", planets: ["moon"], purposes: ["peace", "love"], zodiac: ["cancer"], line: "the Moon's gem — a cool mind, sound sleep and emotional steadiness", price: 3999, mrp: 6999 },
  { key: "hessonite-garnet", label: "Hessonite", hindi: "Gomed", origin: "Sri Lanka", planets: ["rahu"], purposes: ["career", "protection"], zodiac: [], line: "Rahu's honey-coloured stone — prescribed for sudden gains, foreign matters and steadying ambition", price: 4999, mrp: 8499 },
  { key: "cats-eye-chrysoberyl", label: "Cat's Eye Chrysoberyl", hindi: "Lehsunia", origin: "Sri Lanka", planets: ["ketu"], purposes: ["protection"], zodiac: [], line: "Ketu's banded eye — the remedy for hidden obstacles, sudden reversals and spiritual restlessness", caution: "Like neelam, lehsunia is considered fast-acting — consult before wearing.", price: 5499, mrp: 8999 },
  { key: "australian-fire-opal", label: "Australian Fire Opal", hindi: "Opal", origin: "Australia", planets: ["venus"], purposes: ["love", "wealth"], zodiac: ["taurus", "libra"], line: "Venus's play-of-colour alternate — love, luxury and creative flair without the diamond price", price: 6499, mrp: 9999 },
  { key: "natural-zircon", label: "Natural Zircon", hindi: "Jarkan", origin: "Cambodia", planets: ["venus"], purposes: ["love"], zodiac: [], line: "the brilliant natural zircon (not cubic zirconia) — Venus's sparkling budget alternate", price: 5999, mrp: 9499 },
  { key: "iolite", label: "Iolite", hindi: "Neeli", origin: "India", planets: ["saturn"], purposes: ["career"], zodiac: [], line: "the violet-blue neeli, accepted by many astrologers as neelam's gentle substitute for first-time Saturn wearers", price: 3499, mrp: 5999 },
  { key: "turquoise-firoza", label: "Turquoise", hindi: "Firoza", origin: "Iran", planets: ["jupiter"], purposes: ["protection", "health"], zodiac: ["sagittarius"], line: "the firoza of the Persian trade — protection, travel-luck and Jupiter's gentler blessing", price: 2999, mrp: 4999 },
];

export const gemstoneProducts: Product[] = GEMS.map((g, i) => {
  const id = `gm${String(i + 1).padStart(2, "0")}`;
  return mk({
    id,
    slug: `${g.key}-loose-stone`,
    name: `${g.label} (${g.hindi}) — Certified Loose Stone`,
    category: "gemstones",
    subcategory: g.label,
    description:
      `A natural, lab-certified ${g.label.toLowerCase()} of ${g.origin} origin — ${g.line}. Sold as a loose stone at your chosen weight, ready for your own jeweller or our setting service (message us on WhatsApp after ordering).` +
      (g.caution ? ` Note: ${g.caution}` : ""),
    benefits: [
      `The traditional ${g.planets.length ? g.planets.map((p) => p[0].toUpperCase() + p.slice(1)).join("–") : "planetary"} remedy in Vedic astrology`,
      "Natural and certificate-backed; treatments, if any, disclosed on the certificate",
      "Weight options below; ring/pendant setting available on request",
    ],
    care: CARE.gemstone,
    price: g.price,
    mrp: g.mrp,
    purposes: g.purposes,
    zodiac: g.zodiac,
    planets: g.planets,
    cert: true,
    stock: 8,
    art: "gem",
    variants: [
      { id: `${id}-v1`, variant_name: "3.25 ratti", price_delta: -Math.round(g.price * 0.35), stock_qty: 4 },
      { id: `${id}-v2`, variant_name: "5.25 ratti", price_delta: 0, stock_qty: 3 },
      { id: `${id}-v3`, variant_name: "7.25 ratti", price_delta: Math.round(g.price * 0.45), stock_qty: 2 },
    ],
    bestseller: g.key === "ceylon-yellow-sapphire",
  });
});
