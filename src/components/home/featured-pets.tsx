"use client";

import React, { useRef } from "react";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { useLanguage } from "@/lib/language-context";
import { useCursor } from "@/lib/cursor-context";
import { useMotionConfig } from "@/lib/motion";
import { ShortlistButton } from "@/components/ui/shortlist-button";

const petsDict = {
  bn: {
    sectionTitle: "আমাদের বিশেষ সংগ্রহ",
    sectionSubtitle: "আপনার নতুন বন্ধু খুঁজুন",
    viewAll: "সব দেখুন",
    inquire: "বিস্তারিত জানুন"
  },
  en: {
    sectionTitle: "Featured Collection",
    sectionSubtitle: "Find Your New Friend",
    viewAll: "View All",
    inquire: "Inquire Now"
  }
};

type PetProp = {
  id: string | number;
  image: string;
  objectPosition: string;
  name: { en: string; bn: string };
  tag: { en: string; bn: string };
  price: { en: string; bn: string };
};

export function FeaturedPets({ pets }: { pets: PetProp[] }) {
  const { language } = useLanguage();
  const { getTransition } = useMotionConfig();
  const { setCursorType } = useCursor();
  const t = petsDict[language];
  const fontClass = language === "bn" ? "font-bangla" : "font-sans";
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollXProgress } = useScroll({ container: scrollRef });

  return (
    <section className="py-24 relative z-20 overflow-hidden">
      <div className="px-4 md:px-8 max-w-[1400px] mx-auto w-full mb-8 md:mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <h2 className={cn("text-zinc-500 font-medium uppercase tracking-wider mb-2", fontClass)}>
            {t.sectionTitle}
          </h2>
          <h3 className={cn("text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white leading-tight", fontClass)}>
            {t.sectionSubtitle}
          </h3>
        </div>
        
        <Link
          href="/collection"
          onMouseEnter={() => setCursorType("cta")}
          onMouseLeave={() => setCursorType("default")}
          className={cn("flex items-center gap-2 text-zinc-900 dark:text-white font-medium hover:opacity-70 active:scale-95 transition-all duration-150 whitespace-nowrap", fontClass)}
        >
          {t.viewAll} <ArrowRight className="w-5 h-5 shrink-0" />
        </Link>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 px-4 md:px-8 xl:px-[calc((100vw-1400px)/2+32px)] gap-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {pets.length > 0 ? (
          pets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...getTransition("fluid"), delay: index * 0.1 }}
              className="relative snap-start shrink-0 w-[85vw] md:w-[400px] group cursor-none"
              onMouseEnter={() => setCursorType("view")}
              onMouseLeave={() => setCursorType("default")}
            >
              {/* Sibling absolute Shortlist Button to avoid <a> inside <a> warning */}
              <div className="absolute top-4 right-4 z-20">
                <ShortlistButton 
                  item={{
                    id: pet.id,
                    type: 'animal',
                    name: pet.name,
                    image: pet.image,
                    price: pet.price
                  }} 
                />
              </div>

              <Link href={`/animals/${pet.id}`} className="relative rounded-[32px] overflow-hidden aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 block z-10">
                <Image
                  src={pet.image}
                  alt={pet.name?.en || 'Pet'}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ objectPosition: pet.objectPosition }}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className={cn("inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium mb-3 border border-white/10", fontClass)}>
                    {pet.tag?.[language as keyof typeof pet.tag]}
                  </span>
                  <h4 className={cn("text-2xl md:text-3xl font-bold text-white mb-2", fontClass)}>
                    {pet.name?.[language as keyof typeof pet.name]}
                  </h4>
                  <div className="flex items-center justify-between mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className={cn("text-white/80 text-sm", fontClass)}>
                      {pet.price?.[language as keyof typeof pet.price]}
                    </span>
                    <div className="bg-white text-zinc-900 rounded-full p-3 hover:scale-110 transition-transform">
                       <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="w-full flex items-center justify-center p-12 text-zinc-500">
            {language === 'en' ? 'No featured pets currently available.' : 'বর্তমানে কোনো বিশেষ সংগ্রহ উপলব্ধ নেই।'}
          </div>
        )}
      </div>
      
      {/* Progress bar indicator */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-4">
        <div className="h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden max-w-md mx-auto">
          <motion.div 
            className="h-full bg-zinc-900 dark:bg-white rounded-full origin-left"
            style={{ scaleX: scrollXProgress }}
          />
        </div>
      </div>
    </section>
  );
}
