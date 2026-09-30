"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { cn } from "cn";
import { MapPin, MessageCircle, Map, Clock, Video } from "lucide-react";
import { useMotionConfig } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useLanguage } from "@/lib/language-context";
import { useCursor } from "@/lib/cursor-context";
import { CausticsBackground } from "@/components/ui/caustics-background";
import { SkeletonImage } from "@/components/ui/skeleton-image";

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

export function HeroSection({ heroImage, storeSettings }: { heroImage?: any; storeSettings?: StoreSettingsProp }) {
  const { getTransition } = useMotionConfig();
  const { language } = useLanguage();
  const { setCursorType } = useCursor();
  const t = heroDict[language];

  // Resolve hero image url
  const imageUrl = typeof heroImage === 'object' && heroImage?.url ? heroImage.url : "https://i.postimg.cc/vB1xfSwz/hero.png";

  // ── Store open/closed status (synced with backend) ──────────────────
  const [isStoreOpen, setIsStoreOpen] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const h = storeSettings?.hours;

    const checkOpen = () => {
      // Manual override takes priority
      if (h?.isManualOverride) {
        setIsStoreOpen(h.manualStatus === 'open');
        return;
      }

      // Build hours string from structured fields or text label
      const computedStr = (h?.openHour && h?.closeHour)
        ? `${h.openHour}:${h.openMinute || '00'} ${h.openPeriod || 'AM'} - ${h.closeHour}:${h.closeMinute || '00'} ${h.closePeriod || 'PM'}`
        : null;
      const hoursStr = h?.openingTime || computedStr || (language === "bn" ? "সকাল ৯টা - রাত ৯টা" : "9:00 AM - 9:00 PM");

      // Parse "H:MM AM/PM - H:MM AM/PM"
      const timePattern = /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/gi;
      const matches = [...hoursStr.matchAll(timePattern)];
      if (matches.length < 2) { setIsStoreOpen(null); return; }

      const to24 = (hr: number, min: number, period: string) => {
        let h2 = hr;
        if (period.toUpperCase() === 'AM') { if (h2 === 12) h2 = 0; }
        else { if (h2 !== 12) h2 += 12; }
        return h2 + min / 60;
      };

      const [om, cm] = matches;
      const openDec = to24(parseInt(om[1], 10), parseInt(om[2] || '0', 10), om[3]);
      const closeDec = to24(parseInt(cm[1], 10), parseInt(cm[2] || '0', 10), cm[3]);

      // Get Dhaka time
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka', hour12: false, hour: 'numeric', minute: 'numeric'
      }).formatToParts(new Date());
      const nowDec = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10)
        + parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10) / 60;

      setIsStoreOpen(nowDec >= openDec && nowDec < closeDec);
    };

    checkOpen();
    const iv = setInterval(checkOpen, 60000);
    return () => clearInterval(iv);
  }, [storeSettings]);

  // Screen-relative Parallax Setup (for overall environment)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 100, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const imageX = useTransform(smoothMouseX, [-1, 1], [-12, 12]);
  const imageY = useTransform(smoothMouseY, [-1, 1], [-12, 12]);
  const badge1X = useTransform(smoothMouseX, [-1, 1], [-18, 18]);
  const badge2X = useTransform(smoothMouseX, [-1, 1], [15, -15]);

  // Scroll Parallax for badges
  const { scrollYProgress } = useScroll();
  const badgeScrollY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  // Local Lens Setup (for the image surface)
  const mediaRef = React.useRef<HTMLDivElement>(null);
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);
  const smoothLensX = useSpring(lensX, { damping: 30, stiffness: 150 });
  const smoothLensY = useSpring(lensY, { damping: 30, stiffness: 150 });
  const [isHoveringMedia, setIsHoveringMedia] = React.useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Screen normalized for global parallax
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(nx);
      mouseY.set(ny);

      // Local tracking for lens
      if (isHoveringMedia && mediaRef.current) {
        const rect = mediaRef.current.getBoundingClientRect();
        // Calculate position relative to the center of the media container
        const lx = e.clientX - rect.left - rect.width / 2;
        const ly = e.clientY - rect.top - rect.height / 2;
        lensX.set(lx);
        lensY.set(ly);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, lensX, lensY, isHoveringMedia]);

  const defaultNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801947315330";
  const whatsappLink = storeSettings?.contact?.whatsappNumber 
    ? `https://wa.me/${storeSettings.contact.whatsappNumber.replace(/[^0-9]/g, '')}`
    : `https://wa.me/${defaultNumber}`;

  return (
    <section className="relative w-full min-h-[100vh] flex items-center overflow-x-hidden bg-[#fbf9f4] dark:bg-zinc-950">
      
      {/* Caustics Fallback Background */}
      <CausticsBackground />
      
      {/* Subtle Texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay -z-10 pointer-events-none" />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 lg:px-8 w-full h-full flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16 relative z-10 pb-12 md:pb-0 pt-24 md:pt-0">
        
        {/* Left Column (Editorial Content) */}
        <div className="flex-1 flex flex-col items-start w-full max-w-xl z-20">
          
          {/* Eyebrow Status — synced with backend hours */}
          {isStoreOpen !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...getTransition("fluid"), delay: 0.1 }}
              className={cn(
                "flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border transition-colors duration-500",
                isStoreOpen === false
                  ? "bg-red-50/60 dark:bg-red-950/30 border-red-200/50 dark:border-red-800/50"
                  : "bg-emerald-100/50 dark:bg-emerald-900/30 border-emerald-200/50 dark:border-emerald-800/50"
              )}
            >
              <div className="relative flex h-2 w-2">
                <span className={cn(
                  "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                  isStoreOpen === false ? "bg-red-400" : "bg-emerald-500"
                )} />
                <span className={cn(
                  "relative inline-flex rounded-full h-2 w-2",
                  isStoreOpen === false ? "bg-red-500" : "bg-emerald-500"
                )} />
              </div>
              <span className={cn(
                "text-xs font-bold tracking-wider",
                isStoreOpen === false
                  ? "text-red-600 dark:text-red-400"
                  : "text-emerald-700 dark:text-emerald-400",
                language === "bn" ? "font-bangla" : "font-sans"
              )}>
                {isStoreOpen === false ? t.liveStatusClosed : t.liveStatusOpen}
              </span>
            </motion.div>
          )}

          {/* Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...getTransition("fluid"), delay: 0.2 }}
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 whitespace-pre-line leading-[1.2]",
              language === "bn" ? "font-bangla" : "font-sans"
            )}
          >
            {t.headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...getTransition("fluid"), delay: 0.3 }}
            className={cn(
              "text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 max-w-lg",
              language === "bn" ? "font-bangla" : "font-sans"
            )}
          >
            {t.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...getTransition("snappy"), delay: 0.4 }}
            className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full sm:w-auto mt-4"
          >
            <MagneticButton 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="default" 
              size="lg" 
              className={cn("w-full sm:w-auto rounded-full gap-2 shadow-[0_8px_20px_-4px_rgba(4,120,87,0.3)] bg-emerald-700 hover:bg-emerald-800 text-white border border-emerald-600/50 transition-all hover:shadow-[0_12px_24px_-4px_rgba(4,120,87,0.4)]", language === "bn" ? "font-bangla" : "font-sans")}
              magneticStrength={15}
              onMouseEnter={() => setCursorType("cta")}
              onMouseLeave={() => setCursorType("default")}
            >
              <Video className="w-5 h-5 text-emerald-100" />
              {t.primaryCta}
            </MagneticButton>
            
            <MagneticButton 
              href="/contact"
              variant="outline" 
              size="lg" 
              className={cn("w-full sm:w-auto rounded-full gap-2 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md hover:bg-white/90 dark:hover:bg-zinc-800/90 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-sm transition-all", language === "bn" ? "font-bangla" : "font-sans")}
              magneticStrength={5}
              onMouseEnter={() => setCursorType("cta")}
              onMouseLeave={() => setCursorType("default")}
            >
              <MapPin className="w-5 h-5 opacity-70" />
              {t.secondaryCta}
            </MagneticButton>

            <MagneticButton 
              href="/match"
              variant="outline" 
              size="lg" 
              className={cn("w-full sm:w-auto rounded-full gap-2 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md hover:bg-white/90 dark:hover:bg-zinc-800/90 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-sm transition-all", language === "bn" ? "font-bangla" : "font-sans")}
              magneticStrength={5}
              onMouseEnter={() => setCursorType("cta")}
              onMouseLeave={() => setCursorType("default")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
              {t.tertiaryCta}
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Column (Visual Stage) */}
        <div className="flex-1 w-full relative aspect-[4/3] md:aspect-auto md:h-[75vh] md:max-h-[700px] z-10 flex items-center justify-center mt-2 md:mt-0 min-h-[260px]">
          
          {/* Floating Badge 1 (Store) */}
          <motion.div
            style={{ 
              x: badge1X, 
              y: useTransform(() => badgeScrollY.get() + badge1X.get() * 0.5) 
            }}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...getTransition("bouncy"), delay: 0.6 }}
            className="absolute top-4 md:top-20 left-4 md:-left-12 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-700/40 px-3 py-2 rounded-2xl flex items-center gap-2.5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.1)] pointer-events-none"
          >
            <div className="bg-emerald-100 dark:bg-emerald-900/50 p-1.5 rounded-full">
               <Map className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className={cn("text-xs font-semibold text-zinc-800 dark:text-zinc-200", language === "bn" ? "font-bangla" : "font-sans")}>
              {t.badgeStore}
            </p>
          </motion.div>

          {/* Floating Badge 2 (Update) */}
          <motion.div
            style={{ 
              x: badge2X, 
              y: useTransform(() => badgeScrollY.get() * 1.5 + badge2X.get() * -0.5) 
            }}
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...getTransition("bouncy"), delay: 0.8 }}
            className="absolute bottom-4 md:bottom-24 right-4 md:-right-8 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-700/40 px-3 py-2 rounded-2xl flex items-center gap-2.5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.1)] pointer-events-none"
          >
            <div className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-full">
               <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className={cn("text-xs font-semibold text-zinc-800 dark:text-zinc-200", language === "bn" ? "font-bangla" : "font-sans")}>
              {t.badgeUpdate}
            </p>
          </motion.div>

          {/* The Asymmetric Stage (Main Visual Container) */}
          <motion.div 
            ref={mediaRef}
            style={{ x: imageX, y: imageY }}
            onMouseEnter={() => {
              setIsHoveringMedia(true);
              setCursorType("view");
            }}
            onMouseLeave={() => {
              setIsHoveringMedia(false);
              setCursorType("default");
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...getTransition("fluid"), duration: 1, delay: 0.3 }}
            className="relative w-full h-full max-w-lg md:max-w-[110%] rounded-tl-[60px] rounded-br-[60px] rounded-tr-[20px] rounded-bl-[20px] md:rounded-tl-[80px] md:rounded-br-[80px] md:rounded-tr-[24px] md:rounded-bl-[24px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15),_0_0_0_1px_rgba(255,255,255,0.6)_inset] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4),_0_0_0_1px_rgba(255,255,255,0.1)_inset] bg-zinc-200 dark:bg-zinc-800"
          >
            
            <motion.div 
              animate={{ scale: [1.0, 1.018, 1.0] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
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
            </motion.div>
            
            {/* Inner Vignette for depth and contrast */}
            <div className="absolute inset-0 bg-black/10 dark:bg-black/30 pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Localized V6 Lens Effect */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isHoveringMedia ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 pointer-events-none z-20 rounded-[32px] md:rounded-tl-[80px] md:rounded-br-[80px] md:rounded-tr-[24px] md:rounded-bl-[24px] overflow-hidden"
            >
               <motion.div 
                 style={{ 
                   x: smoothLensX, 
                   y: smoothLensY,
                   WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 65%)",
                   maskImage: "radial-gradient(circle at center, black 0%, transparent 65%)"
                 }}
                 className="absolute left-1/2 top-1/2 w-[240px] h-[240px] -ml-[120px] -mt-[120px] rounded-full backdrop-blur-[3px] backdrop-invert backdrop-brightness-105 backdrop-contrast-110 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] will-change-transform"
               />
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
