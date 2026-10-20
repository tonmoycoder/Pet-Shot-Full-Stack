import { CompatibilityQuiz } from "@/components/quiz/compatibility-quiz";
import { CausticsBackground } from "@/components/ui/caustics-background";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";

export const metadata = {
  title: "সঠিক সঙ্গী নির্বাচন (Find Your Match)",
  description: "আপনার জীবনযাত্রা ও পছন্দের সাথে মানানসই সেরা পোষা পাখি বা অ্যাকোয়ারিয়াম মাছ খুঁজে পেতে আমাদের কুইজে অংশ নিন। বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম।",
  alternates: {
    canonical: "/match",
  },
  openGraph: {
    title: "সঠিক সঙ্গী নির্বাচন (Find Your Match) | Bismillah Pakhi & Aquarium",
    description: "আপনার জীবনযাত্রা ও পছন্দের সাথে মানানসই সেরা পোষা পাখি বা অ্যাকোয়ারিয়াম মাছ বেছে নিন।",
    url: "/match",
  },
  twitter: {
    card: "summary_large_image",
    title: "সঠিক সঙ্গী নির্বাচন (Find Your Match) | Bismillah Pakhi & Aquarium",
    description: "আপনার জীবনযাত্রা ও পছন্দের সাথে মানানসই সেরা পোষা পাখি বা অ্যাকোয়ারিয়াম মাছ বেছে নিন।",
  },
};

export default function MatchPage() {
  return (
    // Use `isolate` to create a fresh stacking context so children stack correctly
    <div className="relative isolate min-h-screen bg-[#fbf9f4] dark:bg-zinc-950 pt-20 overflow-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: "হোম", url: "/" },
          { name: "সঠিক সঙ্গী নির্বাচন", url: "/match" },
        ]}
      />

      {/* Layer 1 (z-[-20]): Base gradient atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fbf9f4] via-[#f2f7f5] to-[#ebf4f1] dark:from-zinc-950 dark:via-zinc-900/50 dark:to-emerald-950/20 -z-20 pointer-events-none" />

      {/* Layer 2 (z-[-10]): Caustics light effect */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <CausticsBackground />
      </div>

      {/* Layer 3 (z-[-5]): Noise texture overlay */}
      <div className="absolute inset-0 bg-[url(/noise.png)] opacity-[0.03] mix-blend-overlay -z-[5] pointer-events-none" />

      {/* Layer 4 (z-[10]): Quiz content — always on top */}
      <div className="relative z-10">
        <CompatibilityQuiz />
      </div>
    </div>
  );
}
