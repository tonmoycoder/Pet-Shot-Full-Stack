import React from "react";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { CollectionClient } from "./collection-client";

export const metadata = {
  title: "আমাদের কালেকশন | Bismillah Pakhi & Aquarium",
  description: "দেশি-বিদেশি পাখি, অ্যাকোয়ারিয়াম মাছ এবং পোষা প্রাণীর সব সামগ্রীর বিশাল সংগ্রহ।",
};

export default async function CollectionPage() {
  const payload = await getPayload({ config: configPromise });

  // Fetch all animals (available)
  const animalsData = await payload.find({
    collection: 'animals',
    where: { status: { equals: 'available' } },
    limit: 200,
  });

  // Fetch all products (in_stock)
  const productsData = await payload.find({
    collection: 'products',
    where: { status: { equals: 'in_stock' } },
    limit: 200,
  });

  // Combine: normalize categories to match TABS in collection-client.tsx
  // Animals: category = 'bird' | 'fish' | 'other' (no isRareExotic field)
  // Products: category = 'food' | 'accessories' | 'medicine' | 'other', isRareExotic = boolean
  const combinedItems = [
    ...animalsData.docs.map((doc: any) => ({
      id: doc.id,
      isAnimal: true,
      // Animals have no isRareExotic — map 'other' animals to their own tab
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
    ...productsData.docs.map((doc: any) => ({
      id: doc.id,
      isAnimal: false,
      // Products: isRareExotic flag maps to 'exotic' tab; otherwise use actual category
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

  return <CollectionClient items={combinedItems as any[]} />;
}
