import React from "react";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle, ShoppingBag } from "lucide-react";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import { CategoryClient } from "./category-client";

const CATEGORY_META: Record<string, { title: string; titleBn: string; desc: string; descBn: string; color: string; icon: string }> = {
  birds: {
    title: "Bird Collection",
    titleBn: "পাখির কালেকশন",
    desc: "Explore our exotic & local birds",
    descBn: "দেশি-বিদেশি পাখির বিশাল সংগ্রহ",
    color: "from-emerald-600 to-teal-700",
    icon: "🦜",
  },
  aquarium: {
    title: "Aquarium & Fish",
    titleBn: "অ্যাকোয়ারিয়াম ও মাছ",
    desc: "Premium fish & aquascaping",
    descBn: "প্রিমিয়াম মাছ ও অ্যাকোয়ারিয়াম",
    color: "from-blue-600 to-cyan-700",
    icon: "🐟",
  },
  food: {
    title: "Pet Food",
    titleBn: "পোষা প্রাণীর খাবার",
    desc: "Nutritious feeds & supplements",
    descBn: "পুষ্টিকর খাদ্য ও সাপ্লিমেন্ট",
    color: "from-amber-600 to-orange-700",
    icon: "🌿",
  },
  accessories: {
    title: "Accessories",
    titleBn: "অ্যাক্সেসরিজ",
    desc: "Cages, toys & care products",
    descBn: "খাঁচা, খেলনা ও যত্নের সামগ্রী",
    color: "from-violet-600 to-purple-700",
    icon: "🛒",
  },
  medicine: {
    title: "Medicine",
    titleBn: "ওষুধ",
    desc: "Health care & medicine for pets",
    descBn: "পোষা প্রাণীর স্বাস্থ্যসেবা ও ওষুধ",
    color: "from-rose-600 to-red-700",
    icon: "💊",
  },
  others: {
    title: "Others",
    titleBn: "অন্যান্য",
    desc: "Other pets and accessories",
    descBn: "অন্যান্য প্রাণী ও সামগ্রী",
    color: "from-slate-600 to-gray-700",
    icon: "📦",
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  return {
    title: `${meta?.titleBn || slug} | Bismillah Pakhi & Aquarium`,
    description: meta?.descBn || '',
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });

  const meta = CATEGORY_META[slug];
  if (!meta) notFound();

  let items: any[] = [];
  let isAnimal = false;

  if (slug === 'birds') {
    const data = await payload.find({
      collection: 'animals',
      where: { category: { equals: 'bird' } },
      limit: 100,
      depth: 1,
    });
    items = data.docs;
    isAnimal = true;
  } else if (slug === 'aquarium') {
    const data = await payload.find({
      collection: 'animals',
      where: { category: { equals: 'fish' } },
      limit: 100,
      depth: 1,
    });
    items = data.docs;
    isAnimal = true;
  } else if (slug === 'food') {
    const data = await payload.find({
      collection: 'products',
      where: { category: { equals: 'food' } },
      limit: 100,
      depth: 1,
    });
    items = data.docs;
    isAnimal = false;
  } else if (slug === 'accessories') {
    const data = await payload.find({
      collection: 'products',
      where: { category: { equals: 'accessories' } },
      limit: 100,
      depth: 1,
    });
    items = data.docs;
    isAnimal = false;
  } else if (slug === 'medicine') {
    const data = await payload.find({
      collection: 'products',
      where: { category: { equals: 'medicine' } },
      limit: 100,
      depth: 1,
    });
    items = data.docs;
    isAnimal = false;
  } else if (slug === 'others') {
    // For others, combine 'other' category from both animals and products
    const [animalsData, productsData] = await Promise.all([
      payload.find({ collection: 'animals', where: { category: { equals: 'other' } }, limit: 50, depth: 1 }),
      payload.find({ collection: 'products', where: { category: { equals: 'other' } }, limit: 50, depth: 1 })
    ]);
    
    // Mix them together
    items = [
      ...animalsData.docs.map((doc: any) => ({ ...doc, collectionType: 'animals' })),
      ...productsData.docs.map((doc: any) => ({ ...doc, collectionType: 'products' }))
    ];
    isAnimal = false; // Mixed context, handled per item in client
  }

  // Helper to safely get image string from upload fields
  const getImageUrl = (item: any): string => {
    if (item.imageUpload && typeof item.imageUpload === 'object' && item.imageUpload.url) return item.imageUpload.url;
    if (typeof item.image === 'object' && item.image?.url) return item.image.url;
    if (typeof item.image === 'string') return item.image;
    return '';
  };

  // Map items to ensure image is a string
  const mappedItems = items.map(item => ({
    ...item,
    image: getImageUrl(item)
  }));

  return (
    <CategoryClient meta={meta} items={mappedItems} isAnimal={isAnimal} />
  );
}
