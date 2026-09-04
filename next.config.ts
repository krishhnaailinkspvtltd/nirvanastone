import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for the Docker + Cloudflare Tunnel deploy pattern.
  output: "standalone",
  // LOCAL production builds use their own output dir so running a build
  // never corrupts the dev server's .next cache (mixing the two broke
  // `npm run dev` with ENOENT chunk errors). On Vercel there is no dev
  // server, and its builder expects the default ".next" — so keep it there.
  distDir:
    !process.env.VERCEL && process.env.NODE_ENV === "production"
      ? ".next-prod"
      : ".next",
  images: {
    // Product imagery: free-license Unsplash representative photos (see
    // src/data/photos.ts) + the local /api/placeholder SVG spec-art.
    // When real product photography lands (see catalog/core.ts TODO block),
    // add its CDN / Supabase Storage host here too.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
