"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, HTMLMotionProps } from "framer-motion";
import { buttonVariants } from "./button";
import { cn } from "cn";
import { type VariantProps } from "class-variance-authority";
import { useMotionConfig } from "@/lib/motion";
import { useCursor } from "@/lib/cursor-context";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button"> & HTMLMotionProps<"a">, "ref">, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  textMagneticStrength?: number;
  href?: string;
}

// Snap-back spring: tight stiffness so it snaps right back to origin
const SNAP_BACK_SPRING = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 };

export function MagneticButton({
  children,
  className,
  variant,
  size,
  magneticStrength = 20,
  textMagneticStrength = 10,
  href,
  ...props
}: MagneticButtonProps) {
  const ref = React.useRef<any>(null);
  const { shouldReduceMotion } = useMotionConfig();
  const cursorContext = useCursor();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);

  // On hover: use fluid spring for the magnetic pull feeling
  // On leave: use the dedicated snap-back spring (stiffer) so it returns to 0,0 cleanly
  const springX = useSpring(x, shouldReduceMotion ? { duration: 0 } : SNAP_BACK_SPRING);
  const springY = useSpring(y, shouldReduceMotion ? { duration: 0 } : SNAP_BACK_SPRING);
  const textSpringX = useSpring(textX, shouldReduceMotion ? { duration: 0 } : SNAP_BACK_SPRING);
  const textSpringY = useSpring(textY, shouldReduceMotion ? { duration: 0 } : SNAP_BACK_SPRING);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isTouch = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;
    if (!ref.current || shouldReduceMotion || isTouch) return;
    const rect = ref.current.getBoundingClientRect();
    const currentX = x.get();
    const currentY = y.get();
    const centerX = rect.left - currentX + rect.width / 2;
    const centerY = rect.top - currentY + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull for container
    x.set((distanceX / rect.width) * magneticStrength);
    y.set((distanceY / rect.height) * magneticStrength);

    // Subtle parallax pull for text
    textX.set((distanceX / rect.width) * textMagneticStrength);
    textY.set((distanceY / rect.height) * textMagneticStrength);
  };

  const handleMouseEnter = () => {
    if (cursorContext) {
      cursorContext.setCursorType("pointer");
    }
  };

  const handleMouseLeave = () => {
    // Explicitly reset to EXACT origin — the spring will animate back smoothly
    x.set(0);
    y.set(0);
    textX.set(0);
    textY.set(0);
    if (cursorContext) {
      cursorContext.setCursorType("default");
    }
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove as any}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
      whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
      style={{
        x: springX,
        y: springY,
        // Hardware acceleration — prevents jagged edges
        willChange: "transform",
      }}
      className={cn(
        buttonVariants({ variant, size }),
        "relative overflow-hidden group shadow-sm transition-shadow hover:shadow-md",
        className
      )}
      {...(props as any)}
    >
      {/* Inner shine effect */}
      <span className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />

      {/* Parallax Content */}
      <motion.span
        style={{
          x: textSpringX,
          y: textSpringY,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        className="relative z-10 flex items-center justify-center gap-2"
      >
        {children}
      </motion.span>
    </Component>
  );
}
