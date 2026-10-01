"use client";

import React from "react";
import Link from "next/link";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import { useLanguage } from "@/lib/language-context";
import { cn } from "cn";
import { MapPin, Phone, MessageCircle, Bird, Fish, ShoppingBag, Home, Mail } from "lucide-react";

const footerDict = {
  bn: {
    tagline: "চুয়াডাঙ্গার প্রিমিয়াম পোষা প্রাণীর দোকান",
    desc: "দেশি-বিদেশি পাখি, মাছ ও অ্যাকোয়ারিয়ামের বিশাল সংগ্রহ। গুণগত মান ও বিশ্বস্ততায় আমরা সেরা।",
    whatsappBtn: "হোয়াটসঅ্যাপে কথা বলুন",
    collectionsTitle: "সংগ্রহ",
    collections: [
      { name: "পাখির কালেকশন", href: "/categories/birds", icon: "🦜" },
      { name: "অ্যাকোয়ারিয়াম ও মাছ", href: "/categories/aquarium", icon: "🐟" },
      { name: "খাবার", href: "/categories/food", icon: "🌿" },
      { name: "অ্যাক্সেসরিজ", href: "/categories/accessories", icon: "🛒" },
      { name: "সম্পূর্ণ কালেকশন", href: "/collection", icon: "🏪" },
    ],
    linksTitle: "পেজসমূহ",
    links: [
      { name: "হোম", href: "/", icon: "🏠" },
      { name: "যোগাযোগ", href: "/contact", icon: "📞" },
      { name: "সাধারণ জিজ্ঞাসা", href: "#", icon: "❓" },
      { name: "শর্তাবলী", href: "#", icon: "📜" },
      { name: "গোপনীয়তা নীতি", href: "#", icon: "🔒" },
    ],
    contactTitle: "যোগাযোগ করুন",
    phone: "01947315330",
    address: "সাত ভাই পুকুড় পাড়, আব্দুল্লাহ সিটির পিছনে,\nবড় বাজার, চুয়াডাঙ্গা",
    hours: "প্রতিদিন সকাল ৯টা - রাত ৯টা",
    copyright: "© ২০২৪ বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম। সর্বস্বত্ব সংরক্ষিত।",
    devBy: "ওয়েবসাইট তৈরি করেছেন:",
    devName: "তানভীর ইসলাম তন্ময়",
  },
  en: {
    tagline: "Premium Pet Shop in Chuadanga",
    desc: "A massive collection of exotic & local birds, fish, and aquariums. Best in quality and trust.",
    whatsappBtn: "Chat on WhatsApp",
    collectionsTitle: "Collections",
    collections: [
      { name: "Bird Collection", href: "/categories/birds", icon: "🦜" },
      { name: "Aquarium & Fish", href: "/categories/aquarium", icon: "🐟" },
      { name: "Pet Food", href: "/categories/food", icon: "🌿" },
      { name: "Accessories", href: "/categories/accessories", icon: "🛒" },
      { name: "All Collection", href: "/collection", icon: "🏪" },
    ],
    linksTitle: "Pages",
    links: [
      { name: "Home", href: "/", icon: "🏠" },
      { name: "Contact", href: "/contact", icon: "📞" },
      { name: "FAQ", href: "#", icon: "❓" },
      { name: "Terms of Service", href: "#", icon: "📜" },
      { name: "Privacy Policy", href: "#", icon: "🔒" },
    ],
    contactTitle: "Contact Us",
    phone: "01947315330",
    address: "Sat Bhai Pukur Par, Behind Abdullah City,\nBoro Bazar, Chuadanga",
    hours: "Open Daily 9 AM – 9 PM",
    copyright: "© 2024 Bismillah Pakhi & Aquarium. All rights reserved.",
    devBy: "Website developed by:",
    devName: "Tanver Islam Tonmoy",
  },
};

export function Footer() {
  const { language } = useLanguage();
  const t = footerDict[language];
  const fontClass = language === "bn" ? "font-bangla" : "font-sans";

  return (
    <footer className={cn("relative overflow-hidden", fontClass)}>
      {/* CTA Banner */}
      <div className="bg-gradient-to-br from-[#09334F] via-[#0d4a6e] to-[#265D85] py-16 px-4">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="text-5xl mb-6">🦜</div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {language === 'bn' ? 'আপনার নতুন বন্ধুকে বাড়ি নিয়ে যান' : 'Take Your New Friend Home'}
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            {t.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801947315330"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-black/30 transition-all duration-300 active:scale-95"
            >
              <MessageCircle className="w-6 h-6" />
              {t.whatsappBtn}
            </a>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg border border-white/20 transition-all duration-300 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              {language === 'bn' ? 'সংগ্রহ দেখুন' : 'Browse Collection'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-zinc-950 text-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-zinc-800 shadow-sm">
                <Image 
                  src="/images/logo.webp" 
                  alt="Bismillah Pakhi & Aquarium Logo" 
                  fill 
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <div className="font-extrabold text-lg leading-tight">বিসমিল্লাহ পাখি</div>
                <div className="text-xs text-zinc-400">& অ্যাকোয়ারিয়াম</div>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">{t.desc}</p>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t.hours}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-6">
              {t.collectionsTitle}
            </h3>
            <ul className="space-y-3">
              {t.collections.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm group"
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">{link.icon}</span>
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
            <ul className="space-y-3">
              {t.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm group"
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">{link.icon}</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-6">
              {t.contactTitle}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:+880${t.phone.replace(/^0/, '')}`}
                  className="flex items-start gap-3 text-zinc-400 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
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
                  <MessageCircle className="w-4 h-4 mt-0.5 text-[#25D366] shrink-0" />
                  <span className="text-sm">WhatsApp</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-zinc-400">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" />
                <span className="text-sm leading-relaxed whitespace-pre-line">{t.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Strip */}
        <div className="border-t border-white/5">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-400 text-sm">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <span>{t.copyright}</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs font-semibold text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                SSL SECURED
              </div>
            </div>
            <a
              href="https://www.facebook.com/tanverislamtonmoyofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 hover:border-white/20 transition-all"
            >
              <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors text-xs">
                {t.devBy}
              </span>
              <span className="text-xs font-bold text-[#67D8CE] group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                {t.devName}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
