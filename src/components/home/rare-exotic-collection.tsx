"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Star } from "lucide-react";
import { cn } from "cn";
import { useLanguage } from "@/lib/language-context";
import { useCursor } from "@/lib/cursor-context";
import { useMotionConfig } from "@/lib/motion";

const collectionDict = {
  bn: {
    sectionTitle: "এক্সক্লুসিভ কালেকশন",
    sectionSubtitle: "Rare & Exotic Collection",
    preBook: "হোয়াটসঅ্যাপে প্রি-বুক করুন",
    empty: "বর্তমানে কোনো এক্সক্লুসিভ পণ্য উপলব্ধ নেই।"
  },
  en: {
    sectionTitle: "Exclusive Collection",
    sectionSubtitle: "Rare & Exotic Collection",
    preBook: "Pre-book via WhatsApp",
    empty: "No exclusive products currently available."
  }
};

type ProductProp = {
  id: string | number;
  image: string;
  name: { en: string; bn: string };
  price: { en: string; bn: string };
  description: { en: string; bn: string };
};

export function RareExoticCollection({ products, storeNumber = "1234567890" }: { products: ProductProp[], storeNumber?: string }) {
  const { language } = useLanguage();
  const { getTransition } = useMotionConfig();
  const { setCursorType } = useCursor();
  const t = collectionDict[language];
  const fontClass = language === "bn" ? "font-bangla" : "font-sans";

  return (
    <section className="py-24 relative z-20 bg-zinc-950 dark:bg-black overflow-hidden">
      {/* Premium Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="px-4 md:px-8 max-w-[1400px] mx-auto w-full mb-12 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-6"
        >
          <Star className="w-4 h-4 fill-amber-500" />
          <span className={cn("text-sm font-bold uppercase tracking-widest", fontClass)}>
            {t.sectionTitle}
          </span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={cn("text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4", fontClass)}
        >
          {t.sectionSubtitle}
        </motion.h2>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-12 pt-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {products && products.length > 0 ? (
            products.map((product, index) => {
              const productName = product.name?.[language as keyof typeof product.name] || product.name?.bn;
              const whatsappMsg = `আমি আপনাদের এক্সক্লুসিভ কালেকশন থেকে ${productName} এর জন্য প্রি-বুকিং করতে চাই।`;
              const whatsappLink = `https://wa.me/${storeNumber}?text=${encodeURIComponent(whatsappMsg)}`;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...getTransition("snappy"), delay: index * 0.1 }}
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                  className="group flex flex-col shrink-0 snap-center w-[85vw] sm:w-[380px] bg-zinc-900/50 backdrop-blur-md rounded-3xl overflow-hidden border border-zinc-800 hover:border-amber-500/30 transition-colors duration-500 relative"
                >
                <Link href={`/animals/${product.id}`} className="flex-1 flex flex-col">
                  {/* Image Container with Ambient Blur */}
                  <div className="relative w-full aspect-[4/3] bg-black flex items-center justify-center overflow-hidden border-b border-zinc-800 group-hover:border-amber-500/30 transition-colors duration-500">
                    {product.image && (
                      <>
                        <Image
                          src={product.image}
                          alt={productName}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover blur-2xl scale-125 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                          wrapperClassName="z-0"
                        />
                        <Image
                          src={product.image}
                          alt={productName}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                          wrapperClassName="z-10"
                        />
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-20 pointer-events-none" />
                  </div>

                  <div className="p-8 flex flex-col flex-1 relative z-30">
                    <h3 className={cn("text-2xl font-bold text-white mb-2 line-clamp-1", fontClass)}>
                      {productName}
                    </h3>
                    <p className={cn("text-zinc-400 mb-6 line-clamp-2 text-sm", fontClass)}>
                      {product.description?.[language as keyof typeof product.description]}
                    </p>
                    <div className="flex items-center justify-between mb-8 mt-auto">
                      <span className={cn("text-amber-500 font-bold text-xl", fontClass)}>
                        {product.price?.[language as keyof typeof product.price]}
                      </span>
                    </div>
                  </div>
                </Link>
                
                <div className="px-8 pb-8 mt-auto z-10 relative">
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold transition-all shadow-lg shadow-amber-500/20 active:scale-95",
                      fontClass
                    )}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.preBook}
                  </a>
                </div>
              </motion.div>
            );
          })
          ) : (
            <div className="w-full py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Star className="w-6 h-6 text-zinc-500" />
              </div>
              <p className={cn("text-zinc-400 text-lg", fontClass)}>
                {t.empty}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
