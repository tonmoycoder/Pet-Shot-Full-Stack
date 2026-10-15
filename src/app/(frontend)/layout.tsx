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
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap", // Prevent invisible text (FOIT) → reduces CLS
  preload: true,
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-bangla",
  subsets: ["bengali"],
  display: "swap", // Prevent invisible text (FOIT) → reduces CLS
  preload: true, // Primary font for Bengali content — must preload to prevent massive CLS
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bismillahpakhi.com"), // Use the correct domain here
  title: {
    default: "Bismillah Pakhi & Aquarium | Premium Pet Shop in Chuadanga",
    template: "%s | Bismillah Pakhi & Aquarium",
  },
  description: "Your trusted destination for premium birds, aquariums, and pet accessories in Chuadanga. Quality pets, expert advice.",
  keywords: ["pet shop", "chuadanga", "birds", "aquarium", "pet accessories", "dog", "cat", "fish"],
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
    title: "Bismillah Pakhi & Aquarium",
    description: "Premium birds, aquariums, and pet accessories in Chuadanga.",
    url: "https://bismillahpakhi.com",
    siteName: "Bismillah Pakhi & Aquarium",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bismillah Pakhi & Aquarium Logo & Storefront",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bismillah Pakhi & Aquarium",
    description: "Premium birds, aquariums, and pet accessories in Chuadanga.",
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
            <LanguageProvider>
            <CursorProvider>
              <ShortlistProvider>
                <Header />
                <main className="flex-1 pt-20 flex flex-col">
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
