"use client";

import * as React from "react";

import { Map, Clock, MapPin, Video } from "lucide-react";
import { cn } from "cn";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { useCursor } from "@/lib/cursor-context";
import { useLanguage } from "@/lib/language-context";

// ── Store Status Badge ──────────────────────────────────────────────────────
export function StoreStatusClient({ storeSettings, dicts }: { storeSettings: any, dicts: any }) {
  const { language } = useLanguage();
  const dict = dicts[language as 'en' | 'bn'] || dicts['bn'];

  const [isStoreOpen, setIsStoreOpen] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const h = storeSettings?.hours;

    const checkOpen = () => {
      if (h?.isManualOverride) {
        setIsStoreOpen(h.manualStatus === 'open');
        return;
      }
      const computedStr = (h?.openHour && h?.closeHour)
        ? `${h.openHour}:${h.openMinute || '00'} ${h.openPeriod || 'AM'} - ${h.closeHour}:${h.closeMinute || '00'} ${h.closePeriod || 'PM'}`
        : null;
      const hoursStr = h?.openingTime || computedStr || (language === "bn" ? "সকাল ৯টা - রাত ৯টা" : "9:00 AM - 9:00 PM");

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
  }, [storeSettings, language]);

  if (isStoreOpen === null) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors duration-500 animate-in fade-in slide-in-from-top-2 duration-1000 ease-out fill-mode-both delay-100",
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
        {isStoreOpen === false ? dict.liveStatusClosed : dict.liveStatusOpen}
      </span>
    </div>
  );
}

// ── Hero CTAs ───────────────────────────────────────────────────────────────
export function HeroCTAsClient({ whatsappLink, dicts }: { whatsappLink: string, dicts: any }) {
  const { language } = useLanguage();
  const dict = dicts[language as 'en' | 'bn'] || dicts['bn'];
  const { setCursorType } = useCursor();
  
  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full sm:w-auto mt-4">
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
        {dict.primaryCta}
      </MagneticButton>
      
      <MagneticButton 
        href="/contact"
        variant="outline" 
        size="lg" 
        className={cn("w-full sm:w-auto rounded-full gap-2 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-sm transition-all", language === "bn" ? "font-bangla" : "font-sans")}
        magneticStrength={5}
        onMouseEnter={() => setCursorType("cta")}
        onMouseLeave={() => setCursorType("default")}
      >
        <MapPin className="w-5 h-5 opacity-70" />
        {dict.secondaryCta}
      </MagneticButton>

      <MagneticButton 
        href="/match"
        variant="outline" 
        size="lg" 
        className={cn("w-full sm:w-auto rounded-full gap-2 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-sm transition-all", language === "bn" ? "font-bangla" : "font-sans")}
        magneticStrength={5}
        onMouseEnter={() => setCursorType("cta")}
        onMouseLeave={() => setCursorType("default")}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
        {dict.tertiaryCta}
      </MagneticButton>
    </div>
  );
}

// ── Hero Badges (Parallax) ──────────────────────────────────────────────────
export function HeroBadgesClient({ dicts }: { dicts: any }) {
  const { language } = useLanguage();
  const dict = dicts[language as 'en' | 'bn'] || dicts['bn'];

  return (
    <>
      <div
        className="absolute top-4 md:top-20 left-4 md:-left-12 z-30 bg-white/95 dark:bg-zinc-900/95 border border-white/40 dark:border-zinc-700/40 px-3 py-2 rounded-2xl flex items-center gap-2.5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.1)] pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out fill-mode-both delay-[600ms]"
      >
        <div className="bg-emerald-100 dark:bg-emerald-900/50 p-1.5 rounded-full">
           <Map className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <p className={cn("text-xs font-semibold text-zinc-800 dark:text-zinc-200", language === "bn" ? "font-bangla" : "font-sans")}>
          {dict.badgeStore}
        </p>
      </div>

      <div
        className="absolute bottom-4 md:bottom-24 right-4 md:-right-8 z-30 bg-white/95 dark:bg-zinc-900/95 border border-white/40 dark:border-zinc-700/40 px-3 py-2 rounded-2xl flex items-center gap-2.5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.1)] pointer-events-none animate-in fade-in slide-in-from-top-4 duration-1000 ease-out fill-mode-both delay-[800ms]"
      >
        <div className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-full">
           <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        </div>
        <p className={cn("text-xs font-semibold text-zinc-800 dark:text-zinc-200", language === "bn" ? "font-bangla" : "font-sans")}>
          {dict.badgeUpdate}
        </p>
      </div>
    </>
  );
}



