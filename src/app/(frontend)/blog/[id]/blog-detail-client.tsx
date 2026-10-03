"use client";

import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, Share2, MessageCircle, Link as LinkIcon } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "cn";
import { SafeImage as Image } from "@/components/ui/safe-image";
import Link from "next/link";
import { formatDate, resolveImageUrl } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { ImageZoom } from "@/components/ui/image-zoom";

interface BlogPost {
  id: string;
  title: { en: string; bn: string };
  excerpt: { en: string; bn: string };
  content: { en: any; bn: any };
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
        return <h1 key={i}>{children}</h1>;
      case "h2":
        return <h2 key={i}>{children}</h2>;
      case "h3":
        return <h3 key={i}>{children}</h3>;
      case "h4":
        return <h4 key={i}>{children}</h4>;
      case "h5":
        return <h5 key={i}>{children}</h5>;
      case "h6":
        return <h6 key={i}>{children}</h6>;
      case "quote":
        return (
          <blockquote key={i}>
            {children}
          </blockquote>
        );
      case "list":
        if (node.listType === "number") {
          return <ol key={i}>{children}</ol>;
        }
        return <ul key={i}>{children}</ul>;
      case "listitem":
        return <li key={i}>{children}</li>;
      case "ul": 
        return <ul key={i}>{children}</ul>;
      case "ol":
        return <ol key={i}>{children}</ol>;
      case "li":
        return <li key={i}>{children}</li>;
      case "link":
        return (
          <a
            key={i}
            href={node.fields?.url || node.url}
            target={node.fields?.newTab || node.newTab ? "_blank" : "_self"}
            rel={node.fields?.newTab || node.newTab ? "noopener noreferrer" : ""}
          >
            {children}
          </a>
        );
      case "upload":
        if (node.relationTo === "media" && node.value) {
          const { url, alt, width, height } = node.value;
          const resolvedSrc = resolveImageUrl(url);
          return (
            <div key={i} className="my-8 w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex justify-center">
              {resolvedSrc ? (
                <ImageZoom src={resolvedSrc} alt={alt || "Blog image"} className="w-full flex justify-center">
                  <img
                    src={resolvedSrc}
                    alt={alt || "Blog image"}
                    className="max-w-full h-auto object-contain rounded-2xl shadow-lg transition-opacity hover:opacity-90"
                    loading="lazy"
                  />
                </ImageZoom>
              ) : null}
            </div>
          );
        }
        return null;
      case "paragraph":
      default:
        if (node.children?.length === 1 && node.children[0].text === "") {
          return <br key={i} />;
        }
        return <p key={i}>{children}</p>;
    }
  });
}

