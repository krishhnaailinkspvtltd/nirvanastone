import Link from "next/link";
import { MalaDivider } from "@/components/MalaDivider";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-deep">
        This page has wandered off
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-mist">
        The link may be old, or the product may have moved. The collection — and
        the AI guide — are right here.
      </p>
      <MalaDivider className="mt-5" />
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="btn btn-primary">Go home</Link>
        <Link href="/recommend" className="btn btn-outline">Ask the AI guide</Link>
      </div>
    </div>
  );
}
