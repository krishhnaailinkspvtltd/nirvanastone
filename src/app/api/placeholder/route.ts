import { NextRequest } from "next/server";

/**
 * Designed SVG placeholder art for every product-image slot.
 * Real photography replaces these URLs in src/data/products.ts with zero
 * layout changes (grid slots are 1:1, PDP gallery 4:5 — same as the
 * dimensions real photos must ship in).
 *
 * ?kind=rudraksha|gem|crystal|pyramid|yantra|tree|tortoise|zodiac|combo
 * ?label=<product name>   ?ratio=square|portrait
 */

const MAROON = "#5b1d22";
const GOLD = "#a97e2f";
const GOLD_SOFT = "#d3b878";
const CREAM = "#faf5ec";

function beadRow(cx: number, cy: number): string {
  // A gentle arc of rudraksha beads with a guru bead at centre.
  let out = "";
  const n = 7;
  for (let i = 0; i < n; i++) {
    const t = (i - (n - 1) / 2) / ((n - 1) / 2); // -1..1
    const x = cx + t * 240;
    const y = cy + 70 * t * t - 30;
    const r = i === Math.floor(n / 2) ? 48 : 34;
    out += `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${MAROON}" stroke-width="5"/>`;
    // mukhi ridge lines
    for (const dx of [-0.45, 0, 0.45]) {
      out += `<path d="M ${x + dx * r} ${y - r * 0.82} Q ${x + dx * r * 1.5} ${y} ${x + dx * r} ${y + r * 0.82}" fill="none" stroke="${GOLD}" stroke-width="3"/>`;
    }
  }
  return out;
}

function gem(cx: number, cy: number): string {
  const w = 260, crown = 90, pav = 190;
  return `
  <g stroke="${MAROON}" stroke-width="5" fill="none" stroke-linejoin="round">
    <path d="M ${cx - w / 2} ${cy - crown} L ${cx - w / 4} ${cy - crown - 70} L ${cx + w / 4} ${cy - crown - 70} L ${cx + w / 2} ${cy - crown} L ${cx} ${cy + pav - 60} Z"/>
    <path d="M ${cx - w / 2} ${cy - crown} L ${cx + w / 2} ${cy - crown}" stroke="${GOLD}" stroke-width="3.5"/>
    <path d="M ${cx - w / 4} ${cy - crown - 70} L ${cx - w / 8} ${cy - crown} L ${cx} ${cy - crown - 70} L ${cx + w / 8} ${cy - crown} L ${cx + w / 4} ${cy - crown - 70}" stroke="${GOLD}" stroke-width="3.5"/>
    <path d="M ${cx - w / 2} ${cy - crown} L ${cx - w / 8} ${cy - crown} L ${cx} ${cy + pav - 60}" stroke="${GOLD}" stroke-width="3.5"/>
    <path d="M ${cx + w / 2} ${cy - crown} L ${cx + w / 8} ${cy - crown} L ${cx} ${cy + pav - 60}" stroke="${GOLD}" stroke-width="3.5"/>
  </g>`;
}

function braceletRing(cx: number, cy: number): string {
  let out = "";
  const n = 14, R = 150;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const x = cx + R * Math.cos(a);
    const y = cy + R * Math.sin(a);
    out += `<circle cx="${x}" cy="${y}" r="30" fill="none" stroke="${MAROON}" stroke-width="5"/>`;
    out += `<circle cx="${x}" cy="${y}" r="12" fill="none" stroke="${GOLD_SOFT}" stroke-width="3"/>`;
  }
  return out;
}

function pyramid(cx: number, cy: number): string {
  return `
  <g stroke="${MAROON}" stroke-width="5" fill="none" stroke-linejoin="round">
    <path d="M ${cx} ${cy - 170} L ${cx - 190} ${cy + 110} L ${cx + 190} ${cy + 110} Z"/>
    <path d="M ${cx} ${cy - 170} L ${cx + 40} ${cy + 110}" stroke="${GOLD}" stroke-width="3.5"/>
    <path d="M ${cx - 250} ${cy + 150} h 500" stroke="${GOLD_SOFT}" stroke-width="3"/>
    <path d="M ${cx - 90} ${cy + 40} h 180" stroke="${GOLD_SOFT}" stroke-width="3"/>
  </g>`;
}

