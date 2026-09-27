import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'], // Protect Payload CMS admin and raw API routes
    },
    sitemap: 'https://bismillahpakhi.com/sitemap.xml',
  };
}
