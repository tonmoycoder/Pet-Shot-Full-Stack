"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import { cn } from "@/lib/utils";
import { Search, ShoppingBag, MessageCircle, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
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
  const { language } = useLanguage();
  const href = item.isAnimal ? `/animals/${item.id}` : `/products/${item.id}`;
  
  const nameStr = language === 'en' 
    ? (item.name?.en || item.internalName || 'Unknown') 
    : (item.name?.bn || item.name?.en || item.internalName || 'অজানা');
    
  const descStr = language === 'en' 
    ? (item.description?.en || item.description?.bn || '') 
    : (item.description?.bn || item.description?.en || '');
    
  const priceStr = language === 'en' 
    ? (item.price?.en || item.price?.bn || 'Contact for price') 
    : (item.price?.bn || item.price?.en || 'যোগাযোগ করুন');
    
  const tagStr = language === 'en' 
    ? (item.tag?.en || (item.isAnimal ? 'Available' : 'In Stock')) 
    : (item.tag?.bn || (item.isAnimal ? 'পাওয়া যাচ্ছে' : 'ইন স্টক'));
    
  const viewDetailsStr = language === 'en' ? 'View Details →' : 'বিস্তারিত দেখুন →';

  const isAvailable = item.status === 'available' || item.status === 'in_stock';

  const defaultPosition = item.isAnimal
    ? (item.category === 'bird' ? 'center 20%' : 'center center')
    : 'center center';
  const objPos = item.objectPosition || defaultPosition;

  const whatsappMsgBn = `আমি ${nameStr} সম্পর্কে জানতে চাই। এটা কি এখন পাওয়া যাচ্ছে?`;
  const whatsappMsgEn = `I would like to know about ${nameStr}. Is it currently available?`;
  const whatsappMsg = encodeURIComponent(language === 'en' ? whatsappMsgEn : whatsappMsgBn);

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
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 shrink-0">
          {item.image ? (
            <Image
              src={item.image}
              alt={nameStr}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-3 left-3">
            <span className={cn(
              "px-3 py-1 rounded-full text-[11px] font-bold shadow-md backdrop-blur-sm border",
              language === "bn" ? "font-bangla" : "font-sans",
              isAvailable
                ? "bg-emerald-500/90 text-white border-emerald-400/30"
                : "bg-red-500/90 text-white border-red-400/30"
            )}>
              {tagStr}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/95 dark:bg-zinc-900/95 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-zinc-900 dark:text-white" />
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className={cn("text-[17px] font-bold text-zinc-900 dark:text-white mb-1.5 line-clamp-1 group-hover:text-[#265D85] dark:group-hover:text-[#67B1E0] transition-colors duration-300", language === "bn" ? "font-bangla" : "font-sans")}>
            {nameStr}
          </h3>
          {descStr && (
            <p className={cn("text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-3", language === "bn" ? "font-bangla" : "font-sans")}>
              {descStr}
            </p>
          )}
          <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
            <span className={cn("text-[#265D85] dark:text-[#67B1E0] font-bold text-base", language === "bn" ? "font-bangla" : "font-sans")}>
              {priceStr}
            </span>
            <span className={cn("text-[11px] text-zinc-400 group-hover:text-emerald-500 transition-colors", language === "bn" ? "font-bangla" : "font-sans")}>
              {viewDetailsStr}
            </span>
          </div>
        </div>
      </Link>
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

export function CollectionClient({ items, serverData }: { items: Item[], serverData: any }) {
  const router = useRouter();
  const { language } = useLanguage();
  const { page, totalPages, totalDocs, category: activeFilter, q: searchQuery, sort = 'default', inStock = 'false', tabCounts } = serverData;
  const [localSearch, setLocalSearch] = useState(searchQuery || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const updateUrl = (updates: Record<string, string | null>) => {
    const url = new URL(window.location.href);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });
    router.push(url.pathname + url.search, { scroll: false });
  };

  const setFilter = (newFilter: string) => {
    updateUrl({ category: newFilter, page: "1" });
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateUrl({ q: localSearch, page: "1" });
    }
  };

  const setPage = (newPage: number) => {
    updateUrl({ page: newPage.toString() });
  };

  const visibleTabs = TABS.filter((tab) => {
    return tabCounts[tab.id] > 0 || tab.id === 'all';
  });

  const filteredItems = items.filter(item => {
    if (!minPrice && !maxPrice) return true;
    const priceStr = item.price?.en || "0";
    const num = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    if (isNaN(num)) return false; // Filter out non-numeric like 'Contact for price' when price range is active
    
    if (minPrice && num < parseInt(minPrice, 10)) return false;
    if (maxPrice && num > parseInt(maxPrice, 10)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#ddf1fa] dark:bg-zinc-950">
      <div className="bg-gradient-to-br from-[#09334F] via-[#0d4a6e] to-[#265D85] pt-8 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className={cn("inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm mb-6 border border-white/20", language === "bn" ? "font-bangla" : "font-sans")}>
            <ShoppingBag className="w-4 h-4" />
            {language === 'en' ? "Full Collection" : "সম্পূর্ণ সংগ্রহ"}
          </div>
          <h1 className={cn("text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight", language === "bn" ? "font-bangla" : "font-sans")}>
            {language === 'en' ? "Our Collection" : "আমাদের কালেকশন"}
          </h1>
          <p className={cn("text-white/70 text-lg max-w-xl mx-auto", language === "bn" ? "font-bangla" : "font-sans")}>
            {language === 'en' ? "Find your favorite pets and essential accessories." : "আপনার পছন্দের পোষা প্রাণী এবং প্রয়োজনীয় সব সামগ্রী খুঁজে নিন।"}
          </p>
          <div className={cn("mt-4 text-white/50 text-sm", language === "bn" ? "font-bangla" : "font-sans")}>
            {language === 'en' ? `${totalDocs} items available` : `${totalDocs} টি পণ্য উপলব্ধ`}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 mb-10 relative z-10">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 p-4 md:p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {visibleTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border",
                  language === "bn" ? "font-bangla" : "font-sans",
                  activeFilter === tab.id
                    ? "bg-[#09334F] text-white border-[#09334F] shadow-md"
                    : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 hover:text-[#265D85] dark:hover:text-[#67B1E0]"
                )}
              >
                <span>{tab.icon}</span>
                {language === 'en' ? tab.labelEn : tab.label}
                <span className={cn(
                  "ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                  activeFilter === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                )}>
                  {tabCounts[tab.id]}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
            
            {/* Price Range */}
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                placeholder="Min ৳"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className={cn("w-20 px-2 py-2 rounded bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm", language === "bn" ? "font-bangla" : "font-sans")}
              />
              <span className="text-zinc-400">-</span>
              <input 
                type="number" 
                placeholder="Max ৳"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className={cn("w-20 px-2 py-2 rounded bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm", language === "bn" ? "font-bangla" : "font-sans")}
              />
            </div>

            <label className={cn("flex items-center gap-2 text-sm cursor-pointer whitespace-nowrap px-2", language === "bn" ? "font-bangla" : "font-sans")}>
              <input
                type="checkbox"
                checked={inStock === 'true'}
                onChange={(e) => updateUrl({ in_stock: e.target.checked ? 'true' : 'false', page: "1" })}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-zinc-700 dark:text-zinc-300">
                {language === 'en' ? "In Stock Only" : "শুধু স্টকে থাকা"}
              </span>
            </label>

            <select
              value={sort}
              onChange={(e) => updateUrl({ sort: e.target.value, page: "1" })}
              className={cn("px-4 py-2.5 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#265D85]/30 dark:text-zinc-100 text-sm transition-all min-w-[160px]", language === "bn" ? "font-bangla" : "font-sans")}
            >
              <option value="default">{language === 'en' ? "Default Sort" : "সাধারণ বাছাই"}</option>
              <option value="newest">{language === 'en' ? "New Arrivals" : "নতুন এসেছে"}</option>
              <option value="oldest">{language === 'en' ? "Oldest" : "পুরাতন"}</option>
              <option value="price_asc">{language === 'en' ? "Price: Low to High" : "দাম: কম থেকে বেশি"}</option>
              <option value="price_desc">{language === 'en' ? "Price: High to Low" : "দাম: বেশি থেকে কম"}</option>
            </select>
            
            <div className="relative w-full sm:w-56 shrink-0">
              <input
                type="text"
                placeholder={language === 'en' ? "Search..." : "খুঁজুন..."}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={handleSearch}
                className={cn("w-full pl-11 pr-4 py-2.5 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#265D85]/30 dark:text-zinc-100 text-sm transition-all", language === "bn" ? "font-bangla" : "font-sans")}
              />
              <Search 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 cursor-pointer" 
                onClick={() => updateUrl({ q: localSearch, page: "1" })}
              />
            </div>
          </div>
        </div>
      </div>

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
              <h2 className={cn("text-2xl font-bold text-zinc-700 dark:text-zinc-300 mb-2", language === "bn" ? "font-bangla" : "font-sans")}>
                {language === 'en' ? "No results found" : "কোনো ফলাফল পাওয়া যায়নি"}
              </h2>
              <p className={cn("text-zinc-500 text-sm", language === "bn" ? "font-bangla" : "font-sans")}>
                {language === 'en' ? "Try using a different category or search term" : "অন্য ক্যাটাগরি বা সার্চ শব্দ ব্যবহার করুন"}
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

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className={cn("flex items-center gap-1 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 disabled:opacity-50 transition-all text-zinc-600 dark:text-zinc-300 hover:text-[#265D85] hover:border-[#265D85]", language === "bn" ? "font-bangla" : "font-sans")}
            >
              <ChevronLeft className="w-4 h-4" /> {language === 'en' ? "Prev" : "আগে"}
            </button>
            <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 font-sans">
              {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className={cn("flex items-center gap-1 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 disabled:opacity-50 transition-all text-zinc-600 dark:text-zinc-300 hover:text-[#265D85] hover:border-[#265D85]", language === "bn" ? "font-bangla" : "font-sans")}
            >
              {language === 'en' ? "Next" : "পরবর্তী"} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