function yantra(cx: number, cy: number): string {
  const R = 175;
  let petals = "";
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const x1 = cx + R * Math.cos(a), y1 = cy + R * Math.sin(a);
    const x2 = cx + (R + 22) * Math.cos(a), y2 = cy + (R + 22) * Math.sin(a);
    petals += `<path d="M ${x1} ${y1} L ${x2} ${y2}" stroke="${GOLD}" stroke-width="3.5"/>`;
  }
  const t = 130;
  return `
  <g fill="none">
    <circle cx="${cx}" cy="${cy}" r="${R}" stroke="${MAROON}" stroke-width="5"/>
    <circle cx="${cx}" cy="${cy}" r="${R - 30}" stroke="${GOLD_SOFT}" stroke-width="3"/>
    ${petals}
    <path d="M ${cx} ${cy - t} L ${cx - t * 0.87} ${cy + t / 2} L ${cx + t * 0.87} ${cy + t / 2} Z" stroke="${MAROON}" stroke-width="5"/>
    <path d="M ${cx} ${cy + t} L ${cx - t * 0.87} ${cy - t / 2} L ${cx + t * 0.87} ${cy - t / 2} Z" stroke="${MAROON}" stroke-width="5"/>
    <circle cx="${cx}" cy="${cy}" r="9" fill="${GOLD}"/>
  </g>`;
}

function tree(cx: number, cy: number): string {
  let leaves = "";
  const spots = [
    [-120, -90], [-60, -150], [10, -170], [80, -140], [130, -80],
    [-90, -40], [-20, -110], [50, -70], [110, -20], [-140, -10], [0, -40],
  ];
  for (const [dx, dy] of spots) {
    leaves += `<circle cx="${cx + dx}" cy="${cy + dy}" r="20" fill="none" stroke="${GOLD}" stroke-width="4"/>`;
  }
  return `
  <g fill="none" stroke-linecap="round">
    ${leaves}
    <path d="M ${cx} ${cy + 150} C ${cx - 10} ${cy + 60} ${cx + 14} ${cy + 30} ${cx} ${cy - 20}" stroke="${MAROON}" stroke-width="7"/>
    <path d="M ${cx} ${cy + 20} C ${cx - 40} ${cy - 10} ${cx - 80} ${cy - 30} ${cx - 100} ${cy - 60}" stroke="${MAROON}" stroke-width="5"/>
    <path d="M ${cx} ${cy} C ${cx + 40} ${cy - 30} ${cx + 80} ${cy - 40} ${cx + 105} ${cy - 55}" stroke="${MAROON}" stroke-width="5"/>
    <path d="M ${cx - 130} ${cy + 170} Q ${cx} ${cy + 120} ${cx + 130} ${cy + 170}" stroke="${MAROON}" stroke-width="5"/>
  </g>`;
}

function tortoise(cx: number, cy: number): string {
  return `
  <g fill="none" stroke="${MAROON}" stroke-width="5">
    <ellipse cx="${cx}" cy="${cy}" rx="180" ry="110"/>
    <path d="M ${cx - 180} ${cy + 40} Q ${cx} ${cy + 140} ${cx + 180} ${cy + 40}" />
    <ellipse cx="${cx + 205}" cy="${cy - 10}" rx="38" ry="30"/>
    <path d="M ${cx - 110} ${cy - 70} L ${cx - 60} ${cy + 60} M ${cx - 10} ${cy - 108} L ${cx - 10} ${cy + 85} M ${cx + 90} ${cy - 80} L ${cx + 45} ${cy + 65}" stroke="${GOLD}" stroke-width="3.5"/>
    <path d="M ${cx - 150} ${cy - 45} Q ${cx} ${cy - 130} ${cx + 150} ${cy - 45}" stroke="${GOLD}" stroke-width="3.5"/>
  </g>`;
}

function zodiacArt(cx: number, cy: number): string {
  const R = 170;
  let ticks = "";
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ticks += `<path d="M ${cx + (R - 18) * Math.cos(a)} ${cy + (R - 18) * Math.sin(a)} L ${cx + R * Math.cos(a)} ${cy + R * Math.sin(a)}" stroke="${GOLD}" stroke-width="4"/>`;
  }
  let star = "";
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? 90 : 38;
    star += `${i === 0 ? "M" : "L"} ${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)} `;
  }
  return `
  <g fill="none">
    <circle cx="${cx}" cy="${cy}" r="${R}" stroke="${MAROON}" stroke-width="5"/>
    ${ticks}
    <path d="${star}Z" stroke="${MAROON}" stroke-width="5" stroke-linejoin="round"/>
  </g>`;
}

function combo(cx: number, cy: number): string {
  return `
  <g fill="none" stroke-width="5">
    <circle cx="${cx - 110}" cy="${cy - 20}" r="85" stroke="${MAROON}"/>
    <path d="M ${cx + 60} ${cy - 130} L ${cx - 10} ${cy - 30} L ${cx + 130} ${cy - 30} Z" stroke="${GOLD}"/>
    <rect x="${cx - 30}" y="${cy + 20}" width="150" height="110" rx="10" stroke="${MAROON}"/>
    <circle cx="${cx + 45}" cy="${cy + 75}" r="26" stroke="${GOLD_SOFT}" stroke-width="4"/>
  </g>`;
}

