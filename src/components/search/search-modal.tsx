"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";
import { cn } from "cn";
import { useMotionConfig } from "@/lib/motion";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  internalName: string;
  name: { en: string; bn: string };
  price: { en: string; bn: string };
  image: string;
  objectPosition?: string;
  type: "animal" | "product";
}

const searchDict = {
  en: {
    placeholder: "Search pets, food, accessories...",
    noResults: "We couldn't find anything matching your search.",
    error: "Something went wrong while searching.",
    animalLabel: "Pet",
    productLabel: "Store",
  },
  bn: {
    placeholder: "খুঁজুন প্রাণী, খাবার, অ্যাক্সেসরিজ...",
    noResults: "আপনার খোঁজার সাথে মেলে এমন কিছু পাওয়া যায়নি।",
    error: "খোঁজার সময় একটি সমস্যা হয়েছে।",
    animalLabel: "প্রাণী",
    productLabel: "স্টোর",
  },
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { language } = useLanguage();
  const t = searchDict[language];
  const { getTransition } = useMotionConfig();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when opened and handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setHasError(false);

      try {
        const queryStr = encodeURIComponent(debouncedQuery.trim());
        // Using Payload REST API `like` operator (maps to ILIKE in Postgres)
        // We search across internalName, name.en, name.bn, tag.en, tag.bn
        const animalWhere = `?where[or][0][internalName][like]=${queryStr}&where[or][1][name.en][like]=${queryStr}&where[or][2][name.bn][like]=${queryStr}&where[or][3][tag.en][like]=${queryStr}&where[or][4][tag.bn][like]=${queryStr}`;
        const productWhere = `?where[or][0][internalName][like]=${queryStr}&where[or][1][name.en][like]=${queryStr}&where[or][2][name.bn][like]=${queryStr}`;

        const [animalsRes, productsRes] = await Promise.all([
          fetch(`/api/animals${animalWhere}&limit=5`),
          fetch(`/api/products${productWhere}&limit=5`),
        ]);

        if (!animalsRes.ok || !productsRes.ok) throw new Error("Search failed");

        const animalsData = await animalsRes.json();
        const productsData = await productsRes.json();

        const combined: SearchResult[] = [
          ...(animalsData.docs || []).map((doc: any) => ({ ...doc, type: "animal" })),
          ...(productsData.docs || []).map((doc: any) => ({ ...doc, type: "product" })),
        ];

        // Shuffle or sort if necessary, here we just return them raw
        setResults(combined.slice(0, 8));
      } catch (err) {
        console.error(err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-background/90 backdrop-blur-2xl px-4 py-8 md:py-16"
        >
          {/* Close Area */}
          <div className="absolute inset-0 z-0" onClick={onClose} />

          <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col h-full">
            {/* Search Input Box */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={getTransition("snappy")}
              className="relative flex items-center bg-white dark:bg-zinc-900 border border-border rounded-full shadow-lg overflow-hidden shrink-0"
            >
              <Search className="w-6 h-6 text-muted-foreground ml-6" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.placeholder}
                className={cn(
                  "w-full bg-transparent px-4 py-5 text-xl md:text-2xl outline-none placeholder:text-muted-foreground/60 text-foreground",
                  language === "bn" ? "font-bangla" : "font-sans"
                )}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-4 text-muted-foreground hover:text-foreground transition-colors mr-2"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </motion.div>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto mt-8 px-2 hide-scrollbar">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center pt-20 text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
                </div>
              ) : hasError ? (
                <div className="text-center pt-20">
                  <p className={cn("text-red-500", language === "bn" ? "font-bangla" : "font-sans")}>
                    {t.error}
                  </p>
                </div>
              ) : debouncedQuery.trim() && results.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center pt-20"
                >
                  <p className={cn("text-lg text-muted-foreground", language === "bn" ? "font-bangla" : "font-sans")}>
                    {t.noResults}
                  </p>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-3">
                  <AnimatePresence>
                    {results.map((result, i) => (
                      <motion.div
                        key={`${result.type}-${result.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ ...getTransition("snappy"), delay: i * 0.05 }}
                      >
                        <Link 
                          href={`/${result.type}s/${result.id}`}
                          onClick={onClose}
                          className="group flex items-center gap-4 p-3 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-transparent hover:border-border hover:bg-white dark:hover:bg-zinc-900 transition-all shadow-sm hover:shadow-md"
                        >
                          <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden bg-muted">
                            <Image
                              src={result.image} 
                              alt={result.name[language] || 'Result'} 
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              style={{ objectPosition: result.objectPosition || 'center center' }}
                            />
                          </div>
                          
                          <div className="flex-1 flex flex-col justify-center">
                            <span className={cn(
                              "text-xs font-semibold uppercase tracking-wider text-primary mb-1",
                              language === "bn" ? "font-bangla" : "font-sans"
                            )}>
                              {result.type === "animal" ? t.animalLabel : t.productLabel}
                            </span>
                            <h4 className={cn(
                              "text-lg md:text-xl font-bold text-foreground line-clamp-1",
                              language === "bn" ? "font-bangla" : "font-sans"
                            )}>
                              {result.name[language]}
                            </h4>
                            <p className={cn(
                              "text-sm font-medium text-muted-foreground mt-0.5",
                              language === "bn" ? "font-bangla" : "font-sans"
                            )}>
                              {result.price[language]}
                            </p>
                          </div>

                          <div className="px-4 text-muted-foreground group-hover:text-primary transition-colors">
                            <ArrowRight className="w-5 h-5 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Bottom Close Hint */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="py-4 text-center text-sm text-muted-foreground mt-auto"
            >
              Press <kbd className="font-mono bg-muted px-2 py-1 rounded">ESC</kbd> or click outside to close
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
