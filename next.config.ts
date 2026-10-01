import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Optimize device sizes - focus on real breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 7-day cache for optimized images
    minimumCacheTTL: 60 * 60 * 24 * 7,
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
      // --- ImgBB ---
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
      // --- Shopify CDN ---
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
      // --- Catch-all ---
      { protocol: "https", hostname: "**" },
    ],
  },
  async headers() {
    return [
      // 1-week caching for public static images
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
      // Security + CSP for all routes
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
