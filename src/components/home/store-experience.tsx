"use client";

import React, { useState, useEffect } from "react";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import { Video, MapPin, Store, Clock, Phone, MicOff, Camera } from "lucide-react";
import { cn } from "cn";
import { useLanguage } from "@/lib/language-context";
import { formatStoreHours } from "@/lib/format-time";
import { useCursor } from "@/lib/cursor-context";
import { MagneticButton } from "@/components/ui/magnetic-button";

const storeDict = {
  bn: {
    sectionTitle: "অফলাইন এবং অনলাইন",
    liveTitle: "লাইভ ভিডিও কনসালটেশন",
    liveDesc: "দোকানে আসতে পারছেন না? হোয়াটসঅ্যাপ ভিডিও কলের মাধ্যমে আমাদের সম্পূর্ণ কালেকশন দেখুন এবং আপনার পছন্দের সঙ্গীটি বেছে নিন।",
    liveCta: "হোয়াটসঅ্যাপ এ যোগাযোগ করুন",
    storeTitle: "আমাদের ফিজিক্যাল স্টোর",
    storeDesc: (hours: string) => `সরাসরি এসে আমাদের বিশাল কালেকশন দেখতে পারেন। আমাদের সময়সূচী: ${hours}।`,
    storeAddress: "সাত ভাই পুকুড় পাড়, আব্দুল্লাহ সিটির পিছনে বড় বাজার চুয়াডাঙ্গা।",
    storeCta: "ম্যাপে দেখুন",
    statusOpen: "এখন খোলা",
    statusClosed: "বন্ধ আছে"
  },
  en: {
    sectionTitle: "Offline & Online",
    liveTitle: "Live Video Consultation",
    liveDesc: "Can't visit the store? View our complete collection and choose your perfect companion via WhatsApp video call.",
    liveCta: "Contact on WhatsApp",
    storeTitle: "Our Physical Store",
    storeDesc: (hours: string) => `Visit us in person to explore our massive collection. Our hours: ${hours}.`,
    storeAddress: "Sat Bhai Pukur Par, Behind Abdullah City, Boro Bazar, Chuadanga",
    storeCta: "View on Map",
    statusOpen: "Open Now",
    statusClosed: "Closed"
  }
};

type SettingsProp = {
  contact?: {
    whatsappNumber: string;
    phoneNumber: string;
  };
  location?: {
    address: string;
    googleMapsLink: string;
  };
  hours?: {
    openingTime?: string;
    daysOpen?: string;
    openHour?: string;
    openMinute?: string;
    openPeriod?: string;
    closeHour?: string;
    closeMinute?: string;
    closePeriod?: string;
    isManualOverride?: boolean;
    manualStatus?: 'open' | 'closed';
  };
};

