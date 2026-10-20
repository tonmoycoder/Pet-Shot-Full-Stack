import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { notFound } from 'next/navigation';
import { BlogDetailClient } from './blog-detail-client';
import { BlogPostingJsonLd, BreadcrumbJsonLd } from '@/components/seo/structured-data';
import { getFallbackBlogById } from '@/lib/data-fallback';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  try {
    const payload = await getPayload({ config: configPromise });
    const blog = await payload.findByID({
      collection: 'blogs',
      id: resolvedParams.id,
    });
    
    const rawTitle = blog.title?.bn || blog.title?.en || 'ব্লগ';
    const cleanTitle = rawTitle.replace(/\s*[\|\-]\s*(?:Bismillah.*|Journal.*)$/i, "").trim();
    const shortMetaTitle = cleanTitle.length > 40 ? `${cleanTitle.slice(0, 39).trim()}…` : cleanTitle;
    const description = blog.excerpt?.bn || blog.excerpt?.en || "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম - পোষা পাখি ও অ্যাকোয়ারিয়াম যত্ন টিপস ও গাইড।";
    
    let imageUrl = '';
    if (blog.coverImage && typeof blog.coverImage === 'object' && blog.coverImage.url) {
      imageUrl = blog.coverImage.url;
    }

    return {
      title: shortMetaTitle,
      description,
      alternates: {
        canonical: `/blog/${resolvedParams.id}`,
      },
      openGraph: {
        title: `${cleanTitle} | Bismillah Pakhi & Aquarium`,
        description,
        type: 'article',
        url: `/blog/${resolvedParams.id}`,
        ...(imageUrl && { images: [imageUrl] }),
      },
      twitter: {
        card: 'summary_large_image',
        title: `${cleanTitle} | Bismillah Pakhi & Aquarium`,
        description,
        ...(imageUrl && { images: [imageUrl] }),
      },
    };
  } catch {
    const fallback = getFallbackBlogById(resolvedParams.id);
    const rawTitle = fallback ? (fallback.title?.bn || fallback.title?.en || 'ব্লগ বিস্তারিত') : 'ব্লগ বিস্তারিত';
    const cleanTitle = rawTitle.replace(/\s*[\|\-]\s*(?:Bismillah.*|Journal.*)$/i, "").trim();
    const shortMetaTitle = cleanTitle.length > 40 ? `${cleanTitle.slice(0, 39).trim()}…` : cleanTitle;
    const description = fallback ? fallback.excerpt.bn : 'বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম চুয়াডাঙ্গা।';
    const imageUrl = fallback?.coverImage && typeof fallback.coverImage === 'object' ? fallback.coverImage.url : '';
    return {
      title: shortMetaTitle,
      description,
      alternates: {
        canonical: `/blog/${resolvedParams.id}`,
      },
      openGraph: {
        title: `${cleanTitle} | Bismillah Pakhi & Aquarium`,
        description,
        type: 'article',
        url: `/blog/${resolvedParams.id}`,
        ...(imageUrl && { images: [imageUrl] }),
      },
      twitter: {
        card: 'summary_large_image',
        title: `${cleanTitle} | Bismillah Pakhi & Aquarium`,
        description,
        ...(imageUrl && { images: [imageUrl] }),
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
    console.warn("Failed to fetch blog post from Payload, checking fallback:", error);
  }

  if (!blog) {
    blog = getFallbackBlogById(resolvedParams.id);
  }

  if (!blog) notFound();

  const rawTitle = blog.title?.bn || blog.title?.en || 'ব্লগ পোস্ট';
  const cleanTitle = rawTitle.replace(/\s*[\|\-]\s*(?:Bismillah.*|Journal.*)$/i, "").trim();

  const blogForSchema = {
    ...blog,
    title: {
      bn: (blog.title?.bn || cleanTitle).replace(/\s*[\|\-]\s*(?:Bismillah.*|Journal.*)$/i, "").trim(),
      en: (blog.title?.en || cleanTitle).replace(/\s*[\|\-]\s*(?:Bismillah.*|Journal.*)$/i, "").trim(),
    }
  };

  return (
    <>
      <BlogPostingJsonLd blog={blogForSchema} />
      <BreadcrumbJsonLd
        items={[
          { name: "হোম", url: "/" },
          { name: "ব্লগ ও পরামর্শ", url: "/blog" },
          { name: cleanTitle, url: `/blog/${resolvedParams.id}` },
        ]}
      />
      <BlogDetailClient blog={blogForSchema} />
    </>
  );
}
