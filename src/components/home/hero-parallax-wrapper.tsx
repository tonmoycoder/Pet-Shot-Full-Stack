"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "cn";

export function HeroParallaxWrapper({
  children,
  offset = 50,
  className
}: {
  children: React.ReactNode,
  offset?: number,
  className?: string
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, offset]);
  
  return (
    <motion.div style={{ y }} className={cn("w-full h-full will-change-transform", className)}>
      {children}
    </motion.div>
  );
}
