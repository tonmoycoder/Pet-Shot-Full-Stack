import { getPayload } from 'payload';
import configPromise from './src/payload.config'; // Adjust path if needed

async function seed() {
  const payload = await getPayload({ config: configPromise });

  const existing = await payload.find({ collection: 'journal' });
  if (existing.totalDocs > 0) {
    console.log("Blog already exists.");
    process.exit(0);
  }

  await payload.create({
    collection: 'journal',
    data: {
      internalTitle: "Demo Blog Post",
      title: {
        bn: "পোষা প্রাণীর যত্ন নেওয়ার ৫টি সহজ উপায়",
        en: "5 Simple Ways to Take Care of Your Pets",
      },
      excerpt: {
        bn: "পোষা প্রাণীর যত্ন নেওয়া খুব কঠিন কিছু নয়, তবে কিছু নিয়ম মেনে চললে তারা আরও সুস্থ ও সুন্দর থাকে। চলুন জেনে নেওয়া যাক ৫টি সহজ উপায়।",
        en: "Taking care of pets is not hard. Here are 5 simple ways to keep them healthy and happy.",
      },
      content: {
        bn: [
          {
            children: [{ text: "আপনার পোষা প্রাণীর যত্ন নেওয়া একটি দায়িত্বশীল কাজ। সঠিক খাবার, নিয়মিত পরিষ্কার-পরিচ্ছন্নতা এবং ভালোবাসা দিয়ে আপনি তাদের একটি সুন্দর জীবন উপহার দিতে পারেন।" }],
          },
          {
            type: "h2",
            children: [{ text: "১. সঠিক পুষ্টিকর খাবার" }]
          },
          {
            children: [{ text: "সব প্রাণীর জন্য একই খাবার উপযোগী নয়। আপনার বিড়াল, কুকুর বা পাখির জাত ও বয়স অনুযায়ী খাবার নির্বাচন করুন। অতিরিক্ত খাবার দেওয়া থেকে বিরত থাকুন।" }]
          },
          {
            type: "h2",
            children: [{ text: "২. নিয়মিত ব্যায়াম ও খেলাধুলা" }]
          },
          {
            children: [{ text: "তাদের মানসিক ও শারীরিক বিকাশের জন্য প্রতিদিন কিছু সময় খেলাধুলা করুন। এটি তাদের চটপটে রাখে।" }]
          }
        ],
        en: [
          {
            children: [{ text: "Taking care of your pet is a responsible job. With proper food, regular grooming, and love, you can give them a beautiful life." }],
          }
        ]
      },
      publishedAt: new Date().toISOString(),
    }
  });

  console.log("Demo blog created!");
  process.exit(0);
}

seed();
