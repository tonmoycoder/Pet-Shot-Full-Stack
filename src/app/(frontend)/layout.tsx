import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CursorProvider } from "@/lib/cursor-context";
import { ShortlistProvider } from "@/lib/shortlist-context";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";

import { Header } from "@/components/layout/header";
import { LayoutOverlays } from "@/components/layout/layout-overlays";
import { Footer } from "@/components/layout/footer";
import { StoreSettingsProvider } from "@/lib/store-settings-context";
import { getSafeStoreSettings } from "@/lib/store-fallback";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap", // Prevent invisible text (FOIT) → reduces CLS
  preload: true,
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
  display: "swap", // Prevent invisible text (FOIT) → reduces CLS
  preload: true, // Primary font for Bengali content — must preload to prevent massive CLS
});

import { PetStoreAndWebSiteJsonLd } from "@/components/seo/structured-data";

const siteBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 
  process.env.NEXT_PUBLIC_SITE_URL || 
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null) || 
  "https://bismillahpakhiandaquarium.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম | Bismillah Pakhi & Aquarium - Chuadanga",
    template: "%s | Bismillah Pakhi & Aquarium",
  },
  description:
    "চুয়াডাঙ্গার শীর্ষস্থানীয় বিশ্বস্ত পেট শপ। সুস্থ ও সুন্দর দেশি-বিদেশি পাখি (বাজরিগার, ককাটেল, লাভবার্ড, সান কনুর), রঙিন অ্যাকোয়ারিয়াম মাছ (গোল্ডফিশ, ফাইটার, গাপ্পি, কই কার্প, অ্যারোওয়ানা), খাঁচা, অ্যাকোয়ারিয়াম ফিল্টার, ও পুষ্টিকর পাখির খাবার। Premium Pet Shop in Chuadanga offering exotic birds, aquarium fish, feeds, and supplies across Bangladesh.",
  keywords: [
    // Bengali high-intent search queries
    "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম",
    "বিসমিল্লাহ পাখি ঘর চুয়াডাঙ্গা",
    "পাখির দোকান চুয়াডাঙ্গা",
    "বাজরিগার পাখির দাম বাংলাদেশ",
    "ককাটেল পাখির দাম",
    "লাভবার্ড পাখি",
    "সান কনুর পাখি",
    "ম্যাকাও পাখি প্রি-বুকিং",
    "অ্যাকোয়ারিয়াম মাছের দাম",
    "গোল্ডফিশ",
    "ফাইটার মাছ",
    "গাপ্পি মাছ",
    "কই কার্প",
    "অ্যারোওয়ানা মাছ",
    "পাখির খাবার সিড মিক্স",
    "অ্যাকোয়ারিয়াম ফিল্টার ও অ্যাকুয়া সয়েল",
    "চুয়াডাঙ্গা পেট শপ",
    "দর্শনা পেট শপ",
    // English search queries
    "Bismillah Pakhi & Aquarium",
    "Best Pet Shop in Chuadanga",
    "Bird Shop Chuadanga Bangladesh",
    "Buy Exotic Birds BD",
    "Budgerigar Price in BD",
    "Cockatiel Price BD",
    "Sun Conure Bangladesh",
    "Aquarium Fish Shop BD",
    "Goldfish Betta Guppy Price BD",
    "Arowana Fish Bangladesh",
    "Planted Aquarium Supplies BD",
    "Chuadanga Pet Store",
    "Darshana Pet Store",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "bn-BD": "/",
      "en-US": "/",
    },
  },
  icons: {
    icon: [
      { url: "/images/favicon.webp", type: "image/webp" },
      { url: "/images/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম | Bismillah Pakhi & Aquarium",
    description:
      "চুয়াডাঙ্গার শীর্ষস্থানীয় বিশ্বস্ত দেশি-বিদেশি পাখি, অ্যাকোয়ারিয়াম মাছ, অ্যাকোয়াস্কেপিং ও পেট সামগ্রীর দোকান।",
    url: siteBaseUrl,
    siteName: "Bismillah Pakhi & Aquarium",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম - Chuadanga Pet Shop Storefront & Logo",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম | Bismillah Pakhi & Aquarium",
    description:
      "চুয়াডাঙ্গার শীর্ষস্থানীয় বিশ্বস্ত দেশি-বিদেশি পাখি, অ্যাকোয়ারিয়াম মাছ, অ্যাকোয়াস্কেপিং ও পেট সামগ্রীর দোকান।",
    images: ["/images/og-image.png"],
  },
};

async function fetchStoreSettings() {
  try {
    const { getPayload } = await import("payload");
    const configPromise = (await import("@payload-config")).default;
    const payload = await getPayload({ config: configPromise });
    const raw = await payload.findGlobal({ slug: "store-settings" });
    return getSafeStoreSettings(raw as any);
  } catch {
    return getSafeStoreSettings();
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeSettings = await fetchStoreSettings();

  return (
    <html lang="bn" suppressHydrationWarning data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${notoSerifBengali.variable}`}
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <StoreSettingsProvider value={storeSettings}>
            <PetStoreAndWebSiteJsonLd storeSettings={storeSettings} />
            <LanguageProvider>
            <CursorProvider>
              <ShortlistProvider>
                <Header />
                <main className="flex-1 pt-20 flex flex-col w-full max-w-full overflow-x-clip">
                  {children}
                </main>
                <Footer />
                <LayoutOverlays />
              </ShortlistProvider>
            </CursorProvider>
            </LanguageProvider>
          </StoreSettingsProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
