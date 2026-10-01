"use client";

import React from "react";
import { cn } from "cn";

interface CausticsBackgroundProps {
  className?: string;
}

export function CausticsBackground({ className }: CausticsBackgroundProps) {
  // Lazy-mount caustic layer after page is interactive to avoid blocking LCP
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Use requestIdleCallback to defer non-critical background loading
    const mount = () => setMounted(true);
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(mount, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      const t = setTimeout(mount, 500);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
      {/* Static gradient fallback — always visible, zero CLS */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-background to-teal-800/5 mix-blend-overlay" />
      
      {/* Caustic texture — loaded only after page is interactive */}
      {mounted && (
        <div
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12] mix-blend-plus-lighter"
          style={{
            backgroundImage: "image-set(url('/images/caustics.webp') type('image/webp'), url('/images/caustics-compressed.png') type('image/png'))",
            backgroundSize: "400px 400px",
            backgroundRepeat: "repeat",
            animation: "caustic-pan 30s linear infinite",
            willChange: "background-position",
          }}
        />
      )}

      <style>{`
        @keyframes caustic-pan {
          from { background-position: 0% 0%; }
          to { background-position: 100% 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="caustic-pan"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
