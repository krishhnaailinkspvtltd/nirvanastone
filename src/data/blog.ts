import type { BlogPost } from "@/lib/types";

/**
 * Seed blog posts, question-format H2s for SEO + AI answer engines.
 * Each section renders as an H2 with FAQPage/Article JSON-LD.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "which-rudraksha-should-i-wear-first",
    category: "rudraksha",
    title: "Which Rudraksha Should I Wear First? A Beginner's Guide",
    excerpt:
      "Five mukhi first, almost always. Here's why the tradition starts everyone there, and when a different mukhi makes sense.",
    read_minutes: 6,
    published_at: "2026-08-20",
    sections: [
      {
        question: "Which rudraksha is best for beginners?",
        answer:
          "The 5 mukhi rudraksha is the traditional starting point for almost everyone. It is considered universally wearable — no chart consultation needed, no restrictions by gender or age in most lineages, and it is the most abundant mukhi, which keeps genuine beads affordable. Texts associate it with Jupiter and with general wellbeing, calm and steady practice. Wear it for a few months before considering rarer mukhis.",
      },
      {
        question: "Do I need an astrologer before buying a rudraksha?",
        answer:
          "For the 5 mukhi, no — it is regarded as safe for all. For rarer beads like the 1 mukhi, or if you're choosing between mukhis for a specific planetary remedy, a consultation helps you avoid spending on a bead whose association doesn't match your chart. Rudraksha is gentler than gemstone remedies: an ill-suited bead is considered ineffective rather than harmful, which is why many people simply start wearing one.",
      },
      {
        question: "How do I know a rudraksha is real?",
        answer:
          "Genuine rudraksha has naturally formed mukhi lines that run unbroken from crown to base, visible corn-like segments between them, and it generally sinks in water (density varies, so this alone isn't proof). X-ray testing, which reveals the internal seed chambers matching the mukhi count, is the reliable method — this is what lab certification checks. Buy from sellers who certify each bead, not each batch.",
      },
      {
        question: "How should I wear and care for my rudraksha?",
        answer:
          "Wear it on thread or silver against the skin, remove it before swimming or bathing with soap, and oil it lightly with coconut or sandalwood oil every few months to prevent cracking in dry weather. Many practitioners remove it during sleep and keep it at the puja shelf; others wear it continuously. Both are accepted — consistency matters more than the rule you pick.",
      },
    ],
  },
  {
    slug: "gemstones-for-each-rashi",
    category: "zodiac",
    title: "Which Gemstone Should I Wear for My Rashi?",
    excerpt:
      "The classical stone for each of the twelve moon signs, what it's meant to do, and the ones you shouldn't wear without a consultation.",
    read_minutes: 8,
    published_at: "2026-08-12",
    sections: [
      {
        question: "How are gemstones matched to rashis?",
        answer:
          "In Vedic tradition each rashi (moon sign) has a ruling planet, and each planet has a primary gemstone that is said to strengthen its influence: ruby for the Sun, pearl for the Moon, red coral for Mars, emerald for Mercury, yellow sapphire for Jupiter, diamond or white sapphire for Venus, and blue sapphire for Saturn. Your rashi's ruler gives the default recommendation — Cancer (ruled by the Moon) points to pearl, Sagittarius and Pisces (Jupiter) to yellow sapphire, and so on.",
      },
      {
        question: "Which gemstones are safe to wear without consulting an astrologer?",
        answer:
          "Pearl, yellow sapphire and emerald are broadly considered mild and forgiving. Blue sapphire (neelam) is the notable exception — the tradition treats Saturn's stone as fast-acting and insists on a trial period, and most astrologers advise a chart reading first. Red coral also warrants care for signs where Mars sits poorly. When in doubt, crystals like citrine or rose quartz are the no-restriction alternative.",
      },
      {
        question: "Does the gemstone need to touch the skin?",
        answer:
          "The remedial tradition says yes — rings and pendants are made with an open back so the stone's base contacts skin, and the stone is worn on a specified finger and metal. This is why remedial jewellery looks different from fashion jewellery. If you're buying purely for beauty, a closed setting is fine; if you're buying as a remedy, insist on an open-back setting.",
      },
      {
        question: "What weight (ratti) should the stone be?",
        answer:
          "Common practice suggests roughly one ratti per 12 kg of body weight as a starting point, with 5.25 ratti a popular default for sapphires. Heavier is not automatically better — clarity and natural, untreated origin matter far more than size. A smaller certified stone outperforms a large treated one in every way the tradition cares about.",
      },
    ],
  },
  {
    slug: "citrine-benefits-wealth-stone",
    category: "gemstones",
    title: "Citrine Benefits: Why It's Called the Merchant's Stone",
    excerpt:
      "What the wealth-stone reputation actually rests on, how practitioners use citrine, and how to spot heat-treated amethyst sold in its place.",
    read_minutes: 5,
    published_at: "2026-08-05",
    sections: [
      {
        question: "What are the benefits of wearing citrine?",
        answer:
          "Citrine's reputation in crystal practice centres on abundance, confidence and business luck — shopkeepers traditionally keep a piece in the cash box, which earned it the name 'merchant's stone'. Practitioners also associate its warm yellow colour with the solar plexus chakra, linking it to personal will and optimism. As with all crystal traditions, these are matters of practice and belief rather than laboratory findings — we state them as the tradition does.",
      },
      {
        question: "Where should I keep citrine for wealth?",
        answer:
          "The two classic placements: worn on the left wrist (receiving hand) as a bracelet, and kept where money sits — the cash drawer, locker or shop counter. In vastu-influenced practice, a citrine tree goes in the southeast corner of the home or office, the direction associated with wealth.",
      },
      {
        question: "How do I know my citrine is natural?",
        answer:
          "Most cheap 'citrine' is heat-treated amethyst, which shows a burnt-orange colour concentrated at the tips with a white base. Natural citrine is an even, pale-to-smoky yellow throughout, and beads on a genuine strand vary slightly from one another. Uniform, intense orange across every bead is the tell of treatment. Ask the seller directly — honest ones will say which they sell.",
      },
    ],
  },
  {
    slug: "vastu-items-for-home-office",
    category: "vastu",
    title: "Vastu Items for Home and Office: What Goes Where?",
    excerpt:
      "Pyramids, tortoises, yantras and crystal trees — the placement map for the four most-used vastu correctives.",
    read_minutes: 7,
    published_at: "2026-07-28",
    sections: [
      {
        question: "Which vastu item should I start with?",
        answer:
          "Start with the problem, not the product. For general imbalance in a space you can't renovate — a rented flat, an office you don't control — copper pyramids are the standard corrective. For wealth intentions, a citrine tree or Kuber yantra near where money is kept. For stability and health in the household, the brass tortoise near the entrance. One well-placed item beats five scattered ones.",
      },
      {
        question: "Where should a vastu pyramid be placed?",
        answer:
          "The centre (brahmasthan) of the home is the classic placement for a main pyramid, with smaller ones at specific dosh points — above the main door frame, or in a bedroom's afflicted corner. Sets of three are used so one anchors the centre while two treat the identified problem spots. Placement notes ship with our sets.",
      },
      {
        question: "Where does the vastu tortoise go, and which direction should it face?",
        answer:
          "Place the tortoise in the living room or near the main entrance, facing into the house (never facing the exit — symbolically, it would carry the stability out). North and northeast placements are preferred. Brass tortoises are associated with longevity and steadiness; keep the water plate beneath it filled if you follow the northern tradition.",
      },
      {
        question: "Do vastu items need to be energised?",
        answer:
          "Yantras, yes — the tradition holds that an un-energised yantra is only geometry, which is why ours go through pran-pratishtha before dispatch. Pyramids, tortoises and crystal trees work by placement and material in the vastu framework and need no ritual, though many households do a simple cleansing (water, incense) before placing any new item. ",
      },
    ],
  },
  {
    slug: "rudraksha-vs-crystal-bracelets",
    category: "rudraksha",
    title: "Rudraksha vs Crystal Bracelets: Which Should You Choose?",
    excerpt:
      "Two traditions, two materials, one wrist. How to choose based on what you're actually looking for.",
    read_minutes: 5,
    published_at: "2026-07-15",
    sections: [
      {
        question: "What's the difference between rudraksha and crystal bracelets?",
        answer:
          "Rudraksha is a seed from the Elaeocarpus tree, worn in the Shaiva tradition for millennia, with effects framed around planetary influence and spiritual practice. Crystal bracelets come from the mineral-healing tradition, with each stone assigned an intention — citrine for wealth, rose quartz for love, amethyst for calm. Rudraksha carries ritual weight and rules of wear; crystals are casual, stackable and intention-led. Neither is 'stronger' — they answer different instincts.",
      },
      {
        question: "Can I wear rudraksha and crystals together?",
        answer:
          "Yes — there is no prohibition in either tradition, and combination bracelets (rudraksha with karungali, rudraksha with black onyx) are themselves traditional. The practical advice: keep rudraksha's care rules (no soap, no chemicals) as the standard for the whole stack, since rudraksha is the more sensitive material.",
      },
      {
        question: "Which is better as a gift?",
        answer:
          "Crystals, usually. A crystal bracelet carries an intention without imposing a practice — the receiver needs no belief, routine or care regimen. Rudraksha is a more personal choice that some recipients take seriously as a commitment. The exception: for someone already spiritually inclined, a certified 5 mukhi is among the most respected gifts in the tradition.",
      },
    ],
  },
  {
    slug: "what-is-a-shree-yantra",
    category: "vastu",
    title: "What Is a Shree Yantra and How Do You Use One?",
    excerpt:
      "The geometry, the goddess, the placement rules — a plain-language guide to the most revered yantra of all.",
    read_minutes: 6,
    published_at: "2026-07-02",
    sections: [
      {
        question: "What is a Shree Yantra?",
        answer:
          "The Shree Yantra (or Sri Chakra) is a sacred diagram of nine interlocking triangles radiating from a central point (bindu), representing Goddess Lakshmi and, in the Shri Vidya tradition, the structure of the cosmos itself. It is the most venerated of all yantras — texts call it the 'king of yantras' — and it is kept in homes and businesses as an embodiment of abundance and auspiciousness.",
      },
      {
        question: "Where should a Shree Yantra be placed at home?",
        answer:
          "The puja shelf is the traditional home, facing east or with the worshipper facing east. In workplaces it goes at the counter or cash area. Keep it raised, clean and treated as sacred — not as décor on a coffee table. Mounted plate versions can hang on the north or east wall.",
      },
      {
        question: "Why does the geometry need to be precise?",
        answer:
          "The tradition holds that the yantra's power lives in its exact construction — the nine triangles must intersect correctly at 43 points, and a misdrawn yantra is considered inert or even inauspicious. This is why hand-drawn souvenirs vary so much in reputation, and why precision-etched plates are preferred for worship. Check the central triangles on any yantra you buy: sloppy intersections are visible to the naked eye.",
      },
    ],
  },
];
