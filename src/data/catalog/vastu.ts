import type { Product, Purpose } from "@/lib/types";
import { CARE, mk } from "./shared";

/** Vastu & crystal decor — tortoises, pyramids, trees, towers, tumbles. */

const V = (
  id: string,
  slug: string,
  name: string,
  subcategory: string,
  description: string,
  benefits: string[],
  price: number,
  mrp: number,
  extra: Partial<Parameters<typeof mk>[0]> = {},
) =>
  mk({
    id, slug, name,
    category: "vastu",
    subcategory,
    description,
    benefits,
    care: CARE.crystal,
    price, mrp,
    art: "pyramid",
    stock: 22,
    ...extra,
  });

// ── Tortoises ─────────────────────────────────────────────────────
const tortoises: Product[] = [
  V("vt01", "vastu-pyrite-tortoise", "Vastu Pyrite Tortoise (Kachhua)", "Tortoise",
    "The vastu tortoise carved in golden pyrite — stability's symbol in prosperity's mineral, facing into the house as tradition asks.",
    ["Tortoise for stability and long life, pyrite for wealth", "Solid pyrite composite carving", "Placement note: face it into the home, north preferred"],
    899, 2299, { purposes: ["wealth", "health"], art: "tortoise", bestseller: true,
      variants: [
        { id: "vt01-v1", variant_name: "Single", price_delta: 0, stock_qty: 20 },
        { id: "vt01-v2", variant_name: "Pack of 2", price_delta: 700, stock_qty: 10 },
      ] }),
  V("vt02", "vastu-citrine-tortoise", "Vastu Citrine Tortoise (Kachhua)", "Tortoise",
    "The kachhua in sunny citrine — the merchant's stone shaped into the household's steadiest symbol.",
    ["Citrine's abundance in the tortoise's stability", "Natural citrine composite carving", "Southeast (wealth corner) placement preferred"],
    849, 2199, { purposes: ["wealth"], art: "tortoise" }),
  V("vt03", "vastu-tiger-eye-tortoise", "Vastu Tiger Eye Tortoise (Kachhua)", "Tortoise",
    "Banded golden tiger eye carved as the vastu tortoise — grounded courage for the entryway shelf.",
    ["Tiger eye's confidence in the guardian form", "Natural tiger eye with strong chatoyance", "Entryway placement, facing inward"],
    849, 2199, { purposes: ["protection", "career"], art: "tortoise" }),
  V("vt04", "dhan-yog-tortoise-big", "Dhan Yog Tortoise (Big Size)", "Tortoise",
    "The large-format wealth tortoise in mixed pyrite and citrine chips under resin — the statement piece for reception desks and shop counters.",
    ["Big-format presence for business spaces", "Pyrite and citrine chips visible through the shell", "Felt base protects glass counters"],
    1499, 3599, { purposes: ["wealth"], art: "tortoise", stock: 10 }),
  V("vt05", "ashtalakshmi-tortoise-idol", "Ashtalakshmi Tortoise Idol", "Tortoise",
    "The tortoise bearing all eight forms of Lakshmi on its shell — an unusual, auspicious piece uniting stability with eightfold abundance.",
    ["Eight Lakshmis riding the vastu tortoise — rare iconography", "Antique-gold detailing over solid casting", "For mandir or cash-corner placement"],
    1299, 3199, { purposes: ["wealth", "peace"], art: "tortoise", care: CARE.metal }),
];

// ── Pyramids ──────────────────────────────────────────────────────
const PYRAMID_STONES: [string, string, string, Purpose[], number, number][] = [
  ["pyrite", "Pyrite Money Magnet Pyramid", "the wealth mineral focused to a point — the cash-drawer pyramid of the trade", ["wealth"], 999, 2499],
  ["citrine", "Citrine Pyramid", "the merchant's stone in vastu's most focused form", ["wealth"], 899, 2299],
  ["rose-quartz", "Rose Quartz Pyramid", "the heart stone shaped to gather and radiate — bedroom-corner classic", ["love"], 899, 2299],
  ["amethyst", "Amethyst Pyramid", "meditation's stone in the form that stills a room", ["peace"], 899, 2299],
  ["black-obsidian", "Black Obsidian Pyramid", "the shield stone pointed skyward — placed at entries to absorb what shouldn't come in", ["protection"], 849, 2199],
];

