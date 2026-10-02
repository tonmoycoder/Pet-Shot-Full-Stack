"use client";

import dynamic from "next/dynamic";

const BirdCursor = dynamic(() => import("@/components/ui/bird-cursor").then(m => ({ default: m.BirdCursor })), { ssr: false });
const FloatingContact = dynamic(() => import("@/components/layout/floating-contact").then(m => ({ default: m.FloatingContact })), { ssr: false });
const ShortlistDrawer = dynamic(() => import("@/components/layout/shortlist-drawer").then(m => ({ default: m.ShortlistDrawer })), { ssr: false });
const BackgroundAudio = dynamic(() => import("@/components/layout/background-audio").then(m => ({ default: m.BackgroundAudio })), { ssr: false });

export function LayoutOverlays() {
  return (
    <>
      <BirdCursor />
      <FloatingContact />
      <ShortlistDrawer />
      <BackgroundAudio />
    </>
  );
}
