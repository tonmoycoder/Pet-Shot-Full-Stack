"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { cn } from "cn";
import { useLanguage } from "@/lib/language-context";
import { useCursor } from "@/lib/cursor-context";
import { useMotionConfig } from "@/lib/motion";
import { formatStoreHours } from "@/lib/format-time";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CausticsBackground } from "@/components/ui/caustics-background";

const ctaDict = {
  bn: {
    eyebrow: "চলে আসুন",
    headline: "চা খেতে খেতে\nগল্প করি।",
    sub: "দোকানে এলে আমরা সরাসরি সাহায্য করতে পারব। প্রতিটি পাখি, মাছ ও পণ্য নিজে দেখে, জেনে, তারপর সিদ্ধান্ত নিন।",
    whatsapp: "WhatsApp-এ কথা বলুন",
    call: "কল করুন",
    directions: "পথ দেখুন",
    quiz: "সঠিক সঙ্গী খুঁজুন",
  },
  en: {
    eyebrow: "Come visit us",
    headline: "Let's chat\nover tea.",
    sub: "Visiting us in person lets you see every bird, fish, and product up close. Make your decision with full confidence.",
    whatsapp: "Chat on WhatsApp",
    call: "Call Us",
    directions: "Get Directions",
    quiz: "Find Perfect Match",
  },
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

export function FinalCTA({ settings }: { settings?: SettingsProp }) {
  const { language } = useLanguage();
  const { setCursorType } = useCursor();
  const { getTransition } = useMotionConfig();
  const t = ctaDict[language];
  const fontClass = language === "bn" ? "font-bangla" : "font-sans";
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const whatsappLink = settings?.contact?.whatsappNumber ? `https://wa.me/${settings.contact.whatsappNumber}` : "https://wa.me/8801947315330";
  const displayPhone = settings?.contact?.phoneNumber || "01947315330";
  const displayAddress = settings?.location?.address || "সাত ভাই পুকুড় পাড়, চুয়াডাঙ্গা";
  const mapsLink = settings?.location?.googleMapsLink || "https://maps.app.goo.gl/j1NbDKU1zVpx533x8";

  const h = settings?.hours;
  const displayHours = formatStoreHours(h, language as any);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 overflow-hidden py-32 md:py-48"
    >
      {/* Deep forest background */}
      <div className="absolute inset-0 bg-[#0D2E25]" />

      {/* Caustics Fallback Background */}
      <CausticsBackground className="opacity-60" />
      {/* Warm mango accent — subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#FFC85C]/5 blur-[80px] pointer-events-none" />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glass portal ring — decorative centrepiece */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-white/[0.04] animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[400px] h-[400px] md:w-[560px] md:h-[560px] rounded-full border border-white/[0.06] animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-[#67D8CE]/10 animate-[spin_25s_linear_infinite]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...getTransition("fluid"), delay: 0.05 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-8 bg-[#67D8CE]/50" />
          <span className={cn("text-[#67D8CE] text-sm font-semibold uppercase tracking-[0.2em]", fontClass)}>
            {t.eyebrow}
          </span>
          <div className="h-px w-8 bg-[#67D8CE]/50" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...getTransition("fluid"), delay: 0.1 }}
          className={cn(
            "text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] tracking-tight mb-8 whitespace-pre-line",
            fontClass
          )}
        >
          {t.headline}
        </motion.h2>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...getTransition("fluid"), delay: 0.18 }}
          className={cn(
            "text-lg md:text-xl text-white/50 max-w-xl leading-relaxed mb-14",
            fontClass
          )}
        >
          {t.sub}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...getTransition("fluid"), delay: 0.26 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Primary: WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <MagneticButton
              magneticStrength={15}
              onMouseEnter={() => setCursorType("cta")}
              onMouseLeave={() => setCursorType("default")}
              className={cn(
                "w-full sm:w-auto flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20b558] text-white",
                "rounded-full px-6 md:px-8 py-4 md:py-5 text-base md:text-lg font-semibold",
                "shadow-[0_0_40px_-8px_rgba(37,211,102,0.5)] hover:shadow-[0_0_60px_-8px_rgba(37,211,102,0.6)]",
                "transition-all duration-300",
                fontClass
              )}
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              {t.whatsapp}
            </MagneticButton>
          </a>

          {/* Secondary: Call */}
          <a href={`tel:${displayPhone.replace(/\s+/g, '')}`} className="w-full sm:w-auto">
            <MagneticButton
              magneticStrength={10}
              onMouseEnter={() => setCursorType("cta")}
              onMouseLeave={() => setCursorType("default")}
              className={cn(
                "w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white",
                "rounded-full px-5 md:px-7 py-4 md:py-5 text-base md:text-lg font-semibold",
                "border border-white/15 hover:border-white/30 backdrop-blur-md",
                "transition-all duration-300",
                fontClass
              )}
            >
              <Phone className="w-5 h-5 shrink-0" />
              {t.call}
            </MagneticButton>
          </a>

          {/* Tertiary: Directions */}
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <MagneticButton
              magneticStrength={10}
              onMouseEnter={() => setCursorType("cta")}
              onMouseLeave={() => setCursorType("default")}
              className={cn(
                "w-full sm:w-auto flex items-center justify-center gap-3 bg-transparent hover:bg-white/10 text-white/70 hover:text-white",
                "rounded-full px-6 py-5 text-base font-medium",
                "border border-white/10 hover:border-white/20 backdrop-blur-md",
                "transition-all duration-300",
                fontClass
              )}
            >
              <MapPin className="w-4 h-4 shrink-0" />
              {t.directions}
            </MagneticButton>
          </a>

          {/* Quaternary: Quiz */}
          <Link href="/match" className="w-full sm:w-auto mt-4 sm:mt-0">
            <MagneticButton
              magneticStrength={10}
              onMouseEnter={() => setCursorType("cta")}
              onMouseLeave={() => setCursorType("default")}
              className={cn(
                "w-full sm:w-auto flex items-center justify-center gap-3 bg-transparent hover:bg-emerald-900/40 text-[#67D8CE]/80 hover:text-[#67D8CE]",
                "rounded-full px-6 py-5 text-base font-medium",
                "border border-[#67D8CE]/20 hover:border-[#67D8CE]/40 backdrop-blur-md",
                "transition-all duration-300",
                fontClass
              )}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
              {t.quiz}
            </MagneticButton>
          </Link>
        </motion.div>

        {/* Bottom store info strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...getTransition("fluid"), delay: 0.4 }}
          className={cn(
            "mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3",
            "text-white/30 text-sm",
            fontClass
          )}
        >
          <span>{displayAddress}</span>
          <span className="hidden md:inline w-1 h-1 rounded-full bg-white/20" />
          <span>{displayHours}</span>
          <span className="hidden md:inline w-1 h-1 rounded-full bg-white/20" />
          <span>{displayPhone}</span>
        </motion.div>
      </div>
    </section>
  );
}
