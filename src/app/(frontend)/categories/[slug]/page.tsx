import React from "react";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle, ShoppingBag } from "lucide-react";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";

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
    });
    items = data.docs;
    isAnimal = true;
  } else if (slug === 'aquarium') {
    const data = await payload.find({
      collection: 'animals',
      where: { category: { equals: 'fish' } },
      limit: 100,
    });
    items = data.docs;
    isAnimal = true;
  } else if (slug === 'food') {
    const data = await payload.find({
      collection: 'products',
      where: { category: { equals: 'food' } },
      limit: 100,
    });
    items = data.docs;
    isAnimal = false;
  } else if (slug === 'accessories') {
    const data = await payload.find({
      collection: 'products',
      where: { category: { equals: 'accessories' } },
      limit: 100,
    });
    items = data.docs;
    isAnimal = false;
  }

  return (
    <div className="min-h-screen bg-[#ddf1fa] dark:bg-zinc-950">
      {/* Hero Banner */}
      <div className={`bg-gradient-to-br ${meta.color} py-16 px-4 text-white`}>
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 font-bangla text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            হোমে ফিরুন
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-6xl">{meta.icon}</span>
            <div>
              <h1 className="text-4xl md:text-6xl font-bangla font-extrabold tracking-tight mb-2">
                {meta.titleBn}
              </h1>
              <p className="text-white/80 font-bangla text-lg">{meta.descBn}</p>
            </div>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bangla">
            <ShoppingBag className="w-4 h-4" />
            {items.length} টি পণ্য পাওয়া গেছে
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {items.length === 0 ? (
          <div className="text-center py-24 bg-white/60 dark:bg-zinc-900/60 rounded-3xl backdrop-blur-sm border border-white/50 dark:border-zinc-800">
            <span className="text-7xl mb-6 block">{meta.icon}</span>
            <h2 className="text-2xl font-bangla font-bold text-zinc-700 dark:text-zinc-300 mb-3">
              এই মুহূর্তে কোনো পণ্য নেই
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-bangla mb-8">
              近近 শীঘ্রই নতুন পণ্য আসছে। আমাদের সাথে যোগাযোগ করুন।
            </p>
            <a
              href="https://wa.me/8801947315330"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-2xl font-bangla font-semibold hover:bg-[#128C7E] transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp-এ জিজ্ঞেস করুন
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
              const href = isAnimal ? `/animals/${item.id}` : `/products/${item.id}`;
              const nameBn = item.name?.bn || item.name?.en || item.internalName || 'অজানা';
              const descBn = item.description?.bn || item.description?.en || '';
              const priceBn = item.price?.bn || item.price?.en || 'যোগাযোগ করুন';
              const tagBn = item.tag?.bn || (isAnimal ? 'পাওয়া যাচ্ছে' : 'ইন স্টক');
              const isAvailable = item.status === 'available' || item.status === 'in_stock';
              // Smart crop: use stored objectPosition or smart default
              const objPos = item.objectPosition || 'center 20%';

              return (
                <Link
                  key={item.id}
                  href={href}
                  className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col border border-zinc-100 dark:border-zinc-800"
                >
                  {/* Image Container - Smart Crop */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={nameBn}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        style={{ objectPosition: objPos }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-6xl">
                        {meta.icon}
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bangla font-semibold shadow-sm backdrop-blur-sm ${
                        isAvailable 
                          ? 'bg-emerald-500/90 text-white' 
                          : 'bg-red-500/90 text-white'
                      }`}>
                        {tagBn}
                      </span>
                    </div>
                    {/* Arrow icon on hover */}
                    <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowLeft className="w-4 h-4 text-zinc-900 rotate-180" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bangla font-bold text-zinc-900 dark:text-white mb-1.5 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {nameBn}
                    </h3>
                    {descBn && (
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm font-bangla leading-relaxed line-clamp-2 mb-4">
                        {descBn}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                      <span className="text-[#265D85] dark:text-[#67B1E0] font-bangla font-bold text-base">
                        {priceBn}
                      </span>
                      <span className="text-xs font-bangla text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500 transition-colors">
                        বিস্তারিত →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
