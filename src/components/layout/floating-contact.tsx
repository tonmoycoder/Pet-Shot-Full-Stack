"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "cn";
import { useLanguage } from "@/lib/language-context";

export function FloatingContact() {
  const { getTransition } = useMotionConfig();
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = React.useState(false);

  // WhatsApp link format: https://wa.me/<number>
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801947315330"; 
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const label = language === "bn" ? "জিজ্ঞাসা করুন" : "Ask Us";

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 pointer-events-none flex flex-col items-end gap-3">
      
      {/* Label Tooltip (Desktop Only) */}
      <div className="hidden md:block pointer-events-none origin-bottom-right">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={getTransition("snappy")}
              className={cn(
                "bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 dark:border-white/10 text-foreground text-sm font-semibold px-4 py-2 rounded-full shadow-lg whitespace-nowrap",
                language === "bn" ? "font-bangla" : "font-sans"
              )}
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Primary Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 active:scale-90 transition-transform md:hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={getTransition("bouncy")}
        aria-label="Contact us on WhatsApp"
      >
        <motion.div
          animate={isHovered ? { rotate: [0, -10, 10, -10, 0] } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.div>
        
        {/* Glow effect on hover/touch */}
        <div className="absolute inset-0 rounded-full bg-primary/40 -z-10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100" />
      </motion.a>

    </div>
  );
}
