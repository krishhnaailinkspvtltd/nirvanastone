import type { Product, ProductImage } from "@/lib/types";

/**
 * Free-license representative photography (Unsplash License — free for
 * commercial use, no attribution required; credits kept below anyway).
 *
 * These are STILL stand-ins: they show the material/family honestly but are
 * not photos of our actual SKUs, so `is_placeholder` stays true and the
 * launch checklist in catalog/core.ts still applies. Never replace these
 * with images scraped from competitor stores or Google Images.
 *
 * Each product mapped below gets [photo 1:1, photo 4:5, spec-art] as its
 * gallery; unmapped products keep the designed SVG art.
 */

const LOOKS = {
  // material / family                photo id                                      photographer
  "rudraksha-bead": ["photo-1650809652935-2e5002ba40bf", "Sameep Adhikari"],
  "rudraksha-mala": ["photo-1622993361118-b6365d859ab6", "Daria Nepriakhina"],
  "wood-mala": ["photo-1601824096525-954268b9eb72", "Frames For Your Heart"],
  amethyst: ["photo-1632980205460-e490e885e848", "Daniel Olah"],
  "amethyst-bracelet": ["photo-1743127671067-62af70aa67c2", "Keekon"],
  "rose-quartz": ["photo-1728234553997-f71b87a44e13", "Bhautik Patel"],
  citrine: ["photo-1614092872241-c9a193f2b4aa", "benjamin lehman"],
  "tiger-eye": ["photo-1720734899165-ceb27fb19a57", "Richard Multimedia"],
  lapis: ["photo-1564145593722-41a01c018a10", "Geert Pieters"],
  "clear-quartz": ["photo-1562162115-54cc44600875", "Jason D"],
  pyrite: ["photo-1609216970141-d981d693484a", "Calvin Chai"],
  tumbles: ["photo-1602887148362-29eff3ff8620", "Susan Wilkinson"],
  chakra: ["photo-1643319127773-c622d9fc371f", "Esther Verdú"],
  "bracelet-generic": ["photo-1638768892257-8aec93a524e5", "Alexey Demidov"],
  "green-aventurine": ["photo-1607772990885-48f6e4e4be3b", "Content Pixie"],
  "black-tourmaline": ["photo-1780432036139-fe0a751ef0a6", "Mr. Pugo"],
  obsidian: ["photo-1764022402353-1c5266df8952", "Amin Zabardast"],
  "garnet-stones": ["photo-1705575490492-4e91fd97bbb4", "sameer Ali"],
  moonstone: ["photo-1626471240086-c4313f0b71cc", "Renee Kiffin"],
  sunstone: ["photo-1628076941464-b43ea146ea2f", "Ayanda Kunene"],
  carnelian: ["photo-1660913339621-a0f01b9bb882", "Tiny Rituals"],
  turquoise: ["photo-1597816131267-fdf565fcd3aa", "benjamin lehman"],
  selenite: ["photo-1772911421285-ceb25a0dab02", "Ivett M"],
  "red-coral": ["photo-1779804597879-ee95331493de", "ONUR KURT"],
  opal: ["photo-1682963135833-ee78c62672b3", "J D"],
  "yellow-sapphire": ["photo-1705575472028-d92d0bba6608", "sameer Ali"],
  "blue-sapphire": ["photo-1770722272510-ef28c6f57541", "Ahmadreza Rezaie"],
  ruby: ["photo-1551122102-63cd339bfaab", "Jason D"],
  emerald: ["photo-1625479610681-f789345a8157", "Aleksandr Buynitskiy"],
  pearl: ["photo-1654699991520-aaaf4dd2608b", "Paige Johnson"],
  "loose-gems": ["photo-1560427450-00fa9481f01e", "Franco Antonio Giovanella"],
  "gem-ring": ["photo-1592317295760-5c1f677dfc78", "Anthony Calandrelli"],
  "gold-ring": ["photo-1598560917807-1bae44bd2be8", "Sabrianna"],
  pendant: ["photo-1599643477877-530eb83abc8e", "Andres Vera"],
  anklet: ["photo-1651395835317-d2868e8ebcac", "Bhawana priyadarshini"],
  "ganesha-brass": ["photo-1760857067352-5fb8d6e9245f", "Anjana Nair"],
  conch: ["photo-1616197186909-9873185dbcc5", "Susan Wilkinson"],
  "evil-eye": ["photo-1652536160742-9f46c4a1a838", "engin akyurt"],
} as const;

export type LookKey = keyof typeof LOOKS;

export const photoUrl = (key: LookKey, ratio: "square" | "portrait") => {
  const [id] = LOOKS[key];
  const size = ratio === "portrait" ? "w=1200&h=1500" : "w=1200&h=1200";
  return `https://images.unsplash.com/${id}?q=80&${size}&fit=crop&auto=format`;
};

