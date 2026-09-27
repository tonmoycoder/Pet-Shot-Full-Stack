"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Premium UI Redesign V3 - Motion Tokens
 * Centralized motion physics to ensure "Apple-like" fluid consistency across the app.
 */

// 1. SPRING PHYSICS
export const springs = {
  // Fluid, heavy glide (used for magnetic interactions, cursors)
  fluid: { type: "spring", stiffness: 100, damping: 15, mass: 0.1 },
  // Subtle inner parallax (slightly tighter)
  subtle: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
  // Snappy but soft (used for standard button presses, popovers)
  snappy: { type: "spring", stiffness: 400, damping: 25, mass: 0.5 },
  // Bouncy (used rarely, for playful entry reveals)
  bouncy: { type: "spring", stiffness: 300, damping: 15, mass: 0.8 },
} as const;

// 2. EASING CURVES (for standard CSS or Framer Tween transitions)
export const easings = {
  // Classic Apple-style smooth ease-in-out
  appleEase: [0.25, 0.1, 0.25, 1.0],
  // Fast out, slow in (great for revealing things)
  decelerate: [0.0, 0.0, 0.2, 1.0],
  // Slow out, fast in (great for hiding things)
  accelerate: [0.4, 0.0, 1.0, 1.0],
} as const;

// 3. COMMON VARIANTS
export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: springs.snappy },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: springs.snappy },
  },
} as const;

// 4. ACCESSIBILITY HOOK
/**
 * Wraps Framer Motion's useReducedMotion to provide an easy toggle
 * for complex animations based on OS-level user preferences.
 */
export function useMotionConfig() {
  const shouldReduceMotion = useReducedMotion();

  return {
    shouldReduceMotion: !!shouldReduceMotion,
    // Helper to conditionally return a spring or an instant transition
    getTransition: (springToken: keyof typeof springs) => {
      return shouldReduceMotion ? { duration: 0 } : springs[springToken];
    },
  };
}
