"use client";

import React, { useState } from "react";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MessageCircle, Info } from "lucide-react";
import { cn } from "cn";
import { useLanguage } from "@/lib/language-context";
import { useCursor } from "@/lib/cursor-context";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useMotionConfig } from "@/lib/motion";
import { ShortlistButton } from "@/components/ui/shortlist-button";
import { ImageZoom } from "@/components/ui/image-zoom";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

type ProductClientProps = {
  product: any;
  settings: any;
};

const pdpDict = {
  bn: {
    back: "ফিরে যান",
    price: "মূল্য",
    category: "ক্যাটাগরি",
    description: "বিস্তারিত বিবরণ",
    inquire: "হোয়াটসঅ্যাপে যোগাযোগ করুন",
    inStock: "স্টকে আছে",
    outOfStock: "স্টক আউট"
  },
  en: {
    back: "Go Back",
    price: "Price",
    category: "Category",
    description: "Description",
    inquire: "Inquire on WhatsApp",
    inStock: "In Stock",
    outOfStock: "Out of Stock"
  }
};

const categoryDict: Record<string, { en: string; bn: string }> = {
  food: { en: "Food", bn: "খাবার" },
  accessories: { en: "Accessories", bn: "অ্যাক্সেসরিজ" },
  medicine: { en: "Medicine", bn: "ওষুধ" },
  other: { en: "Other", bn: "অন্যান্য" }
};

export function ProductClient({ product, settings }: ProductClientProps) {
  const { language } = useLanguage();
  const { setCursorType } = useCursor();
  const { getTransition } = useMotionConfig();
  const t = pdpDict[language];
  const fontClass = language === "bn" ? "font-bangla" : "font-sans";

  // Gallery Management
  const images = [
    { url: product.image },
    ...(product.gallery?.map((g: any) => ({ url: g.url })) || [])
  ];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Localization Helpers
  const name = product.name?.[language] || product.internalName;
  const price = product.price?.[language];
  const description = product.description?.[language];
  const categoryLabel = categoryDict[product.category]?.[language] || product.category;
  
  // WhatsApp Link Generation
  const defaultNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801947315330";
  const whatsappNumber = settings?.contact?.whatsappNumber || defaultNumber;
  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in ${product.internalName} (ID: ${product.id}). Is it available?`
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
            product.status === 'in_stock' 
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
              : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
            fontClass
          )}>
            {product.status === 'in_stock' ? t.inStock : t.outOfStock}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left: Image Gallery — relative on mobile, sticky on desktop */}
          <div className="flex flex-col gap-4 relative md:sticky md:top-24">
            <div
              className="w-full"
              onMouseEnter={() => setCursorType("view")}
              onMouseLeave={() => setCursorType("default")}
            >
              <ImageZoom src={images[activeImageIndex].url} alt={`${name || "Product Image"} - বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম চুয়াডাঙ্গা`} className="relative w-full aspect-square rounded-[40px] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                    style={{ willChange: "opacity" }}
                  >
                    {/* LCP: priority & high fetchPriority on the main product image */}
                    <Image
                      src={images[activeImageIndex].url}
                      alt={`${name || 'Product Image'} - বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম চুয়াডাঙ্গা`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      style={{ objectPosition: "center center" }}
                      priority={activeImageIndex === 0}
                      fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
                    />
                  </motion.div>
                </AnimatePresence>
              </ImageZoom>
            </div>

            {/* Thumbnails — lazy loaded */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View photo ${idx + 1} of ${name}`}
                    className={cn(
                      "relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all",
                      activeImageIndex === idx 
                        ? "border-zinc-900 dark:border-white opacity-100" 
                        : "border-transparent opacity-50 hover:opacity-100"
                    )}
                  >
                    <Image src={img.url} alt={`${name || 'Product'} photo ${idx + 1}`} fill sizes="80px" className="object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details — render at full opacity for instant SSR paint */}
          <div 
            className="flex flex-col pt-4 lg:pt-12 animate-in fade-in duration-500"
          >
            <div className="mb-8">
              {categoryLabel && (
                <span className={cn("inline-block px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-sm font-medium mb-6", fontClass)}>
                  {categoryLabel}
                </span>
              )}
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className={cn("text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white leading-tight", fontClass)}>
                  {name}
                </h1>
                <ShortlistButton
                  size="lg"
                  item={{
                    id: product.id,
                    type: 'product',
                    name: product.name || { en: product.internalName, bn: product.internalName },
                    image: product.image,
                    price: product.price
                  }}
                />
              </div>
              
              <div className="flex items-end gap-4 mb-8">
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
                <div className={cn("text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed prose prose-emerald dark:prose-invert max-w-none", fontClass)}>
                  {typeof description === 'string' ? (
                    <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                      {description.replace(/\\n/g, '\n')}
                    </ReactMarkdown>
                  ) : (
                    description
                  )}
                </div>
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

              <a 
                href={settings?.contact?.storeFacebookPageUrl || "https://www.facebook.com/bismillahpakhiandaquarium"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 sm:max-w-[270px]"
              >
                <button
                  className={cn(
                    "w-full h-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] dark:text-[#4294ff] border border-[#1877F2]/30 rounded-2xl px-5 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95",
                    fontClass
                  )}
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>{language === "bn" ? "ফেসবুক পেজে আমাদের আপডেট দেখুন" : "View Updates on Facebook"}</span>
                </button>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA — z-[55] ensures it sits above body content but below modals/drawers */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 p-4 lg:hidden z-[55] flex items-center justify-between gap-4 pb-safe">
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
