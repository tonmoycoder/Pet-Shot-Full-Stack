"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundAudio } from "@/components/layout/background-audio";
import "./(frontend)/globals.css";

export default function NotFound() {
  const [lang, setLang] = useState<"en" | "bn">("en");

  const text = {
    en: {
      brandPrimary: "Bismillah Pakhi",
      brandSecondary: "& Aquarium",
      tag: "404",
      title: "Ay Hay!",
      desc: "Oops! It seems our little hamster nibbled away the page you were looking for, and the bird flew away with the breadcrumbs! 🐹🐦",
      btn: "GO BACK HOME",
    },
    bn: {
      brandPrimary: "বিসমিল্লাহ পাখি",
      brandSecondary: "এন্ড একুরিয়াম",
      tag: "৪০৪",
      title: "আয় হায়!",
      desc: "দুঃখিত! মনে হচ্ছে আমাদের দুষ্টু হ্যামস্টার আপনার কাঙ্ক্ষিত পেজটি কুটকুট করে খেয়ে ফেলেছে আর পাখিটা সব প্রমাণ নিয়ে উড়ে পালিয়েছে! 🐹🐦",
      btn: "বাড়ি ফিরে যাই",
    }
  };

  const t = text[lang];

  return (
    <html lang="en">
      <body style={{ backgroundColor: '#FEFEFE', margin: 0, padding: 0 }}>
        <div className="min-h-screen flex flex-col text-slate-800 font-sans">

          {/* Header */}
          <header className="p-6 md:px-12 md:py-8 flex justify-between items-center w-full max-w-7xl mx-auto">
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none rounded-lg"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  className="object-cover"
                  sizes="48px"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className={`text-xl md:text-2xl font-bold tracking-tight transition-colors group-hover:text-emerald-600 leading-none ${lang === 'bn' ? 'font-bangla' : 'font-sans'}`}>
                  {t.brandPrimary}
                </span>
                <span className={`block text-[10px] md:text-xs text-slate-500 mt-0.5 tracking-wide font-medium ${lang === 'bn' ? 'font-bangla' : 'font-sans'}`}>
                  {t.brandSecondary}
                </span>
              </div>
            </Link>

            {/* Language Toggle */}
            <div className="flex gap-2 bg-slate-100 p-1 rounded-full border border-slate-200">
              <button
                onClick={() => setLang('en')}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${lang === 'en' ? 'bg-slate-800 text-white shadow-sm' : 'bg-transparent text-slate-500 hover:text-slate-800'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('bn')}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all font-bangla ${lang === 'bn' ? 'bg-slate-800 text-white shadow-sm' : 'bg-transparent text-slate-500 hover:text-slate-800'}`}
              >
                বাংলা
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 max-w-7xl mx-auto w-full gap-12 md:gap-24">

            {/* Text Section */}
            <div className="flex-1 max-w-lg w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lang}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-start"
                >
                  <div className="text-xl font-bold mb-4 text-emerald-600">{t.tag}</div>
                  <h1 className={`text-5xl md:text-7xl font-black mb-6 tracking-tight ${lang === 'bn' ? 'font-bangla' : 'font-sans'}`}>
                    {t.title}
                  </h1>
                  <p className={`text-lg md:text-xl leading-relaxed mb-10 text-slate-600 ${lang === 'bn' ? 'font-bangla' : 'font-sans'}`}>
                    {t.desc}
                  </p>

                  <Link
                    href="/"
                    className={`inline-block px-8 py-4 bg-slate-200 border-2 border-slate-800 rounded-full font-bold text-slate-800 shadow-[4px_4px_0px_#1e293b] hover:shadow-[2px_2px_0px_#1e293b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider ${lang === 'bn' ? 'font-bangla' : 'font-sans'}`}
                  >
                    {t.btn}
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Illustration Section */}
            <div className="flex-1 w-full flex justify-center items-center">
              <motion.div
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-[350px] md:h-[500px] max-w-lg"
              >
                <Image
                  src="/media/404-image.jpg"
                  alt="404 Missing Page"
                  fill
                  className="object-contain drop-shadow-xl rounded-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </motion.div>
            </div>
          </main>
          <BackgroundAudio />
        </div>
      </body>
    </html>
  );
}
