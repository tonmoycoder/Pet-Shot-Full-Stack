import { MetadataRoute } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import fs from 'fs';
import path from 'path';

// ISR revalidation: regenerated in background every hour
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null) ||
    'https://bismillahpakhiandaquarium.vercel.app'
  ).replace(/\/+$/, '');

  const now = new Date();
  const entriesMap = new Map<string, MetadataRoute.Sitemap[number]>();

  const addEntry = (entry: MetadataRoute.Sitemap[number]) => {
    // Ensure strict canonical format and deduplicate
    const cleanUrl = entry.url.trim().replace(/\/+$/, '') || baseUrl;
    if (!entriesMap.has(cleanUrl)) {
      entriesMap.set(cleanUrl, {
        ...entry,
        url: cleanUrl,
      });
    }
  };

  // 1. Primary Static Routes
  const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    { path: '', changeFrequency: 'daily', priority: 1.0 },
    { path: '/collection', changeFrequency: 'daily', priority: 0.9 },
    { path: '/blog', changeFrequency: 'daily', priority: 0.9 },
    { path: '/match', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/faq', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/delivery-policy', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/doa-policy', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/terms', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/privacy', changeFrequency: 'monthly', priority: 0.5 },
  ];

  staticRoutes.forEach((route) => {
    addEntry({
      url: `${baseUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  });

  // 2. Category Hub Pages
  const categorySlugs = ['birds', 'aquarium', 'fish', 'food', 'accessories', 'medicine', 'others'];
  categorySlugs.forEach((slug) => {
    addEntry({
      url: `${baseUrl}/categories/${slug}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    });
  });

  // 3. Dynamic CMS Records (Payload Local API with Safe Fallbacks)
  try {
    const payload = await getPayload({ config: configPromise });

    // --- Animals ---
    try {
      const animals = await payload.find({
        collection: 'animals',
        limit: 1000,
        depth: 0,
        where: {
          status: { equals: 'available' },
        },
      });

      if (animals?.docs && animals.docs.length > 0) {
        animals.docs.forEach((animal: any) => {
          if (animal?.id) {
            addEntry({
              url: `${baseUrl}/animals/${animal.id}`,
              lastModified: animal.updatedAt ? new Date(animal.updatedAt) : now,
              changeFrequency: 'weekly',
              priority: 0.85,
            });
          }
        });
      }
    } catch (animalErr) {
      console.warn('[sitemap] Failed to fetch animals from Payload:', animalErr);
    }

    // --- Products ---
    try {
      const products = await payload.find({
        collection: 'products',
        limit: 1000,
        depth: 0,
        where: {
          status: { equals: 'in_stock' },
        },
      });

      if (products?.docs && products.docs.length > 0) {
        products.docs.forEach((product: any) => {
          if (product?.id) {
            addEntry({
              url: `${baseUrl}/products/${product.id}`,
              lastModified: product.updatedAt ? new Date(product.updatedAt) : now,
              changeFrequency: 'weekly',
              priority: 0.85,
            });
          }
        });
      }
    } catch (productErr) {
      console.warn('[sitemap] Failed to fetch products from Payload:', productErr);
    }

    // --- Blogs ---
    try {
      const blogs = await payload.find({
        collection: 'blogs',
        limit: 1000,
        depth: 0,
      });

      if (blogs?.docs && blogs.docs.length > 0) {
        blogs.docs.forEach((blog: any) => {
          if (blog?.id) {
            addEntry({
              url: `${baseUrl}/blog/${blog.id}`,
              lastModified: blog.updatedAt ? new Date(blog.updatedAt) : (blog.publishedAt ? new Date(blog.publishedAt) : now),
              changeFrequency: 'weekly',
              priority: 0.8,
            });
          }
        });
      }
    } catch (blogErr) {
      console.warn('[sitemap] Failed to fetch blogs from Payload:', blogErr);
    }
  } catch (payloadInitErr) {
    console.warn('[sitemap] Payload initialization failed, applying fallback data:', payloadInitErr);
  }

  // 4. Local Static Fallback Check: ensure blog detail pages from blogs_utf8.json are represented
  try {
    const blogsFilePath = path.join(process.cwd(), 'blogs_utf8.json');
    if (fs.existsSync(blogsFilePath)) {
      const rawBlogs = fs.readFileSync(blogsFilePath, 'utf8');
      const fallbackBlogs = JSON.parse(rawBlogs);
      if (Array.isArray(fallbackBlogs)) {
        fallbackBlogs.forEach((blog: any) => {
          if (blog?.id) {
            addEntry({
              url: `${baseUrl}/blog/${blog.id}`,
              lastModified: blog.updatedAt ? new Date(blog.updatedAt) : now,
              changeFrequency: 'weekly',
              priority: 0.8,
            });
          }
        });
      }
    }
  } catch (fsErr) {
    console.warn('[sitemap] Fallback blogs check skipped:', fsErr);
  }

  return Array.from(entriesMap.values());
}
