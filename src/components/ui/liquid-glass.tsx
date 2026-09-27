import * as React from "react";
import { cn } from "cn";

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function LiquidGlass({ children, className, ...props }: LiquidGlassProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "bg-white/10 dark:bg-black/20 backdrop-blur-3xl backdrop-saturate-[1.5]",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border border-white/20 dark:border-white/10",
        className
      )}
      {...props}
    >
      {/* Subtle Noise Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Directional light movement pseudo-element / masked gradient */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-3xl">
        <div className="absolute inset-[-100%] bg-gradient-to-br from-white/0 via-white/15 to-white/0 animate-liquid-drift w-[300%] h-[300%]" />
      </div>
      
      {/* Apple-style Rim Light (Inner Edge Glow) */}
      <div className="absolute inset-0 pointer-events-none z-10 rounded-3xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.4)]" />

      <div className="relative z-20">{children}</div>
    </div>
  );
}
