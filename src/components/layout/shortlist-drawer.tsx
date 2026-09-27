"use client";

import React from 'react';
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, MessageCircle } from 'lucide-react';
import { cn } from 'cn';
import { useShortlist } from '@/lib/shortlist-context';
import { useLanguage } from '@/lib/language-context';
import { useMotionConfig } from '@/lib/motion';
import { MagneticButton } from '@/components/ui/magnetic-button';

const dict = {
  bn: {
    title: 'আপনার শর্টলিস্ট',
    empty: 'আপনার শর্টলিস্ট খালি।',
    inquire: 'WhatsApp এ কথা বলুন',
    remove: 'মুছে ফেলুন',
  },
  en: {
    title: 'Your Shortlist',
    empty: 'Your shortlist is empty.',
    inquire: 'Inquire on WhatsApp',
    remove: 'Remove',
  }
};

export function ShortlistDrawer() {
  const { isDrawerOpen, setDrawerOpen, items, toggleShortlist, clearShortlist } = useShortlist();
  const { language } = useLanguage();
  const { getTransition } = useMotionConfig();
  const t = dict[language];
  const fontClass = language === 'bn' ? 'font-bangla' : 'font-sans';

  // Prevent scroll when drawer is open
  React.useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Generate WhatsApp link
  const whatsappNumber = "8801947315330";
  const itemNames = items.map((i, idx) => `${idx + 1}. ${i.name[language]}`).join('%0A');
  const message = language === 'en' 
    ? `Hello, I'm interested in the following items from my shortlist:%0A%0A${itemNames}`
    : `হ্যালো, আমি আমার শর্টলিস্ট থেকে নিম্নলিখিত আইটেমগুলোতে আগ্রহী:%0A%0A${itemNames}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={getTransition('snappy')}
            className={cn(
              "fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white dark:bg-zinc-950 shadow-2xl border-l border-black/5 dark:border-white/5 flex flex-col",
              fontClass
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                {t.title} <span className="text-zinc-500 text-sm ml-2 font-normal">({items.length})</span>
              </h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
                  <HeartGhost />
                  <p>{t.empty}</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.id}
                      className="flex gap-4 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 group"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
                        <Image
                          src={item.image}
                          alt={item.name.en}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="font-bold text-zinc-900 dark:text-white line-clamp-1">
                          {item.name[language]}
                        </h3>
                        {item.price && (
                          <p className="text-sm text-zinc-500 mt-1">{item.price[language]}</p>
                        )}
                      </div>
                      <button
                        onClick={() => toggleShortlist(item)}
                        className="p-3 self-center text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
                        aria-label={t.remove}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/50">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <MagneticButton 
                    className="w-full py-6 rounded-2xl bg-[#25D366] text-white hover:bg-[#20b858] shadow-lg shadow-[#25D366]/20 font-bold text-lg gap-3"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.inquire}
                  </MagneticButton>
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Simple decorative SVG for empty state
function HeartGhost() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 dark:text-zinc-700">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      <path d="m12 6 2 2 4-4"/>
    </svg>
  );
}
