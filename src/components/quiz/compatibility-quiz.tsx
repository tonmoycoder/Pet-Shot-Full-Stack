"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, ArrowLeft, RefreshCcw } from "lucide-react";

type Answer = "A" | "B" | "C";

const quizContent = {
  en: {
    title: "Find Your Perfect Match",
    subtitle: "Answer 3 quick questions to discover pets that fit your lifestyle.",
    questions: [
      {
        id: "space",
        question: "What best describes your living space?",
        options: [
          { value: "A", label: "Apartment or small space" },
          { value: "B", label: "House with a small yard" },
          { value: "C", label: "Large house / plenty of space" }
        ]
      },
      {
        id: "experience",
        question: "What is your prior pet experience?",
        options: [
          { value: "A", label: "First-time owner" },
          { value: "B", label: "I've had pets before" },
          { value: "C", label: "Very experienced" }
        ]
      },
      {
        id: "time",
        question: "What is your preferred time commitment (lifespan)?",
        options: [
          { value: "A", label: "Short Term: 2-3 years (e.g. Betta Fish, Hamsters)" },
          { value: "B", label: "Medium Term: 5-6 years (e.g. Dogs, Cats)" },
          { value: "C", label: "Long Term: 9+ years (e.g. Parrots, Macaws)" }
        ]
      }
    ],
    resultsTitle: "Your Recommended Matches",
    resultsDesc: "Based on your lifestyle, we think these pets would be a great fit:",
    noResults: "We couldn't find an exact match right now, but feel free to browse!",
    loading: "Finding your match...",
    retake: "Retake Quiz",
    browseAll: "Browse All Pets",
    next: "Next",
    back: "Back",
  },
  bn: {
    title: "আপনার সঠিক সঙ্গী খুঁজে নিন",
    subtitle: "৩টি সহজ প্রশ্নের উত্তর দিয়ে আপনার জন্য মানানসই পোষা প্রাণী খুঁজে বের করুন।",
    questions: [
      {
        id: "space",
        question: "আপনার থাকার জায়গাটি কেমন?",
        options: [
          { value: "A", label: "অ্যাপার্টমেন্ট বা ছোট জায়গা" },
          { value: "B", label: "বাড়ি, সাথে ছোট উঠান" },
          { value: "C", label: "বড় বাড়ি / অনেক জায়গা" }
        ]
      },
      {
        id: "experience",
        question: "পোষা প্রাণী পালনের অভিজ্ঞতা কেমন?",
        options: [
          { value: "A", label: "প্রথমবার পালন করব" },
          { value: "B", label: "আগেও পালন করেছি" },
          { value: "C", label: "অনেক অভিজ্ঞতা আছে" }
        ]
      },
      {
        id: "time",
        question: "আপনি কতদিনের জন্য পোষা প্রাণী রাখতে চান (আয়ুষ্কাল)?",
        options: [
          { value: "A", label: "স্বল্প সময়: ২-৩ বছর (যেমন বেটা ফিশ, হ্যামস্টার)" },
          { value: "B", label: "মাঝারি সময়: ৫-৬ বছর (যেমন কুকুর, বিড়াল)" },
          { value: "C", label: "দীর্ঘ সময়: ৯+ বছর (যেমন প্যারট, ম্যাকাও)" }
        ]
      }
    ],
    resultsTitle: "আপনার জন্য আমাদের সুপারিশ",
    resultsDesc: "আপনার উত্তরের ওপর ভিত্তি করে এই প্রাণীগুলো আপনার জন্য মানানসই হতে পারে:",
    noResults: "এই মুহূর্তে ঠিক আপনার মতো কোনো প্রাণী নেই, তবে আপনি অন্যগুলো দেখতে পারেন!",
    loading: "খুঁজে বের করা হচ্ছে...",
    retake: "আবার চেষ্টা করুন",
    browseAll: "সব প্রাণী দেখুন",
    next: "পরবর্তী",
    back: "পেছনে",
  }
};

