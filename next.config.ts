import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.postimg.cc" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "web.pdx.edu" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "*.supabase.in" },
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      // Allow any HTTPS hostname for CMS-stored image URLs
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
            // Note: unsafe-inline is required for Payload CMS and some Next.js dev features
            // unsafe-eval is sometimes required for Payload rich text editors in dev mode
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://i.postimg.cc https://images.pexels.com https://images.unsplash.com https://web.pdx.edu https://*.supabase.co https://*.gravatar.com https://secure.gravatar.com; font-src 'self'; connect-src 'self' https://vitals.vercel-insights.com; frame-src 'self' https://www.google.com https://www.youtube.com;",
          },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
