"use client";

import React from "react";
import Link from "next/link";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import { useLanguage } from "@/lib/language-context";
import { cn } from "cn";
import { MapPin, Phone, MessageCircle, Bird, Fish, ShoppingBag, Home, Mail, Video, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useCursor } from "@/lib/cursor-context";

const footerDict = {
  bn: {
    tagline: "চুয়াডাঙ্গার প্রিমিয়াম পোষা প্রাণীর দোকান",
    desc: "পাখি, মাছ, অ্যাকোয়ারিয়াম ও প্রয়োজনীয় সামগ্রী—চুয়াডাঙ্গা থেকে যত্নের সঙ্গে।",
    whatsappBtn: "WhatsApp-এ Live Video দেখুন",
    browseBtn: "সব পণ্য দেখুন",
    ctaHeadline: "আপনার নতুন সঙ্গীকে কাছ থেকে দেখুন",
    ctaSubline: "পাখি, মাছ বা অ্যাকোয়ারিয়াম নেওয়ার আগে WhatsApp-এ Live Video-তে দেখে নিন।",
    collectionsTitle: "দোকান",
    collections: [
      { name: "পাখি", href: "/categories/birds", icon: "🦜" },
      { name: "অ্যাকোয়ারিয়াম", href: "/categories/aquarium", icon: "🌊" },
      { name: "মাছ", href: "/categories/fish", icon: "🐟" },
      { name: "খাবার ও অ্যাক্সেসরিজ", href: "/categories/food", icon: "🌿" },
      { name: "নতুন আসা পণ্য", href: "/collection", icon: "✨" },
    ],
    linksTitle: "সহায়তা",
    links: [
      { name: "সাধারণ জিজ্ঞাসা", href: "/faq", icon: "❓" },
      { name: "যোগাযোগ", href: "/contact", icon: "📞" },
      { name: "ডেলিভারি পলিসি", href: "/delivery-policy", icon: "🚚" },
      { name: "DOA পলিসি", href: "/doa-policy", icon: "⚠️" },
      { name: "শর্তাবলী", href: "/terms", icon: "📜" },
      { name: "গোপনীয়তা নীতি", href: "/privacy", icon: "🔒" },
    ],
    phone: "01947315330",
    address: "সাত ভাই পুকুড় পাড়, আব্দুল্লাহ সিটির পিছনে,\nবড় বাজার, চুয়াডাঙ্গা",
    hours: "প্রতিদিন সকাল ৯টা - রাত ৯টা",
    copyright: "© 2026 Bismillah Pakhi & Aquarium. All rights reserved.",
    location: "চুয়াডাঙ্গা, বাংলাদেশ",
    devHeading: "ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট",
    devName: "তানভীর ইসলাম তন্ময়",
    devProfile: "ডেভেলপার প্রোফাইল ↗",
  },
  en: {
    tagline: "Premium Pet Shop in Chuadanga",
    desc: "Birds, fish, aquariums and accessories—with care from Chuadanga.",
    whatsappBtn: "WhatsApp Live Video",
    browseBtn: "View all products",
    ctaHeadline: "See Your New Companion Up Close",
    ctaSubline: "See birds, fish, or aquariums on WhatsApp Live Video before you buy.",
    collectionsTitle: "Shop",
    collections: [
      { name: "Birds", href: "/categories/birds", icon: "🦜" },
      { name: "Aquariums", href: "/categories/aquarium", icon: "🌊" },
      { name: "Fish", href: "/categories/fish", icon: "🐟" },
      { name: "Food & Accessories", href: "/categories/food", icon: "🌿" },
      { name: "New Arrivals", href: "/collection", icon: "✨" },
    ],
    linksTitle: "Support",
    links: [
      { name: "FAQ", href: "/faq", icon: "❓" },
      { name: "Contact Us", href: "/contact", icon: "📞" },
      { name: "Delivery Policy", href: "/delivery-policy", icon: "🚚" },
      { name: "DOA Policy", href: "/doa-policy", icon: "⚠️" },
      { name: "Terms of Service", href: "/terms", icon: "📜" },
      { name: "Privacy Policy", href: "/privacy", icon: "🔒" },
    ],
    phone: "01947315330",
    address: "Sat Bhai Pukur Par, Behind Abdullah City,\nBoro Bazar, Chuadanga",
    hours: "Open Daily 9 AM – 9 PM",
    copyright: "© 2026 Bismillah Pakhi & Aquarium. All rights reserved.",
    location: "Chuadanga, Bangladesh",
    devHeading: "Website design & development",
    devName: "Tanver Islam Tonmoy",
    devProfile: "Developer profile ↗",
  },
};

