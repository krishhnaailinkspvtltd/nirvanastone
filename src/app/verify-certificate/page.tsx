"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { MalaDivider } from "@/components/MalaDivider";
import { whatsappLink } from "@/config/site";

interface CertResult {
  code: string;
  lab_name: string;
  issue_date: string;
  pdf_url: string | null;
  product: { name: string; slug: string; image: { url: string; alt: string; is_placeholder: boolean } } | null;
}

function VerifyInner() {
  const params = useSearchParams();
  const prefill = params.get("code") ?? "";
  const [code, setCode] = useState(prefill);
  const [state, setState] = useState<"idle" | "loading" | "found" | "notfound" | "error">("idle");
  const [cert, setCert] = useState<CertResult | null>(null);

  const verify = useCallback(async (c: string) => {
    if (!c.trim()) return;
    setState("loading");
    setCert(null);
    try {
      const res = await fetch(`/api/verify-certificate?code=${encodeURIComponent(c.trim())}`);
      const data = await res.json();
      if (data.ok && data.found) {
        setCert(data.certificate);
        setState("found");
      } else if (data.ok) {
        setState("notfound");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }, []);

  // Auto-verify when arriving from a product page's certificate badge.
  useEffect(() => {
    if (prefill) verify(prefill);
  }, [prefill, verify]);

  return (
    <div className="mx-auto max-w-2xl px-4 pt-10">
      <header className="text-center">
        <p className="eyebrow">Authenticity, provable</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-deep sm:text-4xl">
          Verify your certificate
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist">
          Every certified piece ships with a unique code (and a QR on the box that
          opens this page). Enter it below to see the lab, issue date and the exact
          product it belongs to.
        </p>
        <MalaDivider className="mt-5" />
      </header>

      <form
        className="mt-8 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          verify(code);
        }}
      >
        <input
          className="field !py-3 text-center font-mono uppercase tracking-widest"
          placeholder="NRV-2026-00000"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          aria-label="Certificate code"
        />
        <button type="submit" className="btn btn-primary" disabled={state === "loading"}>
          {state === "loading" ? "Checking…" : "Verify"}
        </button>
      </form>
      <p className="mt-2 text-center text-xs text-mist">
        Demo codes to try: NRV-2026-00001 · NRV-2026-00042 · NRV-2026-00107
      </p>

      {state === "found" && cert && (
        <section className="mt-8 overflow-hidden rounded-2xl border-2 border-gold bg-parchment" aria-live="polite">
          <p className="bg-gold px-4 py-2 text-center text-sm font-bold text-[#2b1608]">
            ✓ Genuine certificate on record
          </p>
          <div className="flex gap-4 p-5">
            {cert.product && (
              <Link href={`/products/${cert.product.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-parchment">
                <Image
                  src={cert.product.image.url}
                  alt={cert.product.image.alt}
                  fill
                  sizes="96px"
                  unoptimized={cert.product.image.url.startsWith("/api/")}
                  className="object-cover"
                />
              </Link>
            )}
            <dl className="space-y-1.5 text-sm">
              <div>
                <dt className="inline font-bold text-maroon-deep">Certificate: </dt>
                <dd className="inline font-mono">{cert.code}</dd>
              </div>
              {cert.product && (
                <div>
                  <dt className="inline font-bold text-maroon-deep">Product: </dt>
                  <dd className="inline">
                    <Link href={`/products/${cert.product.slug}`} className="text-maroon underline">
                      {cert.product.name}
                    </Link>
                  </dd>
                </div>
              )}
              <div>
                <dt className="inline font-bold text-maroon-deep">Testing lab: </dt>
                <dd className="inline">{cert.lab_name}</dd>
              </div>
              <div>
                <dt className="inline font-bold text-maroon-deep">Issued: </dt>
                <dd className="inline">
                  {new Date(cert.issue_date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </dd>
              </div>
              {cert.pdf_url && (
                <div className="pt-1">
                  <a href={cert.pdf_url} target="_blank" rel="noopener noreferrer" className="font-bold text-gold underline">
                    View certificate PDF →
                  </a>
                </div>
              )}
            </dl>
          </div>
        </section>
      )}

      {state === "notfound" && (
        <section className="mt-8 rounded-2xl border border-maroon/30 bg-maroon/5 p-5 text-center" aria-live="polite">
          <p className="font-display text-xl text-maroon">No certificate found for that code</p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-mist">
            Double-check the code on your certificate card — letters and numbers
            exactly as printed. If it still doesn't match, contact us immediately:
            a code we didn't issue is something we take seriously.
          </p>
          <a
            href={whatsappLink("Namaste — my certificate code isn't verifying on your website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-4"
          >
            Report on WhatsApp
          </a>
        </section>
      )}

      {state === "error" && (
        <p role="alert" className="mt-8 rounded-xl border border-maroon/30 bg-maroon/5 p-4 text-center text-sm font-bold text-maroon">
          Couldn't check right now — please try again in a moment.
        </p>
      )}
      <div className="h-12" />
    </div>
  );
}

export default function VerifyCertificatePage() {
  return (
    <Suspense>
      <VerifyInner />
    </Suspense>
  );
}
