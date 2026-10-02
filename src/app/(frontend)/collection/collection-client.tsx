"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import { cn } from "@/lib/utils";
import { Search, ShoppingBag, MessageCircle, ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  id: string;
  isAnimal: boolean;
  category: string;
  internalName?: string;
  name: { en?: string; bn?: string };
  description: { en?: string; bn?: string };
  price: { en?: string; bn?: string };
  image?: string;
  objectPosition?: string;
  tag?: { en?: string; bn?: string };
  status?: string;
};

const TABS = [
  { id: "all",         label: "সব দেখুন",       labelEn: "All",          icon: "🏪",  categories: null },
  { id: "bird",        label: "পাখি",            labelEn: "Birds",        icon: "🦜",  categories: ["bird"] },
  { id: "fish",        label: "মাছ",             labelEn: "Fish",         icon: "🐟",  categories: ["fish"] },
  { id: "exotic",      label: "এক্সোটিক",        labelEn: "Exotic",       icon: "🦎",  categories: ["exotic"] },
  { id: "food",        label: "খাবার",           labelEn: "Food",         icon: "🌿",  categories: ["food"] },
  { id: "accessories", label: "অ্যাক্সেসরিজ",   labelEn: "Accessories",  icon: "🛒",  categories: ["accessories"] },
  { id: "medicine",    label: "ওষুধ",            labelEn: "Medicine",     icon: "💊",  categories: ["medicine"] },
  { id: "other",       label: "অন্যান্য",        labelEn: "Other",        icon: "📦",  categories: ["other"] },
];

