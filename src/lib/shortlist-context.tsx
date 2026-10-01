"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ShortlistItem = {
  id: string | number;
  type: 'animal' | 'product';
  name: { en: string; bn: string };
  image: string;
  price?: { en: string; bn: string };
};

type ShortlistContextType = {
  items: ShortlistItem[];
  toggleShortlist: (item: ShortlistItem) => void;
  isInShortlist: (id: string | number) => boolean;
  clearShortlist: () => void;
  isHydrated: boolean;
  isDrawerOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
};

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

export function ShortlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ShortlistItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('petshop_shortlist');
      if (stored) {
        setTimeout(() => setItems(JSON.parse(stored)), 0);
      }
    } catch (error) {
      console.error('Failed to load shortlist from localStorage', error);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  // Save to local storage when items change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('petshop_shortlist', JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save shortlist to localStorage', error);
      }
    }
  }, [items, isHydrated]);

  const toggleShortlist = (item: ShortlistItem) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isInShortlist = (id: string | number) => {
    return items.some((item) => item.id === id);
  };

  const clearShortlist = () => {
    setItems([]);
  };

  return (
    <ShortlistContext.Provider value={{ items, toggleShortlist, isInShortlist, clearShortlist, isHydrated, isDrawerOpen, setDrawerOpen }}>
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  const context = useContext(ShortlistContext);
  if (context === undefined) {
    throw new Error('useShortlist must be used within a ShortlistProvider');
  }
  return context;
}
