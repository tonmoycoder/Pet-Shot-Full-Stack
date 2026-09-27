"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCursor } from "@/lib/cursor-context";
import { Search } from "lucide-react";
import "./bird-cursor.css"; // Kept same filename as per project structure
import { cn } from "cn";

const GHOST_COUNT = 6;
const IRIDESCENT_COLORS = [
  "#065f46", // deep green
  "#14b8a6", // teal/aqua
  "#06b6d4", // cyan
  "#34d399", // mint
  "#fbbf24", // gold/coral hint
];

export function BirdCursor() {
  const { cursorType } = useCursor();
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const arrowAccentRef = useRef<SVGGElement>(null);
  
  // Ghost pool
  const ghostsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ghostIndex = useRef(0);

  // Physics state (no React state for coords)
  const state = useRef({
    targetX: -100,
    targetY: -100,
    x: -100,
    y: -100,
    vx: 0,
    vy: 0,
    lastTime: 0,
    lastGhostTime: 0,
    angle: 0,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const mediaQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
    setIsDesktop(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const dropGhost = (x: number, y: number, angle: number) => {
    const ghost = ghostsRef.current[ghostIndex.current];
    if (!ghost) return;

    ghost.classList.remove("active");
    void ghost.offsetWidth; // force reflow

    // Assign color
    const color = IRIDESCENT_COLORS[ghostIndex.current % IRIDESCENT_COLORS.length];
    ghost.style.setProperty("--ghost-color", color);
    
    // Staggered opacity and scale via CSS nth-child if possible, but here we just animate them identically and let lifetime handle it
    ghost.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;
    ghost.classList.add("active");

    ghostIndex.current = (ghostIndex.current + 1) % GHOST_COUNT;
  };

  const triggerClickEffect = (x: number, y: number) => {
    // Click Ring
    if (rippleRef.current) {
      rippleRef.current.classList.remove("active");
      void rippleRef.current.offsetWidth;
      rippleRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      rippleRef.current.classList.add("active");
    }
    
    // Compression
    if (cursorRef.current) {
      cursorRef.current.classList.add("cursor-clicking");
      setTimeout(() => {
        if (cursorRef.current) cursorRef.current.classList.remove("cursor-clicking");
      }, 150);
    }

    // SVG Accent Ray Flare
    if (arrowAccentRef.current) {
      arrowAccentRef.current.classList.add("accent-flare");
      setTimeout(() => {
        if (arrowAccentRef.current) arrowAccentRef.current.classList.remove("accent-flare");
      }, 300);
    }
  };

  useEffect(() => {
    if (!isDesktop) {
      document.body.classList.remove("cursor-none-global");
      return;
    }

    document.body.classList.add("cursor-none-global");

    let animationFrameId: number;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMouseMove = (e: MouseEvent) => {
      state.current.targetX = e.clientX;
      state.current.targetY = e.clientY;
      
      if (state.current.x === -100) {
        state.current.x = e.clientX;
        state.current.y = e.clientY;
      }
    };

    const onClick = (e: MouseEvent) => {
      if (!isReducedMotion) {
        triggerClickEffect(e.clientX, e.clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onClick, { passive: true });

    const loop = (time: number) => {
      if (!state.current.lastTime) state.current.lastTime = time;
      
      if (cursorRef.current && state.current.x !== -100) {
        const dx = state.current.targetX - state.current.x;
        const dy = state.current.targetY - state.current.y;
        
        // Dead-zone epsilon to kill jitter
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          // Damped interpolation (higher ease = faster follow)
          const ease = 0.85; // Increased from 0.55 for much less lag, almost 1:1 hardware feel
          
          state.current.x += dx * ease;
          state.current.y += dy * ease;
          
          state.current.vx = dx * ease;
          state.current.vy = dy * ease;
        } else {
          // Snap if very close
          state.current.x = state.current.targetX;
          state.current.y = state.current.targetY;
          state.current.vx = 0;
          state.current.vy = 0;
        }

        const speed = Math.sqrt(state.current.vx ** 2 + state.current.vy ** 2);
        
        // Rotation smoothing (only rotate if moving decently fast)
        if (!isReducedMotion && speed > 2) {
          let targetAngle = Math.atan2(state.current.vy, state.current.vx) * (180 / Math.PI);
          // Clamp angle to -14 to 14 degrees for subtle physical leaning, not 360 spinning
          targetAngle = Math.max(-14, Math.min(14, targetAngle));
          
          // Interpolate angle
          state.current.angle += (targetAngle - state.current.angle) * 0.2;
        } else {
          // Settle back to 0
          state.current.angle += (0 - state.current.angle) * 0.1;
        }

        // Apply transforms
        const angleToApply = isReducedMotion ? 0 : state.current.angle;
        cursorRef.current.style.transform = `translate3d(${state.current.x}px, ${state.current.y}px, 0) rotate(${angleToApply}deg)`;

        // Drop ghost if moving fast enough
        if (!isReducedMotion && speed > 2.5 && time - state.current.lastGhostTime > 25) {
          state.current.lastGhostTime = time;
          dropGhost(state.current.x, state.current.y, angleToApply);
        }
      }
      
      state.current.lastTime = time;
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onClick);
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove("cursor-none-global");
    };
  }, [isDesktop]);

  if (!mounted || !isDesktop) return null;

  return (
    <div ref={rootRef} className={cn(
      "custom-cursor-root pointer-events-none fixed top-0 left-0 z-[9999]",
      cursorType === "view" && "cursor-view",
      cursorType === "cta" && "cursor-cta"
    )}>
      {/* Ghost Trail */}
      {Array.from({ length: GHOST_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { ghostsRef.current[i] = el; }}
          className="cursor-ghost pointer-events-none fixed top-0 left-0 z-[9998]"
        >
          <div className="cursor-svg-container relative -ml-[12px] -mt-[12px]">
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current stroke-current" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.4654 19.0065L8.02099 11.9843L8.02098 11.9843C7.10172 9.34346 6.64208 8.02305 7.33296 7.3327C8.02385 6.64236 9.3453 7.10164 11.9882 8.02019L19.0012 10.4576C20.4673 10.9671 21.2003 11.2219 21.3585 11.7154C21.4021 11.8514 21.4172 11.9949 21.4027 12.1371C21.3503 12.6526 20.686 13.0536 19.3574 13.8556C18.5055 14.3698 18.0796 14.6269 17.966 15.0149C17.9339 15.1247 17.9201 15.2391 17.9253 15.3534C17.9436 15.7572 18.2964 16.1078 19.002 16.8091L21.3211 19.114L21.3211 19.114C21.6683 19.4591 21.8419 19.6316 21.9216 19.8246C22.0258 20.0772 22.0262 20.3606 21.9226 20.6134C21.8435 20.8066 21.6704 20.9796 21.3241 21.3256C20.9787 21.6708 20.806 21.8434 20.613 21.9224C20.3605 22.0259 20.0774 22.0259 19.8249 21.9224C19.6319 21.8434 19.4592 21.6708 19.1137 21.3256L19.1137 21.3256L16.786 18.9997C16.092 18.3062 15.7449 17.9595 15.3467 17.9387C15.2261 17.9324 15.1054 17.9471 14.99 17.9822C14.6084 18.0982 14.3552 18.5183 13.8487 19.3584L13.8487 19.3584C13.0566 20.6721 12.6606 21.329 12.1522 21.3868C12.0023 21.4038 11.8505 21.388 11.7073 21.3405C11.2217 21.1793 10.9696 20.455 10.4654 19.0065Z" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      ))}

      {/* Main Cursor Layer */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      >
        <div className="cursor-svg-container relative -ml-[12px] -mt-[12px] transition-transform duration-200 ease-out">
          {/* Base Arrow */}
          <svg width="32" height="32" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={cn(
            "fill-emerald-950 stroke-white transition-colors duration-300",
            cursorType === "view" && "fill-emerald-900 stroke-emerald-50",
            cursorType === "cta" && "fill-teal-700 stroke-white"
          )}>
            {/* Base Arrow */}
            <path d="M10.4654 19.0065L8.02099 11.9843L8.02098 11.9843C7.10172 9.34346 6.64208 8.02305 7.33296 7.3327C8.02385 6.64236 9.3453 7.10164 11.9882 8.02019L19.0012 10.4576C20.4673 10.9671 21.2003 11.2219 21.3585 11.7154C21.4021 11.8514 21.4172 11.9949 21.4027 12.1371C21.3503 12.6526 20.686 13.0536 19.3574 13.8556C18.5055 14.3698 18.0796 14.6269 17.966 15.0149C17.9339 15.1247 17.9201 15.2391 17.9253 15.3534C17.9436 15.7572 18.2964 16.1078 19.002 16.8091L21.3211 19.114L21.3211 19.114C21.6683 19.4591 21.8419 19.6316 21.9216 19.8246C22.0258 20.0772 22.0262 20.3606 21.9226 20.6134C21.8435 20.8066 21.6704 20.9796 21.3241 21.3256C20.9787 21.6708 20.806 21.8434 20.613 21.9224C20.3605 22.0259 20.0774 22.0259 19.8249 21.9224C19.6319 21.8434 19.4592 21.6708 19.1137 21.3256L19.1137 21.3256L16.786 18.9997C16.092 18.3062 15.7449 17.9595 15.3467 17.9387C15.2261 17.9324 15.1054 17.9471 14.99 17.9822C14.6084 18.0982 14.3552 18.5183 13.8487 19.3584L13.8487 19.3584C13.0566 20.6721 12.6606 21.329 12.1522 21.3868C12.0023 21.4038 11.8505 21.388 11.7073 21.3405C11.2217 21.1793 10.9696 20.455 10.4654 19.0065Z" strokeWidth="1.2" />
            
            {/* Accent Rays */}
            <g ref={arrowAccentRef} className="accent-rays origin-center stroke-white opacity-40 transition-opacity duration-200 fill-none" strokeWidth="1.5">
              <path d="M9 4V2M5 5L3.5 3.5M4 9H2M5 13L3.5 14.5M14.5 3.5L13 5" />
            </g>
          </svg>
          
          {/* Click Ripple */}
          <div ref={rippleRef} className="cursor-click-ripple border-[1.5px] border-emerald-400 rounded-full opacity-0 pointer-events-none" />

          {/* View Icon */}
          {cursorType === "view" && (
            <div className="absolute top-5 left-5 bg-emerald-900/90 rounded-full p-[3px] shadow-sm animate-in zoom-in duration-200 backdrop-blur-sm">
               <Search className="w-3 h-3 text-white" />
            </div>
          )}
          
          {/* CTA Halo */}
          {cursorType === "cta" && (
             <div className="absolute top-1/2 left-1/2 -ml-4 -mt-4 w-8 h-8 rounded-full bg-teal-400/20 mix-blend-screen blur-[2px] animate-in zoom-in duration-300" />
          )}
        </div>
      </div>
    </div>
  );
}
