import type { Category } from "@/lib/types";

export interface Faq {
  q: string;
  a: string;
}

/** Reusable per-category PDP FAQ content (not unique per SKU, per brief). */
export const categoryFaqs: Record<Category, Faq[]> = {
  rudraksha: [
    {
      q: "How do you verify the mukhi count?",
      a: "Every bead is inspected by hand and, for certified SKUs, X-ray tested so the internal seed chambers confirm the mukhi count. The lab certificate ships in the box with a unique code you can check on our verification page.",
    },
    {
      q: "Is the rudraksha energised before dispatch?",
      a: "Yes. Beads are cleansed and energised with the traditional ritual before packing. Certified SKUs include a note with the energisation date.",
    },
    {
      q: "Can anyone wear rudraksha?",
      a: "The 5 mukhi is considered universally wearable. Rarer mukhis carry specific planetary associations — if you're choosing a remedy, our AI guide or your astrologer can help match one to your need.",
    },
    {
      q: "What if the bead cracks or the thread breaks?",
      a: "Manufacturing defects are covered by our 7-day replacement policy. Natural drying cracks are prevented by light oiling — care instructions ship with every order.",
    },
  ],
  gemstones: [
    {
      q: "Are the stones natural and treated?",
      a: "All remedial stones we sell are natural. Any standard trade treatment (such as heating) is disclosed on the certificate; stones sold as unheated are certified unheated by the lab.",
    },
    {
      q: "Which finger and metal should I wear this on?",
      a: "Each stone ships with a wear-guide card covering the traditional finger, metal and weekday. For chart-specific advice, consult your astrologer — we make the stone right; they make the prescription.",
    },
    {
      q: "Can I get the ring resized?",
      a: "Yes — share your ring size on WhatsApp after ordering and we size before dispatch at no charge. Resizing after delivery is also free within 30 days; you cover return shipping.",
    },
    {
      q: "Is the certificate from a government lab?",
      a: "Certificates are issued by independent, government-recognised gem testing laboratories. Every certificate carries a unique code you can verify on our website.",
    },
  ],
  bracelets: [
    {
      q: "Are the crystals natural or glass?",
      a: "Natural stone, always. Slight colour variation between beads is the signature of real crystal — perfectly uniform beads are usually glass or resin.",
    },
    {
      q: "What wrist size do the bracelets fit?",
      a: "Standard 8 mm bracelets fit 15–19 cm wrists comfortably on stretch elastic. Larger sizes are listed as variants where available.",
    },
    {
      q: "How do I cleanse and recharge the crystal?",
      a: "Rinse under running water or leave in moonlight overnight once a month. Avoid long sun exposure — amethyst, rose quartz and citrine can fade.",
    },
    {
      q: "Do crystals really work?",
      a: "We describe every stone by its traditional and cultural associations, honestly. Many customers find real value in the practice and intention; we make no medical claims, and crystals are never a substitute for professional care.",
    },
  ],
  karungali: [
    {
      q: "How do I know the karungali is genuine ebony?",
      a: "Genuine karungali heartwood is dense enough to sink in water — the classic home test. Painted imitations float. Ours is sourced as certified heartwood and every mala passes the sink test before stringing.",
    },
    {
      q: "Who can wear karungali?",
      a: "Everyone — the southern tradition places no restrictions of age or gender. Kids' sizes are strung lighter with smaller beads.",
    },
    {
      q: "How do I care for ebony wood?",
      a: "Wipe with a dry cloth and oil occasionally with coconut oil. Avoid long soaks in water; brief contact is harmless.",
    },
  ],
  malas: [
    {
      q: "How many beads should a japa mala have?",
      a: "The full mala is 108 beads plus a guru bead; wearing malas often use 54+1. Both are traditional — 108 for counting practice, 54 for comfortable daily wear.",
    },
    {
      q: "Are the malas hand-knotted?",
      a: "Crystal and rudraksha japa malas are knotted between beads so a break never scatters the strand. Wearing malas use heavy-duty cord with secure finishing.",
    },
    {
      q: "Can I wear my japa mala all day?",
      a: "Yes, though many practitioners keep the counting mala private to their practice and wear a separate strand. Both approaches are accepted — consistency matters more than the rule you pick.",
    },
  ],
  pendants: [
    {
      q: "What metal are the deity pendants made of?",
      a: "Tarnish-resistant zinc alloy with antique plating unless a listing says otherwise (silver-plated pieces are marked). They're built for daily wear and won't blacken skin.",
    },
    {
      q: "Do pendants come with a chain?",
      a: "Every pendant ships on an adjustable waxed cord. For metal chains, message us on WhatsApp and we'll add one before dispatch.",
    },
    {
      q: "Are the pendants energised?",
      a: "Deity pendants and rudraksha pendants are cleansed and energised with the traditional ritual before packing.",
    },
  ],
  anklets: [
    {
      q: "What size are the anklets?",
      a: "Adjustable 22–26 cm, which fits nearly all adults. If you need smaller or larger, mention it in order notes and we'll string to size.",
    },
    {
      q: "Can I wear stone anklets daily?",
      a: "Yes — cord and finishing are chosen for daily wear. Remove before swimming; chlorine dulls natural stone over time.",
    },
    {
      q: "One anklet or a pair?",
      a: "Tradition is flexible here — most wear a single stone anklet on the left. Products with pair options list both in the variant picker.",
    },
  ],
  murtis: [
    {
      q: "Are the murtis energised (pran-pratishtha)?",
      a: "Yes — every murti is cleansed and energised before dispatch and ships with kumkum and a placement note. If you prefer to do the sthapana yourself, mention it in order notes.",
    },
    {
      q: "What material is each murti?",
      a: "Exactly what the listing states — pyrite composite, detailed resin, brass or 999-silver plating. No mystery metals; weights are listed honestly.",
    },
    {
      q: "How should I place the murti at home?",
      a: "The placement note in every box covers direction and height for that deity. As a rule: raised, clean, east-facing worshipper, never directly on the floor.",
    },
  ],
  accessories: [
    {
      q: "Are the ring stones natural?",
      a: "Yes — sun rings and stud rings carry natural stone cabochons. The settings are adjustable tarnish-resistant alloy.",
    },
    {
      q: "Do crystal perfumes actually contain crystals?",
      a: "Real chips of the named stone sit sealed in every bottle. The fragrance is an IFRA-compliant fine-mist eau de parfum; the stones stay in the bottle as it empties.",
    },
    {
      q: "Is the perfume skin-safe?",
      a: "Yes — standard fine-fragrance formulation. As with any perfume, spray on clothing or pulse points and avoid broken skin.",
    },
  ],
  vastu: [
    {
      q: "Do vastu items need any ritual before placing?",
      a: "Pyramids, tortoises and trees need only a simple cleansing (water or incense) if you wish. Placement direction matters most — every item ships with a placement note.",
    },
    {
      q: "Will this fix a major vastu dosh?",
      a: "Correctives are the tradition's answer for spaces you can't renovate. For significant doshas, they are considered mitigation, not cure — a vastu consultant can advise on your specific floor plan.",
    },
    {
      q: "What material are the items made of?",
      a: "Exactly what's listed — solid copper and brass, never plated zinc. Metals develop a natural patina over time, which the tradition considers auspicious.",
    },
  ],
  yantras: [
    {
      q: "Is the yantra energised (pran-pratishtha)?",
      a: "Yes. Every yantra goes through the traditional energisation ritual before dispatch and ships with kumkum, rice grains and a placement note.",
    },
    {
      q: "Where should I place the yantra?",
      a: "On the puja shelf facing east, or at the cash counter for wealth yantras. The placement note in the box covers your specific yantra.",
    },
    {
      q: "How is the etching quality?",
      a: "Deep machine etching for geometric precision — the tradition holds that a misdrawn yantra is ineffective, so precision is the whole product.",
    },
  ],
  zodiac: [
    {
      q: "How do I know my rashi?",
      a: "Your rashi is your Vedic moon sign, which can differ from your Western sun sign. If you know your birth details, any panchang app or astrologer can tell you; if not, most people order by sun sign and that is a fine everyday choice.",
    },
    {
      q: "What stones are used for each sign?",
      a: "Each variant pairs stones classically associated with the sign's ruling planet — the description card inside the box lists your sign's exact stones.",
    },
    {
      q: "Can I gift this without knowing their exact birth time?",
      a: "Yes — the sign (by birthday) is all you need. Birth time only matters for precise chart work, not for a rashi bracelet.",
    },
  ],
  combos: [
    {
      q: "Are combo items identical to the individual products?",
      a: "Yes — the same SKUs, boxed together at a combo price. Every certificate and care card that ships with the individual product ships in the combo too.",
    },
    {
      q: "Can I swap an item inside a combo?",
      a: "Not at checkout, but message us on WhatsApp right after ordering and we'll do our best before dispatch.",
    },
    {
      q: "How does the replacement policy work for combos?",
      a: "Each item is covered individually — if one piece arrives damaged, we replace that piece, not the whole set.",
    },
  ],
};

