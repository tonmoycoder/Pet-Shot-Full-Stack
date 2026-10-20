"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCw, Home, AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error cleanly for telemetry/debugging
    console.error("Global route error caught by error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-zinc-50 dark:bg-[#051114]">
      <div className="w-full max-w-lg p-6 sm:p-8 bg-white dark:bg-zinc-900/90 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xl shadow-zinc-900/5 text-center backdrop-blur-md">
        {/* Visual Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mb-6 border border-emerald-100 dark:border-emerald-800/40">
          <AlertCircle className="w-8 h-8" />
        </div>

        {/* Bilingual Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 font-bangla">
          কিছু একটা সমস্যা হয়েছে
        </h1>
        <p className="text-sm sm:text-base font-semibold text-emerald-700 dark:text-emerald-400 mb-4 font-sans">
          Something went wrong
        </p>

        {/* Explanatory Text */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-bangla">
          পেজটি লোড করতে সাময়িক সমস্যা হচ্ছে। অনুগ্রহ করে নিচে দেওয়া বাটনে ক্লিক করে আবার চেষ্টা করুন অথবা হোম পেজে ফিরে যান।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-medium shadow-md shadow-emerald-900/20 transition-all active:scale-[0.98] cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
            <span className="font-bangla">পুনরায় চেষ্টা করুন</span>
            <span className="text-xs opacity-80">(Try Again)</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 font-medium transition-all active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span className="font-bangla">হোমে যান</span>
            <span className="text-xs opacity-80">(Home)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
