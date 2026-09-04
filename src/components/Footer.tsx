import Link from "next/link";
import { site, whatsappLink } from "@/config/site";
import { CATEGORIES, PURPOSES } from "@/lib/taxonomy";
import { MalaDivider } from "./MalaDivider";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-sand bg-abyss text-cream">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-aurum font-display text-2xl font-semibold">{site.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              {site.tagline}. Every certified piece carries a code you can
              verify on this website.
            </p>
            <a
              href={whatsappLink("Namaste! I have a question about a product.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-sm font-bold text-gold hover:bg-gold/10"
            >
              WhatsApp us
            </a>
          </div>

          <nav aria-label="Categories">
            <p className="eyebrow mb-3">Shop</p>
            <ul className="space-y-2 text-sm">
              {Object.entries(CATEGORIES).map(([slug, c]) => (
                <li key={slug}>
                  <Link href={`/collections/${slug}`} className="text-cream/80 hover:text-cream">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Purposes and tools">
            <p className="eyebrow mb-3">By purpose</p>
            <ul className="space-y-2 text-sm">
              {Object.entries(PURPOSES).map(([slug, p]) => (
                <li key={slug}>
                  <Link
                    href={`/collections/purpose/${slug}`}
                    className="text-cream/80 hover:text-cream"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/recommend" className="font-bold text-gold hover:text-cream">
                  AI product guide →
                </Link>
              </li>
              <li>
                <Link href="/verify-certificate" className="font-bold text-gold hover:text-cream">
                  Verify a certificate →
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Help">
            <p className="eyebrow mb-3">Help</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/track-order" className="text-cream/80 hover:text-cream">Track order</Link></li>
              <li><Link href="/account" className="text-cream/80 hover:text-cream">My account</Link></li>
              <li><Link href="/faq" className="text-cream/80 hover:text-cream">FAQ</Link></li>
              <li><Link href="/about" className="text-cream/80 hover:text-cream">About us</Link></li>
              <li><Link href="/blog" className="text-cream/80 hover:text-cream">Blog</Link></li>
              <li><Link href="/contact" className="text-cream/80 hover:text-cream">Contact</Link></li>
              <li><Link href="/policies/shipping" className="text-cream/80 hover:text-cream">Shipping policy</Link></li>
              <li><Link href="/policies/returns" className="text-cream/80 hover:text-cream">Returns & replacement</Link></li>
              <li><Link href="/policies/privacy" className="text-cream/80 hover:text-cream">Privacy policy</Link></li>
              <li><Link href="/policies/terms" className="text-cream/80 hover:text-cream">Terms of service</Link></li>
            </ul>
          </nav>
        </div>

        <MalaDivider className="my-8 opacity-60" />

        <p className="text-center text-xs leading-relaxed text-cream/50">
          © {new Date().getFullYear()} {site.legalName}. Products are offered in
          keeping with traditional and cultural beliefs; they are not a
          substitute for professional medical, financial or legal advice.
        </p>
      </div>
    </footer>
  );
}
