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

    let rafId: number;
    let lastScrollY = window.scrollY;
    let currentY = 0;
    
    // Smooth interpolation factor
    const ease = 0.1;

    const updateParallax = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if element is in viewport
      if (rect.top <= viewportHeight && rect.bottom >= 0) {
        // Calculate scroll progress (0 to 1) relative to element visibility
        const totalDistance = viewportHeight + rect.height;
        const scrolled = viewportHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalDistance));
        
        // Target Y translation
        const direction = reverse ? -1 : 1;
        const targetY = progress * offset * direction;
        
        // Lerp
        currentY += (targetY - currentY) * ease;
        
        // Apply transform using 3d for hardware acceleration
        ref.current.style.transform = `translate3d(0, ${currentY}px, 0)`;
      }
      
      rafId = requestAnimationFrame(updateParallax);
    };

    // Start animation loop
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [offset, reverse]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
