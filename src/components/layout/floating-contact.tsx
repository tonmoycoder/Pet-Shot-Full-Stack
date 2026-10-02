"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "cn";
import { useLanguage } from "@/lib/language-context";

export function FloatingContact() {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = React.useState(false);

  // WhatsApp link format: https://wa.me/<number>
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801947315330"; 
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const label = language === "bn" ? "জিজ্ঞাসা করুন" : "Ask Us";

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 pointer-events-none flex flex-col items-end gap-3 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {/* Label Tooltip (Desktop Only) */}
      <div className="hidden md:block pointer-events-none origin-bottom-right">
        <div
          className={cn(
            "bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 dark:border-white/10 text-foreground text-sm font-semibold px-4 py-2 rounded-full shadow-lg whitespace-nowrap transition-all duration-300",
            language === "bn" ? "font-bangla" : "font-sans",
            isHovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
          )}
        >
          {label}
        </div>
      </div>

      {/* Primary Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 active:scale-90 transition-all duration-300 md:hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contact us on WhatsApp"
      >
        <div
          className={cn(
            "transition-transform duration-300",
            isHovered && "rotate-[-10deg]"
          )}
        >
          <MessageCircle className="w-6 h-6" />
        </div>
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
      </a>
    </div>
  );
}