const pyramids: Product[] = PYRAMID_STONES.map(([key, name, line, purposes, price, mrp], i) =>
  V(`vp${String(i + 1).padStart(2, "0")}`, `${key}-pyramid`, name, "Pyramid",
    `A hand-polished ${name.split(" ")[0].toLowerCase()} pyramid — ${line}. Ships with a placement guide and a free raw selenite plate to rest it on.`,
    [`${line[0].toUpperCase() + line.slice(1)}`, "Hand-polished natural stone with crisp edges", "Free raw selenite base plate in the box"],
    price, mrp, { purposes }),
);

const specialPyramids: Product[] = [
  V("vp06", "7-chakra-conical-pyramid", "7 Chakra Conical Pyramid", "Pyramid",
    "Seven stone layers rise through this conical pyramid, root to crown — the full chakra ladder standing on your desk.",
    ["All seven chakra stones in one graded cone", "Layered natural stones, polished seamless", "Placement guide included"],
    1099, 2799, { purposes: ["health", "peace"] }),
  V("vp07", "lakshmi-yantra-pyramid", "Lakshmi Yantra Pyramid", "Pyramid",
    "A crystal pyramid with the Lakshmi yantra gold-etched on its base — geometry below, focus above.",
    ["Yantra and pyramid energetics in one piece", "Gold-foil yantra sealed under the base", "Cash-corner placement preferred"],
    1199, 2999, { purposes: ["wealth"] }),
];

// ── Dome trees ────────────────────────────────────────────────────
const TREE_STONES: [string, string, Purpose[], number, number][] = [
  ["pyrite", "Pyrite Dome Tree", ["wealth"], 999, 2599],
  ["amethyst", "Amethyst Dome Tree", ["peace"], 899, 2399],
  ["evil-eye", "Evil Eye Dome Tree", ["protection"], 849, 2299],
  ["7-chakra", "7 Chakra Dome Tree", ["health", "peace"], 949, 2499],
  ["love-attraction", "Love Attraction Dome Tree", ["love"], 899, 2399],
];

const trees: Product[] = TREE_STONES.map(([key, name, purposes, price, mrp], i) =>
  V(`vd${String(i + 1).padStart(2, "0")}`, `${key}-dome-tree`, name, "Dome Tree",
    `A wire-wrought tree of ${name.replace(" Dome Tree", "").toLowerCase()} chips sealed under a clear glass dome — the crystal tree, dust-proofed for real Indian homes.`,
    ["Hundreds of natural chips on hand-twisted copper wire", "Glass dome keeps it dust-free forever", "Placement note included"],
    price, mrp, { purposes, art: "tree" }),
);

