"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquareQuote, CameraOff, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "cn";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import { ReviewFormModal } from "./review-form-modal";
import { useMotionConfig } from "@/lib/motion";

interface Testimonial {
  id: string;
  authorName: string;
  authorRole?: { en: string; bn: string };
  content: { en: string; bn: string };
  rating: number;
  authorImage?: any;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getTransition } = useMotionConfig();

  // If no testimonials, show a prompt to review
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-20 relative bg-zinc-50 dark:bg-zinc-900/30">
        <div className="container mx-auto px-4 text-center">
          <MessageSquareQuote className="w-12 h-12 mx-auto text-emerald-500/20 mb-4" />
          <h2 className={cn("text-2xl font-bold mb-4", language === "bn" ? "font-bangla" : "font-sans")}>
            {language === "bn" ? "আমাদের গ্রাহকদের মতামত" : "What Our Customers Say"}
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium shadow-md transition-transform hover:scale-105 active:scale-95",
              language === "bn" ? "font-bangla" : "font-sans"
            )}
            style={{ background: "linear-gradient(135deg, #09334F 0%, #265D85 100%)" }}
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            {language === "bn" ? "প্রথম রিভিউ দিন" : "Be the first to review"}
          </button>
        </div>
        <ReviewFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </section>
    );
  }

  return (
    <section className="py-24 relative bg-white dark:bg-[#051114]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-zinc-50 to-transparent dark:from-zinc-900/50 dark:to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={cn(
            "text-4xl md:text-5xl font-bold text-[#09334F] dark:text-white mb-6",
            language === "bn" ? "font-bangla" : "font-sans"
          )}>
            {language === "bn" ? "আমাদের গ্রাহকদের মতামত" : "What our customers say"}
          </h2>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className={cn(
              "inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium shadow-xl shadow-emerald-900/10 transition-transform hover:-translate-y-1 active:scale-95 text-lg",
              language === "bn" ? "font-bangla" : "font-sans"
            )}
            style={{ background: "linear-gradient(135deg, #09334F 0%, #265D85 100%)" }}
          >
            <MessageSquareQuote className="w-5 h-5" />
            {language === "bn" ? "আপনার মতামত দিন" : "Write a Review"}
          </button>
        </div>

        {/* Responsive Grid / Flex Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ ...getTransition("snappy"), delay: idx * 0.1 }}
                className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-black/40 flex flex-col group hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Large Image Area */}
                <div className="w-full aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden flex items-center justify-center">
                  {testimonial.authorImage?.url ? (
                    <Image
                      src={testimonial.authorImage.url}
                      alt={testimonial.authorName}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 p-6 text-center">
                      <ImageIcon className="w-16 h-16 text-zinc-400 dark:text-zinc-600 mb-4" strokeWidth={1} />
                      <p className={cn("text-zinc-500 dark:text-zinc-400 text-sm", language === "bn" ? "font-bangla" : "font-sans")}>
                        {language === "bn" ? "ইউজার কোনো ছবি প্রদান করেনি" : "No photo provided"}
                      </p>
                    </div>
                  )}
                  {/* Gradient Overlay for seamless blend to card body */}
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent dark:from-zinc-900" />
                </div>

                {/* Card Body */}
                <div className="px-8 pb-8 pt-4 flex-1 flex flex-col relative bg-white dark:bg-zinc-900">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < testimonial.rating 
                            ? "fill-amber-400 text-amber-400" 
                            : "fill-zinc-200 text-zinc-200 dark:fill-zinc-800 dark:text-zinc-800"
                        )}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className={cn(
                    "text-zinc-700 dark:text-zinc-300 text-lg md:text-xl font-medium leading-relaxed flex-1 mb-8",
                    language === "bn" ? "font-bangla" : "font-sans"
                  )}>
                    "{testimonial.content[language] || testimonial.content.bn}"
                  </p>

                  {/* Author Info */}
                  <div className="mt-auto">
                    <h3 className={cn("text-base font-bold text-[#09334F] dark:text-white", language === "bn" ? "font-bangla" : "font-sans")}>
                      {testimonial.authorName}
                    </h3>
                    {testimonial.authorRole && (
                      <p className={cn("text-sm text-zinc-600 dark:text-emerald-100/60 mt-1", language === "bn" ? "font-bangla" : "font-sans")}>
                        {testimonial.authorRole[language] || testimonial.authorRole.bn}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      <ReviewFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
