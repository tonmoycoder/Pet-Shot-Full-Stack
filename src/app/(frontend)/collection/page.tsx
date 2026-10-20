import React from "react";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { CollectionClient } from "./collection-client";

import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { getFallbackAnimals, getFallbackProducts } from "@/lib/data-fallback";

export const revalidate = 60;

export const metadata = {
  title: "আমাদের কালেকশন (Our Collection)",
  description: "দেশি-বিদেশি পাখি, অ্যাকোয়ারিয়াম মাছ এবং পোষা প্রাণীর সব সামগ্রীর বিশাল সংগ্রহ। চুয়াডাঙ্গা ও সারা বাংলাদেশে ডেলিভারি।",
  alternates: {
    canonical: "/collection",
  },
  openGraph: {
    title: "আমাদের কালেকশন (Our Collection) | Bismillah Pakhi & Aquarium",
    description: "দেশি-বিদেশি পাখি, অ্যাকোয়ারিয়াম মাছ এবং পোষা প্রাণীর সব সামগ্রীর বিশাল সংগ্রহ।",
    url: "/collection",
  },
};

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page, 10) || 1 : 1;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : 'all';
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q.toLowerCase() : '';
  const sortParam = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : 'default';
  const inStockParam = typeof resolvedParams.in_stock === 'string' ? resolvedParams.in_stock : 'false';
  
  let payloadSort: string | undefined = undefined;
  if (sortParam === 'newest') payloadSort = '-createdAt';
  if (sortParam === 'oldest') payloadSort = 'createdAt';
  if (sortParam === 'price_asc') payloadSort = 'price.en';
  if (sortParam === 'price_desc') payloadSort = '-price.en';
  
  const limit = 24;

  let tabCounts = {
    all: 0,
    bird: 0,
    fish: 0,
    exotic: 0,
    food: 0,
    accessories: 0,
    medicine: 0,
    other: 0,
  };

  let animalsDocs: any[] = [];
  let productsDocs: any[] = [];
  let totalDocs = 0;
  let totalPages = 1;

  try {
    const payload = await getPayload({ config: configPromise });

    const animalsBaseWhere: any = { status: { equals: 'available' } };
    const productsBaseWhere: any = { status: { equals: 'in_stock' } };

    if (inStockParam === 'true') {
      animalsBaseWhere.status = { equals: 'available' };
      productsBaseWhere.status = { equals: 'in_stock' };
    }

    if (q) {
      const qWhere = {
        or: [
          { internalName: { like: q } },
          { 'name.bn': { like: q } },
          { 'name.en': { like: q } },
        ]
      };
      animalsBaseWhere.and = [ { status: { equals: 'available' } }, qWhere ];
      productsBaseWhere.and = [ { status: { equals: 'in_stock' } }, qWhere ];
    }

    // 1. Get total counts for ALL tabs
    const [
      allAnimalsCount,
      allProductsCount,
      birdCount,
      fishCount,
      exoticCount,
      foodCount,
      accessoriesCount,
      medicineCount,
      otherCount,
      otherCountProducts
    ] = await Promise.all([
      payload.find({ collection: 'animals', limit: 0, where: animalsBaseWhere }),
      payload.find({ collection: 'products', limit: 0, where: productsBaseWhere }),
      payload.find({ collection: 'animals', limit: 0, where: { and: [animalsBaseWhere, { category: { equals: 'bird' } }] } }),
      payload.find({ collection: 'animals', limit: 0, where: { and: [animalsBaseWhere, { category: { equals: 'fish' } }] } }),
      payload.find({ collection: 'products', limit: 0, where: { and: [productsBaseWhere, { isRareExotic: { equals: true } }] } }),
      payload.find({ collection: 'products', limit: 0, where: { and: [productsBaseWhere, { category: { equals: 'food' } }] } }),
      payload.find({ collection: 'products', limit: 0, where: { and: [productsBaseWhere, { category: { equals: 'accessories' }, isRareExotic: { not_equals: true } }] } }),
      payload.find({ collection: 'products', limit: 0, where: { and: [productsBaseWhere, { category: { equals: 'medicine' } }] } }),
      payload.find({ collection: 'animals', limit: 0, where: { and: [animalsBaseWhere, { category: { equals: 'other' } }] } }),
      payload.find({ collection: 'products', limit: 0, where: { and: [productsBaseWhere, { category: { equals: 'other' } }] } })
    ]);

    tabCounts = {
      all: allAnimalsCount.totalDocs + allProductsCount.totalDocs,
      bird: birdCount.totalDocs,
      fish: fishCount.totalDocs,
      exotic: exoticCount.totalDocs,
      food: foodCount.totalDocs,
      accessories: accessoriesCount.totalDocs,
      medicine: medicineCount.totalDocs,
      other: otherCount.totalDocs + otherCountProducts.totalDocs
    };

    // 2. Determine what to fetch based on `category`
    let animalsFetchWhere = { ...animalsBaseWhere };
    let productsFetchWhere = { ...productsBaseWhere };
    let fetchAnimals = false;
    let fetchProducts = false;

    if (category === 'all') {
      fetchAnimals = true;
      fetchProducts = true;
    } else if (['bird', 'fish'].includes(category)) {
      fetchAnimals = true;
      animalsFetchWhere = {
        and: [
          animalsBaseWhere,
          { category: { equals: category } }
        ]
      };
    } else if (category === 'other') {
      fetchAnimals = true;
      fetchProducts = true;
      animalsFetchWhere = {
        and: [
          animalsBaseWhere,
          { category: { equals: category } }
        ]
      };
      productsFetchWhere = {
        and: [
          productsBaseWhere,
          { category: { equals: category } }
        ]
      };
    } else if (category === 'exotic') {
      fetchProducts = true;
      productsFetchWhere = {
        and: [
          productsBaseWhere,
          { isRareExotic: { equals: true } }
        ]
      };
    } else if (['food', 'accessories', 'medicine'].includes(category)) {
      fetchProducts = true;
      productsFetchWhere = {
        and: [
          productsBaseWhere,
          { category: { equals: category } }
        ]
      };
    }

    const fetchWithFallback = async (collection: 'animals' | 'products', where: any) => {
      try {
        return await payload.find({ collection, where, limit: fetchAnimals && fetchProducts ? limit / 2 : limit, page, sort: payloadSort, depth: 1 });
      } catch {
        return await payload.find({ collection, where, limit: fetchAnimals && fetchProducts ? limit / 2 : limit, page, sort: '-createdAt', depth: 1 });
      }
    };

    if (fetchAnimals && fetchProducts) {
      const [a, p] = await Promise.all([
        fetchWithFallback('animals', animalsFetchWhere),
        fetchWithFallback('products', productsFetchWhere)
      ]);
      animalsDocs = a.docs;
      productsDocs = p.docs;
      totalDocs = tabCounts.all;
      totalPages = Math.max(a.totalPages, p.totalPages);
    } else if (fetchAnimals) {
      const a = await fetchWithFallback('animals', animalsFetchWhere);
      animalsDocs = a.docs;
      totalDocs = a.totalDocs;
      totalPages = a.totalPages;
    } else if (fetchProducts) {
      const p = await fetchWithFallback('products', productsFetchWhere);
      productsDocs = p.docs;
      totalDocs = p.totalDocs;
      totalPages = p.totalPages;
    }
  } catch (error) {
    console.warn("CollectionPage Payload query failed, applying fallback data:", error);
  }

  // Fallback resilience when Payload DB returns empty or is unreachable
  if (animalsDocs.length === 0 && productsDocs.length === 0) {
    const fallbackAnimals = getFallbackAnimals();
    const fallbackProducts = getFallbackProducts();

    tabCounts = {
      all: fallbackAnimals.length + fallbackProducts.length,
      bird: fallbackAnimals.filter((a) => a.category === "bird").length,
      fish: fallbackAnimals.filter((a) => a.category === "fish").length,
      exotic: fallbackProducts.filter((p) => p.isRareExotic).length,
      food: fallbackProducts.filter((p) => p.category === "food").length,
      accessories: fallbackProducts.filter((p) => p.category === "accessories").length,
      medicine: fallbackProducts.filter((p) => p.category === "medicine").length,
      other:
        fallbackAnimals.filter((a) => a.category === "other").length +
        fallbackProducts.filter((p) => p.category === "other").length,
    };

    let filteredAnimals = fallbackAnimals;
    let filteredProducts = fallbackProducts;

    if (q) {
      filteredAnimals = filteredAnimals.filter(
        (a) =>
          a.name.bn.toLowerCase().includes(q) ||
          a.name.en.toLowerCase().includes(q) ||
          a.internalName.toLowerCase().includes(q)
      );
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.bn.toLowerCase().includes(q) ||
          p.name.en.toLowerCase().includes(q) ||
          p.internalName.toLowerCase().includes(q)
      );
    }

    if (category === 'all') {
      animalsDocs = filteredAnimals;
      productsDocs = filteredProducts;
      totalDocs = tabCounts.all;
    } else if (['bird', 'fish'].includes(category)) {
      animalsDocs = filteredAnimals.filter((a) => a.category === category);
      productsDocs = [];
      totalDocs = animalsDocs.length;
    } else if (category === 'exotic') {
      animalsDocs = filteredAnimals.filter((a) => a.isRareExotic);
      productsDocs = filteredProducts.filter((p) => p.isRareExotic);
      totalDocs = animalsDocs.length + productsDocs.length;
    } else if (['food', 'accessories', 'medicine'].includes(category)) {
      animalsDocs = [];
      productsDocs = filteredProducts.filter((p) => p.category === category);
      totalDocs = productsDocs.length;
    } else if (category === 'other') {
      animalsDocs = filteredAnimals.filter((a) => a.category === 'other');
      productsDocs = filteredProducts.filter((p) => p.category === 'other');
      totalDocs = animalsDocs.length + productsDocs.length;
    }

    totalPages = Math.max(1, Math.ceil(totalDocs / limit));
  }

  // JS-level secondary sort for Price
  if (sortParam.startsWith('price_')) {
    const parsePrice = (priceStr: string) => {
      if (!priceStr) return 999999;
      const num = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
      return isNaN(num) ? 999999 : num;
    };
    
    const sortMultiplier = sortParam === 'price_asc' ? 1 : -1;
    animalsDocs.sort((a, b) => sortMultiplier * (parsePrice(a.price?.en) - parsePrice(b.price?.en)));
    productsDocs.sort((a, b) => sortMultiplier * (parsePrice(a.price?.en) - parsePrice(b.price?.en)));
  }

  const getImageUrl = (doc: any) => {
    if (doc.imageUpload && typeof doc.imageUpload === 'object' && doc.imageUpload.url) {
      return doc.imageUpload.url;
    }
    return doc.image || '';
  };

  // Normalize mapping with 140-char description truncation for lightweight RSC payload
  const combinedItems = [
    ...animalsDocs.map((doc: any) => ({
      id: doc.id,
      isAnimal: true,
      category: doc.category || 'bird',
      internalName: doc.internalName,
      name: doc.name || { en: doc.internalName, bn: doc.internalName },
      description: {
        en: (doc.description?.en || '').slice(0, 140),
        bn: (doc.description?.bn || '').slice(0, 140),
      },
      price: doc.price || { en: 'Contact for price', bn: 'যোগাযোগ করুন' },
      image: getImageUrl(doc),
      objectPosition: doc.objectPosition || 'center 20%',
      tag: doc.tag || { en: 'Available', bn: 'পাওয়া যাচ্ছে' },
      status: doc.status,
    })),
    ...productsDocs.map((doc: any) => ({
      id: doc.id,
      isAnimal: false,
      category: doc.isRareExotic ? 'exotic' : (doc.category || 'accessories'),
      internalName: doc.internalName,
      name: doc.name || { en: doc.internalName, bn: doc.internalName },
      description: {
        en: (doc.description?.en || '').slice(0, 140),
        bn: (doc.description?.bn || '').slice(0, 140),
      },
      price: doc.price || { en: 'Contact for price', bn: 'যোগাযোগ করুন' },
      image: getImageUrl(doc),
      objectPosition: doc.objectPosition || 'center center',
      tag: doc.tag || { en: 'In Stock', bn: 'ইন স্টক' },
      status: doc.status,
    })),
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "হোম", url: "/" },
          { name: "কালেকশন", url: "/collection" },
        ]}
      />
      <CollectionClient 
        items={combinedItems as any[]} 
        serverData={{
          page,
          totalPages,
          totalDocs,
          category,
          q,
          sort: sortParam,
          inStock: inStockParam,
          tabCounts
        }}
      />
    </>
  );
}
