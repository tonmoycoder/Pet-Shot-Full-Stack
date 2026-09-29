import { HeroSection } from "@/components/home/hero-section";
import { DiscoveryBento } from "@/components/home/discovery-bento";
import { FeaturedPets } from "@/components/home/featured-pets";
import { TrustStrip } from "@/components/home/trust-strip";
import { StoreExperience } from "@/components/home/store-experience";
import { FinalCTA } from "@/components/home/final-cta";
import { TestimonialSection } from "@/components/home/testimonial-section";
import { BlogPeek } from "@/components/home/blog-peek";
import { RareExoticCollection } from "@/components/home/rare-exotic-collection";

import { getPayload } from 'payload';
import configPromise from '@payload-config';

export default async function Home() {
  let pets: any[] = [];
  let settingsRes: any = {};
  let homepageRes: any = {};
  let testimonials: any[] = [];
  let blogs: any[] = [];
  let rareProducts: any[] = [];

  try {
    const payload = await getPayload({ config: configPromise });

    try {
      // ✅ Filter by isFeatured=true AND available status
      const animalsRes = await payload.find({
        collection: 'animals',
        limit: 12,
        where: {
          and: [
            { status: { equals: 'available' } },
            // Filter strictly by isFeatured
            { isFeatured: { equals: true } }
          ]
        }
      });
      pets = animalsRes.docs.map((doc: any) => ({
        id: doc.id,
        image: doc.image,
        objectPosition: doc.objectPosition,
        name: doc.name,
        tag: doc.tag,
        price: doc.price,
      }));
    } catch (e) {
      // Fallback: just get available pets without isFeatured filter
      try {
        const payload2 = await getPayload({ config: configPromise });
        const fallbackRes = await payload2.find({
          collection: 'animals',
          limit: 12,
          where: { status: { equals: 'available' } }
        });
        pets = fallbackRes.docs.map((doc: any) => ({
          id: doc.id,
          image: doc.image,
          objectPosition: doc.objectPosition,
          name: doc.name,
          tag: doc.tag,
          price: doc.price,
        }));
      } catch {}
      console.warn("Could not query animals with isFeatured filter", e);
    }

    try {
      const rareRes = await payload.find({
        collection: 'animals',
        limit: 3,
        where: {
          and: [
            { status: { equals: 'available' } },
            { isRareExotic: { equals: true } }
          ]
        }
      });
      rareProducts = rareRes.docs.map((doc: any) => ({
        id: doc.id,
        image: doc.image,
        name: doc.name,
        price: doc.price,
        description: doc.description,
      }));
    } catch (e) {
      console.warn("Could not query rare animals", e);
    }

    try {
      settingsRes = await payload.findGlobal({
        slug: 'store-settings',
      });
    } catch (e) {
      console.warn("Could not query store-settings", e);
    }

    try {
      homepageRes = await payload.findGlobal({
        slug: 'homepage',
      });
    } catch (e) {
      console.warn("Could not query homepage", e);
    }

    try {
      const testimonialsRes = await payload.find({
        collection: 'testimonials',
        limit: 10,
        where: {
          or: [
            { status: { equals: 'approved' } },
            { status: { exists: false } }
          ]
        },
        sort: '-createdAt'
      });
      testimonials = testimonialsRes.docs.map((doc: any) => ({
        id: doc.id,
        authorName: doc.authorName,
        authorRole: doc.authorRole,
        content: doc.content,
        rating: doc.rating || 5,
        authorImage: doc.authorImage,
      }));
    } catch (e) {
      console.warn("Could not query testimonials", e);
    }

    try {
      const blogRes = await payload.find({
        collection: 'blogs',
        limit: 3,
        sort: '-publishedAt'
      });
      blogs = blogRes.docs.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        excerpt: doc.excerpt,
        coverImage: doc.coverImage,
        publishedAt: doc.publishedAt,
      }));
    } catch (e) {
      console.warn("Could not query blogs", e);
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

      {/* RARE & EXOTIC COLLECTION */}
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
