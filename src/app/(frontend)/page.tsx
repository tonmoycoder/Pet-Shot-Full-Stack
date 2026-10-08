import dynamic from "next/dynamic";
import Image from "next/image";
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic'; // Force dynamic to fix stale data issues on Vercel
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

    // ✅ Run ALL queries in PARALLEL — reduces wait from ~2.3s to ~600ms
    const [
      animalsResult,
      rareAnimalsResult,
      rareProductsResult,
      settingsResult,
      homepageResult,
      testimonialsResult,
      blogsResult,
    ] = await Promise.allSettled([
      payload.find({
        collection: 'animals',
        limit: 12,
        depth: 1,
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
        depth: 1,
        where: {
          and: [
            { status: { equals: 'available' } },
            { isRareExotic: { equals: true } }
          ]
        }
      }),
      payload.find({
        collection: 'products',
        limit: 12,
        depth: 1,
        where: {
          and: [
            { status: { equals: 'in_stock' } },
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
        sort: '-publishedAt',
        depth: 1
      }),
    ]);

    const getImageUrl = (doc: any) => {
      if (doc.imageUpload && typeof doc.imageUpload === 'object' && doc.imageUpload.url) {
        return doc.imageUpload.url;
      }
      return doc.image || '';
    };

    // Process results
    if (animalsResult.status === 'fulfilled') {
      pets = animalsResult.value.docs.map((doc: any) => ({
        id: doc.id,
        image: getImageUrl(doc),
        objectPosition: doc.objectPosition,
        name: doc.name,
        tag: doc.tag,
        price: doc.price,
      }));
    } else {
      console.warn("Could not query animals:", animalsResult.reason);
    }

    // Combine rare animals + rare products into one list
    const rareAnimalDocs = rareAnimalsResult.status === 'fulfilled'
      ? rareAnimalsResult.value.docs.map((doc: any) => ({
          id: doc.id,
          isAnimal: true,
          image: getImageUrl(doc),
          name: doc.name,
          tag: doc.tag,
          price: doc.price,
          description: doc.description,
        }))
      : [];

    const rareProductDocs = rareProductsResult.status === 'fulfilled'
      ? rareProductsResult.value.docs.map((doc: any) => ({
          id: doc.id,
          isAnimal: false,
          image: getImageUrl(doc),
          name: doc.name,
          tag: doc.tag,
          price: doc.price,
          description: doc.description,
        }))
      : [];

    rareProducts = [...rareAnimalDocs, ...rareProductDocs];

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
