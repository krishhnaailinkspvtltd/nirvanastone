import type { Metadata } from "next";
import { MalaDivider } from "@/components/MalaDivider";
import { site, whatsappLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: "WhatsApp-first support for orders, products and certificates.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 text-center">
      <h1 className="font-display text-3xl font-semibold text-maroon-deep sm:text-4xl">
        Talk to us
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist">
        WhatsApp is the fastest way to reach us — order help, product questions,
        sizing, certificates, anything. We typically reply within business hours,
        7 days a week.
      </p>
      <MalaDivider className="mt-5" />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href={whatsappLink("Namaste! I have a question.")}
          target="_blank"
          rel="noopener noreferrer"
          className="lift rounded-2xl border border-sand bg-parchment p-6"
        >
          <p className="font-display text-xl text-maroon-deep">WhatsApp</p>
          <p className="mt-1 text-sm text-mist">Fastest — tap to start a chat</p>
          <p className="mt-3 text-sm font-bold text-[#128C4A]">
            +{site.whatsappNumber}
          </p>
        </a>
        <a
          href={`mailto:${site.supportEmail}`}
          className="lift rounded-2xl border border-sand bg-parchment p-6"
        >
          <p className="font-display text-xl text-maroon-deep">Email</p>
          <p className="mt-1 text-sm text-mist">For detailed queries & documents</p>
          <p className="mt-3 text-sm font-bold text-gold">{site.supportEmail}</p>
        </a>
      </div>

      <p className="mt-8 text-xs text-mist">
        {site.legalName} · {site.address}
      </p>
      <div className="h-12" />
    </div>
  );
}
