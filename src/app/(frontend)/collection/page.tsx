import React from "react";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { CollectionClient } from "./collection-client";

export const metadata = {
  title: "আমাদের কালেকশন | Bismillah Pakhi & Aquarium",
  description: "দেশি-বিদেশি পাখি, অ্যাকোয়ারিয়াম মাছ এবং পোষা প্রাণীর সব সামগ্রীর বিশাল সংগ্রহ।",
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
  
  let payloadSort: string | undefined = undefined;
  if (sortParam === 'newest') payloadSort = '-createdAt';
  if (sortParam === 'oldest') payloadSort = 'createdAt';
  
  const payload = await getPayload({ config: configPromise });
  const limit = 24;

  const animalsBaseWhere: any = { status: { equals: 'available' } };
  const productsBaseWhere: any = { status: { equals: 'in_stock' } };

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

  // 1. Get total counts for ALL tabs to render the numbers accurately
  // Using limit: 0 returns totalDocs without fetching the documents
  const [
    allAnimalsCount,
    allProductsCount,
    birdCount,
    fishCount,
    exoticCount,
    foodCount,
    accessoriesCount,
    medicineCount,
    otherCount
  ] = await Promise.all([
    payload.find({ collection: 'animals', limit: 0, where: animalsBaseWhere }),
    payload.find({ collection: 'products', limit: 0, where: productsBaseWhere }),
    payload.find({ collection: 'animals', limit: 0, where: { and: [animalsBaseWhere, { category: { equals: 'bird' } }] } }),
    payload.find({ collection: 'animals', limit: 0, where: { and: [animalsBaseWhere, { category: { equals: 'fish' } }] } }),
    payload.find({ collection: 'products', limit: 0, where: { and: [productsBaseWhere, { isRareExotic: { equals: true } }] } }),
    payload.find({ collection: 'products', limit: 0, where: { and: [productsBaseWhere, { category: { equals: 'food' } }] } }),
    payload.find({ collection: 'products', limit: 0, where: { and: [productsBaseWhere, { category: { equals: 'accessories' }, isRareExotic: { not_equals: true } }] } }),
    payload.find({ collection: 'products', limit: 0, where: { and: [productsBaseWhere, { category: { equals: 'medicine' } }] } }),
    payload.find({ collection: 'animals', limit: 0, where: { and: [animalsBaseWhere, { category: { equals: 'other' } }] } })
  ]);

  const tabCounts = {
    all: allAnimalsCount.totalDocs + allProductsCount.totalDocs,
    bird: birdCount.totalDocs,
    fish: fishCount.totalDocs,
    exotic: exoticCount.totalDocs,
    food: foodCount.totalDocs,
    accessories: accessoriesCount.totalDocs,
    medicine: medicineCount.totalDocs,
    other: otherCount.totalDocs
  };

  // 2. Determine what to fetch based on `category`
  let animalsFetchWhere = { ...animalsBaseWhere };
  let productsFetchWhere = { ...productsBaseWhere };
  let fetchAnimals = false;
  let fetchProducts = false;

  if (category === 'all') {
    fetchAnimals = true;
    fetchProducts = true;
  } else if (['bird', 'fish', 'other'].includes(category)) {
    fetchAnimals = true;
    animalsFetchWhere = {
      and: [
        animalsBaseWhere,
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

  let animalsDocs: any[] = [];
  let productsDocs: any[] = [];
  let totalDocs = 0;
  let totalPages = 1;

  if (fetchAnimals && fetchProducts) {
    const [a, p] = await Promise.all([
      payload.find({ collection: 'animals', where: animalsFetchWhere, limit: limit / 2, page, sort: payloadSort }),
      payload.find({ collection: 'products', where: productsFetchWhere, limit: limit / 2, page, sort: payloadSort })
    ]);
    animalsDocs = a.docs;
    productsDocs = p.docs;
    totalDocs = tabCounts.all; // exact total across both
    totalPages = Math.max(a.totalPages, p.totalPages);
  } else if (fetchAnimals) {
    const a = await payload.find({ collection: 'animals', where: animalsFetchWhere, limit, page, sort: payloadSort });
    animalsDocs = a.docs;
    totalDocs = a.totalDocs;
    totalPages = a.totalPages;
  } else if (fetchProducts) {
    const p = await payload.find({ collection: 'products', where: productsFetchWhere, limit, page, sort: payloadSort });
    productsDocs = p.docs;
    totalDocs = p.totalDocs;
    totalPages = p.totalPages;
  }

  // Normalize mapping
  const combinedItems = [
    ...animalsDocs.map((doc: any) => ({
      id: doc.id,
      isAnimal: true,
      category: doc.category || 'bird',
      internalName: doc.internalName,
      name: doc.name || { en: doc.internalName, bn: doc.internalName },
      description: doc.description || { en: '', bn: '' },
      price: doc.price || { en: 'Contact for price', bn: 'যোগাযোগ করুন' },
      image: doc.image || '',
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
      description: doc.description || { en: '', bn: '' },
      price: doc.price || { en: 'Contact for price', bn: 'যোগাযোগ করুন' },
      image: doc.image || '',
      objectPosition: doc.objectPosition || 'center center',
      tag: doc.tag || { en: 'In Stock', bn: 'ইন স্টক' },
      status: doc.status,
    })),
  ];

  return (
    <CollectionClient 
      items={combinedItems as any[]} 
      serverData={{
        page,
        totalPages,
        totalDocs,
        category,
        q,
        sort: sortParam,
        tabCounts
      }}
    />
  );
}
