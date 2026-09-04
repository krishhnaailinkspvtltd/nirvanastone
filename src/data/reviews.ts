import type { Review } from "@/lib/types";

/**
 * Seed reviews for layout/dev. TODO(client): replace with real, imported
 * customer reviews before launch — never publish fabricated reviews on
 * the live site.
 */
let n = 0;
const r = (
  product_id: string,
  customer_name: string,
  rating: Review["rating"],
  review_text: string,
  verified = true,
  daysAgo = 30,
): Review => ({
  id: `r${String(++n).padStart(3, "0")}`,
  product_id,
  customer_name,
  rating,
  review_text,
  image_url: null,
  verified_purchase: verified,
  created_at: new Date(Date.now() - daysAgo * 86400000).toISOString(),
});

export const reviews: Review[] = [
  r("p01", "Ramesh K.", 5, "Beads are uniform and the knotting is tight. Mukhi lines clearly visible. Using it daily for japa.", true, 12),
  r("p01", "Sunita D.", 5, "Came with the certificate and a small guide. Smells like real rudraksha, not polish.", true, 41),
  r("p01", "Arvind P.", 4, "Good mala. Guru bead slightly bigger than expected but that is traditional.", true, 78),
  r("p02", "Neha S.", 5, "Wearing it for two months. Fits well, elastic is strong. The certificate QR worked.", true, 8),
  r("p02", "Vikram M.", 5, "Second purchase. First one was for my father. Genuine beads, fast delivery.", true, 55),
  r("p02", "Kavita J.", 4, "Nice bracelet, slightly loose on a small wrist — ask for the 8 mm if your wrist is thin.", true, 90),
  r("p05", "Murugan V.", 5, "Real karungali — did the water test, it sinks. Very smooth finish.", true, 19),
  r("p05", "Lakshmi N.", 5, "Bought for my mother. She wears it every day. Packaging was respectful, not flashy.", true, 63),
  r("p06", "Rajiv T.", 5, "Stone matches the certificate weight exactly. My astrologer approved it before I wore it.", true, 33),
  r("p06", "Deepa R.", 4, "Beautiful colour. Ring sizing took an extra two days but they kept me informed on WhatsApp.", true, 71),
  r("p08", "Sanjay B.", 5, "Deep red, no dye smell, certificate included. Exactly as described.", true, 26),
  r("p10", "Meera G.", 5, "Elegant pearl, good lustre. Wearing for calm sleep as suggested.", true, 47),
  r("p11", "Pooja H.", 5, "Colour is natural — some beads lighter, some darker. That is how I knew it was real.", true, 5),
  r("p11", "Amit W.", 5, "Kept one in the shop cash box and wear one. Whatever works — the bracelet is good quality.", true, 38),
  r("p11", "Ritika C.", 4, "Pretty and light. Clasp-free elastic design is comfortable.", true, 84),
  r("p12", "Shreya L.", 5, "Soft pink, nicely polished. Gifted to my sister, she loved the box.", true, 15),
  r("p12", "Anon", 4, "Good bracelet for the price. Beads slightly smaller than they look in photos.", false, 96),
  r("p13", "Harish A.", 5, "Deep purple beads. I keep it on the bedside table at night. Very calming routine.", true, 22),
  r("p14", "Nikhil F.", 5, "Wore it to my final interview. Got the job — the bracelet gets partial credit.", true, 29),
  r("p15", "Divya M.", 5, "All seven stones are natural, colours are distinct. Great starter piece.", true, 10),
  r("p15", "Rohit E.", 4, "Good quality. Elastic could be slightly tighter.", true, 58),
  r("p16", "Kunal S.", 5, "Heavy, shiny, feels premium. People keep asking about it.", true, 17),
  r("p17", "Farah Q.", 5, "Bought for my husband who travels. The charm is subtle, not gaudy.", true, 44),
  r("p18", "Ishita V.", 5, "Ordered the Cancer variant for my mother. Stones matched the description card inside.", true, 7),
  r("p18", "Gaurav D.", 4, "Nice gift option. Charm is small — I would prefer it bigger.", true, 66),
  r("p19", "Prakash Y.", 5, "Sits on my office desk. Chips are firmly wired, nothing shed in transit.", true, 24),
  r("p22", "Savita K.", 5, "Etching is precise and deep. Came energised with kumkum and a placement note.", true, 31),
  r("p25", "Manoj R.", 5, "Better value than buying separately. The yantra went straight into the shop drawer.", true, 13),
  r("p27", "Anjali T.", 5, "The amethyst and mala pair beautifully. Sleeping better — placebo or not, I will take it.", true, 36),
];