export function BlogDetailClient({ blog }: { blog: BlogPost }) {
  const { language } = useLanguage();

  const title = blog.title[language] || blog.title.bn;
  const rawContent = blog.content[language] || blog.content.bn;
  const content = rawContent?.root?.children || rawContent; // Support Lexical format
  
  const renderContent = () => {
    const markdownComponents = {
      img: (props: any) => (
        <div className="my-8 w-full flex justify-center">
          <ImageZoom src={props.src || ""} alt={props.alt || "Blog image"} className="w-full flex justify-center">
            <img {...props} className="max-w-full h-auto object-contain rounded-2xl shadow-lg transition-opacity hover:opacity-90" loading="lazy" />
          </ImageZoom>
        </div>
      )
    };

    if (typeof content === 'string') {
       return <ReactMarkdown remarkPlugins={[remarkBreaks]} components={markdownComponents}>{content.replace(/\\n/g, '\n')}</ReactMarkdown>;
    }
    
    // Check if it's a bad AST dump (e.g. from CSV)
    if (Array.isArray(content) && content.length > 0) {
       const allText = content.reduce((acc, node) => {
           if (node.type === 'paragraph' && node.children) {
               return acc + '\n\n' + node.children.map((c: any) => c.text || '').join('');
           }
           if (node.type === 'heading' && node.children) {
               const h = '#'.repeat(node.tag ? parseInt(node.tag.replace('h', '')) || 2 : 2) + ' ';
               return acc + '\n\n' + h + node.children.map((c: any) => c.text || '').join('');
           }
           return acc;
       }, '');
       
       if (allText.includes('\\n') || allText.includes('# ') || allText.includes('\n')) {
          const sanitized = allText.replace(/\\n/g, '\n');
          return <ReactMarkdown remarkPlugins={[remarkBreaks]} components={markdownComponents}>{sanitized}</ReactMarkdown>;
       }
    }

    return serializeRichText(content, language);
  };

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const whatsappShare = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + pageUrl)}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#051114] pt-28 pb-24">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-emerald-500/5 dark:bg-emerald-900/10 blur-3xl pointer-events-none rounded-b-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        
        {/* Back Button & Breadcrumbs */}
        <div className="mb-8">
          <Link href="/blog">
            <motion.div 
              whileHover={{ x: -5 }}
              className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className={language === "bn" ? "font-bangla" : "font-sans"}>
                {language === "bn" ? "ফিরে যান" : "Back to Journal"}
              </span>
            </motion.div>
          </Link>
        </div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide">
            <div className="flex items-center gap-2 bg-emerald-100/50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{formatDate(blog.publishedAt || new Date().toISOString())}</span>
            </div>
            <div className="uppercase text-sm bg-zinc-200/50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full text-zinc-700 dark:text-zinc-300">
              {language === "bn" ? "আর্টিকেল" : "Article"}
            </div>
          </div>

          {/* Title */}
          <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#09334F] dark:text-white mb-10 leading-tight",
            language === "bn" ? "font-bangla" : "font-sans"
          )}>
            {title}
          </h1>

          {/* Cover Image */}
          <div className="w-full aspect-[21/9] md:aspect-[2.5/1] relative bg-zinc-100 dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl shadow-zinc-200/50 dark:shadow-black/50 flex justify-center items-center">
            {blog.coverImage?.url ? (
              <ImageZoom
                src={blog.coverImage?.sourceUrl || blog.coverImage?.url}
                alt={title}
                className="absolute inset-0 w-full h-full"
              >
                {/* Ambient Blur Background */}
                <Image
                  src={blog.coverImage.url}
                  sourceUrl={blog.coverImage.sourceUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-cover blur-3xl scale-110 opacity-60 dark:opacity-40"
                  wrapperClassName="z-0"
                  priority
                />
                {/* Crisp Foreground Image */}
                <Image
                  src={blog.coverImage.url}
                  sourceUrl={blog.coverImage.sourceUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-contain drop-shadow-2xl"
                  wrapperClassName="z-10"
                  priority
                />
              </ImageZoom>
            ) : (
              <div className="w-full h-full bg-emerald-900/20" />
            )}
          </div>
        </motion.div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Main Content Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 min-w-0 bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl shadow-xl shadow-zinc-200/20 dark:shadow-black/20 border border-zinc-100 dark:border-zinc-800/50"
          >
            <article className={cn(
              "prose prose-lg md:prose-xl dark:prose-invert max-w-none prose-emerald prose-headings:font-bold prose-headings:text-[#09334F] dark:prose-headings:text-white prose-a:text-emerald-600 prose-img:rounded-2xl",
              language === "bn" ? "font-bangla" : "font-sans"
            )}>
              {renderContent()}
            </article>
          </motion.div>

          {/* Sidebar Area */}
          <motion.aside 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-80 shrink-0 space-y-8"
          >
            {/* Share Widget */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-xl shadow-zinc-200/20 dark:shadow-black/20 border border-zinc-100 dark:border-zinc-800/50 relative lg:sticky lg:top-32">
              <h3 className={cn(
                "text-lg font-bold text-[#09334F] dark:text-white mb-4",
                language === "bn" ? "font-bangla" : "font-sans"
              )}>
                {language === "bn" ? "শেয়ার করুন" : "Share this article"}
              </h3>
              <div className="flex gap-4">
                <a href={whatsappShare} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href={facebookShare} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <LinkIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* CTA Widget */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-3xl text-white shadow-xl shadow-emerald-500/20 relative lg:sticky lg:top-[280px]">
              <h3 className={cn(
                "text-2xl font-bold mb-4",
                language === "bn" ? "font-bangla" : "font-sans"
              )}>
                {language === "bn" ? "আপনার স্বপ্নের পোষা প্রাণী খুঁজছেন?" : "Looking for your dream pet?"}
              </h3>
              <p className={cn(
                "text-emerald-50 mb-6",
                language === "bn" ? "font-bangla" : "font-sans"
              )}>
                {language === "bn" ? "আজই আমাদের সাথে যোগাযোগ করুন এবং এক্সক্লুসিভ পেট প্রি-বুক করুন।" : "Contact us today to pre-book exclusive pets and accessories."}
              </p>
              <a 
                href="https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-white text-emerald-600 text-center py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
              >
                {language === "bn" ? "হোয়াটসঅ্যাপে মেসেজ দিন" : "Message on WhatsApp"}
              </a>
            </div>
          </motion.aside>
          
        </div>
      </div>
    </div>
  );
}