function mala(cx: number, cy: number): string {
  // Long teardrop loop of beads with a guru bead + tassel at the bottom.
  let out = "";
  const n = 18;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const rx = 140, ry = 185;
    const x = cx + rx * Math.sin(a + Math.PI);
    const y = cy - 30 + ry * Math.cos(a + Math.PI);
    out += `<circle cx="${x}" cy="${y}" r="20" fill="none" stroke="${MAROON}" stroke-width="4.5"/>`;
  }
  out += `<circle cx="${cx}" cy="${cy + 165}" r="30" fill="none" stroke="${GOLD}" stroke-width="5"/>`;
  out += `<path d="M ${cx} ${cy + 195} l -18 55 M ${cx} ${cy + 195} l 0 60 M ${cx} ${cy + 195} l 18 55" stroke="${GOLD}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  return out;
}

function pendant(cx: number, cy: number): string {
  return `
  <g fill="none" stroke-linecap="round">
    <path d="M ${cx - 170} ${cy - 150} Q ${cx} ${cy - 40} ${cx + 170} ${cy - 150}" stroke="${MAROON}" stroke-width="5"/>
    <circle cx="${cx}" cy="${cy - 62}" r="16" stroke="${GOLD}" stroke-width="4"/>
    <path d="M ${cx - 55} ${cy + 10} L ${cx} ${cy - 40} L ${cx + 55} ${cy + 10} L ${cx + 34} ${cy + 105} L ${cx - 34} ${cy + 105} Z" stroke="${MAROON}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M ${cx - 55} ${cy + 10} h 110 M ${cx} ${cy - 40} L ${cx} ${cy + 105}" stroke="${GOLD}" stroke-width="3"/>
  </g>`;
}

function anklet(cx: number, cy: number): string {
  let beads = "";
  for (let i = 0; i < 9; i++) {
    const t = (i - 4) / 4;
    const x = cx + t * 200;
    const y = cy + 40 - 70 * (1 - t * t);
    beads += `<circle cx="${x}" cy="${y}" r="16" fill="none" stroke="${MAROON}" stroke-width="4.5"/>`;
  }
  return `
  <g fill="none" stroke-linecap="round">
    <path d="M ${cx - 230} ${cy + 55} Q ${cx} ${cy - 90} ${cx + 230} ${cy + 55}" stroke="${GOLD_SOFT}" stroke-width="3.5"/>
    ${beads}
    <path d="M ${cx} ${cy + 42} l 0 40 m -14 -6 l 14 10 l 14 -10" stroke="${GOLD}" stroke-width="4"/>
  </g>`;
}

function murti(cx: number, cy: number): string {
  return `
  <g fill="none" stroke-linejoin="round" stroke-linecap="round">
    <path d="M ${cx - 150} ${cy + 150} h 300 M ${cx - 120} ${cy + 150} v -30 h 240 v 30" stroke="${MAROON}" stroke-width="5"/>
    <path d="M ${cx - 130} ${cy - 60} Q ${cx} ${cy - 260} ${cx + 130} ${cy - 60} L ${cx + 130} ${cy + 120} L ${cx - 130} ${cy + 120} Z" stroke="${MAROON}" stroke-width="5"/>
    <circle cx="${cx}" cy="${cy - 20}" r="46" stroke="${GOLD}" stroke-width="4"/>
    <path d="M ${cx - 60} ${cy + 95} Q ${cx} ${cy + 30} ${cx + 60} ${cy + 95}" stroke="${GOLD}" stroke-width="4"/>
    <path d="M ${cx} ${cy - 130} l -12 22 h 24 Z" stroke="${GOLD}" stroke-width="3.5"/>
  </g>`;
}

function frame(cx: number, cy: number): string {
  return `
  <g fill="none" stroke-linejoin="round">
    <rect x="${cx - 190}" y="${cy - 150}" width="380" height="300" stroke="${MAROON}" stroke-width="6"/>
    <rect x="${cx - 160}" y="${cy - 120}" width="320" height="240" stroke="${GOLD_SOFT}" stroke-width="3"/>
    <path d="M ${cx - 120} ${cy + 60} q 30 -70 60 0 q 30 -70 60 0 q 30 -70 60 0" stroke="${GOLD}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy - 45}" r="34" stroke="${MAROON}" stroke-width="4.5"/>
  </g>`;
}

function ring(cx: number, cy: number): string {
  return `
  <g fill="none">
    <circle cx="${cx}" cy="${cy + 30}" r="115" stroke="${MAROON}" stroke-width="7"/>
    <circle cx="${cx}" cy="${cy + 30}" r="98" stroke="${GOLD_SOFT}" stroke-width="3"/>
    <path d="M ${cx - 44} ${cy - 85} L ${cx} ${cy - 150} L ${cx + 44} ${cy - 85} L ${cx} ${cy - 45} Z" stroke="${GOLD}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M ${cx - 44} ${cy - 85} h 88" stroke="${GOLD}" stroke-width="3"/>
  </g>`;
}

function perfume(cx: number, cy: number): string {
  return `
  <g fill="none" stroke-linejoin="round">
    <rect x="${cx - 100}" y="${cy - 60}" width="200" height="210" rx="26" stroke="${MAROON}" stroke-width="5.5"/>
    <rect x="${cx - 34}" y="${cy - 130}" width="68" height="70" stroke="${MAROON}" stroke-width="5"/>
    <rect x="${cx - 46}" y="${cy - 170}" width="92" height="40" rx="8" stroke="${GOLD}" stroke-width="4.5"/>
    <circle cx="${cx}" cy="${cy + 45}" r="45" stroke="${GOLD}" stroke-width="3.5"/>
    <path d="M ${cx - 18} ${cy + 45} l 12 12 l 24 -26" stroke="${GOLD}" stroke-width="3.5" stroke-linecap="round"/>
  </g>`;
}

function tumble(cx: number, cy: number): string {
  return `
  <g fill="none" stroke-width="5" stroke-linejoin="round">
    <path d="M ${cx - 150} ${cy + 60} q -20 -80 55 -95 q 20 -55 85 -40 q 70 -15 90 45 q 55 25 25 85 q -15 60 -85 55 q -60 35 -110 -5 q -70 5 -60 -45 Z" stroke="${MAROON}"/>
    <path d="M ${cx - 60} ${cy - 40} q 40 -18 80 5 M ${cx - 95} ${cy + 30} q 60 40 150 5" stroke="${GOLD}" stroke-width="3.5"/>
  </g>`;
}

function tower(cx: number, cy: number): string {
  return `
  <g fill="none" stroke-linejoin="round">
    <path d="M ${cx - 55} ${cy + 150} L ${cx - 38} ${cy - 95} L ${cx} ${cy - 175} L ${cx + 38} ${cy - 95} L ${cx + 55} ${cy + 150} Z" stroke="${MAROON}" stroke-width="5.5"/>
    <path d="M ${cx - 38} ${cy - 95} h 76 M ${cx - 48} ${cy + 40} h 96" stroke="${GOLD}" stroke-width="3.5"/>
    <path d="M ${cx - 110} ${cy + 150} h 220" stroke="${GOLD_SOFT}" stroke-width="4"/>
  </g>`;
}

const ART: Record<string, (cx: number, cy: number) => string> = {
  rudraksha: beadRow,
  gem,
  crystal: braceletRing,
  pyramid,
  yantra,
  tree,
  tortoise,
  zodiac: zodiacArt,
  combo,
  mala,
  pendant,
  anklet,
  murti,
  frame,
  ring,
  perfume,
  tumble,
  tower,
};

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const kind = sp.get("kind") ?? "crystal";
  const raw = (sp.get("label") ?? "Product").slice(0, 60);
  const label = raw.length > 40 ? raw.slice(0, 38).trimEnd() + "…" : raw;
  const labelSize = label.length > 30 ? 38 : label.length > 22 ? 44 : 52;
  const ratio = sp.get("ratio") === "portrait" ? "portrait" : "square";
  const W = 1200;
  const H = ratio === "portrait" ? 1500 : 1200;
  const cx = W / 2;
  const cy = H / 2 - 60;
  const draw = ART[kind] ?? braceletRing;
  const showTag = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_TAG !== "false";

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="${CREAM}"/>
      <stop offset="100%" stop-color="#efe5cf"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="36" y="36" width="${W - 72}" height="${H - 72}" fill="none" stroke="${GOLD_SOFT}" stroke-width="2"/>
  ${draw(cx, cy)}
  <text x="${cx}" y="${H - 190}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${labelSize}" fill="${MAROON}">${esc(label)}</text>
  <text x="${cx}" y="${H - 130}" text-anchor="middle" font-family="Verdana, sans-serif" font-size="26" letter-spacing="6" fill="${GOLD}">PRODUCT PHOTO PENDING</text>
  ${
    showTag
      ? `<g><rect x="${W - 330}" y="60" width="270" height="54" rx="27" fill="${MAROON}"/><text x="${W - 195}" y="95" text-anchor="middle" font-family="Verdana, sans-serif" font-size="24" letter-spacing="4" fill="${CREAM}">PLACEHOLDER</text></g>`
      : ""
  }
</svg>`;

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": "public, max-age=86400, immutable",
    },
  });
}
