import { MetadataRoute } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bismillahpakhi.com';
  
  const payload = await getPayload({ config });

  // Fetch blogs
  const blogs = await payload.find({
    collection: 'blogs',
    limit: 1000,
  });

  // Fetch animals
  const animals = await payload.find({
    collection: 'animals',
    limit: 1000,
  });

  // Fetch products
  const products = await payload.find({
    collection: 'products',
    limit: 1000,
  });

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/animals`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Add blogs to sitemap
  blogs.docs.forEach((blog) => {
    sitemapEntries.push({
      url: `${baseUrl}/blog/${blog.id}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Add animals to sitemap
  animals.docs.forEach((animal) => {
    sitemapEntries.push({
      url: `${baseUrl}/animals/${animal.id}`,
      lastModified: animal.updatedAt ? new Date(animal.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Add products to sitemap
  products.docs.forEach((product) => {
    sitemapEntries.push({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  return sitemapEntries;
}
