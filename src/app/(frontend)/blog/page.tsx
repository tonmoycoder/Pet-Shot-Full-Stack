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
      depth: 1
    });
    blogs = blogRes.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      excerpt: doc.excerpt,
      coverImage: doc.coverImage,
      publishedAt: doc.publishedAt,
    }));
  } catch (error) {
    console.error("Failed to fetch blogs", error);
  }

  return <BlogClient blogs={blogs} />;
}
