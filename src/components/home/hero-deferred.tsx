"use client";

import dynamic from "next/dynamic";

export const StoreStatusClient = dynamic(() => import("./hero-client-components").then(m => m.StoreStatusClient), { ssr: false });
export const HeroCTAsClient = dynamic(() => import("./hero-client-components").then(m => m.HeroCTAsClient), { ssr: false });
export const HeroBadgesClient = dynamic(() => import("./hero-client-components").then(m => m.HeroBadgesClient), { ssr: false });
