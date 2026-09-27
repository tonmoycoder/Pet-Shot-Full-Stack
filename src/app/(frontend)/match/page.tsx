import { CompatibilityQuiz } from "@/components/quiz/compatibility-quiz";
import { CausticsBackground } from "@/components/ui/caustics-background";

export const metadata = {
  title: "Find Your Match | Premium Pet Shop",
  description: "Take our compatibility quiz to find the perfect pet for your lifestyle.",
};

export default function MatchPage() {
  return (
    // Use `isolate` to create a fresh stacking context so children stack correctly
    <div className="relative isolate min-h-screen bg-[#fbf9f4] dark:bg-zinc-950 pt-20 overflow-hidden">

      {/* Layer 1 (z-[-20]): Base gradient atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fbf9f4] via-[#f2f7f5] to-[#ebf4f1] dark:from-zinc-950 dark:via-zinc-900/50 dark:to-emerald-950/20 -z-20 pointer-events-none" />

      {/* Layer 2 (z-[-10]): Caustics light effect */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <CausticsBackground />
      </div>

      {/* Layer 3 (z-[-5]): Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay -z-[5] pointer-events-none" />

      {/* Layer 4 (z-[10]): Quiz content — always on top */}
      <div className="relative z-10">
        <CompatibilityQuiz />
      </div>
    </div>
  );
}
