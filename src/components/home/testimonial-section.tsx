"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "cn";
import { SafeImage as Image } from "@/components/ui/safe-image";
import { ReviewFormModal } from "./review-form-modal";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  authorName: string;
  authorRole?: { en: string; bn: string };
  petName?: string;
  verificationStatus?: 'verified' | 'regular' | 'live_setup';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const totalCards = testimonials?.length || 0;
  const DURATION = 4500;
  
  useEffect(() => {
    if (isPaused || totalCards <= 1) return;
    
    let startTime = Date.now();
    let animationFrame: number;
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(percentage);
      
      if (elapsed < DURATION) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        setCurrentIndex((prev) => (prev + 1) % totalCards);
        startTime = Date.now();
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };
    
    animationFrame = requestAnimationFrame(updateProgress);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [currentIndex, isPaused, totalCards]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
    setProgress(0);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
    setProgress(0);
  };
  
  const goToSlide = (idx: number) => {
    if (idx === currentIndex) return;
    setCurrentIndex(idx);
    setProgress(0);
  };

  const getVerificationText = (status?: string) => {
    if (status === 'verified') return language === 'bn' ? 'ভেরিফাইড কাস্টমার' : 'Verified Customer';
    if (status === 'live_setup') return language === 'bn' ? 'লাইভ সেটআপ ভিজিট' : 'Live Setup Visit';
    return language === 'bn' ? 'রেগুলার কাস্টমার' : 'Regular Customer';
  };

  // If no testimonials, show a prompt to review
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-20 relative bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden">
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
    <section 
      className="relative w-full py-14 lg:py-24 overflow-hidden flex flex-col justify-center items-center bg-[#F8FAFC] dark:bg-zinc-950" 
      data-purpose="testimonials-section"
    >
      {/* Ambient Radial Lighting / Glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[520px] bg-gradient-to-b from-emerald-100/60 dark:from-emerald-900/20 via-teal-50/40 dark:via-teal-900/10 to-transparent rounded-full blur-3xl -z-10"></div>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-t from-slate-200/40 dark:from-zinc-900/40 via-emerald-50/20 dark:via-emerald-900/10 to-transparent rounded-full blur-2xl -z-10"></div>
      
      {/* Section Header */}
      <div className="text-center max-w-3xl px-4 mx-auto mb-10 lg:mb-14">
        <span className={cn(
          "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/40 border border-emerald-200/80 dark:border-emerald-800/80 uppercase mb-3.5",
          language === "bn" ? "font-bangla" : "font-sans"
        )}>
          <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
          </svg>
          {language === "bn" ? "বিশ্বস্ত ও প্রমাণিত সেবা" : "Trusted & Proven Service"}
        </span>
        
        <h2 className={cn(
          "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight",
          language === "bn" ? "font-bangla" : "font-sans"
        )}>
          {language === "bn" ? "আমাদের গ্রাহকদের" : "Loved by"}
        </h2>
        <p className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-400 dark:text-zinc-500 tracking-normal mt-1",
          language === "bn" ? "font-bangla" : "font-sans"
        )}>
          {language === "bn" ? "মতামত" : "Pet Lovers"}
        </p>
      </div>

      {/* Carousel Outer Container */}
      <div 
        className="relative w-full max-w-6xl px-4 sm:px-6 mx-auto select-none" 
        style={{ perspective: "1200px", perspectiveOrigin: "center center" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Testimonials Deck Stack */}
        <div className="relative w-full h-[470px] sm:h-[430px] md:h-[400px] flex items-center justify-center">
          {testimonials.map((testimonial, idx) => {
            const relativeOffset = (idx - currentIndex + totalCards) % totalCards;
            
            let cardState = "hidden";
            let zIndex = 0;
            let transform = "translate3d(0, 40px, -120px) scale(0.75)";
            let opacity = 0;
            let blur = "blur(4px)";
            
            if (relativeOffset === 0) {
              cardState = "center";
              zIndex = 30;
              transform = "translate3d(0, 0, 40px) scale(1)";
              opacity = 1;
              blur = "blur(0px)";
            } else if (relativeOffset === 1 || (totalCards === 2 && relativeOffset === -1)) {
              cardState = "right";
              zIndex = 10;
              transform = "translate3d(calc(100% + 24px), 0, -60px) scale(0.88)";
              opacity = 0.6;
              blur = "blur(1.5px)";
            } else if (relativeOffset === totalCards - 1) {
              cardState = "left";
              zIndex = 10;
              transform = "translate3d(calc(-100% - 24px), 0, -60px) scale(0.88)";
              opacity = 0.6;
              blur = "blur(1.5px)";
            }

            const isClickable = cardState === "left" || cardState === "right";

            return (
              <article 
                key={testimonial.id}
                className={cn(
                  "absolute w-[94%] sm:w-[540px] md:w-[620px] bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 md:p-8 border border-slate-200/90 dark:border-zinc-800 flex flex-col justify-between transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isClickable ? "cursor-pointer" : ""
                )}
                style={{
                  transform,
                  opacity,
                  filter: blur,
                  zIndex,
                  pointerEvents: cardState === "hidden" ? "none" : "auto",
                  boxShadow: cardState === "center" 
                    ? "0 25px 60px -15px rgba(16, 185, 129, 0.12), 0 20px 40px -20px rgba(15, 23, 42, 0.18)" 
                    : "0 15px 35px -10px rgba(15, 23, 42, 0.08)"
                }}
                onClick={() => {
                  if (cardState === "left" || cardState === "right") {
                    goToSlide(idx);
                  }
                }}
                aria-hidden={cardState !== "center"}
              >
                {/* Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-emerald-400 font-serif text-5xl leading-none select-none font-bold inline-block">“</span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}
                    <span className="text-slate-400 font-sans text-xs ml-1 font-semibold">{testimonial.rating}.0</span>
                  </div>
                </div>

                {/* Review Content */}
                <blockquote className={cn(
                  "text-slate-800 dark:text-zinc-200 text-base sm:text-lg md:text-xl font-medium leading-snug sm:leading-relaxed tracking-normal",
                  language === "bn" ? "font-bangla" : "font-sans"
                )}>
                  “{testimonial.content[language] || testimonial.content.bn}”
                </blockquote>

                {/* Large Customer Portrait & Profile Area */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Customer Portrait */}
                    <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-4 ring-emerald-500/20 shadow-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      {testimonial.authorImage?.url ? (
                        <Image
                          src={testimonial.authorImage?.sizes?.avatar?.url || testimonial.authorImage?.sizes?.thumbnail?.url || testimonial.authorImage.url}
                          sourceUrl={testimonial.authorImage.sourceUrl}
                          alt={testimonial.authorName}
                          fill
                          sizes="80px"
                          className="object-cover object-center"
                        />
                      ) : (
                        <User className="w-8 h-8 text-zinc-400" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className={cn("font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-tight", language === "bn" ? "font-bangla" : "font-sans")}>
                        {testimonial.authorName}
                      </h3>
                      {testimonial.authorRole && (
                        <p className={cn("text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium", language === "bn" ? "font-bangla" : "font-sans")}>
                          {testimonial.authorRole[language] || testimonial.authorRole.bn}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className={cn(
                          "text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-md",
                          language === "bn" ? "font-bangla" : "font-sans"
                        )}>
                          {getVerificationText(testimonial.verificationStatus)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pet Badge (Optional) */}
                  {testimonial.petName && (
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">
                        {language === "bn" ? "Pet/Product" : "Details"}
                      </span>
                      <span className={cn(
                        "text-xs font-semibold text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full mt-0.5",
                        language === "bn" ? "font-bangla" : "font-sans"
                      )}>
                        {testimonial.petName}
                      </span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Navigation & Dynamic Controls Engine */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto px-4">
          {/* Left: Previous Button */}
          <button 
            onClick={handlePrev}
            aria-label="Previous" 
            className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm text-slate-600 dark:text-zinc-400 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-zinc-800 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          
          {/* Center: Slide Number & Active Progress Bar Indicator */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 font-sans text-xs font-bold text-slate-500 dark:text-zinc-400">
              <span className="text-emerald-700 dark:text-emerald-400 font-extrabold text-sm">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-slate-300 dark:text-zinc-600">/</span>
              <span>{String(totalCards).padStart(2, '0')}</span>
            </div>
            
            {/* Smooth Linear Countdown Progress Bar */}
            <div className="w-36 h-1.5 bg-slate-200/80 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full" 
                style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
              />
            </div>
            
            {/* Clickable Pagination Dots */}
            <div className="flex items-center gap-1.5 mt-1">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Slide ${idx + 1}`} 
                  className={cn(
                    "rounded-full transition-all duration-300",
                    idx === currentIndex 
                      ? "w-2.5 h-2.5 bg-emerald-600 ring-2 ring-emerald-300 dark:ring-emerald-900" 
                      : "w-2 h-2 bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-600"
                  )}
                />
              ))}
            </div>
          </div>
          
          {/* Right: Next Button */}
          <button 
            onClick={handleNext}
            aria-label="Next" 
            className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm text-slate-600 dark:text-zinc-400 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-zinc-800 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
        
        {/* Write a Review Button */}
        <div className="flex justify-center mt-8">
           <button
            onClick={() => setIsModalOpen(true)}
            className={cn(
              "inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-medium shadow-xl shadow-emerald-900/10 transition-transform hover:-translate-y-1 active:scale-95 text-sm sm:text-base",
              language === "bn" ? "font-bangla" : "font-sans"
            )}
            style={{ background: "linear-gradient(135deg, #09334F 0%, #265D85 100%)" }}
          >
            <MessageSquareQuote className="w-4 h-4" />
            {language === "bn" ? "আপনার মতামত দিন" : "Write a Review"}
          </button>
        </div>

        {/* Trust Badge Footer Note */}
        <div className="text-center mt-6">
          <p className={cn("text-xs text-slate-400 dark:text-zinc-500 flex items-start sm:items-center justify-center gap-1.5 font-medium max-w-[280px] sm:max-w-none mx-auto", language === "bn" ? "font-bangla" : "font-sans")}>
            <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-[2px] sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
              <path clipRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
            </svg>
            {language === "bn" ? "১০০% অরিজিনাল কাস্টমার ফিডব্যাক • চুয়াডাঙ্গা জেলা ও পার্শ্ববর্তী অঞ্চলের শীর্ষ রিভিউড শপ" : "100% Authentic Feedback • Top Rated Shop in Chuadanga & Surrounding Areas"}
          </p>
        </div>
      </div>

      <ReviewFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
