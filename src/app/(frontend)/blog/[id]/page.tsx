import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { notFound } from 'next/navigation';
import { BlogDetailClient } from './blog-detail-client';
import { BlogPostingJsonLd, BreadcrumbJsonLd } from '@/components/seo/structured-data';

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
    const description = blog.excerpt?.bn || blog.excerpt?.en || "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম - পোষা পাখি ও অ্যাকোয়ারিয়াম যত্ন টিপস ও গাইড।";
    
    let imageUrl = '';
    if (blog.coverImage && typeof blog.coverImage === 'object' && blog.coverImage.url) {
      imageUrl = blog.coverImage.url;
    }

    return {
      title,
      description,
      alternates: {
        canonical: `/blog/${resolvedParams.id}`,
      },
      openGraph: {
        title: `${title} | Bismillah Pakhi & Aquarium`,
        description,
        type: 'article',
        url: `/blog/${resolvedParams.id}`,
        ...(imageUrl && { images: [imageUrl] }),
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} | Bismillah Pakhi & Aquarium`,
        description,
        ...(imageUrl && { images: [imageUrl] }),
      },
    };
  } catch (error) {
    return {
      title: 'ব্লগ বিস্তারিত',
      alternates: {
        canonical: `/blog/${resolvedParams.id}`,
      },
    };
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

  const blogTitle = blog.title?.bn || blog.title?.en || 'ব্লগ পোস্ট';

  return (
    <>
      <BlogPostingJsonLd blog={blog} />
      <BreadcrumbJsonLd
        items={[
          { name: "হোম", url: "/" },
          { name: "ব্লগ ও পরামর্শ", url: "/blog" },
          { name: blogTitle, url: `/blog/${resolvedParams.id}` },
        ]}
      />
      <BlogDetailClient blog={blog} />
    </>
  );
}
