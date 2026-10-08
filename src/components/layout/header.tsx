"use client";

import * as React from "react";
import Link from "next/link";
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Search } from "lucide-react";
import { cn } from "cn";
import dynamic from "next/dynamic";

const MagneticButton = dynamic(() => import("@/components/ui/magnetic-button").then(m => ({ default: m.MagneticButton })), { ssr: false });
import { useLanguage } from "@/lib/language-context";
import { useShortlist } from "@/lib/shortlist-context";
const SearchModal = dynamic(() => import("@/components/search/search-modal").then(m => ({ default: m.SearchModal })), { ssr: false });
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navDict = {
  bn: {
    collection: "কালেকশন",
    birds: "পাখি",
    aquarium: "অ্যাকোয়ারিয়াম",
    food: "খাবার",
    accessories: "অ্যাক্সেসরিজ",
    medicine: "ওষুধ",
    others: "অন্যান্য",
    contact: "যোগাযোগ",
    contactMobile: "যোগাযোগ করুন",
    brandPrimary: "বিসমিল্লাহ",
    brandSecondary: "পাখি এন্ড অ্যাকোয়ারিয়াম",
    blogs: "ব্লগ",
  },
  en: {
    collection: "Collection",
    birds: "Birds",
    aquarium: "Aquarium",
    food: "Food",
    accessories: "Accessories",
    medicine: "Medicine",
    others: "Others",
    contact: "Contact",
    contactMobile: "Contact Us",
    brandPrimary: "Bismillah",
    brandSecondary: "Birds & Aquarium",
    blogs: "Blog",
  }
};

const navLinks: { key: string, href: string }[] = [
  { key: "collection", href: "/collection" },
  { key: "birds", href: "/categories/birds" },
  { key: "aquarium", href: "/categories/aquarium" },
  { key: "food", href: "/categories/food" },
  { key: "accessories", href: "/categories/accessories" },
  { key: "medicine", href: "/categories/medicine" },
  { key: "others", href: "/categories/others" },
  { key: "blogs", href: "/blog" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { items, setDrawerOpen, isHydrated } = useShortlist();
  const t = navDict[language];

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 h-20 bg-white/95 dark:bg-black/95 border-b border-white/20 dark:border-white/10 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-colors duration-500">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          
          {/* Logo Area */}
          <Link 
            href="/" 
            className="flex items-center gap-3 relative group focus:outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-ring z-50"
          >
            {/* Circular Professional Logo */}
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-border shadow-sm group-hover:scale-105 transition-transform duration-300">
              <Image 
                src="/images/logo.webp" 
                alt="Bismillah Pakhi & Aquarium Logo" 
                fill 
                className="object-cover"
                sizes="48px"
                priority
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <span className={cn(
                "text-xl md:text-2xl font-bold text-foreground tracking-tight transition-colors group-hover:text-primary leading-none",
                language === "bn" ? "font-bangla" : "font-sans"
              )}>
                {t.brandPrimary}
              </span>
              <span className={cn(
                "block text-[10px] md:text-xs text-muted-foreground mt-0.5 tracking-wide font-medium",
                language === "bn" ? "font-bangla" : "font-sans"
              )}>
                {t.brandSecondary}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    language === "bn" ? "font-bangla" : "font-sans",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <div
                      className="absolute inset-0 bg-primary/10 rounded-full z-0 transition-all duration-300"
                    />
                  )}
                  <span className="relative z-10">{t[link.key as keyof typeof t]}</span>
                </Link>
              );
            })}
          </nav>

          {/* Call to Action & Language Toggle (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setDrawerOpen(true)}
              className="animate-rose-pulse relative flex items-center justify-center p-2 rounded-full text-zinc-500 hover:text-rose-500 hover:bg-rose-50 dark:text-zinc-400 dark:hover:bg-rose-950/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="View shortlist"
            >
              <Heart className="relative z-10 w-5 h-5" />
              {isHydrated && items.length > 0 && (
                <span className="absolute z-10 top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-zinc-950" />
              )}
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="relative flex items-center justify-center p-2 rounded-full text-zinc-500 hover:text-emerald-500 hover:bg-emerald-50 dark:text-zinc-400 dark:hover:bg-emerald-950/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleLanguage}
              className="flex items-center justify-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-border rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Switch to ${language === 'bn' ? 'English' : 'Bangla'}`}
            >
              {language === "bn" ? "EN" : "BN"}
            </button>
            <ThemeToggle />
            
            <MagneticButton 
              href="/contact"
              variant="default" 
              size="sm" 
              className={cn("rounded-full shadow-lg", language === "bn" ? "font-bangla" : "font-sans")}
              magneticStrength={15}
            >
              {t.contact}
            </MagneticButton>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2 relative z-50">
            <button 
              onClick={() => setDrawerOpen(true)}
              className="animate-rose-pulse relative p-2 rounded-full text-zinc-500 hover:text-rose-500 hover:bg-rose-50 dark:text-zinc-400 transition-colors focus:outline-none"
              aria-label="View shortlist"
            >
              <Heart className="relative z-10 w-6 h-6" />
              {isHydrated && items.length > 0 && (
                <span className="absolute z-10 top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-black" />
              )}
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="relative p-2 rounded-full text-zinc-500 hover:text-emerald-500 hover:bg-emerald-50 dark:text-zinc-400 transition-colors focus:outline-none"
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <Menu className={cn("absolute w-6 h-6 transition-all duration-300", isOpen ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0")} />
              <X className={cn("absolute w-6 h-6 transition-all duration-300", isOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90")} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 bg-background pt-24 px-4 pb-8 flex flex-col md:hidden overflow-y-auto transition-all duration-500 ease-in-out",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-4 mt-8">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <div
                key={link.href}
                className={cn(
                  "transition-all duration-300",
                  isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                )}
                style={{ transitionDelay: isOpen ? `${i * 50}ms` : '0ms' }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 text-2xl font-bold rounded-2xl transition-colors active:scale-95",
                    language === "bn" ? "font-bangla" : "font-sans",
                    isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  {t[link.key as keyof typeof t]}
                </Link>
              </div>
            );
          })}
        </nav>

        <div 
          className={cn(
            "mt-auto pt-8 flex flex-col gap-6 transition-all duration-500",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: isOpen ? '300ms' : '0ms' }}
        >
          <div className="flex items-center justify-between px-4">
            <span className={cn("text-lg font-medium", language === "bn" ? "font-bangla" : "font-sans")}>
              {language === "bn" ? "থিম পরিবর্তন" : "Change Theme"}
            </span>
            <ThemeToggle />
          </div>
          
          <button 
            onClick={() => {
              toggleLanguage();
              setIsOpen(false);
            }}
            className="w-full text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground py-4 border-t border-border focus:outline-none transition-colors hover:text-foreground"
          >
            {language === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
          </button>
          
          <div>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center justify-center w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-primary/20 active:scale-95 transition-transform",
                language === "bn" ? "font-bangla" : "font-sans"
              )}
            >
              {t.contactMobile}
            </Link>
          </div>
        </div>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
