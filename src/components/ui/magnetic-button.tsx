"use client";

import * as React from "react";

import { buttonVariants } from "./button";
import { cn } from "cn";
import { type VariantProps } from "class-variance-authority";
import { useCursor } from "@/lib/cursor-context";

interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  textMagneticStrength?: number;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

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
  const textRef = React.useRef<HTMLSpanElement>(null);
  const cursorContext = useCursor();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const isTouch = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;
    if (!ref.current || isTouch) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull for container
    const x = (distanceX / rect.width) * magneticStrength;
    const y = (distanceY / rect.height) * magneticStrength;

    // Subtle parallax pull for text
    const textX = (distanceX / rect.width) * textMagneticStrength;
    const textY = (distanceY / rect.height) * textMagneticStrength;

    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (textRef.current) {
      textRef.current.style.transform = `translate3d(${textX}px, ${textY}px, 0)`;
    }
  };

  const handleMouseEnter = () => {
    if (cursorContext) {
      cursorContext.setCursorType("pointer");
    }
  };

  const handleMouseLeave = () => {
    // Reset to origin
    if (ref.current) {
      ref.current.style.transform = `translate3d(0, 0, 0)`;
    }
    if (textRef.current) {
      textRef.current.style.transform = `translate3d(0, 0, 0)`;
    }
    if (cursorContext) {
      cursorContext.setCursorType("default");
    }
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove as any}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
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
      <span
        ref={textRef}
        style={{
          transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        className="relative z-10 flex items-center justify-center gap-2"
      >
        {children}
      </span>
    </Component>
  );
}