/** Site-wide FAQ page content. */
export const siteFaqs: { section: string; items: Faq[] }[] = [
  {
    section: "Orders & Payment",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "UPI, credit/debit cards, netbanking and wallets via Razorpay, plus Cash on Delivery on eligible pincodes for orders up to ₹5,000.",
      },
      {
        q: "How does Cash on Delivery work?",
        a: "Place the order choosing COD; we confirm it with you on WhatsApp before dispatch. Unconfirmed COD orders are held, not shipped — this keeps prices lower for everyone.",
      },
      {
        q: "Can I track my order without an account?",
        a: "Yes — use the Track Order page with your order ID and the phone number used at checkout.",
      },
    ],
  },
  {
    section: "Authenticity & Certification",
    items: [
      {
        q: "How do I verify my certificate?",
        a: "Every certified product ships with a unique certificate code (and QR on the box). Enter it on our Verify Certificate page to see the lab, issue date and product it belongs to.",
      },
      {
        q: "Which lab certifies your products?",
        a: "Independent government-recognised gem testing laboratories. The lab name is printed on your certificate and shown in the online verification result.",
      },
      {
        q: "Are products energised before dispatch?",
        a: "Rudraksha and yantras are cleansed and energised with the traditional ritual before packing. If you prefer an un-energised piece for your own ritual, mention it in the order notes.",
      },
    ],
  },
  {
    section: "Shipping & Returns",
    items: [
      {
        q: "How long does delivery take?",
        a: "Dispatch within 24–48 hours; delivery typically 3–7 working days depending on pincode. Ring sizing adds 1–2 days.",
      },
      {
        q: "What is your return policy?",
        a: "7-day easy replacement for damaged, defective or wrong items — unboxing video makes claims instant, but isn't mandatory. Remedial gemstone rings can be exchanged within 7 days if your astrologer advises against the stone.",
      },
      {
        q: "Do you ship outside India?",
        a: "Not yet through the website. For international orders, message us on WhatsApp and we'll arrange it manually.",
      },
    ],
  },
];
