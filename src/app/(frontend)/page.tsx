import type { Metadata } from "next";
import Image from "next/image";
import { getPayload } from 'payload';
import configPromise from '@payload-config';

// ISR: Cache at Vercel Edge with 60s background revalidation for instant TTFB & fast LCP
export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    absolute: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম | Premium Pet Shop in Chuadanga",
  },
  description:
    "চুয়াডাঙ্গার শীর্ষস্থানীয় বিশ্বস্ত দেশি-বিদেশি পাখি, অ্যাকোয়ারিয়াম মাছ, অ্যাকোয়াস্কেপিং ও পেট সামগ্রীর দোকান। সুস্থ পাখি, রঙিন মাছ, অ্যাকোয়ারিয়াম ফিল্টার ও পাখির পুষ্টিকর খাবার।",
  alternates: {
    canonical: "/",
  },
};

// Below-the-fold components: Statically imported for instant SSR layout generation (0 CLS)
import { HeroSection } from "@/components/home/hero-section";
import { DiscoveryBento } from "@/components/home/discovery-bento";
import { FeaturedPets } from "@/components/home/featured-pets";
import { TrustStrip } from "@/components/home/trust-strip";
import { StoreExperience } from "@/components/home/store-experience";
import { TestimonialSection } from "@/components/home/testimonial-section";
import { BlogPeek } from "@/components/home/blog-peek";
import { FinalCTA } from "@/components/home/final-cta";
import { RareExoticCollection } from "@/components/home/rare-exotic-collection";
import { getFallbackAnimals, getFallbackProducts, getFallbackBlogs } from "@/lib/data-fallback";