export function StoreExperience({ settings }: { settings?: SettingsProp }) {
  const { language } = useLanguage();
  const { setCursorType } = useCursor();
  const t = storeDict[language];
  const fontClass = language === "bn" ? "font-bangla" : "font-sans";

  const defaultNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801947315330";
  const whatsappLink = settings?.contact?.whatsappNumber ? `https://wa.me/${settings.contact.whatsappNumber}` : `https://wa.me/${defaultNumber}`;
  const displayPhone = settings?.contact?.phoneNumber || "01947315330";
  const displayAddress = settings?.location?.address || t.storeAddress;
  const mapsLink = settings?.location?.googleMapsLink || "https://maps.app.goo.gl/j1NbDKU1zVpx533x8";
  // Build hours display string from structured fields if available
  const h = settings?.hours;
  const displayHours = formatStoreHours(h, language as any);
  const isManualOverride = h?.isManualOverride ?? false;
  const manualStatus = h?.manualStatus ?? 'open';

  // Parse time string like "9:00 AM - 9:00 PM" or "9 AM - 9 PM" into { open: number, close: number } in 24h
  const parseHoursRange = (hoursStr: string): { open: number; close: number } | null => {
    try {
      // Match patterns like "9:00 AM", "09:30 PM", "9 AM"
      const timePattern = /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/gi;
      const matches = [...hoursStr.matchAll(timePattern)];
      if (matches.length < 2) return null;

      const to24 = (h: number, min: number, period: string) => {
        let hour = h;
        if (period.toUpperCase() === 'AM') {
          if (hour === 12) hour = 0;
        } else {
          if (hour !== 12) hour += 12;
        }
        return hour + min / 60;
      };

      const [openMatch, closeMatch] = matches;
      const openHour = parseInt(openMatch[1], 10);
      const openMin = parseInt(openMatch[2] || '0', 10);
      const openPeriod = openMatch[3];

      const closeHour = parseInt(closeMatch[1], 10);
      const closeMin = parseInt(closeMatch[2] || '0', 10);
      const closePeriod = closeMatch[3];

      return {
        open: to24(openHour, openMin, openPeriod),
        close: to24(closeHour, closeMin, closePeriod),
      };
    } catch {
      return null;
    }
  };

  // Calculate if store is currently open based on backend hours (Dhaka time)
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const checkStoreStatus = () => {
      // Manual override takes priority
      if (isManualOverride) {
        setIsOpen(manualStatus === 'open');
        return;
      }

      // Get current Dhaka time as decimal hours (e.g., 9:30 AM = 9.5)
      const now = new Date();
      const dhakaFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
      });
      const parts = dhakaFormatter.formatToParts(now);
      const hourPart = parts.find(p => p.type === 'hour');
      const minutePart = parts.find(p => p.type === 'minute');
      const currentDecimal = parseInt(hourPart?.value || '0', 10) + parseInt(minutePart?.value || '0', 10) / 60;

      // Parse backend opening time string
      const parsed = parseHoursRange(displayHours);
      if (parsed) {
        setIsOpen(currentDecimal >= parsed.open && currentDecimal < parsed.close);
      } else {
        // Fallback: 9AM-9PM
        setIsOpen(currentDecimal >= 9 && currentDecimal < 21);
      }
    };

    checkStoreStatus();
    const interval = setInterval(checkStoreStatus, 60000);
    return () => clearInterval(interval);
  }, [displayHours, isManualOverride, manualStatus]);

  return (
    <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto w-full relative z-20">

      {/* Header */}
      <div className="mb-12 flex items-center gap-4">
        <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
        <h2 className={cn("text-xl md:text-2xl font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest", fontClass)}>
          {t.sectionTitle}
        </h2>
        <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 min-h-[500px]">

        {/* Left Pane: Live Video */}
        <div
          className="group relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-[#075E54]/5 dark:bg-[#075E54]/10 border border-[#25D366]/20 p-8 md:p-12 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
          style={{ animationDelay: "100ms" }}
          onMouseEnter={() => setCursorType("view")}
          onMouseLeave={() => setCursorType("default")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Caustic Texture Background — local compressed WebP */}
          <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
            style={{
              backgroundImage: "url('/images/caustics.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.18,
              mixBlendMode: "overlay",
              transition: "opacity 0.7s ease",
            }}
          />

          {/* Full pane soft liquid dark glass overlay */}
          <div className="absolute inset-0 bg-zinc-900/40 dark:bg-black/50 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.3)] z-0 pointer-events-none" />

          <div className="relative z-10 w-full">
            <div className="flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full w-fit border border-[#25D366]/30">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
              </span>
              <span className={cn("text-sm font-semibold text-white", fontClass)}>
                WhatsApp Live
              </span>
            </div>

            <h3 className={cn("text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-md", fontClass)}>
              {t.liveTitle}
            </h3>
            <p className={cn("text-lg md:text-xl text-zinc-200 font-medium max-w-sm leading-relaxed drop-shadow-sm", fontClass)}>
              {t.liveDesc}
            </p>
          </div>

          <div className="relative z-10 mt-8 md:mt-12 flex flex-col xl:flex-row items-start xl:items-center gap-4 w-full">
            <MagneticButton
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-8 py-6 text-lg shadow-[0_10px_30px_-10px_rgba(37,211,102,0.5)] transition-all gap-3 w-full sm:w-auto", fontClass)}
              magneticStrength={15}
              onMouseEnter={() => setCursorType("cta")}
              onMouseLeave={() => setCursorType("default")}
            >
              <Video className="w-6 h-6" />
              {t.liveCta}
            </MagneticButton>

            <div className={cn("whitespace-nowrap text-white font-semibold bg-emerald-500/10 dark:bg-emerald-500/20 px-5 py-3 rounded-full border border-emerald-500/20 backdrop-blur-md shadow-sm", fontClass)}>
              যোগাযোগ: {displayPhone}
            </div>
          </div>

          {/* CSS Phone Mockup - Static with hover effect */}
          <div
            className="hidden md:block absolute right-[-20px] lg:right-[-40px] xl:right-12 bottom-[-60px] w-48 xl:w-56 h-[400px] xl:h-[480px] bg-black rounded-[32px] border-[6px] border-zinc-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden pointer-events-none transform-gpu z-0 transition-transform duration-700 ease-out group-hover:-translate-y-4 group-hover:rotate-[-2deg]"
          >
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full z-20"></div>

            {/* Screen Content - Video Call */}
            <div className="relative w-full h-full bg-zinc-900">
              <Image
                src="/images/dog-call.webp"
                alt="Video Feed"
                fill
                sizes="(max-width: 768px) 0vw, 250px"
                className="object-cover opacity-90"
              />

              {/* Your local video preview PIP */}
              <div className="absolute top-8 right-3 w-12 h-16 bg-zinc-800 rounded-md border border-white/20 overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-[url(/noise.png)] opacity-20 mix-blend-overlay" />
                <div className="w-full h-full bg-zinc-700/50 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-[10px] text-white/50">You</span>
                </div>
              </div>

              {/* Call Controls UI */}
              <div className="absolute bottom-8 left-0 w-full px-4 flex items-center justify-between z-10">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <MicOff className="w-4 h-4 text-white" />
                </div>
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                  <Phone className="w-5 h-5 text-white transform rotate-[135deg]" />
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Right Pane: Physical Store */}
        <div
          className="group relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
          style={{ animationDelay: "200ms" }}
          onMouseEnter={() => setCursorType("view")}
          onMouseLeave={() => setCursorType("default")}
        >
          {/* Subtle Map Background Pattern */}
          <div className="absolute inset-0 bg-[url(/noise.png)] opacity-[0.03] mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-200/50 dark:from-zinc-950/50 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="w-full md:flex-1">
              <div className="flex items-center gap-2 mb-6">
                <Store className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                <span className={cn("text-sm font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider", fontClass)}>
                  {displayAddress}
                </span>
              </div>

              <h3 className={cn("text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4 leading-tight", fontClass)}>
                {t.storeTitle}
              </h3>
              <p className={cn("text-lg md:text-xl text-zinc-700 dark:text-zinc-300 max-w-sm leading-relaxed", fontClass)}>
                {t.storeDesc(displayHours)}
              </p>

              {/* Map Preview on Mobile */}
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="md:hidden block w-full mt-6 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm opacity-90 hover:opacity-100 transition-opacity" aria-label="View store on Google Maps">
                <iframe
                  title="Google Maps Location Mobile"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14631.956691657801!2d88.8410292!3d23.6335191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f9479b12a52f95%3A0xe7a50da83c67d3df!2sBismillah%20Pakhi%20And%20Aquarium!5e0!3m2!1sen!2sbd!4v1714000000000!5m2!1sen!2sbd"
                  className="w-full h-[200px]"
                  style={{ border: 0, pointerEvents: "none" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
            </div>

            {/* QR Code and Map Preview (Desktop) */}
            <div className="hidden md:flex flex-col items-center gap-4 shrink-0">
              <div className="shrink-0 w-28 h-28 bg-white p-2 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-700 ease-out">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/store-qr.png"
                    alt="Store Location QR Code"
                    fill
                    sizes="(max-width: 768px) 100vw, 112px"
                    className="object-cover"
                  />
                </div>
              </div>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm opacity-80 hover:opacity-100 transition-opacity mt-2" aria-label="View store on Google Maps">
                <iframe
                  title="Google Maps Location Desktop"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14631.956691657801!2d88.8410292!3d23.6335191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f9479b12a52f95%3A0xe7a50da83c67d3df!2sBismillah%20Pakhi%20And%20Aquarium!5e0!3m2!1sen!2sbd!4v1714000000000!5m2!1sen!2sbd"
                  width="180"
                  height="120"
                  style={{ border: 0, pointerEvents: "none" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
            </div>
          </div>

          <div className="relative z-10 mt-12 flex flex-col sm:flex-row items-center gap-4 justify-between w-full">
            <MagneticButton
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className={cn("bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-700 backdrop-blur-md text-zinc-900 dark:text-white rounded-full px-6 py-6 text-base shadow-sm border border-zinc-200 dark:border-zinc-700 transition-all gap-2", fontClass)}
              magneticStrength={10}
              onMouseEnter={() => setCursorType("cta")}
              onMouseLeave={() => setCursorType("default")}
            >
              <MapPin className="w-5 h-5" />
              {t.storeCta}
            </MagneticButton>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 bg-white/50 dark:bg-zinc-800/50 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700">
                <Clock className="w-4 h-4" />
                <span className={cn("text-sm font-medium", fontClass)}>{displayHours}</span>
              </div>

              {isOpen !== null && (
                <div className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold",
                  isOpen
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400"
                    : "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400",
                  fontClass
                )}>
                  <span className="relative flex h-2 w-2">
                    <span className={cn(
                      "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                      isOpen ? "bg-emerald-500" : "bg-red-500"
                    )}></span>
                    <span className={cn(
                      "relative inline-flex rounded-full h-2 w-2",
                      isOpen ? "bg-emerald-500" : "bg-red-500"
                    )}></span>
                  </span>
                  {isOpen ? t.statusOpen : t.statusClosed}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
