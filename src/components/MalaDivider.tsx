/**
 * Signature element: a mala-strand divider — small beads with a guru bead
 * at centre, used wherever a section break needs marking.
 */
export function MalaDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center gap-2.5 ${className}`}
    >
      <span className="h-px w-10 bg-gold-soft sm:w-16" />
      {[4, 5, 6].map((s) => (
        <span
          key={`l${s}`}
          className="rounded-full bg-gold-soft"
          style={{ width: s, height: s }}
        />
      ))}
      <span className="h-2.5 w-2.5 rounded-full border-2 border-gold bg-cream" />
      {[6, 5, 4].map((s) => (
        <span
          key={`r${s}`}
          className="rounded-full bg-gold-soft"
          style={{ width: s, height: s }}
        />
      ))}
      <span className="h-px w-10 bg-gold-soft sm:w-16" />
    </div>
  );
}