export default async function Home() {
  let pets: any[] = [];
  let settingsRes: any = {};
  let homepageRes: any = {};
  let testimonials: any[] = [];
  let blogs: any[] = [];
  let rareProducts: any[] = [];

  const truncateDesc = (desc: any) => {
    if (!desc) return '';
    if (typeof desc === 'string') return desc.slice(0, 140);
    if (typeof desc === 'object') {
      return {
        en: desc.en ? desc.en.slice(0, 140) : '',
        bn: desc.bn ? desc.bn.slice(0, 140) : '',
      };
    }
    return '';
  };

  try {
    const payload = await getPayload({ config: configPromise });

    // Fetch animals
    try {
      const animalsResult = await payload.find({
        collection: 'animals',
        limit: 12,
        depth: 1,
        where: {
          and: [
            { status: { equals: 'available' } },
            { isFeatured: { equals: true } }
          ]
        }
      });
      pets = animalsResult.docs.map((doc: any) => ({
        id: doc.id,
        image: doc.imageUpload?.url || doc.image || '',
        objectPosition: doc.objectPosition,
        name: doc.name,
        tag: doc.tag,
        price: doc.price,
      }));
    } catch (e) { console.warn("Animals query failed", e); }

    // Fetch rare animals and products
    try {
      const rareAnimalsResult = await payload.find({
        collection: 'animals',
        limit: 12,
        depth: 1,
        where: {
          and: [
            { status: { equals: 'available' } },
            { isRareExotic: { equals: true } }
          ]
        }
      });
      const rareProductDocs = await payload.find({
        collection: 'products',
        limit: 12,
        depth: 1,
        where: {
          and: [
            { status: { equals: 'in_stock' } },
            { isRareExotic: { equals: true } }
          ]
        }
      });
      
      const rareA = rareAnimalsResult.docs.map((doc: any) => ({
        id: doc.id,
        isAnimal: true,
        image: doc.imageUpload?.url || doc.image || '',
        name: doc.name,
        tag: doc.tag,
        price: doc.price,
        description: truncateDesc(doc.description),
      }));
      const rareP = rareProductDocs.docs.map((doc: any) => ({
        id: doc.id,
        isAnimal: false,
        image: doc.imageUpload?.url || doc.image || '',
        name: doc.name,
        tag: doc.tag,
        price: doc.price,
        description: truncateDesc(doc.description),
      }));
      rareProducts = [...rareA, ...rareP];
    } catch (e) { console.warn("Rare products query failed", e); }

    // Fetch settings
    try {
      settingsRes = await payload.findGlobal({ slug: 'store-settings' });
    } catch (e) { console.warn("Settings query failed", e); }

    // Fetch homepage
    try {
      homepageRes = await payload.findGlobal({ slug: 'homepage' });
    } catch (e) { console.warn("Homepage query failed", e); }

    // Fetch testimonials
    try {
      const testimonialsResult = await payload.find({
        collection: 'testimonials',
        limit: 10,
        where: {
          or: [
            { status: { equals: 'approved' } },
            { status: { exists: false } }
          ]
        },
        sort: '-createdAt',
        depth: 1
      });
      testimonials = testimonialsResult.docs.map((doc: any) => ({
        id: doc.id,
        authorName: doc.authorName,
        authorRole: doc.authorRole,
        content: doc.content,
        rating: doc.rating || 5,
        authorImage: doc.authorImage,
      }));
    } catch (e) { console.warn("Testimonials query failed", e); }

    // Fetch blogs
    try {
      const blogsResult = await payload.find({
        collection: 'blogs',
        limit: 3,
        sort: '-publishedAt',
        depth: 1
      });
      blogs = blogsResult.docs.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        excerpt: doc.excerpt,
        coverImage: doc.coverImage,
        publishedAt: doc.publishedAt,
      }));
    } catch (e) { console.warn("Blogs query failed", e); }

  } catch (error) {
    console.error("Failed to connect to Payload or Database. Is Postgres running?", error);
  }

  // Master local fallback resolution for zero blank renders
  if (pets.length === 0) {
    pets = getFallbackAnimals().filter(a => a.isFeatured).map(a => ({
      id: a.id,
      image: a.image,
      objectPosition: a.objectPosition,
      name: a.name,
      tag: a.tag,
      price: a.price,
    }));
  }

  if (rareProducts.length === 0) {
    const fbRareA = getFallbackAnimals().filter(a => a.isRareExotic).map(a => ({
      id: a.id,
      isAnimal: true,
      image: a.image,
      name: a.name,
      tag: a.tag,
      price: a.price,
      description: truncateDesc(a.description),
    }));
    const fbRareP = getFallbackProducts().filter(p => p.isRareExotic).map(p => ({
      id: p.id,
      isAnimal: false,
      image: p.image,
      name: p.name,
      tag: p.tag,
      price: p.price,
      description: truncateDesc(p.description),
    }));
    rareProducts = [...fbRareA, ...fbRareP];
  }

  if (blogs.length === 0) {
    blogs = getFallbackBlogs().slice(0, 3).map(b => ({
      id: b.id,
      title: b.title,
      excerpt: b.excerpt,
      coverImage: typeof b.coverImage === 'object' ? b.coverImage?.url : b.coverImage,
      publishedAt: b.publishedAt,
    }));
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero — pass settings so badge syncs with backend hours, and LCP image statically */}
      <HeroSection 
        heroImage={homepageRes?.heroImage} 
        storeSettings={settingsRes as any} 
        lcpImage={
          <Image
            src={typeof homepageRes?.heroImage === 'object' && homepageRes?.heroImage?.url ? homepageRes.heroImage.url : "/images/hero.webp"}
            alt="বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম - Beautiful Birds & Aquarium Store in Chuadanga"
            fill
            sizes="(max-width: 768px) 92vw, 50vw"
            priority
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover origin-center z-10"
          />
        }
      />

      {/* 2. Discovery surface — animals, food, accessories */}
      <DiscoveryBento discoveryCards={homepageRes?.discoveryCards} />

      {/* 3. Featured pets — filtered by isFeatured */}
      <FeaturedPets pets={pets} />

      {/* RARE & EXOTIC COLLECTION */}
      <RareExoticCollection products={rareProducts} storeNumber={settingsRes?.contact?.whatsappNumber || settingsRes?.contact?.phoneNumber || '8801947315330'} />

      {/* 4. Trust strip — live signal + proof points */}
      <TrustStrip />

      {/* 5. Store experience — live video + physical store */}
      <StoreExperience settings={settingsRes as any} />

      {/* 6. Testimonials — customer reviews */}
      <TestimonialSection testimonials={testimonials} />

      {/* 7. Blog Peek — latest articles */}
      <BlogPeek blogs={blogs} />

      {/* 8. Final invitation CTA — warm closing section */}
      <FinalCTA settings={settingsRes as any} />
    </div>
  );
}