// ── Towers & tumbles ─────────────────────────────────────────────
const towers: Product[] = [
  V("vw01", "black-tourmaline-tower", "Black Tourmaline Tower", "Tower",
    "A polished obelisk of black tourmaline — the room-guardian practitioners station by the front door and the Wi-Fi router alike.",
    ["The heaviest-duty protection stone in tower form", "Single-piece polished obelisk", "Entry or workspace placement"],
    799, 1999, { purposes: ["protection"], art: "tower" }),
  V("vw02", "amethyst-tower", "Amethyst Tower", "Tower",
    "Deep violet amethyst rising to a point — stillness with presence, for the study or bedside.",
    ["Meditation's stone in sculptural form", "Single-piece polished amethyst", "Bedside or study placement"],
    849, 2199, { purposes: ["peace"], art: "tower" }),
  V("vw03", "love-attraction-tower", "Love Attraction Tower", "Tower",
    "Rose quartz in a rising obelisk — the heart stone with architectural intent, for the relationship corner.",
    ["The heart stone, standing tall", "Single-piece polished rose quartz", "Southwest (relationship) corner placement"],
    799, 1999, { purposes: ["love"], art: "tower" }),
  V("vw04", "crystal-tumbles-set", "Crystal Tumble Stones", "Tumble",
    "Pocket-smooth tumbled stones, sold by the piece — start a collection, load a grid, or carry the day's intention loose in a pocket.",
    ["Ten stones to choose from, all natural", "Pocket-sized, pouch included", "The lowest-commitment way into crystal practice"],
    249, 699, {
      purposes: ["peace"], art: "tumble", stock: 120,
      variants: [
        { id: "vw04-v01", variant_name: "Clear Quartz", price_delta: 0, stock_qty: 12 },
        { id: "vw04-v02", variant_name: "Citrine", price_delta: 50, stock_qty: 12 },
        { id: "vw04-v03", variant_name: "Amethyst", price_delta: 0, stock_qty: 12 },
        { id: "vw04-v04", variant_name: "Tiger Eye", price_delta: 0, stock_qty: 12 },
        { id: "vw04-v05", variant_name: "Pyrite", price_delta: 100, stock_qty: 12 },
        { id: "vw04-v06", variant_name: "Selenite", price_delta: 0, stock_qty: 12 },
        { id: "vw04-v07", variant_name: "Green Aventurine", price_delta: 0, stock_qty: 12 },
        { id: "vw04-v08", variant_name: "Black Tourmaline", price_delta: 0, stock_qty: 12 },
        { id: "vw04-v09", variant_name: "Lapis Lazuli", price_delta: 50, stock_qty: 12 },
        { id: "vw04-v10", variant_name: "Bloodstone", price_delta: 0, stock_qty: 12 },
      ] }),
  V("vw05", "raw-selenite-plate", "Square Raw Selenite Plate", "Selenite",
    "A raw-cut selenite slab for charging and cleansing other stones — the tradition's reset button, sized for a nightstand.",
    ["Rest bracelets and tumbles on it overnight to cleanse", "Raw Moroccan selenite, natural striations", "Approximately 10 × 10 cm"],
    449, 1199, { purposes: ["peace"], art: "tumble" }),
  V("vw06", "raw-pyrite-stone", "Raw Pyrite Stone", "Pyrite",
    "A raw pyrite cluster straight from the Peruvian mines — cubic crystals glittering exactly as the earth made them. The cash-box stone, by the size.",
    ["The classic cash-box and shop-counter prosperity stone", "Natural cubic clusters — every piece unique", "Choose your size, up to a full kilogram"],
    499, 1299, {
      purposes: ["wealth"], art: "tumble", planets: ["sun"], stock: 60, bestseller: true,
      variants: [
        { id: "vw06-v1", variant_name: "Small (~100 g)", price_delta: 0, stock_qty: 25 },
        { id: "vw06-v2", variant_name: "Medium (~250 g)", price_delta: 500, stock_qty: 20 },
        { id: "vw06-v3", variant_name: "Large (~500 g)", price_delta: 1200, stock_qty: 10 },
        { id: "vw06-v4", variant_name: "Collector (1 kg)", price_delta: 2500, stock_qty: 5 },
      ] }),
  V("vw07", "pyrite-latkan", "Pyrite Latkan (Hanging)", "Decor",
    "Pyrite chips strung into a doorway latkan — the wealth mineral where vastu says fortune enters: the threshold.",
    ["Traditional latkan form in genuine pyrite", "Hangs from any door frame or mirror", "Bells at the base ring softly in draughts"],
    549, 1399, { purposes: ["wealth"], art: "anklet" }),
  V("vw08", "pyrite-om-shanti-blessing", "Pyrite Om Shanti Vastu Blessing", "Decor",
    "The OM in pyrite dust on a standing tile — a doorway blessing in the prosperity mineral.",
    ["OM at the entry, in genuine pyrite", "Sealed under glass, zero shedding", "Stands or hangs"],
    1299, 3199, { purposes: ["peace", "wealth"], art: "frame" }),
  V("vw09", "pyrite-swastik-blessing", "Pyrite Swastik Dhan Samriddhi Blessing", "Decor",
    "The swastik — the tradition's oldest mark of wellbeing — laid in pyrite dust for the main door.",
    ["The auspicious mark in the wealth mineral", "Sealed under glass; ready to hang", "Main-door or mandir placement"],
    1299, 3199, { purposes: ["wealth", "protection"], art: "frame" }),
];

export const vastuProducts: Product[] = [
  ...tortoises,
  ...pyramids,
  ...specialPyramids,
  ...trees,
  ...towers,
];
