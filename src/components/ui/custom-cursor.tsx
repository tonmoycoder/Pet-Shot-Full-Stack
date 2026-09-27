"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/lib/cursor-context";
import { Search } from "lucide-react";
import "./custom-cursor.css";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { cursorType } = useCursor();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    // Only enable on non-touch devices
    const checkDevice = () => {
      setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove);
      document.body.classList.add("cursor-none-global");
    } else {
      document.body.classList.remove("cursor-none-global");
    }

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.classList.remove("cursor-none-global");
    };
  }, [isDesktop, mouseX, mouseY]);

  if (!mounted || !isDesktop) return null;

  // Define variants for different cursor states
  const variants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: "rgba(34, 197, 94, 0.5)", // primary color with opacity
      border: "1px solid rgba(34, 197, 94, 0.8)",
      x: "-50%",
      y: "-50%",
      opacity: 1,
    },
    pointer: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      border: "1px solid rgba(34, 197, 94, 0.4)",
      x: "-50%",
      y: "-50%",
      opacity: 1,
    },
    view: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      border: "none",
      x: "-50%",
      y: "-50%",
      opacity: 1,
    },
    hidden: {
      width: 0,
      height: 0,
      opacity: 0,
      x: "-50%",
      y: "-50%",
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full mix-blend-difference shadow-[0_0_20px_rgba(34,197,94,0.3)]"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      variants={variants}
      animate={cursorType}
      transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
    >
      {cursorType === "view" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="text-black"
        >
          <Search className="w-6 h-6" />
        </motion.div>
      )}
    </motion.div>
  );
}
