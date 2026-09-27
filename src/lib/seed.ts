// DEVELOPMENT ONLY
// This script is used to seed demo data for the Pet Shop application.
// Do not use in production.

import { getPayload } from 'payload';
import configPromise from '@/payload.config';

export const DEMO_PETS = [
  {
    internalName: 'DEMO-MACAW',
    name: { en: "Macaw Parrot", bn: "ম্যাকাও পাখি" },
    tag: { en: "Exotic Bird", bn: "বিদেশী পাখি" },
    price: { en: "Contact for price", bn: "দামের জন্য যোগাযোগ করুন" },
    image: "https://images.pexels.com/photos/13897575/pexels-photo-13897575.jpeg",
    objectPosition: "center 20%",
    category: "bird" as const,
    status: "available" as const,
    description: { 
      en: "This beautiful Macaw Parrot is highly intelligent and social. Known for their vibrant colors and ability to mimic speech, they make fantastic companions for experienced bird owners.", 
      bn: "এই সুন্দর ম্যাকাও পাখিটি অত্যন্ত বুদ্ধিমান এবং সামাজিক। তাদের স্পন্দনশীল রঙ এবং কথা অনুকরণ করার ক্ষমতার জন্য পরিচিত।" 
    },
    gallery: [{ url: "https://images.pexels.com/photos/13897575/pexels-photo-13897575.jpeg" }]
  },
  {
    internalName: 'DEMO-AROWANA',
    name: { en: "Arowana Fish", bn: "অ্যারোওয়ানা মাছ" },
    tag: { en: "Premium Fish", bn: "প্রিমিয়াম মাছ" },
    price: { en: "Contact for price", bn: "দামের জন্য যোগাযোগ করুন" },
    image: "https://web.pdx.edu/~skidd/art341/fish_project/img/arowanas.jpg",
    objectPosition: "center center",
    category: "fish" as const,
    status: "available" as const,
    description: {
      en: "The Arowana is a highly sought-after premium aquarium fish, often considered a symbol of luck and prosperity in many cultures. It requires a large tank and dedicated care.",
      bn: "অ্যারোওয়ানা একটি অত্যন্ত চাহিদাসম্পন্ন প্রিমিয়াম ফিশ, যাকে প্রায়শই ভাগ্য এবং সমৃদ্ধির প্রতীক হিসেবে বিবেচনা করা হয়। এর জন্য একটি বড় ট্যাঙ্ক প্রয়োজন।"
    },
    gallery: [{ url: "https://web.pdx.edu/~skidd/art341/fish_project/img/arowanas.jpg" }]
  },
  {
    internalName: 'DEMO-COCKATIEL',
    name: { en: "Cockatiel", bn: "ককাটেল" },
    tag: { en: "Friendly Bird", bn: "বন্ধুত্বপূর্ণ পাখি" },
    price: { en: "Contact for price", bn: "দামের জন্য যোগাযোগ করুন" },
    image: "https://images.pexels.com/photos/26836700/pexels-photo-26836700.jpeg",
    objectPosition: "center center",
    category: "bird" as const,
    status: "available" as const,
    description: {
      en: "Cockatiels are small, affectionate parrots with a distinctive crest. They are great for families and are relatively easy to care for, making them perfect first-time birds.",
      bn: "ককাটেল একটি ছোট, স্নেহশীল তোতাপাখি যার মাথায় একটি সুন্দর ঝুঁটি থাকে। এরা পরিবারের জন্য দারুণ এবং এদের যত্ন নেওয়া তুলনামূলকভাবে সহজ।"
    },
    gallery: [{ url: "https://images.pexels.com/photos/26836700/pexels-photo-26836700.jpeg" }]
  },
  {
    internalName: 'DEMO-FLOWERHORN',
    name: { en: "Flowerhorn", bn: "ফ্লাওয়ারহর্ন" },
    tag: { en: "Aquarium Fish", bn: "অ্যাকোয়ারিয়ামের মাছ" },
    price: { en: "Contact for price", bn: "দামের জন্য যোগাযোগ করুন" },
    image: "https://i.postimg.cc/rmzrf48Y/Flowerhorn.jpg",
    objectPosition: "center center",
    category: "fish" as const,
    status: "available" as const,
    description: {
      en: "Flowerhorns are known for their vivid colors and distinct nuchal hump on their heads. They are aggressive but very interactive with their owners.",
      bn: "ফ্লাওয়ারহর্ন তাদের উজ্জ্বল রঙ এবং মাথার উপরের স্বতন্ত্র অদ্ভুত আকারের জন্য পরিচিত। তারা মালিকদের সাথে খুব ইন্টারেক্টিভ।"
    },
    gallery: [{ url: "https://i.postimg.cc/rmzrf48Y/Flowerhorn.jpg" }]
  }
];

