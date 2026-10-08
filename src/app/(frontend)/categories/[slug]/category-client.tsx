"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, ShoppingBag } from "lucide-react";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function CategoryClient({ meta, items, isAnimal }: { meta: any, items: any[], isAnimal: boolean }) {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#ddf1fa] dark:bg-zinc-950">
      {/* Hero Banner */}
      <div className={`bg-gradient-to-br ${meta.color} py-16 px-4 text-white`}>
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className={cn("inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 text-sm group", language === "bn" ? "font-bangla" : "font-sans")}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {language === 'en' ? "Return Home" : "হোমে ফিরুন"}
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-6xl">{meta.icon}</span>
            <div>
              <h1 className={cn("text-4xl md:text-6xl font-extrabold tracking-tight mb-2", language === "bn" ? "font-bangla" : "font-sans")}>
                {language === 'en' ? meta.title : meta.titleBn}
              </h1>
              <p className={cn("text-white/80 text-lg", language === "bn" ? "font-bangla" : "font-sans")}>
                {language === 'en' ? meta.desc : meta.descBn}
              </p>
            </div>
          </div>
          <div className={cn("mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm", language === "bn" ? "font-bangla" : "font-sans")}>
            <ShoppingBag className="w-4 h-4" />
            {language === 'en' ? `${items.length} items found` : `${items.length} টি পণ্য পাওয়া গেছে`}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {items.length === 0 ? (
          <div className="text-center py-24 bg-white/60 dark:bg-zinc-900/60 rounded-3xl backdrop-blur-sm border border-white/50 dark:border-zinc-800">
            <span className="text-7xl mb-6 block">{meta.icon}</span>
            <h2 className={cn("text-2xl font-bold text-zinc-700 dark:text-zinc-300 mb-3", language === "bn" ? "font-bangla" : "font-sans")}>
              {language === 'en' ? "No items found right now" : "এই মুহূর্তে কোনো পণ্য নেই"}
            </h2>
            <p className={cn("text-zinc-500 dark:text-zinc-400 mb-8", language === "bn" ? "font-bangla" : "font-sans")}>
              {language === 'en' ? "New items are arriving soon. Contact us for more details." : "খুব শীঘ্রই নতুন পণ্য আসছে। আমাদের সাথে যোগাযোগ করুন।"}
            </p>
            <a
              href="https://wa.me/8801947315330"
              target="_blank"
              rel="noopener noreferrer"
              className={cn("inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#128C7E] transition-colors shadow-lg", language === "bn" ? "font-bangla" : "font-sans")}
            >
              <MessageCircle className="w-5 h-5" />
              {language === 'en' ? "Ask on WhatsApp" : "WhatsApp-এ জিজ্ঞেস করুন"}
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
              const href = (item.collectionType === 'animals' || (isAnimal && !item.collectionType)) ? `/animals/${item.id}` : `/products/${item.id}`;
              const nameStr = language === 'en' ? (item.name?.en || item.internalName || 'Unknown') : (item.name?.bn || item.name?.en || item.internalName || 'অজানা');
              const descStr = language === 'en' ? (item.description?.en || item.description?.bn || '') : (item.description?.bn || item.description?.en || '');
              const priceStr = language === 'en' ? (item.price?.en || item.price?.bn || 'Contact for price') : (item.price?.bn || item.price?.en || 'যোগাযোগ করুন');
              const tagStr = language === 'en' ? (item.tag?.en || (isAnimal ? 'Available' : 'In Stock')) : (item.tag?.bn || (isAnimal ? 'পাওয়া যাচ্ছে' : 'ইন স্টক'));
              const isAvailable = item.status === 'available' || item.status === 'in_stock';
              const objPos = item.objectPosition || 'center 20%';

              return (
                <Link
                  key={item.id}
                  href={href}
                  className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col border border-zinc-100 dark:border-zinc-800"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={nameStr}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className={cn(`px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm`, language === "bn" ? "font-bangla" : "font-sans", isAvailable ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white')}>
                        {tagStr}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowLeft className="w-4 h-4 text-zinc-900 rotate-180" />
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className={cn("text-lg font-bold text-zinc-900 dark:text-white mb-1.5 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors", language === "bn" ? "font-bangla" : "font-sans")}>
                      {nameStr}
                    </h3>
                    {descStr && (
                      <p className={cn("text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4", language === "bn" ? "font-bangla" : "font-sans")}>
                        {descStr}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                      <span className={cn("text-[#265D85] dark:text-[#67B1E0] font-bold text-base", language === "bn" ? "font-bangla" : "font-sans")}>
                        {priceStr}
                      </span>
                      <span className={cn("text-xs text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500 transition-colors", language === "bn" ? "font-bangla" : "font-sans")}>
                        {language === 'en' ? "Details →" : "বিস্তারিত →"}
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
