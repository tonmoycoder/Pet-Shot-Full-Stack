import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { BlogClient } from './blog-client';
import { BreadcrumbJsonLd } from '@/components/seo/structured-data';

export const revalidate = 60;

export const metadata = {
  title: 'ব্লগ ও পরামর্শ (Blog & Journal)',
  description: 'পাখি ও মাছের যত্ন, খাবার তালিকা, অ্যাকোয়ারিয়াম সেটআপ ও রোগ প্রতিরোধ সম্পর্কিত পরামর্শ ও ব্লগ। বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম চুয়াডাঙ্গা।',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'ব্লগ ও পরামর্শ (Blog & Journal) | Bismillah Pakhi & Aquarium',
    description: 'পাখি ও মাছের যত্ন, খাবার তালিকা, অ্যাকোয়ারিয়াম সেটআপ ও রোগ প্রতিরোধ সম্পর্কিত পরামর্শ ও ব্লগ।',
    url: '/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ব্লগ ও পরামর্শ (Blog & Journal) | Bismillah Pakhi & Aquarium',
    description: 'পাখি ও মাছের যত্ন, খাবার তালিকা, অ্যাকোয়ারিয়াম সেটআপ ও রোগ প্রতিরোধ সম্পর্কিত পরামর্শ ও ব্লগ।',
  },
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

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "হোম", url: "/" },
          { name: "ব্লগ ও পরামর্শ", url: "/blog" },
        ]}
      />
      <BlogClient blogs={blogs} />
    </>
  );
}