export const DEMO_PRODUCTS = [
  {
    internalName: 'DEMO-PROD-BIRDFOOD',
    name: { en: "Premium Bird Food", bn: "প্রিমিয়াম পাখির খাবার" },
    price: { en: "Contact for price", bn: "দামের জন্য যোগাযোগ করুন" },
    image: "https://i.postimg.cc/65nrvCbQ/food.jpg",
    category: "food" as const,
    status: "in_stock" as const,
    description: {
      en: "High-quality, nutritious seed blend suitable for Parrots, Macaws, and Cockatiels.",
      bn: "টিয়া, ম্যাকাও এবং ককাটেলদের জন্য উপযুক্ত উচ্চ মানের পুষ্টিকর বীজ।"
    },
    gallery: [{ url: "https://i.postimg.cc/65nrvCbQ/food.jpg" }]
  },
  {
    internalName: 'DEMO-PROD-AQUARIUM',
    name: { en: "Premium Aquarium", bn: "প্রিমিয়াম অ্যাকোয়ারিয়াম" },
    price: { en: "Contact for price", bn: "দামের জন্য যোগাযোগ করুন" },
    image: "https://i.postimg.cc/y6ZK0Nmq/aquarium.jpg",
    category: "accessories" as const,
    status: "in_stock" as const,
    description: {
      en: "Beautiful rimless glass aquarium perfect for aquascaping and exotic fish.",
      bn: "অ্যাকোয়াস্কেপিং এবং বিদেশী মাছের জন্য উপযুক্ত সুন্দর গ্লাস অ্যাকোয়ারিয়াম।"
    },
    gallery: [{ url: "https://i.postimg.cc/y6ZK0Nmq/aquarium.jpg" }]
  }
];

export async function seedDemoData() {
  if (process.env.NODE_ENV === 'production') {
    console.warn("Seed script attempted to run in production. Aborting.");
    return;
  }

  try {
    const payload = await getPayload({ config: configPromise });

    console.log("Seeding demo data...");

    for (const pet of DEMO_PETS) {
      const existing = await payload.find({
        collection: 'animals',
        where: {
          internalName: {
            equals: pet.internalName,
          }
        }
      });

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'animals',
          data: pet,
        });
        console.log(`Created demo pet: ${pet.internalName}`);
      } else {
        console.log(`Demo pet already exists: ${pet.internalName}`);
      }
    }

    for (const prod of DEMO_PRODUCTS) {
      const existing = await payload.find({
        collection: 'products',
        where: { internalName: { equals: prod.internalName } }
      });

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'products',
          data: prod,
        });
        console.log(`Created demo product: ${prod.internalName}`);
      } else {
        console.log(`Demo product already exists: ${prod.internalName}`);
      }
    }

    console.log("Seeding complete.");
  } catch (error) {
    console.error("Failed to seed demo data. Is the database running?", error);
  }
}

export async function resetDemoData() {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const payload = await getPayload({ config: configPromise });
  console.log("Resetting demo data...");

  const existing = await payload.find({
    collection: 'animals',
    where: {
      internalName: {
        contains: 'DEMO-',
      }
    }
  });

  for (const doc of existing.docs) {
    await payload.delete({
      collection: 'animals',
      id: doc.id,
    });
    console.log(`Deleted demo pet: ${doc.internalName}`);
  }
  
  const existingProducts = await payload.find({
    collection: 'products',
    where: { internalName: { contains: 'DEMO-PROD-' } }
  });

  for (const doc of existingProducts.docs) {
    await payload.delete({
      collection: 'products',
      id: doc.id,
    });
    console.log(`Deleted demo product: ${doc.internalName}`);
  }

  console.log("Reset complete.");
}
