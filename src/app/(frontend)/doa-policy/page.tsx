"use client";

import React from "react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "cn";
import { AlertTriangle, Video, Activity, RefreshCcw } from "lucide-react";

const content = {
  bn: {
    title: "DOA (Dead on Arrival) পলিসি",
    lastUpdated: "সর্বশেষ আপডেট: অক্টোবর ২০২৬",
    sections: [
      {
        icon: <Video className="w-6 h-6 text-rose-500" />,
        title: "আনবক্সিং ভিডিও বাধ্যতামূলক",
        desc: "ডেলিভারি পাওয়ার পর প্যাকেট খোলার শুরু থেকে শেষ পর্যন্ত একটানা কোনো কাট-ছাঁট ছাড়া ভিডিও করতে হবে। এটি প্রমাণ হিসেবে কাজ করবে।"
      },
      {
        icon: <Activity className="w-6 h-6 text-rose-500" />,
        title: "মৃত প্রাণীর রিপোর্ট",
        desc: "ভিডিওতে প্রাণী বা মাছটি মৃত প্রমাণ হলে, প্যাকেট রিসিভ করার ১ ঘণ্টার মধ্যে আমাদের WhatsApp-এ ভিডিওটি পাঠাতে হবে।"
      },
      {
        icon: <RefreshCcw className="w-6 h-6 text-rose-500" />,
        title: "ক্ষতিপূরণ",
        desc: "সঠিক প্রমাণ পেলে আমরা আপনাকে নতুন প্রাণী পাঠিয়ে দিবো অথবা আলোচনা সাপেক্ষে মূল্য ফেরত দেওয়া হবে। ডেলিভারি চার্জ ফেরতযোগ্য নয়।"
      },
      {
        icon: <AlertTriangle className="w-6 h-6 text-rose-500" />,
        title: "শর্তাবলী",
        desc: "প্যাকেট থেকে বের করার পর, নিজেদের অ্যাকুরিয়াম বা খাঁচায় ছাড়ার সময় কোনো প্রাণী মারা গেলে এই পলিসি প্রযোজ্য হবে না।"
      }
    ]
  },
  en: {
    title: "DOA (Dead on Arrival) Policy",
    lastUpdated: "Last Updated: October 2026",
    sections: [
      {
        icon: <Video className="w-6 h-6 text-rose-500" />,
        title: "Unboxing Video is Mandatory",
        desc: "Upon receiving the delivery, an uncut unboxing video must be recorded from start to finish. This will act as proof."
      },
      {
        icon: <Activity className="w-6 h-6 text-rose-500" />,
        title: "Reporting Dead Animals",
        desc: "If the animal or fish is proven dead in the video, you must send the video to our WhatsApp within 1 hour of receiving the packet."
      },
      {
        icon: <RefreshCcw className="w-6 h-6 text-rose-500" />,
        title: "Compensation",
        desc: "Upon valid proof, we will send a replacement animal or refund the amount upon discussion. Delivery charges are non-refundable."
      },
      {
        icon: <AlertTriangle className="w-6 h-6 text-rose-500" />,
        title: "Conditions",
        desc: "This policy is not applicable if the animal dies after being taken out of the packet and placed in your own aquarium or cage."
      }
    ]
  }
};

export default function DOAPolicyPage() {
  const { language } = useLanguage();
  const dict = content[language as 'en' | 'bn'] || content['bn'];

  return (
    <div className={cn("min-h-screen bg-[#fbf9f4] dark:bg-zinc-950 pt-32 pb-24", language === "bn" ? "font-bangla" : "font-sans")}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white">
            {dict.title}
          </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12">{dict.lastUpdated}</p>

        <div className="grid gap-8">
          {dict.sections.map((section, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
              <div className="flex gap-4 items-start">
                <div className="mt-1">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                    {section.title}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                    {section.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
