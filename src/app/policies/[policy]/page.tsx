import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MalaDivider } from "@/components/MalaDivider";
import { policies } from "@/data/policies";

export const dynamicParams = false;

export function generateStaticParams() {
  return policies.map((p) => ({ policy: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ policy: string }>;
}): Promise<Metadata> {
  const { policy } = await params;
  const p = policies.find((x) => x.slug === policy);
  if (!p) return {};
  return { title: p.title };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ policy: string }>;
}) {
  const { policy } = await params;
  const p = policies.find((x) => x.slug === policy);
  if (!p) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 pt-10">
      <header className="text-center">
        <h1 className="font-display text-3xl font-semibold text-maroon-deep sm:text-4xl">
          {p.title}
        </h1>
        <p className="mt-2 text-xs text-mist">
          Last updated{" "}
          {new Date(p.updated).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <MalaDivider className="mt-5" />
      </header>

      {p.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="font-display text-xl font-semibold text-maroon-deep">
            {s.heading}
          </h2>
          {s.body.map((para, i) => (
            <p key={i} className="mt-3 text-[15px] leading-relaxed text-ink">
              {para}
            </p>
          ))}
        </section>
      ))}
      <div className="h-12" />
    </div>
  );
}
