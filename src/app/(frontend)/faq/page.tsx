import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "সাধারণ জিজ্ঞাসা (FAQ) | Bismillah Pakhi & Aquarium",
  description: "আমাদের দোকান, পণ্য এবং সেবাসমূহ সম্পর্কে সাধারণ জিজ্ঞাসার উত্তর।",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "আপনাদের দোকান কোথায় অবস্থিত?",
      a: "আমাদের ফিজিক্যাল স্টোরটি চুয়াডাঙ্গা জেলার বড় বাজারে অবস্থিত (সাত ভাই পুকুড় পাড়, আব্দুল্লাহ সিটির পিছনে)। আপনি সরাসরি এসে আমাদের কালেকশন দেখে পছন্দ করতে পারেন।"
    },
    {
      q: "আমি কীভাবে অনলাইনে অর্ডার করতে পারি?",
      a: "ওয়েবসাইট থেকে আপনার পছন্দের প্রাণী বা পণ্য বেছে নিয়ে সরাসরি আমাদের দেওয়া নম্বরে কল করতে পারেন অথবা WhatsApp-এ মেসেজ দিতে পারেন। আমরা আপনার সাথে যোগাযোগ করে অর্ডার কনফার্ম করব।"
    },
    {
      q: "লাইভ ভিডিওতে প্রাণী দেখার সুবিধাটি কী?",
      a: "আমরা জানি প্রাণী কেনার আগে তাকে স্বচক্ষে দেখা কতটা গুরুত্বপূর্ণ। তাই আপনি চাইলে WhatsApp ভিডিও কলের মাধ্যমে যেকোনো পাখি বা মাছ লাইভ দেখে, যাচাই করে তারপর কেনার সিদ্ধান্ত নিতে পারেন।"
    },
    {
      q: "আপনাদের ডেলিভারি ব্যবস্থা কেমন?",
      a: "যেহেতু পাখি ও মাছ অত্যন্ত সংবেদনশীল, তাই আমরা সরাসরি দোকানে এসে সংগ্রহ করাকে উৎসাহিত করি। তবে চুয়াডাঙ্গা শহরের ভেতরে বা আশেপাশের এলাকায় আমরা নিরাপদ ডেলিভারির ব্যবস্থা করে থাকি। বিস্তারিত জানতে আমাদের সাথে যোগাযোগ করুন।"
    },
    {
      q: "আপনারা কি অসুস্থ প্রাণীর চিকিৎসা বা পরামর্শ দিয়ে থাকেন?",
      a: "আমাদের দীর্ঘ ৭+ বছরের অভিজ্ঞতার আলোকে আমরা প্রাথমিক যত্ন, রোগ প্রতিরোধ এবং সঠিক খাবার সম্পর্কে পরামর্শ দিয়ে থাকি। আমাদের দোকানে উন্নত মানের খাবার ও প্রয়োজনীয় মেডিসিনও পাওয়া যায়।"
    },
    {
      q: "অ্যাকোয়ারিয়াম সেটআপের ক্ষেত্রে কি আপনারা সাহায্য করেন?",
      a: "হ্যাঁ, নতুন অ্যাকোয়ারিয়াম কেনা থেকে শুরু করে ফিল্টার সেটআপ, ডেকোরেশন এবং পানি প্রস্তুত করার সম্পূর্ণ প্রক্রিয়ায় আমরা আপনাকে গাইড করব।"
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-16 px-4 md:px-8 max-w-[800px] mx-auto font-bangla text-zinc-800 dark:text-zinc-200">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-emerald-900 dark:text-emerald-100">সাধারণ জিজ্ঞাসা (FAQ)</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-10 text-lg">আপনার মনে হতে পারে এমন কিছু সাধারণ প্রশ্নের উত্তর নিচে দেওয়া হলো।</p>
      
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-6 md:p-8 bg-white dark:bg-zinc-900/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-zinc-100 dark:border-zinc-800/50 group">
            <h3 className="font-bold text-lg md:text-xl mb-3 text-zinc-900 dark:text-zinc-100 flex items-start gap-3">
              <span className="text-emerald-500 mt-1 flex-shrink-0">❓</span>
              {faq.q}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed pl-8">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl text-center border border-emerald-100 dark:border-emerald-900/30">
        <h3 className="font-bold text-xl mb-3 text-emerald-900 dark:text-emerald-100">আরও কোনো প্রশ্ন আছে?</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">সরাসরি আমাদের সাথে কথা বলুন, আমরা আপনাকে সাহায্য করতে প্রস্তুত।</p>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801947315330"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-xl font-bold transition-colors"
        >
          WhatsApp-এ মেসেজ দিন
        </a>
      </div>
    </main>
  );
}
