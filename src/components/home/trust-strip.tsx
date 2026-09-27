"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "cn";
import { useLanguage } from "@/lib/language-context";
import { useMotionConfig } from "@/lib/motion";

const trustDict = {
  bn: {
    signals: [
      { icon: "🕐", stat: "২৭+", label: "বছরের অভিজ্ঞতা" },
      { icon: "📍", stat: "বাস্তব", label: "ফিজিক্যাল স্টোর · চুয়াডাঙ্গা" },
      { icon: "📱", stat: "সরাসরি", label: "যোগাযোগ · কোনো মিডলম্যান নেই" },
      { icon: "✅", stat: "যাচাইযোগ্য", label: "ফেসবুকে রিভিউ দেখুন" },
    ],
    liveUpdate: "আজকের আপডেট",
    liveTime: "সর্বশেষ আপডেট: ২ ঘণ্টা আগে",
    openNow: "● এখন খোলা",
  },
  en: {
    signals: [
      { icon: "🕐", stat: "27+", label: "Years of experience" },
      { icon: "📍", stat: "Real", label: "Physical Store · Chuadanga" },
      { icon: "📱", stat: "Direct", label: "Contact · No middleman" },
      { icon: "✅", stat: "Verified", label: "Reviews on Facebook" },
    ],
    liveUpdate: "Today's Update",
    liveTime: "Last updated: 2 hours ago",
    openNow: "● Open Now",
  },
};

export function TrustStrip() {
  const { language } = useLanguage();
  const { getTransition } = useMotionConfig();
  const t = trustDict[language];
  const fontClass = language === "bn" ? "font-bangla" : "font-sans";

  return (
    <section className="relative z-20 py-8 overflow-hidden">
      {/* Background: full-width warm dark green gradient band */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#10382F] via-[#174C40] to-[#10382F]" />
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />
      {/* Aquarium glow from left */}
      <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-[#67D8CE]/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0">

          {/* Live open signal — left side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...getTransition("snappy"), delay: 0 }}
            className="flex items-center gap-3 md:mr-10 shrink-0"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#67D8CE] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#67D8CE]" />
            </span>
            <div className={cn("flex flex-col", fontClass)}>
              <span className="text-[#67D8CE] text-sm font-bold tracking-wide">{t.openNow}</span>
              <span className="text-white/40 text-xs">{t.liveTime}</span>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="hidden md:block h-8 w-px bg-white/10 mr-10 shrink-0" />

          {/* Trust signals */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 w-full md:w-auto">
            {t.signals.map((signal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...getTransition("snappy"), delay: i * 0.06 }}
                className={cn(
                  "flex items-center gap-3 md:px-6",
                  i < t.signals.length - 1 && "md:border-r md:border-white/10"
                )}
              >
                <span className="text-xl shrink-0">{signal.icon}</span>
                <div className={cn("flex flex-col min-w-0", fontClass)}>
                  <span className="text-white font-bold text-sm leading-tight">{signal.stat}</span>
                  <span className="text-white/50 text-xs leading-snug">{signal.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
