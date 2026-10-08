"use client";

import React, { useRef, useState, useEffect } from "react";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, HandHeart, Info, Star, Sparkles } from "lucide-react";
import { cn } from "cn";
import { useLanguage } from "@/lib/language-context";
import { useCursor } from "@/lib/cursor-context";
import { ShortlistButton } from "@/components/ui/shortlist-button";

type ProductProp = {
  id: string | number;
  isAnimal?: boolean;
  image: string;
  name: { en: string; bn: string };
  price: { en: string; bn: string };
  description: { en: string; bn: string };
  tag?: { en: string; bn: string };
};

export function RareExoticCollection({ products, storeNumber = "8801947315330" }: { products: ProductProp[], storeNumber?: string }) {
  const { language } = useLanguage();
  const { setCursorType } = useCursor();
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
    setActiveIndex(Math.min(products.length - 1, Math.max(0, index)));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [products?.length]);

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

  // Removed early return to show empty state if no products exist
  const displayProducts = products && products.length > 0 ? products : [];

  return (
    <section className="py-20 relative z-20 overflow-hidden bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      
      {/* Top Subtle Brand Bar */}
      <div className="px-5 md:px-8 max-w-[1400px] mx-auto w-full pt-3 pb-2 flex items-center justify-between relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium">
          <Star className="w-3 h-3 fill-amber-500 animate-pulse" />
          <span className={fontClass}>{language === 'bn' ? 'এক্সক্লুসিভ কালেকশন' : 'Exclusive Collection'}</span>
        </div>
      </div>

      {/* Header & Link Section */}
      <div className="px-5 md:px-8 max-w-[1400px] mx-auto w-full pt-1 pb-6 flex items-end justify-between gap-3 relative z-10">
        <div>
          <h2 className={cn("text-3xl md:text-4xl font-bold text-white tracking-tight", fontClass)}>
            Rare & Exotic
          </h2>
          <p className={cn("text-sm text-zinc-400 mt-1", fontClass)}>
            {language === 'bn' ? 'আমাদের সবচেয়ে বিশেষ এবং দুষ্প্রাপ্য সংগ্রহ' : 'Our most special and rare collection'}
          </p>
        </div>
        <Link
          href="/collection"
          onMouseEnter={() => setCursorType("cta")}
          onMouseLeave={() => setCursorType("default")}
          className={cn("group shrink-0 inline-flex items-center gap-1 font-medium text-amber-500 hover:text-amber-400 transition-all", fontClass)}
        >
          <span>{language === 'bn' ? 'সব দেখুন' : 'View All'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 md:gap-5 px-5 md:px-8 xl:px-[calc((100vw-1400px)/2+32px)] overflow-x-auto snap-x snap-mandatory py-2 pb-4 cursor-grab active:cursor-grabbing scroll-smooth relative z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {displayProducts.length > 0 ? (
          displayProducts.map((product, index) => {
          const productName = product.name?.[language as keyof typeof product.name] || product.name?.bn;
          const productPrice = product.price?.[language as keyof typeof product.price] || '';
          const href = product.isAnimal !== false ? `/animals/${product.id}` : `/products/${product.id}`;
          const whatsappMsg = `আমি আপনাদের এক্সক্লুসিভ কালেকশন থেকে ${productName} এর জন্য প্রি-বুকিং করতে চাই।`;
          const whatsappLink = `https://wa.me/${storeNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMsg)}`;

          return (
            <div
              key={`${product.isAnimal ? 'a' : 'p'}-${product.id}`}
              className="carousel-card shrink-0 w-[280px] sm:w-[310px] snap-center flex flex-col rounded-[24px] overflow-hidden bg-zinc-900/80 shadow-md border border-zinc-800 hover:border-amber-500/30 transition-all duration-300 relative group animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setCursorType("view")}
              onMouseLeave={() => setCursorType("default")}
            >
              {/* Visual Container */}
              <Link href={href} className="relative w-full h-[360px] overflow-hidden bg-zinc-950 block">
                {product.image ? (
                  <>
                    <Image
                      src={product.image}
                      alt={productName}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover blur-2xl scale-125 opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                    />
                    <Image
                      src={product.image}
                      alt={productName}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 p-4 z-10 relative"
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-amber-500/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent h-[60%] mt-auto pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-90 z-10" />
                
                {/* Badges & Fav */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                  <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider bg-amber-500/20 backdrop-blur-md text-amber-400 font-bold border border-amber-500/30", fontClass)}>
                    <Star className="w-3 h-3 fill-amber-400" />
                    {product.tag?.[language as keyof typeof product.tag] || (language === 'bn' ? 'এক্সক্লুসিভ' : 'Exclusive')}
                  </span>
                  <div onClick={(e) => e.preventDefault()}>
                    <ShortlistButton 
                      item={{
                        id: product.id,
                        type: product.isAnimal !== false ? 'animal' : 'product',
                        name: product.name,
                        image: product.image,
                        price: product.price
                      }} 
                    />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 pt-16 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none">
                  <div className="flex flex-col gap-1.5">
                    <h3 className={cn("text-xl font-semibold text-white leading-tight drop-shadow-md group-hover:text-amber-400 transition-colors", fontClass)}>
                      {productName}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className={cn("text-xs text-white/90 uppercase tracking-wider", fontClass)}>
                        {language === 'bn' ? 'রেয়ার আইটেম' : 'Rare Item'}
                      </span>
                      <span className={cn("text-xl font-extrabold text-white drop-shadow-md", fontClass)}>
                        {productPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Action Section */}
              <div className="p-3.5 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 relative z-20">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("flex-1 py-2.5 px-3 rounded-xl bg-amber-500 text-zinc-950 hover:bg-amber-400 text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all", fontClass)}
                >
                  <HandHeart className="w-4 h-4" />
                  <span>{language === 'bn' ? 'প্রি-বুক করুন' : 'Pre-book Now'}</span>
                </a>
                <Link 
                  href={href}
                  className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors shrink-0"
                  title={language === 'bn' ? 'বিস্তারিত জানুন' : 'Learn More'}
                >
                  <Info className="w-5 h-5" />
                </Link>
              </div>
            </div>
          );
        })
        ) : (
          <div className="w-full flex items-center justify-center p-12 text-zinc-500">
            {language === 'en' ? 'No rare/exotic items available.' : 'বর্তমানে কোনো এক্সক্লুসিভ কালেকশন উপলব্ধ নেই।'}
          </div>
        )}
      </div>

      {/* Interactive Controls & Indicator */}
      {displayProducts.length > 0 && (
      <div className="px-5 md:px-8 max-w-[1400px] mx-auto w-full pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
        
        {/* Swipe guide hint */}
        <div className="inline-flex items-center justify-start gap-1.5 text-sm text-zinc-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-2.76 0-5 2.24-5 5v2a7 7 0 0 0 14 0v-4a7 7 0 0 0-14 0"/><path d="M9 10a7 7 0 0 1 14 0v4a7 7 0 0 1-14 0v-2c0-2.76 2.24-5 5-5h3"/></svg>
          <span className={fontClass}>{language === 'bn' ? 'সোয়াইপ করে এক্সপ্লোর করুন' : 'Swipe to explore'}</span>
        </div>

        {/* Right Controls Container */}
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-4 md:gap-6 w-full md:w-auto">
          {/* Progress Line */}
          <div className="w-full md:w-64 bg-zinc-800 h-1.5 rounded-full overflow-hidden shrink-0">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${Math.max(15, progress)}%` }} 
            />
          </div>
          
          {/* Arrow Controls and Counter */}
          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
            <span className="text-sm font-medium text-zinc-400 tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} / {String(displayProducts.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={scrollPrev}
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center active:scale-90 transition-all hover:bg-zinc-700 hover:text-white"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={scrollNext}
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center active:scale-90 transition-all hover:bg-zinc-700 hover:text-white"
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
