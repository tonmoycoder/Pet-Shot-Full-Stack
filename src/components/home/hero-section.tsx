import * as React from "react";
import { SkeletonImage } from "@/components/ui/skeleton-image";
import { CausticsBackground } from "@/components/ui/caustics-background";

import { StoreStatusClient, HeroCTAsClient, HeroBadgesClient } from "./hero-client-components";
import { HeroTextClient } from "./hero-text-client";

type StoreSettingsProp = {
  hours?: {
    openingTime?: string;
    openHour?: string;
    openMinute?: string;
    openPeriod?: string;
    closeHour?: string;
    closeMinute?: string;
    closePeriod?: string;
    isManualOverride?: boolean;
    manualStatus?: 'open' | 'closed';
  };
  contact?: {
    whatsappNumber?: string;
  };
};

const heroDict = {
  bn: {
    liveStatusOpen: "এখন দোকান খোলা",
    liveStatusClosed: "এখন দোকান বন্ধ",
    headline: "চোখের সামনে দেখুন।\nতারপর পছন্দের সঙ্গীকে\nকাছ থেকে চিনুন।",
    subheadline: "শখ আর ভালোবাসার এক বিশ্বস্ত নাম। দেশি-বিদেশি পাখি, একুরিয়ামের মাছ আর খাঁচাসহ যাবতীয় সরঞ্জাম। অনলাইনে কালেকশন দেখুন, আর দোকানে এসে দেখে-শুনে সিদ্ধান্ত নিন।",
    primaryCta: "WhatsApp-এ Live Video",
    secondaryCta: "কীভাবে আসবেন?",
    tertiaryCta: "সঠিক সঙ্গী খুঁজুন",
    badgeStore: "বাস্তব দোকান · চুয়াডাঙ্গা",
    badgeUpdate: "আজকের আপডেট",
  },
  en: {
    liveStatusOpen: "Open Now",
    liveStatusClosed: "Closed Now",
    headline: "See them in person.\nThen choose your perfect\ncompanion up close.",
    subheadline: "A trusted name for hobby and love. Local and exotic birds, aquarium fish, cages, and accessories. Browse our collection online, then visit the store to decide.",
    primaryCta: "WhatsApp Live Video",
    secondaryCta: "Get Directions",
    tertiaryCta: "Find Perfect Match",
    badgeStore: "Real Store · Chuadanga",
    badgeUpdate: "Today's Update",
  }
};

export function HeroSection({ heroImage, storeSettings, lcpImage, language = 'bn' }: { heroImage?: any; storeSettings?: StoreSettingsProp; lcpImage?: React.ReactNode, language?: 'bn' | 'en' }) {
  const dict = heroDict[language];

  // Resolve hero image url - use local WebP fallback for best LCP
  const imageUrl = typeof heroImage === 'object' && heroImage?.url ? heroImage.url : "/images/hero.webp";

  const defaultNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801947315330";
  const whatsappLink = storeSettings?.contact?.whatsappNumber 
    ? `https://wa.me/${storeSettings.contact.whatsappNumber.replace(/[^0-9]/g, '')}`
    : `https://wa.me/${defaultNumber}`;

  return (
    // Exact same classes as the deployed original — min-h-[100vh] NOT svh, overflow-x-hidden clips the 110% image
    <section className="relative w-full min-h-[100vh] flex items-center overflow-x-hidden bg-[#fbf9f4] dark:bg-zinc-950">
      
      {/* Caustics Fallback Background — placed directly, no extra wrapper that breaks overflow clipping */}
      <CausticsBackground />

      {/* Subtle Texture */}
      <div className="absolute inset-0 bg-[url(/noise.png)] opacity-[0.03] mix-blend-overlay -z-10 pointer-events-none" />

      {/* Main Content Container — exact original classes: pt-24 md:pt-0 centers content on desktop via section's items-center */}
      <div className="container mx-auto px-4 lg:px-8 w-full h-full flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16 relative z-10 pb-12 md:pb-0 pt-24 md:pt-0">
        
        {/* Left Column (Editorial Content) */}
        <div className="flex-1 flex flex-col items-start w-full max-w-xl z-20">
          
          {/* Eyebrow Status — synced with backend hours (Wrapped to prevent CLS) */}
          <div className="min-h-[36px] mb-6 flex items-center">
             <StoreStatusClient storeSettings={storeSettings} dicts={heroDict} />
          </div>

          <HeroTextClient dicts={heroDict} />

          {/* CTAs */}
          <HeroCTAsClient whatsappLink={whatsappLink} dicts={heroDict} />
        </div>

        {/* Right Column (Visual Stage) — exact original right-col classes */}
        <div className="flex-1 w-full relative aspect-[4/3] md:aspect-auto md:h-[75vh] md:max-h-[700px] z-10 flex items-center justify-center mt-2 md:mt-0 min-h-[260px]">
          
          <HeroBadgesClient dicts={heroDict} />

          {/* The Asymmetric Stage — animate-float replaces framer-motion's gentle scale pulse.
              overflow-x-hidden on section clips the md:max-w-[110%] overflow (same as deployed). */}
          <div className="animate-float relative w-full h-full max-w-lg md:max-w-[110%] rounded-tl-[60px] rounded-br-[60px] rounded-tr-[20px] rounded-bl-[20px] md:rounded-tl-[80px] md:rounded-br-[80px] md:rounded-tr-[24px] md:rounded-bl-[24px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15),_0_0_0_1px_rgba(255,255,255,0.6)_inset] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4),_0_0_0_1px_rgba(255,255,255,0.1)_inset] bg-zinc-200 dark:bg-zinc-800">
            
            <div className="absolute inset-0 w-full h-full">
              {lcpImage ? lcpImage : (
                <SkeletonImage
                  src={imageUrl}
                  alt="Beautiful Aquarium and Birds"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  fetchPriority="high"
                  loading="eager"
                  className="w-full h-full object-cover origin-center"
                />
              )}
            </div>

            {/* Inner Vignette for depth and contrast */}
            <div className="absolute inset-0 bg-black/10 dark:bg-black/30 pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          </div>
        </div>
      </div>
    </section>
  );
}
