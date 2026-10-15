import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { notFound } from 'next/navigation';
import { BlogDetailClient } from './blog-detail-client';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  try {
    const payload = await getPayload({ config: configPromise });
    const blog = await payload.findByID({
      collection: 'blogs',
      id: resolvedParams.id,
    });
    
    const title = blog.title?.bn || blog.title?.en || 'ব্লগ বিস্তারিত';
    const description = blog.excerpt?.bn || blog.excerpt?.en || "Read our latest journal post.";
    
    let imageUrl = '';
    if (blog.coverImage && typeof blog.coverImage === 'object' && blog.coverImage.url) {
      imageUrl = blog.coverImage.url;
    }

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        ...(imageUrl && { images: [imageUrl] }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(imageUrl && { images: [imageUrl] }),
      },
    };
  } catch (error) {
    return { title: 'ব্লগ বিস্তারিত' };
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  let blog: any = null;

  try {
    const payload = await getPayload({ config: configPromise });
    blog = await payload.findByID({
      collection: 'blogs',
      id: resolvedParams.id,
    });
  } catch (error) {
    console.error("Failed to fetch blog post", error);
    notFound();
  }

  if (!blog) notFound();

  return <BlogDetailClient blog={blog} />;
}
