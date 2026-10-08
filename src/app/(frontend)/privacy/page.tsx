import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "গোপনীয়তা নীতি (Privacy Policy) | Bismillah Pakhi & Aquarium",
  description: "বিসমিল্লাহ পাখি & অ্যাকোয়ারিয়াম-এর গ্রাহক তথ্য সুরক্ষা ও গোপনীয়তা নীতি।",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-[800px] mx-auto font-bangla text-zinc-800 dark:text-zinc-200">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-emerald-900 dark:text-emerald-100">গোপনীয়তা নীতি (Privacy Policy)</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-10 text-lg border-b border-zinc-200 dark:border-zinc-800 pb-6">
        সর্বশেষ আপডেট: অক্টোবর ২০২৬
      </p>

      <div className="space-y-10 prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-emerald-900 dark:prose-headings:text-emerald-100 prose-p:leading-relaxed prose-li:leading-relaxed">
        <section>
          <p>
            আপনার তথ্যের নিরাপত্তা বিসমিল্লাহ পাখি & অ্যাকোয়ারিয়াম-এর কাছে অত্যন্ত গুরুত্বপূর্ণ। এই গোপনীয়তা নীতিতে আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি তা বিস্তারিত আলোচনা করা হয়েছে।
          </p>
        </section>

        <section>
          <h2>১. আমরা কী তথ্য সংগ্রহ করি</h2>
          <p>আপনি যখন আমাদের সাথে যোগাযোগ করেন বা অর্ডার কনফার্ম করেন, তখন আমরা কিছু সাধারণ তথ্য সংগ্রহ করতে পারি:</p>
          <ul>
            <li>আপনার নাম</li>
            <li>যোগাযোগের নম্বর (ফোন নম্বর বা WhatsApp নম্বর)</li>
            <li>ডেলিভারির ঠিকানা (যদি প্রয়োজন হয়)</li>
          </ul>
        </section>

        <section>
          <h2>২. তথ্যের ব্যবহার</h2>
          <p>আপনার প্রদত্ত তথ্যগুলো শুধুমাত্র নিম্নলিখিত উদ্দেশ্যেই ব্যবহৃত হয়:</p>
          <ul>
            <li>আপনার জিজ্ঞাসা বা প্রশ্নের উত্তর দেওয়া।</li>
            <li>অর্ডার কনফার্ম করা এবং প্রয়োজনে আপনার ঠিকানায় ডেলিভারি পৌঁছানো।</li>
            <li>WhatsApp ভিডিও কলের মাধ্যমে আপনাকে লাইভ প্রাণী দেখানো এবং সেবার মান উন্নত করা।</li>
          </ul>
        </section>

        <section>
          <h2>৩. তথ্যের নিরাপত্তা ও গোপনীয়তা</h2>
          <p>
            আমরা আপনার ব্যক্তিগত তথ্যকে সর্বোচ্চ গুরুত্বের সাথে সংরক্ষণ করি। আপনার নাম, ঠিকানা বা ফোন নম্বর কোনো তৃতীয় পক্ষের (Third-party) সাথে বিক্রি বা শেয়ার করা হয় না। 
          </p>
        </section>

        <section>
          <h2>৪. থার্ড-পার্টি সার্ভিস (Third-Party Services)</h2>
          <p>
            যোগাযোগের মাধ্যম হিসেবে আমরা থার্ড-পার্টি অ্যাপ (যেমন: WhatsApp, Facebook) ব্যবহার করে থাকি। এসব প্ল্যাটফর্মে শেয়ার করা তথ্য সংশ্লিষ্ট অ্যাপের নিজস্ব গোপনীয়তা নীতি দ্বারা নিয়ন্ত্রিত হয়।
          </p>
        </section>

        <section>
          <h2>৫. কুকিজ (Cookies)</h2>
          <p>
            আমাদের ওয়েবসাইট আপনার ব্রাউজিং অভিজ্ঞতা আরও সাবলীল করতে এবং পেজ দ্রুত লোড করতে সাধারণ কিছু কুকিজ ব্যবহার করতে পারে। আপনি চাইলে আপনার ব্রাউজার সেটিংস থেকে কুকিজ বন্ধ রাখতে পারেন।
          </p>
        </section>

        <section>
          <h2>৬. আপনার অধিকার</h2>
          <p>
            আপনি চাইলে যেকোনো সময় আপনার সংরক্ষিত তথ্য মুছে ফেলার জন্য আমাদের অনুরোধ করতে পারেন। গোপনীয়তা নীতি সংক্রান্ত যেকোনো প্রয়োজনে আমাদের সাথে সরাসরি যোগাযোগ করুন।
          </p>
        </section>
      </div>
    </main>
  );
}
