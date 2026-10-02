"use client";

import React from 'react';
import { Heart } from 'lucide-react';

import { cn } from 'cn';
import { useShortlist, ShortlistItem } from '@/lib/shortlist-context';

type ShortlistButtonProps = {
  item: ShortlistItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export function ShortlistButton({ item, className, size = 'md' }: ShortlistButtonProps) {
  const { isInShortlist, toggleShortlist, isHydrated } = useShortlist();
  
  if (!isHydrated) return null; // Avoid hydration mismatch

  const active = isInShortlist(item.id);

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleShortlist(item);
      }}
      className={cn(
        "relative flex items-center justify-center rounded-full transition-all duration-300 active:scale-90",
        sizes[size],
        active 
          ? "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20" 
          : "bg-white/80 text-zinc-400 hover:text-zinc-600 hover:bg-white backdrop-blur-md shadow-sm border border-black/5 dark:bg-black/50 dark:text-zinc-500 dark:hover:text-zinc-300",
        className
      )}
      aria-label={active ? "Remove from shortlist" : "Add to shortlist"}
    >
      <Heart
        size={iconSizes[size]}
        className={cn(
          "transition-all duration-300",
          active ? "fill-current" : ""
        )}
      />
    </button>
  );
}
