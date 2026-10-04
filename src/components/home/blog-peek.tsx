"use client";

import React from "react";

import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "cn";
import { SafeImage as Image } from "@/components/ui/safe-image";
import Link from "next/link";

import { formatDate } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: { en: string; bn: string };
  excerpt: { en: string; bn: string };
  coverImage?: any;
  publishedAt: string;
}

interface BlogPeekProps {
  blogs: BlogPost[];
}

export function BlogPeek({ blogs }: BlogPeekProps) {
  const { language } = useLanguage();

  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="py-24 relative bg-zinc-50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              <span className={language === "bn" ? "font-bangla" : "font-sans"}>
                {language === "bn" ? "জার্নাল ও আর্টিকেল" : "Journal & Articles"}
              </span>
            </div>
            <h2 className={cn(
              "text-4xl md:text-5xl font-bold text-[#09334F] dark:text-white mb-4 leading-tight",
              language === "bn" ? "font-bangla" : "font-sans"
            )}>
              {language === "bn" ? "পোষা প্রাণীদের নিয়ে আমাদের ভাবনা" : "Thoughts on our Animal Pets friends"}
            </h2>
          </div>

          <Link
            href="/blog"
            className={cn(
              "shrink-0 inline-flex items-center gap-2 group text-[#09334F] dark:text-emerald-400 font-semibold hover:text-emerald-600 transition-colors text-lg",
              language === "bn" ? "font-bangla" : "font-sans"
            )}
          >
            {language === "bn" ? "সব আর্টিকেল দেখুন" : "View all articles"}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog, idx) => (
            <div
              key={blog.id}
              className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <Link href={`/blog/${blog.id}`} className="group block h-full">
                <article className="flex flex-col h-full bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-lg shadow-zinc-200/20 dark:shadow-black/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

                  {/* Image Container */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    {blog.coverImage?.url ? (
                      <Image
                        src={blog.coverImage.url}
                        sourceUrl={blog.coverImage?.sourceUrl}
                        alt={blog.title[language] || blog.title.bn}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-emerald-50 dark:bg-zinc-800">
                        <BookOpen className="w-12 h-12 text-emerald-200 dark:text-zinc-700" />
                      </div>
                    )}
                    {/* Overlay Date */}
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/20 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        {formatDate(blog.publishedAt || new Date().toISOString())}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className={cn(
                      "text-xl font-bold text-[#09334F] dark:text-white mb-3 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight",
                      language === "bn" ? "font-bangla" : "font-sans"
                    )}>
                      {blog.title[language] || blog.title.bn}
                    </h3>

                    <p className={cn(
                      "text-zinc-500 dark:text-zinc-400 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed",
                      language === "bn" ? "font-bangla" : "font-sans"
                    )}>
                      {blog.excerpt[language] || blog.excerpt.bn}
                    </p>

                    <div className="mt-auto flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className={language === "bn" ? "font-bangla" : "font-sans"}>
                        {language === "bn" ? "বিস্তারিত পড়ুন" : "Read more"}
                      </span>
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
