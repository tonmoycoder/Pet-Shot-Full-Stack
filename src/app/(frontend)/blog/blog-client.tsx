"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "cn";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import Link from "next/link";
import { useMotionConfig } from "@/lib/motion";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: { en: string; bn: string };
  excerpt: { en: string; bn: string };
  coverImage?: any;
  publishedAt: string;
}

export function BlogClient({ blogs }: { blogs: BlogPost[] }) {
  const { language } = useLanguage();
  const { getTransition } = useMotionConfig();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#051114] pt-32 pb-24">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-emerald-500/5 dark:bg-emerald-900/10 blur-3xl pointer-events-none rounded-b-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-semibold mb-6 shadow-sm border border-emerald-200 dark:border-emerald-800"
          >
            <BookOpen className="w-5 h-5" />
            <span className={language === "bn" ? "font-bangla text-base" : "font-sans text-sm tracking-wide uppercase"}>
              {language === "bn" ? "জার্নাল" : "Our Journal"}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={cn(
              "text-4xl md:text-6xl font-bold text-[#09334F] dark:text-white mb-6 leading-tight",
              language === "bn" ? "font-bangla" : "font-sans"
            )}
          >
            {language === "bn" ? "পুষ্যিদের নিয়ে আমাদের ভাবনা" : "Thoughts, Tips & News"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "text-lg text-zinc-600 dark:text-zinc-400",
              language === "bn" ? "font-bangla" : "font-sans"
            )}
          >
            {language === "bn" 
              ? "পোষা প্রাণীর যত্ন, মজার তথ্য এবং আমাদের স্টোরের নতুন আপডেটগুলো জানুন।"
              : "Discover pet care tips, fun facts, and the latest updates from our store."}
          </motion.p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            {language === "bn" ? "কোনো পোস্ট পাওয়া যায়নি।" : "No posts found."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...getTransition("snappy"), delay: idx * 0.05 + 0.3 }}
              >
                <Link href={`/blog/${blog.id}`} className="group block h-full">
                  <article className="flex flex-col h-full bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-black/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    
                    {/* Image Container */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      {blog.coverImage?.url ? (
                        <Image
                          src={blog.coverImage.url}
                          alt={blog.title[language] || blog.title.bn}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-emerald-50 dark:bg-zinc-800">
                          <BookOpen className="w-12 h-12 text-emerald-200 dark:text-zinc-700" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                      
                      {/* Overlay Date */}
                      <div className="absolute top-4 left-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/20 flex items-center gap-1.5 transform transition-transform duration-500 group-hover:scale-105">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 tracking-wide uppercase">
                          {formatDate(blog.publishedAt || new Date().toISOString())}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex-1 flex flex-col relative bg-white dark:bg-zinc-900">
                      <h3 className={cn(
                        "text-2xl font-bold text-[#09334F] dark:text-white mb-4 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug",
                        language === "bn" ? "font-bangla" : "font-sans"
                      )}>
                        {blog.title[language] || blog.title.bn}
                      </h3>
                      
                      <p className={cn(
                        "text-zinc-600 dark:text-zinc-400 text-base line-clamp-3 mb-8 flex-1 leading-relaxed",
                        language === "bn" ? "font-bangla" : "font-sans"
                      )}>
                        {blog.excerpt[language] || blog.excerpt.bn}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-6">
                        <span className={cn(
                          "font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide text-sm",
                          language === "bn" ? "font-bangla" : "font-sans"
                        )}>
                          {language === "bn" ? "বিস্তারিত পড়ুন" : "Read Article"}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 text-emerald-600 dark:text-emerald-400">
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
