"use client";

import React, { useRef } from "react";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { useLanguage } from "@/lib/language-context";
import { useCursor } from "@/lib/cursor-context";
import { VanillaParallax } from "./vanilla-parallax";

const bentoDict = {
  bn: {
    title: "আমাদের কালেকশন আবিষ্কার করুন",
    subtitle: "দেশি-বিদেশি পাখি এবং প্রিমিয়াম ফিশ একুরিয়ামের এক বিশাল সংগ্রহ।",
    categories: {
      birds: { title: "পাখি", desc: "টিয়া, ম্যাকাও এবং আরও অনেক" },
      aquarium: { title: "অ্যাকোয়ারিয়াম ও মাছ", desc: "অ্যাকোয়াস্কেপিং এবং রঙিন মাছ" },
      accessories: { title: "অ্যাক্সেসরিজ", desc: "খাঁচা এবং খেলনা" },
      food: { title: "খাবার", desc: "পুষ্টিকর খাবার" }
    }
  },
  en: {
    title: "Discover Our Collection",
    subtitle: "A massive collection of local & exotic birds and premium fish aquariums.",
    categories: {
      birds: { title: "Birds", desc: "Parrots, Macaws & more" },
      aquarium: { title: "Aquariums & Fish", desc: "Aquascaping & colorful fish" },
      accessories: { title: "Accessories", desc: "Cages & Toys" },
      food: { title: "Food", desc: "Nutritious feeds" }
    }
  }
};

interface BentoCardProps {
  title: string;
  desc: string;
  imageSrc: string;
  className?: string;
  href: string;
  delay?: number;
  fontClass: string;
  objectPosition?: string;
}

function BentoCard({ title, desc, imageSrc, className, href, delay = 0, fontClass, objectPosition = "center" }: BentoCardProps) {
  const { setCursorType } = useCursor();

  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={cn("group block relative w-full h-full animate-in fade-in zoom-in-95 slide-in-from-bottom-10 duration-1000 ease-out fill-mode-both", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      <Link 
        href={href} 
        className={cn(
          "block relative w-full h-full overflow-hidden rounded-[32px] md:rounded-[40px]",
          "bg-zinc-100 dark:bg-zinc-900 border border-white/20 dark:border-white/5",
          "shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]",
          "hover:shadow-[0_30px_60px_-20px_rgba(4,120,87,0.15)] dark:hover:shadow-[0_30px_60px_-20px_rgba(4,120,87,0.2)]",
          "transition-shadow duration-700 ease-out cursor-none-global"
        )}
        onMouseEnter={() => setCursorType("view")}
        onMouseLeave={() => setCursorType("default")}
      >
        {/* Background Image Container with Parallax */}
        <div 
          className="absolute inset-0 w-full h-[120%] -top-[10%] transform-gpu transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        >
          <VanillaParallax offset={50} reverse className="w-full h-full">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              style={{ objectPosition }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </VanillaParallax>
        </div>

        {/* Dynamic Scrim for readability (Multi-stop smooth gradient) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-700 ease-out" />
        
        {/* Subtle Grain Overlay */}
        <div className="absolute inset-0 bg-[url(/noise.png)] opacity-[0.04] mix-blend-overlay pointer-events-none" />

        {/* Content Box */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
          <div className="flex items-end justify-between w-full relative z-10 gap-4">
            {/* Text Content */}
            <div className="flex-1 min-w-0 transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
              <h3 className={cn("text-white text-2xl md:text-3xl font-extrabold tracking-tight mb-2 break-words", fontClass)}>
                {title}
              </h3>
              <p className={cn("text-zinc-300 text-sm md:text-base font-medium max-w-[200px] md:max-w-[250px]", fontClass)}>
                {desc}
              </p>
            </div>
            
            {/* Reveal Icon */}
            <div className="shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-4 translate-x-4 opacity-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100 shadow-xl overflow-hidden">
              <ArrowUpRight className="text-white w-5 h-5 relative z-10 transition-transform duration-700 group-hover:scale-110" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function DiscoveryBento({ discoveryCards }: { discoveryCards?: any }) {
  const { language } = useLanguage();

  const t = bentoDict[language];
  const containerRef = useRef(null);
  const fontClass = language === "bn" ? "font-bangla" : "font-sans";

  // Resolve images from CMS or local WebP fallback
  const birdsImage = typeof discoveryCards?.birdsImage === 'object' && discoveryCards?.birdsImage?.url ? discoveryCards.birdsImage.url : "/images/bento/birds.webp";
  const aquariumImage = typeof discoveryCards?.aquariumImage === 'object' && discoveryCards?.aquariumImage?.url ? discoveryCards.aquariumImage.url : "/images/bento/aquarium.webp";
  const foodImage = typeof discoveryCards?.foodImage === 'object' && discoveryCards?.foodImage?.url ? discoveryCards.foodImage.url : "/images/bento/food.webp";
  const accessoriesImage = typeof discoveryCards?.accessoriesImage === 'object' && discoveryCards?.accessoriesImage?.url ? discoveryCards.accessoriesImage.url : "/images/bento/accessories.webp";

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto w-full relative z-20">
      
      {/* Header */}
      <div className="mb-16 max-w-3xl flex flex-col items-start">
        <h2 
          className={cn("text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both", fontClass)}
          style={{ animationDelay: "100ms" }}
        >
          {t.title}
        </h2>
        <p 
          className={cn("text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both", fontClass)}
          style={{ animationDelay: "200ms" }}
        >
          {t.subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[750px]">
        
        {/* Large Feature - Birds */}
        <BentoCard
          title={t.categories.birds.title}
          desc={t.categories.birds.desc}
          imageSrc={birdsImage}
          href="/categories/birds"
          className="md:col-span-2 md:row-span-2 h-[450px] md:h-auto"
          delay={0.1}
          fontClass={fontClass}
          objectPosition="top center"
        />

        {/* Medium Tall - Aquarium */}
        <BentoCard
          title={t.categories.aquarium.title}
          desc={t.categories.aquarium.desc}
          imageSrc={aquariumImage}
          href="/categories/aquarium"
          className="md:col-span-2 md:row-span-1 h-[350px] md:h-auto"
          delay={0.2}
          fontClass={fontClass}
          objectPosition="center 30%"
        />

        {/* Small - Food */}
        <BentoCard
          title={t.categories.food.title}
          desc={t.categories.food.desc}
          imageSrc={foodImage}
          href="/categories/food"
          className="md:col-span-1 md:row-span-1 h-[300px] md:h-auto"
          delay={0.3}
          fontClass={fontClass}
        />
        
        {/* Small - Accessories */}
        <BentoCard
          title={t.categories.accessories.title}
          desc={t.categories.accessories.desc}
          imageSrc={accessoriesImage}
          href="/categories/accessories"
          className="md:col-span-1 md:row-span-1 h-[300px] md:h-auto"
          delay={0.4}
          fontClass={fontClass}
        />

      </div>
    </section>
  );
}
