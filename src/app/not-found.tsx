"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundAudio } from "@/components/layout/background-audio";


export default function NotFound() {
  const [lang, setLang] = useState<"en" | "bn">("en");

  const text = {
    en: {
      brandPrimary: "Bismillah Pakhi",
      brandSecondary: "& Aquarium",
      tag: "404",
      title: "Page Lost in the Wild",
      desc: "Our little hamster nibbled away the page you wanted — and the bird flew off with the breadcrumbs! ",
      btn: "Return Home",
      sub: "Don't worry, our pets are still here.",
    },
    bn: {
      brandPrimary: "বিসমিল্লাহ পাখি",
      brandSecondary: "এন্ড একুরিয়াম",
      tag: "৪০৪",
      title: "পেজটি হারিয়ে গেছে",
      desc: "আমাদের দুষ্টু হ্যামস্টার পেজটি খেয়ে ফেলেছে, আর পাখি সব প্রমাণ নিয়ে পালিয়েছে!",
      btn: "হোমপেজে ফিরুন",
      sub: "চিন্তা করবেন না, আমাদের পোষা প্রাণীরা এখনো আছে।",
    },
  };

  const t = text[lang];
  const fontClass = lang === "bn" ? "font-bangla" : "font-sans";

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={fontClass}
        style={{
          margin: 0,
          padding: 0,
          background: "linear-gradient(135deg, #f0fdf8 0%, #ecfdf5 50%, #f0fdfa 100%)",
          minHeight: "100dvh",
        }}
        suppressHydrationWarning
      >
        {/* Decorative orbs */}
        <div aria-hidden="true" style={{ position: "fixed", top: "-10%", right: "-5%", width: "min(500px,60vw)", height: "min(500px,60vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(16,185,129,.08) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div aria-hidden="true" style={{ position: "fixed", bottom: "-5%", left: "-5%", width: "min(400px,50vw)", height: "min(400px,50vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(16,185,129,.06) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <header style={{ padding: "clamp(14px,4vw,28px) clamp(16px,5vw,40px)", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1280, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
              <div style={{ position: "relative", width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: "1.5px solid #d1fae5", flexShrink: 0 }}>
                <Image src="/images/logo.png" alt="Logo" fill className="object-cover" sizes="40px" priority />
              </div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <span style={{ fontSize: "clamp(13px,3.5vw,18px)", fontWeight: 700, color: "#064e3b" }} className={fontClass}>{t.brandPrimary}</span>
                <span style={{ fontSize: "clamp(9px,2vw,11px)", color: "#6b7280", marginTop: 2 }} className={fontClass}>{t.brandSecondary}</span>
              </div>
            </Link>
            <div style={{ display: "flex", gap: 3, background: "white", padding: 4, borderRadius: 100, border: "1px solid #d1fae5", boxShadow: "0 1px 6px rgba(0,0,0,.06)", flexShrink: 0 }}>
              {(["en", "bn"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} style={{ padding: "6px 14px", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, transition: "all .2s ease", background: lang === l ? "#059669" : "transparent", color: lang === l ? "white" : "#6b7280" }} className={l === "bn" ? "font-bangla" : "font-sans"}>
                  {l === "en" ? "EN" : "বাং"}
                </button>
              ))}
            </div>
          </header>

          {/* Main — perfectly centered */}
          <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(20px,5vw,60px) clamp(16px,5vw,32px)", textAlign: "center", boxSizing: "border-box", width: "100%", maxWidth: 680, margin: "0 auto" }}>
            <AnimatePresence mode="wait">
              <motion.div key={lang} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .35, ease: [.4,0,.2,1] }} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                {/* Floating illustration */}
                <motion.div animate={{ y: [0,-12,0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} style={{ position: "relative", width: "clamp(160px,50vw,280px)", height: "clamp(160px,50vw,280px)", marginBottom: "clamp(16px,4vw,32px)", flexShrink: 0 }}>
                  <Image src="/media/404-image.jpg" alt="404 Not Found" fill className="object-contain" priority sizes="(max-width:480px) 55vw, 280px" style={{ borderRadius: 20, filter: "drop-shadow(0 16px 32px rgba(0,0,0,.12))" }} />
                </motion.div>

                {/* Gradient badge */}
                <div style={{ display: "inline-flex", alignItems: "center", padding: "6px 18px", borderRadius: 100, background: "linear-gradient(90deg,#d1fae5,#a7f3d0)", border: "1px solid #6ee7b7", marginBottom: "clamp(10px,2.5vw,18px)" }}>
                  <span style={{ fontSize: "clamp(11px,2.5vw,13px)", fontWeight: 700, letterSpacing: ".08em", background: "linear-gradient(90deg,#059669,#0d9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }} className={fontClass}>{t.tag} · Error</span>
                </div>

                {/* Heading */}
                <h1 style={{ fontSize: "clamp(24px,7vw,48px)", fontWeight: 900, letterSpacing: "-.02em", lineHeight: 1.15, margin: "0 0 clamp(12px,3vw,18px)", color: "#064e3b" }} className={fontClass}>{t.title}</h1>

                {/* Description */}
                <p style={{ fontSize: "clamp(14px,3.5vw,17px)", lineHeight: 1.7, color: "#6b7280", maxWidth: 440, margin: "0 0 clamp(28px,6vw,44px)", padding: "0 4px" }} className={fontClass}>{t.desc}</p>

                {/* CTA */}
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: .97 }}>
                  <Link href="/" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "clamp(13px,3vw,17px) clamp(28px,7vw,44px)", background: "linear-gradient(135deg,#059669 0%,#0d9488 100%)", color: "white", borderRadius: 100, fontWeight: 700, fontSize: "clamp(14px,3.5vw,16px)", textDecoration: "none", boxShadow: "0 12px 28px -8px rgba(5,150,105,.45),0 4px 12px -4px rgba(5,150,105,.3)", letterSpacing: ".01em" }} className={fontClass}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
                    {t.btn}
                  </Link>
                </motion.div>

                {/* Sub-text */}
                <p style={{ marginTop: "clamp(14px,3vw,22px)", fontSize: "clamp(11px,2.5vw,13px)", color: "#9ca3af" }} className={fontClass}>{t.sub}</p>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
        <BackgroundAudio />
      </body>
    </html>
  );
}