function ItemCard({ item, index }: { item: Item; index: number }) {
  const href = item.isAnimal ? `/animals/${item.id}` : `/products/${item.id}`;
  const nameBn = item.name?.bn || item.name?.en || item.internalName || 'অজানা';
  const descBn = item.description?.bn || item.description?.en || '';
  const priceBn = item.price?.bn || item.price?.en || 'যোগাযোগ করুন';
  const tagBn = item.tag?.bn || (item.isAnimal ? 'পাওয়া যাচ্ছে' : 'ইন স্টক');
  const isAvailable = item.status === 'available' || item.status === 'in_stock';

  // Smart subject detection: birds → top 30%, fish → center, food/accessories → center
  const defaultPosition = item.isAnimal
    ? (item.category === 'bird' ? 'center 20%' : 'center center')
    : 'center center';
  const objPos = item.objectPosition || defaultPosition;

  const whatsappMsg = encodeURIComponent(
    `আমি ${nameBn} সম্পর্কে জানতে চাই। এটা কি এখন পাওয়া যাচ্ছে?`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.05, 0.4) }}
      className="group relative"
    >
      <Link
        href={href}
        className="block relative bg-white dark:bg-zinc-900 rounded-[28px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 border border-zinc-100/80 dark:border-zinc-800 flex flex-col h-full"
      >
        {/* Image Zone */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 shrink-0">
          {item.image ? (
            <Image
              src={item.image}
              alt={nameBn}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
              className="object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out will-change-transform"
              style={{ objectPosition: objPos }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl opacity-30">
                {item.isAnimal ? (item.category === 'bird' ? '🦜' : item.category === 'exotic' ? '🦎' : '🐟') : '🛒'}
              </span>
            </div>
          )}

          {/* Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span className={cn(
              "px-3 py-1 rounded-full text-[11px] font-bangla font-bold shadow-md backdrop-blur-sm border",
              isAvailable
                ? "bg-emerald-500/90 text-white border-emerald-400/30"
                : "bg-red-500/90 text-white border-red-400/30"
            )}>
              {tagBn}
            </span>
          </div>

          {/* View arrow */}
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/95 dark:bg-zinc-900/95 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-zinc-900 dark:text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-[17px] font-bangla font-bold text-zinc-900 dark:text-white mb-1.5 line-clamp-1 group-hover:text-[#265D85] dark:group-hover:text-[#67B1E0] transition-colors duration-300">
            {nameBn}
          </h3>
          {descBn && (
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-bangla leading-relaxed line-clamp-2 mb-3">
              {descBn}
            </p>
          )}
          <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
            <span className="text-[#265D85] dark:text-[#67B1E0] font-bangla font-bold text-base">
              {priceBn}
            </span>
            <span className="text-[11px] text-zinc-400 group-hover:text-emerald-500 transition-colors font-bangla">
              বিস্তারিত দেখুন →
            </span>
          </div>
        </div>
      </Link>

      {/* Quick WhatsApp button (outside the link, absolutely positioned) */}
      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801947315330"}?text=${whatsappMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 z-10"
        title="WhatsApp-এ জিজ্ঞেস করুন"
      >
        <MessageCircle className="w-4 h-4 text-white" />
      </a>
    </motion.div>
  );
}

export function CollectionClient({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    const activeTab = TABS.find((t) => t.id === filter);
    return items.filter((item) => {
      // Category filter: null means 'all'; otherwise match any of the tab's categories
      if (activeTab?.categories !== null && activeTab?.categories !== undefined) {
        if (!activeTab.categories.includes(item.category)) return false;
      }
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const nameEn = item.name?.en?.toLowerCase() || '';
        const nameBn = item.name?.bn?.toLowerCase() || '';
        const internalName = item.internalName?.toLowerCase() || '';
        if (!nameEn.includes(q) && !nameBn.includes(q) && !internalName.includes(q)) return false;
      }
      return true;
    });
  }, [items, filter, searchQuery]);

  // Only show tabs that have at least 1 item (hide empty tabs)
  const visibleTabs = useMemo(() => {
    return TABS.filter((tab) => {
      if (!tab.categories) return true; // always show 'all'
      return items.some((item) => tab.categories!.includes(item.category));
    });
  }, [items]);

  return (
    <div className="min-h-screen bg-[#ddf1fa] dark:bg-zinc-950">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#09334F] via-[#0d4a6e] to-[#265D85] pt-8 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm font-bangla mb-6 border border-white/20">
            <ShoppingBag className="w-4 h-4" />
            সম্পূর্ণ সংগ্রহ
          </div>
          <h1 className="text-4xl md:text-6xl font-bangla font-extrabold text-white mb-4 tracking-tight">
            আমাদের কালেকশন
          </h1>
          <p className="text-white/70 font-bangla text-lg max-w-xl mx-auto">
            আপনার পছন্দের পোষা প্রাণী এবং প্রয়োজনীয় সব সামগ্রী খুঁজে নিন।
          </p>
          <div className="mt-4 text-white/50 font-bangla text-sm">
            {items.length} টি পণ্য উপলব্ধ
          </div>
        </div>
      </div>

      {/* Filters - floating card */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 mb-10 relative z-10">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 p-4 md:p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Tab filters — only show tabs with actual items */}
          <div className="flex flex-wrap gap-2">
            {visibleTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bangla font-semibold transition-all duration-300 border",
                  filter === tab.id
                    ? "bg-[#09334F] text-white border-[#09334F] shadow-md"
                    : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 hover:text-[#265D85] dark:hover:text-[#67B1E0]"
                )}
              >
                <span>{tab.icon}</span>
                {tab.label}
                {/* Count badge */}
                <span className={cn(
                  "ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                  filter === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                )}>
                  {tab.categories === null
                    ? items.length
                    : items.filter(i => tab.categories!.includes(i.category)).length
                  }
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <input
              type="text"
              placeholder="খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#265D85]/30 dark:text-zinc-100 font-bangla text-sm transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 bg-white/60 dark:bg-zinc-900/60 rounded-3xl backdrop-blur-sm border border-white/50 dark:border-zinc-800"
            >
              <span className="text-7xl mb-6 block">🔍</span>
              <h2 className="text-2xl font-bangla font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                কোনো ফলাফল পাওয়া যায়নি
              </h2>
              <p className="text-zinc-500 font-bangla text-sm">
                অন্য ক্যাটাগরি বা সার্চ শব্দ ব্যবহার করুন
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
            >
              {filteredItems.map((item, index) => (
                <ItemCard key={item.id + (item.isAnimal ? 'A' : 'P')} item={item} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
