import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { BlogClient } from './blog-client';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog & Journal - Bismillah Pakhi & Aquarium',
  description: 'Read the latest thoughts, care tips, and news about pets and aquariums.',
};

export default async function BlogPage() {
  let blogs: any[] = [];
  
  try {
    const payload = await getPayload({ config: configPromise });
    const blogRes = await payload.find({
      collection: 'blogs',
      limit: 100,
      sort: '-publishedAt',
      depth: 0  // depth:0 avoids broken media table JOIN on production Supabase
    });
    blogs = blogRes.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      excerpt: doc.excerpt,
      coverImage: null, // depth:0 — no image join (avoids broken media schema on prod)
      publishedAt: doc.publishedAt,
    }));
  } catch (error) {
    console.error("Failed to fetch blogs", error);
  }

  return <BlogClient blogs={blogs} />;
}
