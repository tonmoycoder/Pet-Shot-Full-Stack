import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { NextResponse } from 'next/server';

export async function GET() {
  const payload = await getPayload({ config: configPromise });

  const existing = await payload.find({ collection: 'blogs' });
  if (existing.totalDocs > 0) {
    return NextResponse.json({ message: "Blog already exists." });
  }

  await payload.create({
    collection: 'blogs',
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
        bn: {
          root: {
            type: "root",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                type: "paragraph",
                format: "",
                indent: 0,
                version: 1,
                children: [{ mode: "normal", text: "আপনার পোষা প্রাণীর যত্ন নেওয়া একটি দায়িত্বশীল কাজ। সঠিক খাবার, নিয়মিত পরিষ্কার-পরিচ্ছন্নতা এবং ভালোবাসা দিয়ে আপনি তাদের একটি সুন্দর জীবন উপহার দিতে পারেন।", type: "text", style: "", detail: 0, format: 0, version: 1 }]
              },
              {
                type: "heading",
                tag: "h2",
                format: "",
                indent: 0,
                version: 1,
                children: [{ mode: "normal", text: "১. সঠিক পুষ্টিকর খাবার", type: "text", style: "", detail: 0, format: 0, version: 1 }]
              },
              {
                type: "paragraph",
                format: "",
                indent: 0,
                version: 1,
                children: [{ mode: "normal", text: "সব প্রাণীর জন্য একই খাবার উপযোগী নয়। আপনার বিড়াল, কুকুর বা পাখির জাত ও বয়স অনুযায়ী খাবার নির্বাচন করুন। অতিরিক্ত খাবার দেওয়া থেকে বিরত থাকুন।", type: "text", style: "", detail: 0, format: 0, version: 1 }]
              },
              {
                type: "heading",
                tag: "h2",
                format: "",
                indent: 0,
                version: 1,
                children: [{ mode: "normal", text: "২. নিয়মিত ব্যায়াম ও খেলাধুলা", type: "text", style: "", detail: 0, format: 0, version: 1 }]
              },
              {
                type: "paragraph",
                format: "",
                indent: 0,
                version: 1,
                children: [{ mode: "normal", text: "তাদের মানসিক ও শারীরিক বিকাশের জন্য প্রতিদিন কিছু সময় খেলাধুলা করুন। এটি তাদের চটপটে রাখে।", type: "text", style: "", detail: 0, format: 0, version: 1 }]
              }
            ]
          }
        },
        en: {
          root: {
            type: "root",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                type: "paragraph",
                format: "",
                indent: 0,
                version: 1,
                children: [{ mode: "normal", text: "Taking care of your pet is a responsible job. With proper food, regular grooming, and love, you can give them a beautiful life.", type: "text", style: "", detail: 0, format: 0, version: 1 }]
              }
            ]
          }
        }
      },
      publishedAt: new Date().toISOString(),
    }
  });

  return NextResponse.json({ message: "Demo blog created!" });
}
