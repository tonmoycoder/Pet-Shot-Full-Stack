"use client";

import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "cn";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: { en: string; bn: string };
  excerpt: { en: string; bn: string };
  content: { en: any[]; bn: any[] };
  coverImage?: any;
  publishedAt: string;
}

// Simple Payload Rich Text Serializer (AST)
function serializeRichText(nodes: any[], language: "en" | "bn") {
  if (!nodes || !Array.isArray(nodes)) return null;

  return nodes.map((node, i) => {
    if (!node) return null;

    if (node.text) {
      let el = <Fragment key={i}>{node.text}</Fragment>;
      if (node.bold) el = <strong key={i}>{el}</strong>;
      if (node.italic) el = <em key={i}>{el}</em>;
      if (node.underline) el = <u key={i}>{el}</u>;
      if (node.strikethrough) el = <del key={i}>{el}</del>;
      if (node.code) el = <code key={i} className="bg-zinc-100 dark:bg-zinc-800 rounded px-1">{el}</code>;
      return el;
    }

    const children = node.children ? serializeRichText(node.children, language) : null;

    switch (node.type) {
      case "h1":
        return <h1 key={i} className="text-4xl font-bold mt-12 mb-6 text-[#09334F] dark:text-white leading-tight">{children}</h1>;
      case "h2":
        return <h2 key={i} className="text-3xl font-bold mt-10 mb-5 text-[#09334F] dark:text-white leading-tight">{children}</h2>;
      case "h3":
        return <h3 key={i} className="text-2xl font-bold mt-8 mb-4 text-[#09334F] dark:text-white leading-tight">{children}</h3>;
      case "h4":
        return <h4 key={i} className="text-xl font-bold mt-6 mb-3 text-[#09334F] dark:text-white leading-tight">{children}</h4>;
      case "h5":
        return <h5 key={i} className="text-lg font-bold mt-5 mb-2 text-[#09334F] dark:text-white leading-tight">{children}</h5>;
      case "h6":
        return <h6 key={i} className="text-base font-bold mt-4 mb-2 text-[#09334F] dark:text-white leading-tight">{children}</h6>;
      case "quote":
        return (
          <blockquote key={i} className="border-l-4 border-emerald-500 pl-6 my-8 italic text-xl text-zinc-600 dark:text-zinc-400 bg-emerald-50/50 dark:bg-emerald-900/10 py-4 pr-4 rounded-r-xl">
            {children}
          </blockquote>
        );
      case "list":
        if (node.listType === "number") {
          return <ol key={i} className="list-decimal list-outside ml-6 my-6 space-y-2 text-zinc-700 dark:text-zinc-300 text-lg">{children}</ol>;
        }
        return <ul key={i} className="list-disc list-outside ml-6 my-6 space-y-2 text-zinc-700 dark:text-zinc-300 text-lg">{children}</ul>;
      case "listitem":
        return <li key={i}>{children}</li>;
      case "ul": // Fallback for old slate data if any
        return <ul key={i} className="list-disc list-outside ml-6 my-6 space-y-2 text-zinc-700 dark:text-zinc-300 text-lg">{children}</ul>;
      case "ol":
        return <ol key={i} className="list-decimal list-outside ml-6 my-6 space-y-2 text-zinc-700 dark:text-zinc-300 text-lg">{children}</ol>;
      case "li":
        return <li key={i}>{children}</li>;
      case "link":
        return (
          <a
            key={i}
            href={node.url}
            target={node.newTab ? "_blank" : "_self"}
            rel={node.newTab ? "noopener noreferrer" : ""}
            className="text-emerald-600 dark:text-emerald-400 hover:underline underline-offset-4 decoration-2"
          >
            {children}
          </a>
        );
      case "paragraph":
      default:
        // Skip empty paragraphs
        if (node.children?.length === 1 && node.children[0].text === "") {
          return <br key={i} />;
        }
        return <p key={i} className="mb-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</p>;
    }
  });
}

export function BlogDetailClient({ blog }: { blog: BlogPost }) {
  const { language } = useLanguage();

  const title = blog.title[language] || blog.title.bn;
  const rawContent = blog.content[language] || blog.content.bn;
  const content = rawContent?.root?.children || rawContent; // Support Lexical format

  return (
    <div className="min-h-screen bg-white dark:bg-[#051114] pt-28 pb-24">
      {/* Top Banner (Hero Image) */}
      <div className="w-full h-[40vh] md:h-[60vh] relative bg-zinc-100 dark:bg-zinc-800">
        {blog.coverImage?.url ? (
          <Image
            src={blog.coverImage.url}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-emerald-900/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#051114] dark:to-[#051114]" />
        
        {/* Back Button */}
        <div className="absolute top-8 left-4 md:left-8 z-20">
          <Link href="/blog">
            <motion.div 
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-colors font-medium border border-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className={language === "bn" ? "font-bangla" : "font-sans"}>
                {language === "bn" ? "ফিরে যান" : "Back to Journal"}
              </span>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-32 md:-mt-48">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl shadow-black/10 border border-zinc-100 dark:border-zinc-800 p-8 md:p-16"
        >
          {/* Metadata */}
          <div className="flex items-center gap-4 mb-8 text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{formatDate(blog.publishedAt || new Date().toISOString())}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-200 dark:bg-emerald-800" />
            <div className="uppercase text-sm">
              {language === "bn" ? "আর্টিকেল" : "Article"}
            </div>
          </div>

          {/* Title */}
          <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-bold text-[#09334F] dark:text-white mb-12 leading-[1.15]",
            language === "bn" ? "font-bangla" : "font-sans"
          )}>
            {title}
          </h1>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-zinc-200 via-zinc-100 to-transparent dark:from-zinc-800 dark:via-zinc-800/50 mb-12" />

          {/* Rich Text Content */}
          <article className={cn(
            "prose prose-lg dark:prose-invert max-w-none prose-emerald",
            "prose-headings:text-[#09334F] dark:prose-headings:text-white",
            "prose-a:text-emerald-600 dark:prose-a:text-emerald-400",
            "prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100",
            language === "bn" ? "font-bangla" : "font-sans"
          )}>
            {serializeRichText(content, language)}
          </article>
        </motion.div>
      </div>
    </div>
  );
}
