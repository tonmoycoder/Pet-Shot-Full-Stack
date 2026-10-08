"use client";

import React, { useRef, useState, useEffect } from "react";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, HandHeart, Info } from "lucide-react";
import { cn } from "cn";
import { useLanguage } from "@/lib/language-context";
import { useCursor } from "@/lib/cursor-context";
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
  const { setCursorType } = useCursor();
  const t = petsDict[language];
  const fontClass = language === "bn" ? "font-bangla" : "font-sans";
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Progress bar
    const maxScroll = scrollWidth - clientWidth;
    const currentProgress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setProgress(currentProgress);

    // Active index
    const cardWidth = 320; // approximate card width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(pets.length - 1, Math.max(0, index)));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [pets.length]);

  const scrollNext = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 320;
      scrollRef.current.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 320;
      scrollRef.current.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 relative z-20 overflow-hidden bg-white dark:bg-[#0a0a0a]">
      {/* Top Subtle Brand Bar */}
      <div className="px-5 md:px-8 max-w-[1400px] mx-auto w-full pt-3 pb-2 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className={fontClass}>{t.sectionTitle}</span>
        </div>
      </div>

      {/* Header & Link Section */}
      <div className="px-5 md:px-8 max-w-[1400px] mx-auto w-full pt-1 pb-6 flex items-end justify-between gap-3">
        <div>
          <h2 className={cn("text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight", fontClass)}>
            {t.sectionSubtitle}
          </h2>
          <p className={cn("text-sm text-zinc-500 dark:text-zinc-400 mt-1", fontClass)}>
            {language === 'bn' ? 'সুস্থ, চঞ্চল ও যত্নশীল পরিবেশে বেড়ে ওঠা সঙ্গী' : 'Healthy, playful, and nurtured companions'}
          </p>
        </div>
        <Link
          href="/collection"
          onMouseEnter={() => setCursorType("cta")}
          onMouseLeave={() => setCursorType("default")}
          className={cn("group shrink-0 inline-flex items-center gap-1 font-medium text-[#265D85] dark:text-[#67B1E0] hover:text-[#1c4461] dark:hover:text-[#90c6eb] transition-all", fontClass)}
        >
          <span>{t.viewAll}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 md:gap-5 px-5 md:px-8 xl:px-[calc((100vw-1400px)/2+32px)] overflow-x-auto snap-x snap-mandatory py-2 pb-4 cursor-grab active:cursor-grabbing scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {pets.length > 0 ? (
          pets.map((pet, index) => {
            const petName = pet.name?.[language as keyof typeof pet.name];
            const petPrice = pet.price?.[language as keyof typeof pet.price];
            const petTag = pet.tag?.[language as keyof typeof pet.tag] || (language === 'bn' ? 'পাওয়া যাচ্ছে' : 'Available');

            return (
              <div
                key={pet.id}
                className="carousel-card shrink-0 w-[280px] sm:w-[310px] snap-center flex flex-col rounded-[24px] overflow-hidden bg-white dark:bg-zinc-900 shadow-md border border-zinc-100 dark:border-zinc-800 transition-all duration-300 relative group animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setCursorType("view")}
                onMouseLeave={() => setCursorType("default")}
              >
                {/* Visual Container */}
                <Link href={`/animals/${pet.id}`} className="relative w-full h-[360px] overflow-hidden bg-zinc-100 dark:bg-zinc-800 block">
                  <Image
                    src={pet.image}
                    alt={petName || 'Pet'}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: pet.objectPosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent h-[60%] mt-auto pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-90" />
                  
                  {/* Badges & Fav */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-black/40 backdrop-blur-md text-white font-medium border border-white/10", fontClass)}>
                      {petTag}
                    </span>
                    <div onClick={(e) => e.preventDefault()}>
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
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 pt-16 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none">
                    <div className="flex flex-col gap-1.5">
                      <h3 className={cn("text-xl font-bold text-white leading-tight drop-shadow-lg", fontClass)}>
                        {petName}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className={cn("text-xs text-white/90 uppercase tracking-wider", fontClass)}>
                          {language === 'bn' ? 'আমাদের সংগ্রহ' : 'Our Collection'}
                        </span>
                        <span className={cn("text-xl font-extrabold text-white drop-shadow-md", fontClass)}>
                          {petPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Action Section */}
                <div className="p-3.5 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                  <a 
                    href={`https://wa.me/8801947315330?text=${encodeURIComponent(`আমি ${petName} সম্পর্কে জানতে চাই`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("flex-1 py-2.5 px-3 rounded-xl bg-[#265D85] text-white hover:bg-[#1c4461] text-sm font-medium flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all", fontClass)}
                  >
                    <HandHeart className="w-4 h-4" />
                    <span>{language === 'bn' ? 'বুক করুন' : 'Book Now'}</span>
                  </a>
                  <Link 
                    href={`/animals/${pet.id}`}
                    className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shrink-0"
                    title={t.inquire}
                  >
                    <Info className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full flex items-center justify-center p-12 text-zinc-500">
            {language === 'en' ? 'No featured pets currently available.' : 'বর্তমানে কোনো বিশেষ সংগ্রহ উপলব্ধ নেই।'}
          </div>
        )}
      </div>

      {/* Interactive Controls & Indicator */}
      {pets.length > 0 && (
        <div className="px-5 md:px-8 max-w-[1400px] mx-auto w-full pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Swipe guide hint */}
          <div className="inline-flex items-center justify-start gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-2.76 0-5 2.24-5 5v2a7 7 0 0 0 14 0v-4a7 7 0 0 0-14 0"/><path d="M9 10a7 7 0 0 1 14 0v4a7 7 0 0 1-14 0v-2c0-2.76 2.24-5 5-5h3"/></svg>
            <span className={fontClass}>{language === 'bn' ? 'সোয়াইপ করে পছন্দ করুন' : 'Swipe to explore'}</span>
          </div>

          {/* Right Controls Container */}
          <div className="flex flex-col-reverse md:flex-row md:items-center gap-4 md:gap-6 w-full md:w-auto">
            {/* Progress Line */}
            <div className="w-full md:w-64 bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden shrink-0">
              <div 
                className="bg-[#265D85] dark:bg-[#67B1E0] h-full rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${Math.max(15, progress)}%` }} 
              />
            </div>
            
            {/* Arrow Controls and Counter */}
            <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 tabular-nums">
                {String(activeIndex + 1).padStart(2, '0')} / {String(pets.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={scrollPrev}
                  className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center active:scale-90 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={scrollNext}
                  className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center active:scale-90 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
