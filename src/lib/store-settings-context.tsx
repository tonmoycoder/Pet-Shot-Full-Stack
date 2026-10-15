"use client";

import React, { createContext, useContext } from "react";
import { StoreSettingsData, STORE_FALLBACK } from "@/lib/store-fallback";

const StoreSettingsContext = createContext<StoreSettingsData>(STORE_FALLBACK);

export function StoreSettingsProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: StoreSettingsData;
}) {
  return (
    <StoreSettingsContext.Provider value={value}>
      {children}
    </StoreSettingsContext.Provider>
  );
}

export function useStoreSettings(): StoreSettingsData {
  return useContext(StoreSettingsContext);
}
