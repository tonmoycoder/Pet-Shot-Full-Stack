"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VIDEO_ID = "pj3iV9OjCgM";
const START_TIME = 88;

export function BackgroundAudio() {
  const [permission, setPermission] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const stored = sessionStorage.getItem("audio_permission_v2");
    if (stored) {
      setPermission(stored);
      // Even if permission is granted, we need a user interaction to autoplay on reload
      const unlockAudio = () => {
        setHasInteracted(true);
        window.removeEventListener("pointerdown", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
      };
      window.addEventListener("pointerdown", unlockAudio);
      window.addEventListener("keydown", unlockAudio);
      return () => {
        window.removeEventListener("pointerdown", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
      };
    } else {
      // Show popup after a small delay
      const timer = setTimeout(() => setShowPopup(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handlePermission = (granted: boolean) => {
    const val = granted ? "granted" : "denied";
    sessionStorage.setItem("audio_permission_v2", val);
    setPermission(val);
    setHasInteracted(true); // User just clicked, so we have interaction
    setShowPopup(false);
  };

  const toggleAudio = () => {
    const newVal = permission === "granted" ? "denied" : "granted";
    sessionStorage.setItem("audio_permission_v2", newVal);
    setPermission(newVal);
    setHasInteracted(true);
  };

  if (!isMounted) return null;

  const isPlaying = permission === "granted" && hasInteracted;

  return (
    <>
      {/* Audio Permission Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="max-w-sm w-full bg-white dark:bg-[#0e2f28] rounded-3xl p-7 shadow-2xl border border-white/20 dark:border-emerald-900/40 text-center relative overflow-hidden"
            >
              {/* Decorative glow */}
              <div className="absolute top-[-30%] left-[-10%] w-[220px] h-[220px] rounded-full bg-[#67D8CE]/15 blur-[70px] pointer-events-none" />
              <div className="absolute bottom-[-20%] right-[-10%] w-[150px] h-[150px] rounded-full bg-emerald-500/10 blur-[50px] pointer-events-none" />

              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-5xl mb-4 block"
                >
                  🎵
                </motion.div>
                <h3 className="text-xl font-bangla font-bold mb-2 text-[#09334F] dark:text-white leading-snug">
                  প্রকৃতির সুর শুনতে চান?
                </h3>
                <p className="text-zinc-500 dark:text-emerald-100/60 text-sm font-bangla mb-6 leading-relaxed">
                  পাখির ডাক ও প্রশান্তির মিউজিক ব্যাকগ্রাউন্ডে চালু করতে চান?
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handlePermission(true)}
                    className="w-full py-3.5 rounded-2xl font-bangla font-bold text-white transition-all duration-200 active:scale-95 shadow-lg"
                    style={{ background: "linear-gradient(135deg, #09334F 0%, #265D85 100%)" }}
                  >
                    হ্যাঁ, চালু করুন 🎶
                  </button>
                  <button
                    onClick={() => handlePermission(false)}
                    className="w-full py-3 rounded-2xl font-bangla font-medium text-zinc-500 dark:text-emerald-200/60 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors active:scale-95 text-sm"
                  >
                    না, থাক
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Raw YouTube Iframe (User's preferred method) */}
      {isPlaying && (
        <iframe
          width="1"
          height="1"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&controls=0&start=${START_TIME}`}
          title="Background Audio"
          allow="autoplay; encrypted-media"
          className="pointer-events-none fixed -top-96 left-0 opacity-0"
        />
      )}

      {/* Constraint area for dragging */}
      <div ref={constraintsRef} className="fixed inset-4 z-0 pointer-events-none" />

      {/* Floating toggle button */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
        initial={{ opacity: 0, scale: 0.7, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-6 z-[50] select-none flex items-center gap-3 cursor-grab"
      >
        <button
          onClick={toggleAudio}
          aria-label={!isPlaying ? "সাউন্ড চালু করুন" : "সাউন্ড বন্ধ করুন"}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-[#67D8CE] transition-transform active:scale-95 hover:scale-105"
          style={{
            background: !isPlaying
              ? "rgba(30,30,30,0.85)"
              : "linear-gradient(135deg, #09334F 0%, #265D85 100%)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(103, 216, 206, 0.25)",
          }}
        >
          {/* Pulsing rings when playing */}
          {isPlaying && (
            <>
              <motion.span
                className="absolute inset-0 rounded-full border border-[#67D8CE]/40"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                className="absolute inset-0 rounded-full border border-[#67D8CE]/20"
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              />
            </>
          )}

          <AnimatePresence mode="wait" initial={false}>
            {!isPlaying ? (
              <motion.svg
                key="muted"
                xmlns="http://www.w3.org/2000/svg"
                width="20" height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a3e4dd"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" stroke="#f87171" strokeWidth="2.5" />
                <line x1="17" y1="9" x2="23" y2="15" stroke="#f87171" strokeWidth="2.5" />
              </motion.svg>
            ) : (
              <motion.svg
                key="playing"
                xmlns="http://www.w3.org/2000/svg"
                width="20" height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#67D8CE"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>

        {/* Label pill */}
        <AnimatePresence mode="wait">
          <motion.div
            key={!isPlaying ? "off" : "on"}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25 }}
            className="font-bangla text-xs px-3 py-1.5 rounded-full pointer-events-none whitespace-nowrap shadow-sm"
            style={{
              background: "rgba(9, 51, 79, 0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(103,216,206,0.2)",
              color: !isPlaying ? "#94a3b8" : "#67D8CE",
            }}
          >
            {!isPlaying ? "🔇 সাউন্ড অফ" : "🔊 সাউন্ড অন"}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </>
  );
}
