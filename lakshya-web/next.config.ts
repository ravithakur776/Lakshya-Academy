import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Turbopack (default in Next.js 16) ────────────────────────
  turbopack: {},

  // ── Experimental Features ─────────────────────────────────────
  experimental: {
    // Optimize package imports for bundle size
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
    ],
  },

  // ── Image Optimization ────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Supabase Storage
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Gravatar (for admin avatars)
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
      // UI Avatars (fallback)
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
    // Responsive image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ── Security Headers ──────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────────
  async redirects() {
    return [];
  },

  // ── Miscellaneous ─────────────────────────────────────────────
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;