export function Footer() {
  const { language } = useLanguage();
  const { setCursorType } = useCursor();
  const t = footerDict[language];
  const fontClass = language === "bn" ? "font-bangla" : "font-sans";

  return (
    <footer className={cn("relative overflow-hidden", fontClass)}>
      {/* CTA Banner */}
      <div className="bg-gradient-to-br from-[#09334F] via-[#0d4a6e] to-[#265D85] py-20 px-4 relative">
        <div className="absolute inset-0 opacity-10 bg-[url(/noise.png)] mix-blend-overlay pointer-events-none" />
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {t.ctaHeadline}
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
            {t.ctaSubline}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-8">
            <MagneticButton
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801947315330"}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="default"
              size="lg"
              className={cn("w-full sm:w-auto rounded-full gap-2 shadow-[0_8px_20px_-4px_rgba(4,120,87,0.3)] bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-400/50 transition-all hover:shadow-[0_12px_24px_-4px_rgba(4,120,87,0.4)]", fontClass)}
              magneticStrength={15}
              onMouseEnter={() => setCursorType("cta")}
              onMouseLeave={() => setCursorType("default")}
            >
              <div className="relative flex h-3 w-3 mr-1">
                <span className="animate-razer-pulse absolute inline-flex h-full w-full rounded-full bg-[#00FF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF00]"></span>
              </div>
              <Video className="w-5 h-5 text-emerald-50" />
              {t.whatsappBtn}
            </MagneticButton>
            
            <MagneticButton
              href="/collection"
              variant="outline"
              size="lg"
              className={cn("w-full sm:w-auto rounded-full gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-sm transition-all", fontClass)}
              magneticStrength={5}
              onMouseEnter={() => setCursorType("cta")}
              onMouseLeave={() => setCursorType("default")}
            >
              {t.browseBtn}
              <ArrowRight className="w-5 h-5 opacity-70" />
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-zinc-950 text-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Image 
                  src="/images/logo.webp" 
                  alt="Bismillah Pakhi & Aquarium Logo" 
                  fill 
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <div className="font-extrabold text-2xl leading-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent pb-1">বিসমিল্লাহ পাখি</div>
                <div className="text-sm text-zinc-300 font-medium tracking-wide uppercase mt-0.5">& অ্যাকোয়ারিয়াম</div>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">{t.desc}</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400">
                <MapPin className="w-5 h-5 mt-0.5 text-blue-400 shrink-0" />
                <span className="text-sm leading-relaxed whitespace-pre-line">{t.address}</span>
              </li>
              <li>
                <a
                  href={`tel:+880${t.phone.replace(/^0/, '')}`}
                  className="flex items-start gap-3 text-zinc-400 hover:text-white transition-colors group"
                >
                  <Phone className="w-5 h-5 mt-0.5 text-emerald-500 shrink-0" />
                  <span className="text-sm">{t.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801947315330"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-zinc-400 hover:text-[#25D366] transition-colors group"
                >
                  <MessageCircle className="w-5 h-5 mt-0.5 text-[#25D366] shrink-0" />
                  <span className="text-sm">WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-6">
              {t.collectionsTitle}
            </h3>
            <ul className="space-y-4">
              {t.collections.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors text-sm group"
                  >
                    <span className="text-lg opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">{link.icon}</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-6">
              {t.linksTitle}
            </h3>
            <ul className="space-y-4">
              {t.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors text-sm group"
                  >
                    <span className="text-lg opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">{link.icon}</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Credit */}
          <a 
            href="https://www.facebook.com/tanverislamtonmoyofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-developer-pulse relative bg-white/5 border border-emerald-500/20 rounded-2xl p-6 self-start group hover:border-emerald-500/40 hover:bg-white/10 transition-all cursor-pointer flex flex-col"
          >
            <div className="relative z-10 flex flex-col">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                {t.devHeading}
              </h3>
              <div className="text-lg font-bold text-zinc-200 mb-4 group-hover:text-white transition-colors">
                {t.devName}
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                {t.devProfile}
              </div>
            </div>
          </a>
        </div>

        {/* Copyright Strip */}
        <div className="border-t border-white/5">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-400 text-sm">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <span className="opacity-80">{t.copyright}</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs font-semibold text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {language === 'bn' ? '১০০% নিরাপদ ও SSL সিকিউরড' : '100% SAFE & SSL SECURED'}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 opacity-70" />
                {t.location}
              </span>
              <div className="hidden md:flex items-center gap-4 text-xs font-sans">
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <span className="text-zinc-600">&bull;</span>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
