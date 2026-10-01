import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/hero-section";
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const revalidate = 60; // Enable ISR (cache for 60 seconds) to fix slow TTFB

// Above-the-fold: Eager load
import { DiscoveryBento } from "@/components/home/discovery-bento";
import { FeaturedPets } from "@/components/home/featured-pets";

// Below-the-fold: Lazy-load JS chunks to reduce initial bundle and TBT
const TrustStrip = dynamic(() => import("@/components/home/trust-strip").then(m => ({ default: m.TrustStrip })));
const StoreExperience = dynamic(() => import("@/components/home/store-experience").then(m => ({ default: m.StoreExperience })));
const TestimonialSection = dynamic(() => import("@/components/home/testimonial-section").then(m => ({ default: m.TestimonialSection })));
const BlogPeek = dynamic(() => import("@/components/home/blog-peek").then(m => ({ default: m.BlogPeek })));
const FinalCTA = dynamic(() => import("@/components/home/final-cta").then(m => ({ default: m.FinalCTA })));
const RareExoticCollection = dynamic(() => import("@/components/home/rare-exotic-collection").then(m => ({ default: m.RareExoticCollection })));

export default async function Home() {
  let pets: any[] = [];
  let settingsRes: any = {};
  let homepageRes: any = {};
  let testimonials: any[] = [];
  let blogs: any[] = [];
  let rareProducts: any[] = [];

  try {
    const payload = await getPayload({ config: configPromise });

    // ✅ Run ALL queries in PARALLEL — reduces wait from ~2.3s to ~600ms
    const [
      animalsResult,
      rareResult,
      settingsResult,
      homepageResult,
      testimonialsResult,
      blogsResult,
    ] = await Promise.allSettled([
      payload.find({
        collection: 'animals',
        limit: 12,
        where: {
          and: [
            { status: { equals: 'available' } },
            { isFeatured: { equals: true } }
          ]
        }
      }),
      payload.find({
        collection: 'animals',
        limit: 12,
        where: {
          and: [
            { status: { equals: 'available' } },
            { isRareExotic: { equals: true } }
          ]
        }
      }),
      payload.findGlobal({ slug: 'store-settings' }),
      payload.findGlobal({ slug: 'homepage' }),
      payload.find({
        collection: 'testimonials',
        limit: 10,
        where: {
          or: [
            { status: { equals: 'approved' } },
            { status: { exists: false } }
          ]
        },
        sort: '-createdAt'
      }),
      payload.find({
        collection: 'blogs',
        limit: 3,
        sort: '-publishedAt'
      }),
    ]);

    // Process results
    if (animalsResult.status === 'fulfilled') {
      pets = animalsResult.value.docs.map((doc: any) => ({
        id: doc.id,
        image: doc.image,
        objectPosition: doc.objectPosition,
        name: doc.name,
        tag: doc.tag,
        price: doc.price,
      }));
    } else {
      console.warn("Could not query animals:", animalsResult.reason);
    }

    if (rareResult.status === 'fulfilled') {
      rareProducts = rareResult.value.docs.map((doc: any) => ({
        id: doc.id,
        image: doc.image,
        name: doc.name,
        price: doc.price,
        description: doc.description,
      }));
    }

    if (settingsResult.status === 'fulfilled') {
      settingsRes = settingsResult.value;
    }

    if (homepageResult.status === 'fulfilled') {
      homepageRes = homepageResult.value;
    }

    if (testimonialsResult.status === 'fulfilled') {
      testimonials = testimonialsResult.value.docs.map((doc: any) => ({
        id: doc.id,
        authorName: doc.authorName,
        authorRole: doc.authorRole,
        content: doc.content,
        rating: doc.rating || 5,
        authorImage: doc.authorImage,
      }));
    }

    if (blogsResult.status === 'fulfilled') {
      blogs = blogsResult.value.docs.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        excerpt: doc.excerpt,
        coverImage: doc.coverImage,
        publishedAt: doc.publishedAt,
      }));
    }

  } catch (error) {
    console.error("Failed to connect to Payload or Database. Is Postgres running?", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero — pass settings so badge syncs with backend hours */}
      <HeroSection heroImage={homepageRes?.heroImage} storeSettings={settingsRes as any} />

      {/* 2. Discovery surface — animals, food, accessories */}
      <DiscoveryBento discoveryCards={homepageRes?.discoveryCards} />

      {/* 3. Featured pets — filtered by isFeatured */}
      <FeaturedPets pets={pets} />

      {/* RARE & EXOTIC COLLECTION — lazy */}
      <RareExoticCollection products={rareProducts} storeNumber={settingsRes?.contactPhone || '1234567890'} />

      {/* 4. Trust strip — live signal + proof points */}
      <TrustStrip />

      {/* 5. Store experience — live video + physical store */}
      <StoreExperience settings={settingsRes as any} />

      {/* 6. Testimonials — customer reviews and form */}
      <TestimonialSection testimonials={testimonials} />

      {/* 7. Blog Peek — latest articles */}
      <BlogPeek blogs={blogs} />

      {/* 8. Final invitation CTA — warm closing section */}
      <FinalCTA settings={settingsRes as any} />
    </div>
  );
}
