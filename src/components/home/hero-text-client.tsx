"use client";

import * as React from "react";
import { cn } from "cn";
import { useLanguage } from "@/lib/language-context";

export function HeroTextClient({ dicts }: { dicts: any }) {
  const { language } = useLanguage();
  const dict = dicts[language as 'en' | 'bn'] || dicts['bn'];
  
  return (
    <>
      <h1
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 whitespace-pre-line leading-[1.2]",
          "animate-in slide-in-from-bottom-4 duration-1000 ease-out",
          language === "bn" ? "font-bangla" : "font-sans"
        )}
      >
        {dict.headline}
      </h1>

      <p
        className={cn(
          "text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 max-w-lg",
          "animate-in slide-in-from-bottom-4 duration-1000 ease-out delay-150",
          language === "bn" ? "font-bangla" : "font-sans"
        )}
      >
        {dict.subheadline}
      </p>
    </>
  );
}
