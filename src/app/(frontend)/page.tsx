import dynamic from "next/dynamic";
import Image from "next/image";
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const revalidate = 0; // Force dynamic (disable caching) to fix stale data on Vercel
// Below-the-fold & Heavy components: Lazy-load JS chunks to reduce initial bundle and TBT
import { HeroSection } from "@/components/home/hero-section";
const DiscoveryBento = dynamic(() => import("@/components/home/discovery-bento").then(m => ({ default: m.DiscoveryBento })));
const FeaturedPets = dynamic(() => import("@/components/home/featured-pets").then(m => ({ default: m.FeaturedPets })));
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
        description: doc.description,
      }));
      const rareP = rareProductDocs.docs.map((doc: any) => ({
        id: doc.id,
        isAnimal: false,
        image: doc.imageUpload?.url || doc.image || '',
        name: doc.name,
        tag: doc.tag,
        price: doc.price,
        description: doc.description,
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero — pass settings so badge syncs with backend hours, and LCP image statically */}
      <HeroSection 
        heroImage={homepageRes?.heroImage} 
        storeSettings={settingsRes as any} 
        lcpImage={
          <Image
            src={typeof homepageRes?.heroImage === 'object' && homepageRes?.heroImage?.url ? homepageRes.heroImage.url : "/images/hero.webp"}
            alt="Beautiful Aquarium and Birds"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            unoptimized
            className="w-full h-full object-cover origin-center z-10"
          />
        }
      />

      {/* 2. Discovery surface — animals, food, accessories */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <DiscoveryBento discoveryCards={homepageRes?.discoveryCards} />
      </div>

      {/* 3. Featured pets — filtered by isFeatured */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 800px' }}>
        <FeaturedPets pets={pets} />
      </div>

      {/* RARE & EXOTIC COLLECTION — lazy */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 800px' }}>
        <RareExoticCollection products={rareProducts} storeNumber={settingsRes?.contact?.whatsappNumber || settingsRes?.contact?.phoneNumber || '8801947315330'} />
      </div>

      {/* 4. Trust strip — live signal + proof points */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 200px' }}>
        <TrustStrip />
      </div>

      {/* 5. Store experience — live video + physical store */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 800px' }}>
        <StoreExperience settings={settingsRes as any} />
      </div>


      {/* 6. Testimonials — customer reviews */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
        <TestimonialSection testimonials={testimonials} />
      </div>

      {/* 7. Blog Peek — latest articles */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <BlogPeek blogs={blogs} />
      </div>

      {/* 8. Final invitation CTA — warm closing section */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
        <FinalCTA settings={settingsRes as any} />
      </div>
    </div>
  );
}
