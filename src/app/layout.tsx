import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileTabBar } from "@/components/MobileTabBar";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { site } from "@/config/site";
import { CartProvider } from "@/context/cart";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Certified rudraksha, natural gemstones, healing crystal jewellery, vastu items and yantras. Every certified piece carries a verifiable certificate code. COD available across India.",
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${karla.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          {/* Clearance for the fixed mobile tab bar */}
          <div aria-hidden className="h-14 md:hidden" />
          <MobileTabBar />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
