"use client";

import React from "react";
import Image from "next/image";
import { cn } from "cn";

interface CausticsBackgroundProps {
  className?: string;
}

export function CausticsBackground({ className }: CausticsBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
      {/* Static gradient fallback — always visible, zero CLS */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-background to-teal-800/5" />
      
      {/* Caustic texture & Noise overlay — delayed fade to prevent LCP penalty */}
      <div className="absolute -inset-[100%] opacity-0 animate-[delayed-fade-in_1s_ease-out_0.5s_forwards] caustic-animation">
        <img 
          src="/images/caustics.webp" 
          alt="" 
          loading="lazy"
          decoding="async"
          className="object-cover w-full h-full opacity-[0.06] dark:opacity-[0.12]" 
        />
      </div>
      <div className="absolute inset-0 opacity-0 animate-[delayed-fade-in_1s_ease-out_0.5s_forwards] pointer-events-none">
        <img 
          src="/noise.png" 
          alt="" 
          loading="lazy"
          decoding="async"
          className="object-cover w-full h-full opacity-[0.03]" 
        />
      </div>

      <style>{`
        @keyframes delayed-fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .caustic-animation {
          animation: caustic-pan 30s linear infinite;
          will-change: transform;
        }
        @keyframes caustic-pan {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-10%, -10%, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .caustic-animation { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

