/**
 * Homepage testimonials — seed content for layout.
 * TODO(client): replace with real customer quotes (with written permission)
 * and photos before launch. Never publish invented testimonials live.
 */
export interface Testimonial {
  name: string;
  city: string;
  quote: string;
  product: string;
  image_url: string | null;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sunita D.",
    city: "Pune",
    quote:
      "The certificate code on the box actually worked on their website — lab name, date, everything. That's when I stopped worrying whether the beads were real.",
    product: "5 Mukhi Rudraksha Mala",
    image_url: null,
  },
  {
    name: "Rajiv T.",
    city: "Delhi",
    quote:
      "My astrologer checked the pukhraj against the certificate before I wore it. Weight and origin matched exactly. Sizing was done before dispatch.",
    product: "Yellow Sapphire Ring",
    image_url: null,
  },
  {
    name: "Ishita V.",
    city: "Ahmedabad",
    quote:
      "Used the AI guide because I honestly didn't know what to buy for my mother. It asked three questions and suggested the pearl ring with reasons. She loves it.",
    product: "Pearl (Moti) Ring",
    image_url: null,
  },
  {
    name: "Murugan V.",
    city: "Chennai",
    quote:
      "Did the water test on the karungali the day it arrived — it sank straight down. Genuine ebony, respectful packaging, quick WhatsApp replies.",
    product: "Karungali Mala",
    image_url: null,
  },
];
