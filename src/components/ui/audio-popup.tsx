"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPopupProps {
  onAccept: () => void;
}

export function AudioPopup({ onAccept }: AudioPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const fontClass = language === "bn" ? "font-bangla" : "font-sans";

  useEffect(() => {
    // Check if user has already made a choice
    const hasInteracted = sessionStorage.getItem("audio-interacted");
    if (!hasInteracted) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    sessionStorage.setItem("audio-interacted", "true");
    onAccept();
  };

  const handleDecline = () => {
    setIsVisible(false);
    sessionStorage.setItem("audio-interacted", "true");
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-6 right-6 z-[100] max-w-sm"
      >
        <div className="bg-white dark:bg-zinc-900 border border-border shadow-2xl rounded-2xl p-6 relative overflow-hidden">
          {/* Subtle gradient background for psychological appeal */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#67D8CE]/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#67D8CE]/20 flex items-center justify-center text-[#248F88] animate-pulse">
              <Volume2 className="w-6 h-6" />
            </div>
            
            <div>
              <h3 className={cn("text-lg font-bold text-foreground mb-2", fontClass)}>
                {language === "bn" ? "প্রকৃতির রাজ্যের মধুর শব্দ শুনুন" : "Experience the Sounds of Nature"}
              </h3>
              <p className={cn("text-sm text-muted-foreground", fontClass)}>
                {language === "bn" 
                  ? "আমাদের ওয়েবসাইটে প্রবেশ করার সাথে সাথে পাখির কিচিরমিচির ও প্রকৃতির স্নিগ্ধ শব্দ আপনার মনকে শান্ত করবে। আপনি কি সাউন্ড চালু করতে চান?" 
                  : "Allow background sounds of birds chirping and serene nature to soothe your mind while you browse."}
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full mt-2">
              <button
                onClick={handleDecline}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-xl border border-border text-foreground hover:bg-muted transition-colors font-medium text-sm flex items-center justify-center gap-2",
                  fontClass
                )}
              >
                <VolumeX className="w-4 h-4" />
                {language === "bn" ? "না, ধন্যবাদ" : "No thanks"}
              </button>
              <button
                onClick={handleAccept}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-xl bg-[#248F88] text-white hover:bg-[#1a6a65] transition-colors shadow-lg shadow-[#248F88]/20 font-medium text-sm flex items-center justify-center gap-2",
                  fontClass
                )}
              >
                <Volume2 className="w-4 h-4" />
                {language === "bn" ? "অবশ্যই চালু করুন" : "Yes, turn on"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
