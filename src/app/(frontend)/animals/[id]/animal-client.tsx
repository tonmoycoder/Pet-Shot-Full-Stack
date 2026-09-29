"use client";

import React, { useState } from "react";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MessageCircle, Info, Tag, Star } from "lucide-react";
import { cn } from "cn";
import { useLanguage } from "@/lib/language-context";
import { useCursor } from "@/lib/cursor-context";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useMotionConfig } from "@/lib/motion";
import { ShortlistButton } from "@/components/ui/shortlist-button";

type AnimalClientProps = {
  animal: any;
  settings: any;
};

const pdpDict = {
  bn: {
    back: "ফিরে যান",
    price: "মূল্য",
    category: "ক্যাটাগরি",
    description: "বিস্তারিত বিবরণ",
    inquire: "হোয়াটসঅ্যাপে যোগাযোগ করুন",
    available: "বিক্রির জন্য উপলব্ধ",
    soldOut: "স্টক আউট",
    rareBadge: "এক্সক্লুসিভ কালেকশন"
  },
  en: {
    back: "Go Back",
    price: "Price",
    category: "Category",
    description: "Description",
    inquire: "Inquire on WhatsApp",
    available: "Available for Sale",
    soldOut: "Sold Out",
    rareBadge: "Rare & Exotic Collection"
  }
};

export function AnimalClient({ animal, settings }: AnimalClientProps) {
  const { language } = useLanguage();
  const { setCursorType } = useCursor();
  const { getTransition } = useMotionConfig();
  const t = pdpDict[language];
  const fontClass = language === "bn" ? "font-bangla" : "font-sans";

  // Gallery Management
  const images = [
    { url: animal.image },
    ...(animal.gallery?.map((g: any) => ({ url: g.url })) || [])
  ];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Localization Helpers
  const name = animal.name?.[language] || animal.internalName;
  const tag = animal.tag?.[language];
  const price = animal.price?.[language];
  const description = animal.description?.[language];
  
  // WhatsApp Link Generation
  const defaultNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801947315330";
  const whatsappNumber = settings?.contact?.whatsappNumber || defaultNumber;
  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in ${animal.internalName} (ID: ${animal.id}). Is it still available?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 pb-32 lg:pb-24 relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Top Navigation */}
        <div className="py-8 flex items-center justify-between">
          <Link 
            href="/"
            className={cn("inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors", fontClass)}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.back}</span>
          </Link>
          
          <div className={cn("px-4 py-1.5 rounded-full text-xs font-medium border", 
            animal.status === 'available' 
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
              : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
            fontClass
          )}>
            {animal.status === 'available' ? t.available : t.soldOut}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-4 sticky top-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={getTransition("fluid")}
              className="relative w-full aspect-square rounded-[40px] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              onMouseEnter={() => setCursorType("view")}
              onMouseLeave={() => setCursorType("default")}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[activeImageIndex].url}
                    alt={name || 'Animal'}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: activeImageIndex === 0 ? animal.objectPosition : "center center" }}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all",
                      activeImageIndex === idx 
                        ? "border-zinc-900 dark:border-white opacity-100" 
                        : "border-transparent opacity-50 hover:opacity-100"
                    )}
                  >
                    <Image src={img.url} alt={`${name || 'Animal'} ${idx}`} fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...getTransition("fluid"), delay: 0.1 }}
            className="flex flex-col pt-4 lg:pt-12"
          >
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 items-center mb-6">
                {animal.isRareExotic && (
                  <span className={cn("inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-sm font-bold uppercase tracking-widest", fontClass)}>
                    <Star className="w-4 h-4 fill-amber-500" />
                    {t.rareBadge}
                  </span>
                )}
                {tag && (
                  <span className={cn("inline-block px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-sm font-medium", fontClass)}>
                    {tag}
                  </span>
                )}
              </div>
            
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className={cn("text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white leading-tight", fontClass)}>
                  {name}
                </h1>
                <ShortlistButton
                  size="lg"
                  item={{
                    id: animal.id,
                    type: 'animal',
                    name: animal.name || { en: animal.internalName, bn: animal.internalName },
                    image: animal.image,
                    price: animal.price
                  }}
                />
              </div>
              
              <div className="flex items-end gap-4">
                <div className="flex flex-col">
                  <span className={cn("text-sm text-zinc-500 uppercase tracking-wider mb-1", fontClass)}>
                    {t.price}
                  </span>
                  <span className={cn("text-2xl md:text-3xl font-semibold text-[#25D366]", fontClass)}>
                    {price}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-800 mb-8" />

            {/* Description */}
            <div className="mb-12">
              <h3 className={cn("flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white mb-4", fontClass)}>
                <Info className="w-5 h-5 text-zinc-400" />
                {t.description}
              </h3>
              {description ? (
                <p className={cn("text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed whitespace-pre-wrap", fontClass)}>
                  {description}
                </p>
              ) : (
                <p className={cn("text-zinc-400 italic", fontClass)}>
                  No description available.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <MagneticButton 
                  className={cn("w-full bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl px-8 py-6 text-lg shadow-lg shadow-[#25D366]/20 transition-all gap-3 justify-center", fontClass)}
                  magneticStrength={10}
                  onMouseEnter={() => setCursorType("cta")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  <MessageCircle className="w-6 h-6" />
                  {t.inquire}
                </MagneticButton>
              </a>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 p-4 lg:hidden z-50 flex items-center justify-between gap-4 pb-safe">
        <div className="flex flex-col">
          <span className={cn("text-xs text-zinc-500 uppercase font-medium", fontClass)}>
            {t.price}
          </span>
          <span className={cn("text-lg font-bold text-[#25D366] leading-tight", fontClass)}>
            {price}
          </span>
        </div>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 max-w-[200px]">
          <button className={cn("w-full bg-[#25D366] active:bg-[#128C7E] text-white rounded-xl py-3 px-4 text-sm font-semibold shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2 transition-colors", fontClass)}>
            <MessageCircle className="w-4 h-4" />
            {t.inquire}
          </button>
        </a>
      </div>
    </div>
  );
}