/** product id → representative look. Unmapped ids keep their SVG art. */
const MAP: Record<string, LookKey> = {
  // core
  p01: "rudraksha-mala", p02: "rudraksha-bead", p03: "rudraksha-bead",
  p05: "wood-mala",
  p06: "yellow-sapphire", p07: "emerald", p08: "red-coral", p09: "blue-sapphire", p10: "pearl",
  p11: "citrine", p12: "rose-quartz", p13: "amethyst-bracelet", p14: "tiger-eye",
  p15: "chakra", p16: "pyrite", p17: "evil-eye",
  p19: "citrine",
  // rudraksha beads rb01–rb18
  rb01: "rudraksha-bead", rb02: "rudraksha-bead", rb03: "rudraksha-bead", rb04: "rudraksha-bead",
  rb05: "rudraksha-bead", rb06: "rudraksha-bead", rb07: "rudraksha-bead", rb08: "rudraksha-bead",
  rb09: "rudraksha-bead", rb10: "rudraksha-bead", rb11: "rudraksha-bead", rb12: "rudraksha-bead",
  rb13: "rudraksha-bead", rb14: "rudraksha-bead", rb15: "rudraksha-bead", rb16: "rudraksha-bead",
  rb17: "rudraksha-bead", rb18: "rudraksha-bead",
  // rudraksha pieces
  rk01: "rudraksha-bead", rk02: "rudraksha-bead", rk03: "rudraksha-bead",
  rk04: "rudraksha-mala", rk05: "rudraksha-mala", rk06: "rudraksha-mala", rk07: "rudraksha-mala",
  rk08: "rudraksha-bead", rk09: "rudraksha-bead",
  // karungali
  kg01: "wood-mala", kg02: "wood-mala", kg03: "wood-mala", kg04: "wood-mala",
  kg05: "wood-mala", kg06: "wood-mala", kg07: "wood-mala", kg08: "wood-mala",
  // bracelets (stone lines)
  br01: "lapis", br02: "turquoise", br03: "green-aventurine", br04: "black-tourmaline",
  br05: "clear-quartz", br06: "selenite", br07: "moonstone", br08: "sunstone",
  br09: "bracelet-generic", br10: "carnelian", br11: "garnet-stones", br12: "bracelet-generic",
  // bracelets (signature)
  bs01: "pyrite", bs02: "rose-quartz", bs03: "citrine", bs04: "pyrite",
  bs05: "evil-eye", bs08: "bracelet-generic", bs09: "evil-eye",
  // malas
  ml01: "amethyst", ml02: "rose-quartz", ml03: "green-aventurine", ml04: "obsidian",
  ml05: "clear-quartz", ml06: "rudraksha-mala", ml07: "wood-mala", ml08: "wood-mala",
  ml09: "pyrite",
  // pendants
  pd08: "pendant",
  // anklets
  an01: "anklet", an02: "anklet", an03: "anklet", an04: "anklet", an05: "anklet",
  // gemstones
  gm01: "yellow-sapphire", gm02: "loose-gems", gm03: "blue-sapphire", gm04: "loose-gems",
  gm05: "emerald", gm06: "ruby", gm07: "ruby", gm08: "red-coral", gm09: "pearl",
  gm10: "loose-gems", gm11: "loose-gems", gm12: "opal", gm13: "loose-gems",
  gm14: "loose-gems", gm15: "turquoise",
  // murtis (only where the photo reads as a desk-sized murti — the outdoor
  // monument shots for other deities misrepresent the product, so those
  // keep spec-art)
  mu01: "ganesha-brass", mu12: "conch",
  // vastu
  vw04: "tumbles", vw05: "selenite", vw06: "pyrite",
  // zodiac sign bracelets (by their lead stone)
  zs02: "sunstone", zs03: "green-aventurine", zs05: "tiger-eye", zs06: "carnelian",
  zs07: "lapis", zs08: "obsidian", zs09: "obsidian", zs10: "garnet-stones",
  zs11: "amethyst", zs12: "citrine", zs01: "bracelet-generic", zs04: "bracelet-generic",
  // accessories
  ac01: "gold-ring", ac02: "gold-ring", ac03: "gold-ring", ac09: "gold-ring",
  ac10: "evil-eye",
};
// Yantras, frames, pyramids, trees, tortoises, metal pieces, deity pendants,
// perfumes, mulank and combos intentionally keep their SVG spec-art — no
// honest stock photo exists for those distinctive forms.

/** Swap in photography where a confident look exists; keep spec-art last. */
export function applyPhotos(products: Product[]): Product[] {
  return products.map((p) => {
    const look = MAP[p.id];
    if (!look) return p;
    const photos: ProductImage[] = [
      {
        url: photoUrl(look, "square"),
        alt: `${p.name} — representative stock photo (actual product photo pending)`,
        is_placeholder: true,
      },
      {
        url: photoUrl(look, "portrait"),
        alt: `${p.name} — representative stock photo, detail crop`,
        is_placeholder: true,
      },
    ];
    return { ...p, images: [...photos, ...p.images.slice(0, 1)] };
  });
}

/* PHOTO CREDITS (Unsplash License):
   Sameep Adhikari, Daria Nepriakhina, Frames For Your Heart, Daniel Olah,
   Keekon, Bhautik Patel, benjamin lehman, Richard Multimedia, Geert Pieters,
   Jason D, Calvin Chai, Susan Wilkinson, Esther Verdú, Alexey Demidov,
   Content Pixie, Mr. Pugo, Amin Zabardast, sameer Ali, Renee Kiffin,
   Ayanda Kunene, Tiny Rituals, Ivett M, ONUR KURT, J D, Ahmadreza Rezaie,
   Aleksandr Buynitskiy, Paige Johnson, Franco Antonio Giovanella,
   Anthony Calandrelli, Sabrianna, Andres Vera, Bhawana priyadarshini,
   Anjana Nair, Akkash Shah, satish nagapuri, Jan Kopřiva, engin akyurt. */
