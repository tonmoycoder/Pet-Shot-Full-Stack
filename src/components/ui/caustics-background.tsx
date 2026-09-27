"use client";

import React from "react";
import { cn } from "cn";

interface CausticsBackgroundProps {
  className?: string;
}

export function CausticsBackground({ className }: CausticsBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes caustic-pan {
          from { background-position: 0% 0%; }
          to { background-position: 100% 100%; }
        }
        @media (prefers-reduced-motion) {
          .caustic-animation {
            animation: none !important;
          }
        }
      `}} />
      
      {/* Level 3: Clean solid/gradient fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-background to-teal-800/5 mix-blend-overlay" />
      
      {/* Level 2 & 1: Caustic texture with CSS animation */}
      <div 
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12] mix-blend-plus-lighter caustic-animation"
        style={{
          backgroundImage: "url('/images/caustics.png')",
          backgroundSize: "600px 600px",
          backgroundRepeat: "repeat",
          animation: "caustic-pan 30s linear infinite",
          willChange: "background-position",
        }}
      />
    </div>
  );
}
