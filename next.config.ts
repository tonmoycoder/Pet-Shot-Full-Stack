import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // --- Payload CMS / own domain ---
      { protocol: "https", hostname: "**.vercel.app" },
      { protocol: "https", hostname: "bismillahpakhi.com" },
      { protocol: "https", hostname: "www.bismillahpakhi.com" },
      // --- Image CDNs & stock photography ---
      { protocol: "https", hostname: "i.postimg.cc" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "pixabay.com" },
      // --- ImgBB (popular free image hosting used in blogs) ---
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "ibb.co" },
      // --- Wikipedia / Wikimedia ---
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
      { protocol: "https", hostname: "en.wikipedia.org" },
      // --- Wildlife / Aquarium / Pet content sites ---
      { protocol: "https", hostname: "www.wildlifeexplained.com" },
      { protocol: "https", hostname: "wildlifeexplained.com" },
      { protocol: "https", hostname: "aquariumscience.org" },
      { protocol: "https", hostname: "www.aquariumscience.org" },
      // --- Shopify CDN (pet product suppliers) ---
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "**.shopifycdn.com" },
      // --- Google / Social ---
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
      // --- Supabase storage ---
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.supabase.in" },
      // --- Cloud storage & CDNs ---
      { protocol: "https", hostname: "web.pdx.edu" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "**.cloudfront.net" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.imgix.net" },
      // --- Catch-all: allows ANY future HTTPS hostname added via CMS ---
      { protocol: "https", hostname: "**" },

    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            // CRITICAL FIX: img-src now allows ALL HTTPS sources (https:)
            // Previous value was a strict allowlist that blocked every external
            // CMS image URL (wildlifeexplained.com, aquariumscience.org,
            // cdn.shopify.com, Pixabay, Wikimedia, etc.) in production.
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://api.resend.com https://bismillahpakhiandaquarium.vercel.app",

              "frame-src 'self' https://www.google.com https://www.youtube.com https://maps.google.com",
              "media-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
