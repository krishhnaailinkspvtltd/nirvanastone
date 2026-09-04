/** Exactly four badges, shown once per page — never repeated down the page. */
const BADGES = [
  {
    title: "Lab certified",
    line: "Verifiable certificate with every certified piece",
    icon: (
      <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8z" />
    ),
  },
  {
    title: "Energised before dispatch",
    line: "Traditional ritual for rudraksha & yantras",
    icon: (
      <path d="M13 2L4.5 13.5H11L9.5 22 19 10h-6.5z" />
    ),
  },
  {
    title: "7-day replacement",
    line: "Damaged or wrong item? Replaced, no questions",
    icon: (
      <path d="M12 3a9 9 0 109 9h-2.5A6.5 6.5 0 1112 5.5V9l5-4-5-4z" />
    ),
  },
  {
    title: "COD + fast delivery",
    line: "Cash on delivery on eligible pincodes",
    icon: (
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7zM6 18.5A1.5 1.5 0 117.5 17 1.5 1.5 0 016 18.5zm11 0A1.5 1.5 0 1118.5 17 1.5 1.5 0 0117 18.5z" />
    ),
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Why shop with us"
      className="grid grid-cols-2 gap-4 rounded-2xl border border-sand bg-parchment/60 p-5 sm:grid-cols-4 sm:gap-6 sm:p-6"
    >
      {BADGES.map((b) => (
        <div key={b.title} className="flex flex-col items-center gap-2 text-center">
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden className="fill-gold">
            {b.icon}
          </svg>
          <p className="text-sm font-bold leading-tight text-maroon-deep">{b.title}</p>
          <p className="text-xs leading-snug text-mist">{b.line}</p>
        </div>
      ))}
    </section>
  );
}
