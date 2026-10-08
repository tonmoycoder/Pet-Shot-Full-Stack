"use client";

import React from "react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "cn";
import { Truck, ShieldCheck, MapPin, Clock } from "lucide-react";

const content = {
  bn: {
    title: "ডেলিভারি পলিসি",
    lastUpdated: "সর্বশেষ আপডেট: অক্টোবর ২০২৬",
    sections: [
      {
        icon: <MapPin className="w-6 h-6 text-emerald-500" />,
        title: "ডেলিভারি এরিয়া",
        desc: "আমরা চুয়াডাঙ্গা এবং এর আশেপাশের এলাকায় সরাসরি হোম ডেলিভারি দিয়ে থাকি। অন্যান্য জেলায় বাসে বা কুরিয়ার সার্ভিসের মাধ্যমে পাখি ও একুরিয়াম আইটেম পাঠানো হয়।"
      },
      {
        icon: <Clock className="w-6 h-6 text-emerald-500" />,
        title: "ডেলিভারি সময়",
        desc: "সাধারণত অর্ডারের ২৪-৪৮ ঘণ্টার মধ্যে পণ্য ডেলিভারি করা হয়। তবে আবহাওয়া বা বিশেষ কারণে সময় সামান্য পরিবর্তন হতে পারে।"
      },
      {
        icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
        title: "সুরক্ষিত প্যাকেজিং",
        desc: "লাইভ প্রাণী ও মাছের ক্ষেত্রে আমরা বিশেষ সতর্কতার সাথে প্যাকেজিং করি যেনো পথে কোনো ক্ষতি না হয়।"
      }
    ]
  },
  en: {
    title: "Delivery Policy",
    lastUpdated: "Last Updated: October 2026",
    sections: [
      {
        icon: <MapPin className="w-6 h-6 text-emerald-500" />,
        title: "Delivery Areas",
        desc: "We provide direct home delivery in Chuadanga and surrounding areas. For other districts, birds and aquarium items are sent via bus or courier services."
      },
      {
        icon: <Clock className="w-6 h-6 text-emerald-500" />,
        title: "Delivery Time",
        desc: "Products are usually delivered within 24-48 hours of placing the order. However, the time may vary slightly due to weather or special circumstances."
      },
      {
        icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
        title: "Secure Packaging",
        desc: "For live animals and fish, we use special packaging with utmost care to ensure they are not harmed during transit."
      }
    ]
  }
};

export default function DeliveryPolicyPage() {
  const { language } = useLanguage();
  const dict = content[language as 'en' | 'bn'] || content['bn'];

  return (
    <div className={cn("min-h-screen bg-[#fbf9f4] dark:bg-zinc-950 pt-32 pb-24", language === "bn" ? "font-bangla" : "font-sans")}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center">
            <Truck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
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
