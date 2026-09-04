import type { Metadata } from "next";
import Link from "next/link";
import { MalaDivider } from "@/components/MalaDivider";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Who we are, how we source, and why every certified piece carries a code you can verify.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10">
      <header className="text-center">
        <p className="eyebrow">About {site.name}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-deep sm:text-4xl">
          Faith deserves proof.
        </h1>
        <MalaDivider className="mt-5" />
      </header>

      {/* TODO(client): replace with the real founding story, team names and photos. */}
      <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-ink">
        <p>
          This trade runs on trust, and trust has been its weakest link. Painted
          seeds sold as rudraksha, glass sold as gemstone, "certified" badges
          that link to nothing. We started {site.name} with one operating rule:
          never ask a customer to take our word for anything we can prove
          instead.
        </p>
        <p>
          So every certified piece we dispatch carries a unique certificate code
          from an independent, government-recognised testing lab — and a
          verification page on this website where that code shows you the lab,
          the issue date and the exact product it belongs to. Rudraksha is
          sourced from Nepal and Indonesia and inspected bead by bead;
          gemstones are natural, with treatments disclosed on the certificate;
          vastu items are solid copper and brass, not plated zinc.
        </p>
        <p>
          The rituals matter to us too. Rudraksha and yantras are cleansed and
          energised in the traditional way before they're packed. And we
          describe every product honestly — by its traditional and cultural
          associations, never as a guaranteed outcome, and never as a
          substitute for a doctor, a therapist or sound financial advice.
        </p>
        <p>
          If you're unsure what to choose, our AI guide will ask you three
          questions and explain its reasoning. If you'd rather talk to a
          person, we're one WhatsApp message away.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3 pb-12">
        <Link href="/verify-certificate" className="btn btn-primary">
          Verify a certificate
        </Link>
        <Link href="/recommend" className="btn btn-outline">
          Ask the AI guide
        </Link>
      </div>
    </div>
  );
}
