"use client";

import React, { useEffect, useState, useRef } from "react";
import { useCursor } from "@/lib/cursor-context";
import { Search } from "lucide-react";
import "./custom-cursor.css";

export function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const { cursorType } = useCursor();
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on non-touch devices
    const checkDevice = () => {
      setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateCursor = () => {
      // Smooth lerp for spring effect (low damping)
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.body.classList.add("cursor-none-global");
    
    updateCursor();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.classList.remove("cursor-none-global");
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  // Map cursorType to tailwind classes for high performance shape morphing
  let sizeClass = "w-4 h-4 bg-emerald-500/50 border border-emerald-500/80";
  if (cursorType === "pointer") {
    sizeClass = "w-12 h-12 bg-emerald-500/10 border border-emerald-500/40";
  } else if (cursorType === "view") {
    sizeClass = "w-16 h-16 bg-white/90 border-none";
  } else if (cursorType === "hidden") {
    sizeClass = "w-0 h-0 opacity-0";
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full mix-blend-difference shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 ease-out will-change-transform ${sizeClass}`}
      style={{
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
      }}
    >
      <div 
        ref={iconRef}
        className={`text-black transition-all duration-300 ease-out flex items-center justify-center ${cursorType === 'view' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
      >
        <Search className="w-6 h-6" />
      </div>
    </div>
  );
}
