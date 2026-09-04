export type Category =
  | "rudraksha"
  | "karungali"
  | "bracelets"
  | "malas"
  | "pendants"
  | "anklets"
  | "gemstones"
  | "murtis"
  | "yantras"
  | "vastu"
  | "zodiac"
  | "accessories"
  | "combos";

export type Purpose =
  | "wealth"
  | "love"
  | "health"
  | "protection"
  | "career"
  | "peace";

export type Zodiac =
  | "aries" | "taurus" | "gemini" | "cancer" | "leo" | "virgo"
  | "libra" | "scorpio" | "sagittarius" | "capricorn" | "aquarius" | "pisces";

export type Planet =
  | "sun" | "moon" | "mars" | "mercury" | "jupiter"
  | "venus" | "saturn" | "rahu" | "ketu";

export interface ProductImage {
  url: string;
  alt: string;
  is_placeholder: boolean;
}

export interface ProductVariant {
  id: string;
  variant_name: string;
  price_delta: number;
  stock_qty: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  subcategory: string;
  description: string;
  benefits: string[];
  care_instructions: string;
  price: number;
  mrp: number;
  purpose_tags: Purpose[];
  zodiac_tags: Zodiac[];
  planet_tags: Planet[];
  is_combo: boolean;
  combo_item_ids: string[] | null;
  certificate_available: boolean;
  stock_qty: number;
  images: ProductImage[];
  variants?: ProductVariant[];
  bestseller?: boolean;
}

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  review_text: string;
  image_url: string | null;
  verified_purchase: boolean;
  created_at: string;
}

export interface Certificate {
  id: string;
  certificate_code: string;
  product_id: string;
  order_item_id: string | null;
  lab_name: string;
  issue_date: string;
  pdf_url: string | null;
  qr_code_url: string | null;
}

export type PaymentMethod = "razorpay" | "cod";

export type OrderStatus =
  | "pending"
  | "cod_confirmation_pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  product_id: string;
  slug: string;
  name: string;
  variant_name: string | null;
  unit_price: number;
  qty: number;
}

export interface ShippingAddress {
  full_name: string;
  phone: string;
  email?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  promo_code: string | null;
  shipping_fee: number;
  total: number;
  payment_method: PaymentMethod;
  payment_status: "unpaid" | "paid" | "refunded" | "simulated";
  order_status: OrderStatus;
  shipping_address: ShippingAddress;
  tracking_id: string | null;
  cod_confirmed: boolean;
  razorpay_order_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  slug: string;
  category: "rudraksha" | "gemstones" | "vastu" | "zodiac";
  title: string;
  excerpt: string;
  read_minutes: number;
  published_at: string;
  /** Question-format H2 sections, written for both Google and AI answer engines. */
  sections: { question: string; answer: string }[];
}
