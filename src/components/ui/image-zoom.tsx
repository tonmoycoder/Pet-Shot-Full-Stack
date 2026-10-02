"use client";

/**
 * ImageZoom — Universal image zoom component
 *
 * Desktop:  Click thumbnail → lightbox opens.
 *           Scroll wheel  → zoom in/out (0.5× – 5×).
 *           Click-drag    → pan while zoomed.
 *           Click backdrop / Escape → close.
 *
 * Mobile:   Tap thumbnail → lightbox opens.
 *           Pinch gesture → zoom in/out.
 *           One-finger drag while zoomed → pan.
 *           Tap backdrop → close.
 */

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ImageZoomProps {
  src: string;
  alt: string;
  /** Trigger element (the thumbnail / cover image) */
  children: ReactNode;
  /** Additional class on the trigger wrapper */
  className?: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const MIN_SCALE = 0.5;
const MAX_SCALE = 5;
const WHEEL_FACTOR = 0.001;
const SNAP_THRESHOLD = 1.05; // snap to 1× if very close

// ── Utility ───────────────────────────────────────────────────────────────────
function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ImageZoom({ src, alt, children, className }: ImageZoomProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Transform state
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Refs for gesture tracking
  const imgRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const lastTouches = useRef<React.Touch[] | null>(null);
  const lastPinchDist = useRef<number | null>(null);
  const lastPinchMid = useRef<{ x: number; y: number } | null>(null);

  // Portal mounting
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const resetTransform = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const openLightbox = useCallback(() => {
    resetTransform();
    setOpen(true);
  }, [resetTransform]);

  const closeLightbox = useCallback(() => {
    setOpen(false);
    resetTransform();
  }, [resetTransform]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // ── Keyboard ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "+" || e.key === "=") setScale(s => clamp(s * 1.2, MIN_SCALE, MAX_SCALE));
      if (e.key === "-") setScale(s => clamp(s / 1.2, MIN_SCALE, MAX_SCALE));
      if (e.key === "0") resetTransform();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeLightbox, resetTransform]);

  // ── Scroll wheel zoom ────────────────────────────────────────────────────────
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * WHEEL_FACTOR;
    setScale(s => {
      const next = clamp(s * (1 + delta * 3), MIN_SCALE, MAX_SCALE);
      return Math.abs(next - 1) < SNAP_THRESHOLD - 1 && delta < 0 ? 1 : next;
    });
  }, []);

  // ── Mouse drag ───────────────────────────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    isDraggingRef.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }, [scale]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    setOffset(o => ({ x: o.x + dx, y: o.y + dy }));
  }, []);

  const stopDrag = useCallback(() => { 
    setIsDragging(false);
    isDraggingRef.current = false; 
  }, []);

  // ── Touch: pinch + pan ───────────────────────────────────────────────────────
  const getTouchDist = (t1: React.Touch, t2: React.Touch) => {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };
  const getTouchMid = (t1: React.Touch, t2: React.Touch) => ({
    x: (t1.clientX + t2.clientX) / 2,
    y: (t1.clientY + t2.clientY) / 2,
  });

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches.length === 2) {
      lastPinchDist.current = getTouchDist(e.touches[0], e.touches[1]);
      lastPinchMid.current = getTouchMid(e.touches[0], e.touches[1]);
    } else if (e.touches.length === 1) {
      lastTouches.current = [e.touches[0]];
    }
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault(); // prevent pull-to-refresh and native zoom
    if (e.touches.length === 2 && lastPinchDist.current !== null) {
      // Pinch zoom
      const dist = getTouchDist(e.touches[0], e.touches[1]);
      const ratio = dist / lastPinchDist.current;
      setScale(s => clamp(s * ratio, MIN_SCALE, MAX_SCALE));
      lastPinchDist.current = dist;

      // Pan while pinching
      const mid = getTouchMid(e.touches[0], e.touches[1]);
      if (lastPinchMid.current) {
        const dx = mid.x - lastPinchMid.current.x;
        const dy = mid.y - lastPinchMid.current.y;
        setOffset(o => ({ x: o.x + dx, y: o.y + dy }));
      }
      lastPinchMid.current = getTouchMid(e.touches[0], e.touches[1]);
    } else if (e.touches.length === 1 && lastTouches.current && scale > 1) {
      // Single-finger pan (only when zoomed)
      const dx = e.touches[0].clientX - lastTouches.current[0].clientX;
      const dy = e.touches[0].clientY - lastTouches.current[0].clientY;
      setOffset(o => ({ x: o.x + dx, y: o.y + dy }));
      lastTouches.current = [e.touches[0]];
    }
  }, [scale]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      lastPinchDist.current = null;
      lastPinchMid.current = null;
    }
    if (e.touches.length === 0) {
      setIsDragging(false);
      lastTouches.current = null;
      // Snap back to 1× if zoomed out below it
      setScale(s => s < 1 ? 1 : s);
      if (scale < 1.05) setOffset({ x: 0, y: 0 });
    }
  }, [scale]);

  // ── Double-tap to zoom in/out on mobile ──────────────────────────────────────
  const lastTap = useRef<number>(0);
  const onDoubleTap = useCallback((e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      // Double tap detected
      if (scale > 1.5) {
        resetTransform();
      } else {
        setScale(2.5);
      }
    }
    lastTap.current = now;
  }, [scale, resetTransform]);

  // ── Cursor style ────────────────────────────────────────────────────────────
  const cursorStyle = scale > 1
    ? isDragging ? "grabbing" : "grab"
    : "zoom-in";

  // ── Lightbox ────────────────────────────────────────────────────────────────
  const lightbox = mounted ? createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="zoom-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(4px)" }}
          // Click backdrop = close (only if not dragging)
          onClick={(e) => {
            if (e.target === e.currentTarget && !isDragging) closeLightbox();
          }}
        >
          {/* ── Controls bar ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-2 z-10"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setScale(s => clamp(s / 1.3, MIN_SCALE, MAX_SCALE))}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
              title="Zoom Out (−)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-white/70 text-xs font-mono w-10 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale(s => clamp(s * 1.3, MIN_SCALE, MAX_SCALE))}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/20 mx-1" />
            <button
              onClick={resetTransform}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
              title="Reset (0)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </motion.div>

          {/* ── Close button ──────────────────────────────────────────────── */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white transition-all"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* ── Hint on mobile ────────────────────────────────────────────── */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs font-sans pointer-events-none select-none hidden sm:hidden"
            style={{ display: "block" }}
          >
            Pinch to zoom • Drag to pan • Double-tap to zoom
          </motion.p>

          {/* ── Image container ───────────────────────────────────────────── */}
          <div
            ref={imgRef}
            className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
            style={{ cursor: cursorStyle, touchAction: "none" }}
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={(e) => { onDoubleTap(e); onTouchStart(e); }}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center w-full h-full"
            >
              <img
                src={typeof src === 'string' ? src : (src as any)?.src || src}
                alt={alt}
                draggable={false}
                style={{
                  transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  objectFit: "contain",
                  borderRadius: 12,
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  pointerEvents: "none", // prevent native img drag
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  ) : null;

  return (
    <>
      {/* ── Trigger ─────────────────────────────────────────────────────────── */}
      <div
        className={className}
        onClick={openLightbox}
        style={{ cursor: "zoom-in" }}
        role="button"
        aria-label={`Zoom in: ${alt}`}
        tabIndex={0}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") openLightbox(); }}
      >
        {children}
      </div>
      {lightbox}
    </>
  );
}
