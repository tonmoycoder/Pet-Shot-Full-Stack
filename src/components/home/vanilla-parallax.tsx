"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "cn";

interface VanillaParallaxProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  reverse?: boolean;
}

export function VanillaParallax({ 
  children, 
  className, 
  offset = 50,
  reverse = false
}: VanillaParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    let rafId: number | null = null;
    let ticking = false;
    let isVisible = false;
    let viewportHeight = window.innerHeight;

    const updateParallax = () => {
      if (!el || !isVisible) {
        ticking = false;
        return;
      }
      
      const rect = el.getBoundingClientRect();
      
      // Check if element is in viewport
      if (rect.top <= viewportHeight && rect.bottom >= 0) {
        const totalDistance = viewportHeight + rect.height;
        const scrolled = viewportHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalDistance));
        
        const direction = reverse ? -1 : 1;
        const targetY = progress * offset * direction;
        
        el.style.transform = `translate3d(0, ${targetY.toFixed(2)}px, 0)`;
      }
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!isVisible || ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(updateParallax);
    };

    const onResize = () => {
      viewportHeight = window.innerHeight;
      onScrollOrResize();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry?.isIntersecting ?? false;
        if (isVisible) {
          window.addEventListener("scroll", onScrollOrResize, { passive: true });
          window.addEventListener("resize", onResize, { passive: true });
          onScrollOrResize();
        } else {
          window.removeEventListener("scroll", onScrollOrResize);
          window.removeEventListener("resize", onResize);
          if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
          ticking = false;
        }
      },
      { rootMargin: "50px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [offset, reverse]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