export function CompatibilityQuiz() {
  const { language } = useLanguage();
  const t = quizContent[language];
  const isBn = language === "bn";

  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const startQuiz = () => setCurrentStep(0);

  const handleSelect = (questionId: string, value: Answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(curr => curr + 1);
    } else {
      submitQuiz();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(curr => curr - 1);
    else setCurrentStep(-1);
  };

  const resetQuiz = () => {
    setAnswers({});
    setRecommendations([]);
    setCurrentStep(-1);
  };

  const submitQuiz = async () => {
    setCurrentStep(3);
    setIsLoading(true);
    setHasError(false);

    try {
      const res = await fetch('/api/animals?limit=50&where[status][equals]=available', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();

      const allAnimals = data.docs || [];

      // Deterministic scoring engine based on backend fields
      const scoredAnimals = allAnimals.map((animal: any) => {
        let score = 0;
        let reasonsEn: string[] = [];
        let reasonsBn: string[] = [];

        const animalSpace = animal.spaceRequired || 'A';
        const animalExp = animal.experienceLevel || 'A';
        const animalTime = animal.lifespan || 'A';

        // 1. Space
        if (answers.space === animalSpace) {
          score += 5; // Increased weight for exact match
          if (answers.space === 'A') {
            reasonsEn.push("Perfect for apartment living.");
            reasonsBn.push("অ্যাপার্টমেন্টের জন্য একদম উপযুক্ত।");
          } else if (answers.space === 'B') {
            reasonsEn.push("Great for homes with a small yard.");
            reasonsBn.push("ছোট উঠান থাকা বাড়ির জন্য দারুণ।");
          } else {
            reasonsEn.push("Thrives in large spaces.");
            reasonsBn.push("বড় জায়গায় থাকতে পছন্দ করে।");
          }
        } else if (answers.space === 'C' && animalSpace !== 'C') {
          score += 3; // User has large space, can accommodate smaller needs
        } else if (answers.space === 'B' && animalSpace === 'A') {
          score += 3; // User has medium space, can accommodate small needs
        } else {
          score -= 5; // Penalty for not having enough space
        }

        // 2. Experience
        if (answers.experience === animalExp) {
          score += 5; // Increased weight for exact match
          if (answers.experience === 'A') {
            reasonsEn.push("Great for beginners.");
            reasonsBn.push("নতুনদের জন্য খুব ভালো।");
          } else if (answers.experience === 'B') {
            reasonsEn.push("Fits your prior experience.");
            reasonsBn.push("আপনার অভিজ্ঞতার সাথে মানানসই।");
          } else {
            reasonsEn.push("Perfect for experienced owners.");
            reasonsBn.push("অভিজ্ঞদের জন্য উপযুক্ত।");
          }
        } else if (answers.experience === 'C') {
          score += 3; // Expert can handle anything
        } else if (answers.experience === 'B' && animalExp === 'A') {
          score += 3; // Prior experience can handle beginner pets
        } else {
          score -= 5; // Penalty for lack of experience
        }

        // 3. Time Commitment (Lifespan)
        if (answers.time === animalTime) {
          score += 5; // Increased weight for exact match
          if (answers.time === 'A') {
            reasonsEn.push("Fits a shorter time commitment.");
            reasonsBn.push("অল্প সময়ের জন্য ভালো সঙ্গী।");
          } else if (answers.time === 'B') {
            reasonsEn.push("Fits a 5-6 year commitment.");
            reasonsBn.push("৫-৬ বছরের জন্য ভালো সঙ্গী।");
          } else {
            reasonsEn.push("A wonderful long-term companion.");
            reasonsBn.push("দীর্ঘ সময়ের জন্য চমৎকার সঙ্গী।");
          }
        }

        let reasonEn = reasonsEn.join(" ");
        let reasonBn = reasonsBn.join(" ");

        if (!reasonEn) {
          reasonEn = "A great overall match for your lifestyle.";
          reasonBn = "আপনার জীবনযাত্রার সাথে মানানসই।";
        }

        // Add some slight randomness for tie-breaking ONLY (very small)
        score += Math.random() * 0.1;

        return {
          ...animal,
          score,
          matchReason: { en: reasonEn.trim(), bn: reasonBn.trim() }
        };
      });

      scoredAnimals.sort((a: any, b: any) => b.score - a.score);
      setRecommendations(scoredAnimals.slice(0, 3));
    } catch (err) {
      console.error(err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // UI for Start Screen
  if (currentStep === -1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn("text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-zinc-50", isBn ? "font-bangla" : "font-sans")}
        >
          {t.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={cn("text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-lg", isBn ? "font-bangla" : "font-sans")}
        >
          {t.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <MagneticButton
            onClick={startQuiz}
            className={cn("bg-emerald-700 hover:bg-emerald-800 text-white rounded-full px-6 md:px-8 py-4 md:py-6 text-base md:text-lg", isBn ? "font-bangla" : "font-sans")}
          >
            {t.title}
            <ChevronRight className="ml-2 w-5 h-5" />
          </MagneticButton>
        </motion.div>
      </div>
    );
  }

  // UI for Results
  if (currentStep === 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-4xl mx-auto px-4 py-12">
        <h2 className={cn("text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4", isBn ? "font-bangla" : "font-sans")}>
          {t.resultsTitle}
        </h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className={cn("text-zinc-500", isBn ? "font-bangla" : "font-sans")}>{t.loading}</p>
          </div>
        ) : recommendations.length > 0 ? (
          <div className="w-full">
            <p className={cn("text-center text-zinc-600 dark:text-zinc-400 mb-10", isBn ? "font-bangla" : "font-sans")}>
              {t.resultsDesc}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {recommendations.map((pet) => (
                <Link key={pet.id} href={`/animals/${pet.id}`}>
                  <LiquidGlass className="group cursor-pointer transition-transform hover:-translate-y-2 h-full flex flex-col">
                    <div className="aspect-[4/3] w-full overflow-hidden relative shrink-0">
                      <Image
                        src={pet.image}
                        alt={pet.name?.[language] || 'Pet'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ objectPosition: pet.objectPosition || 'center center' }}
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className={cn("text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100", isBn ? "font-bangla" : "font-sans")}>
                        {pet.name?.[language]}
                      </h3>
                      <p className={cn("text-emerald-700 dark:text-emerald-400 font-medium", isBn ? "font-bangla" : "font-sans")}>
                        {pet.price?.[language]}
                      </p>
                      <p className={cn("text-sm text-zinc-500 dark:text-zinc-400 mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 leading-relaxed flex-1", isBn ? "font-bangla" : "font-sans")}>
                        <span className="font-semibold block mb-1">{isBn ? "কেন সুপারিশ করা হলো:" : "Why it's a match:"}</span>
                        {pet.matchReason?.[language]}
                      </p>
                    </div>
                  </LiquidGlass>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className={cn("text-xl text-zinc-600 dark:text-zinc-400 mb-8", isBn ? "font-bangla" : "font-sans")}>
              {t.noResults}
            </p>
          </div>
        )}

        {!isLoading && (
          <div className="mt-12 flex gap-4">
            <MagneticButton
              variant="outline"
              onClick={resetQuiz}
              className={cn("rounded-full border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50", isBn ? "font-bangla" : "font-sans")}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              {t.retake}
            </MagneticButton>
            <Link href="/collection">
              <MagneticButton className={cn("bg-emerald-700 hover:bg-emerald-800 text-white rounded-full", isBn ? "font-bangla" : "font-sans")}>
                {t.browseAll}
              </MagneticButton>
            </Link>
          </div>
        )}
      </div>
    );
  }

  // UI for Questions
  const question = t.questions[currentStep];
  const selectedAnswer = answers[question.id];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 md:py-20 min-h-[60vh] flex flex-col justify-center">

      {/* Progress */}
      <div className="flex gap-2 mb-12 justify-center">
        {[0, 1, 2].map((step) => (
          <div
            key={step}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              step === currentStep ? "w-8 bg-emerald-600" :
                step < currentStep ? "w-4 bg-emerald-600/40" : "w-4 bg-zinc-200 dark:bg-zinc-800"
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col"
        >
          <h2 className={cn("text-2xl md:text-3xl font-bold text-center mb-8 text-zinc-900 dark:text-zinc-50", isBn ? "font-bangla" : "font-sans")}>
            {question.question}
          </h2>

          <div className="flex flex-col gap-4">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(question.id, opt.value as Answer)}
                className={cn(
                  "p-5 md:p-6 rounded-2xl text-left transition-all duration-200 border-2",
                  selectedAnswer === opt.value
                    ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-transparent bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm",
                  isBn ? "font-bangla text-lg" : "font-sans text-lg"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
                    selectedAnswer === opt.value ? "border-emerald-600" : "border-zinc-300 dark:border-zinc-700"
                  )}>
                    {selectedAnswer === opt.value && <div className="w-3 h-3 rounded-full bg-emerald-600" />}
                  </div>
                  <span className={cn("font-medium", selectedAnswer === opt.value ? "text-emerald-900 dark:text-emerald-100" : "text-zinc-700 dark:text-zinc-300")}>
                    {opt.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-12">
            <button
              onClick={handleBack}
              className={cn("flex items-center text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors font-medium", isBn ? "font-bangla" : "font-sans")}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t.back}
            </button>

            <MagneticButton
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={cn("bg-emerald-700 hover:bg-emerald-800 text-white rounded-full px-8",
                !selectedAnswer && "opacity-50 cursor-not-allowed",
                isBn ? "font-bangla" : "font-sans"
              )}
            >
              {t.next}
              <ChevronRight className="w-5 h-5 ml-2" />
            </MagneticButton>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
