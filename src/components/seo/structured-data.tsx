import React from "react";

const getSiteUrl = () => {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null) ||
    "https://bismillahpakhiandaquarium.vercel.app"
  ).replace(/\/+$/, "");
};

// ── 1. Global PetStore & LocalBusiness + WebSite Schema ───────────────────────
export function PetStoreAndWebSiteJsonLd({ storeSettings }: { storeSettings?: any }) {
  const siteUrl = getSiteUrl();

  const facebookUrl =
    storeSettings?.contact?.storeFacebookPageUrl ||
    "https://www.facebook.com/bismillahpakhiandaquarium";
  const mapsUrl =
    storeSettings?.location?.googleMapsLink ||
    "https://maps.app.goo.gl/Y9rK8eZmYSSLE7Gc6";
  const phone = storeSettings?.contact?.phoneNumber || "+880 1947-315330";
  const email = storeSettings?.contact?.emailAddress || "info@bismillahpakhi.com";
  const address =
    storeSettings?.location?.address ||
    "সাত ভাই পুকুর পাড়, আব্দুল্লাহ সিটির পিছনে, বড় বাজার, চুয়াডাঙ্গা";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["PetStore", "LocalBusiness"],
    "@id": `${siteUrl}/#petstore`,
    name: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম (Bismillah Pakhi & Aquarium)",
    alternateName: [
      "Bismillah Pakhi & Aquarium",
      "বিসমিল্লাহ পাখি ঘর",
      "Bismillah Aquarium Chuadanga",
      "Bismillah Pakhi Ghar",
      "বিসমিল্লাহ পাখি এন্ড একুরিয়াম",
    ],
    description:
      "চুয়াডাঙ্গার শীর্ষস্থানীয় বিশ্বস্ত দেশি-বিদেশি পাখি, অ্যাকোয়ারিয়াম মাছ, অ্যাকোয়াস্কেপিং ও পেট সামগ্রীর দোকান। Premium pet shop in Chuadanga offering exotic birds, aquarium fishes, bird food, planted aquarium supplies, and accessories across Khulna Division and Bangladesh.",
    url: siteUrl,
    logo: `${siteUrl}/images/logo_shop.webp`,
    image: [
      `${siteUrl}/images/og-image.png`,
      `${siteUrl}/images/logo_shop.webp`,
      `${siteUrl}/images/hero.webp`,
      `${siteUrl}/images/bento/birds.webp`,
      `${siteUrl}/images/bento/aquarium.webp`,
      `${siteUrl}/images/bento/food.webp`,
      `${siteUrl}/images/bento/accessories.webp`,
    ],
    telephone: phone,
    email: email,
    founder: {
      "@type": "Person",
      name: "Arfin (আরফিন)",
    },
    priceRange: "৳৳",
    currenciesAccepted: "BDT",
    paymentAccepted: "Cash, bKash, Nagad",
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Chuadanga",
      addressRegion: "Khulna Division",
      postalCode: "7200",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.6402,
      longitude: 88.8418,
    },
    areaServed: [
      "Chuadanga",
      "Darshana",
      "Meherpur",
      "Jhenaidah",
      "Kushtia",
      "Khulna",
      "Dhaka",
      "Bangladesh",
    ],
    hasMap: mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "23:00",
      },
    ],
    sameAs: [
      facebookUrl,
      mapsUrl,
    ],
    knowsAbout: [
      "Exotic Birds",
      "Budgerigar",
      "Cockatiel",
      "Lovebird",
      "Sun Conure",
      "Macaw",
      "Aquarium Fish",
      "Goldfish",
      "Betta Fighter Fish",
      "Guppy Fish",
      "Koi Carp",
      "Arowana",
      "Aquascaping",
      "Bird Seed Mix",
      "Aquarium Filters",
      "Pet Cages",
      "Pet Medicine",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Bismillah Pakhi & Aquarium",
    alternateName: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম",
    description:
      "Official online portal for Bismillah Pakhi & Aquarium in Chuadanga, Bangladesh.",
    publisher: {
      "@id": `${siteUrl}/#petstore`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/collection?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["bn-BD", "en-US"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

// Helper to parse Bengali (০-৯) and English digits into valid positive numeric price string
export function parseSchemaPrice(raw?: string | number | null): string {
  if (typeof raw === "number" && raw > 0) return String(raw);
  if (!raw || typeof raw !== "string") return "150";
  const ascii = raw.replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)));
  const match = ascii.replace(/,/g, "").match(/\d+(\.\d+)?/);
  const num = match ? parseFloat(match[0]) : 0;
  return num > 0 ? String(num) : "150";
}

// ── 2. Product Schema (for Animals & Products) ───────────────────────────────
export function ProductJsonLd({
  item,
  isAnimal = false,
}: {
  item: {
    id: string | number;
    name?: any;
    description?: any;
    image?: string;
    numericPrice?: number | string;
    price?: any;
    status?: string;
  };
  isAnimal?: boolean;
}) {
  const siteUrl = getSiteUrl();
  const routePrefix = isAnimal ? "animals" : "products";
  const canonicalUrl = `${siteUrl}/${routePrefix}/${item.id}`;

  const resolvedName =
    (typeof item.name === "object" ? (item.name?.bn || item.name?.en) : item.name) ||
    "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম";

  const resolvedDesc =
    (typeof item.description === "object" ? (item.description?.bn || item.description?.en) : item.description) ||
    "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম, চুয়াডাঙ্গা থেকে সুস্থ পাখি, মাছ ও পেট অ্যাক্সেসরিজ সংগ্রহ করুন।";

  // Resolve the image URL safely so it never points to a broken path
  let rawImage = item.image;
  if (!rawImage || rawImage.includes("item-1.jpg")) {
    rawImage = "/images/hero.webp";
  }
  const resolvedValidImageUrl = rawImage.startsWith("http")
    ? rawImage
    : `${siteUrl}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

  const isAvailable =
    item.status === "available" || item.status === "in_stock" || !item.status;

  const rawPrice =
    item.price?.bn || item.price?.en || item.price || item.numericPrice;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonicalUrl}#product`,
    name: resolvedName,
    description: resolvedDesc,
    image: [resolvedValidImageUrl],
    sku: `BPA-${isAnimal ? "ANM" : "PRD"}-${item.id}`,
    brand: {
      "@type": "Brand",
      name: "Bismillah Pakhi & Aquarium",
    },
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "BDT",
      price: parseSchemaPrice(rawPrice),
      availability: isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      priceValidUntil: "2027-12-31",
      seller: {
        "@type": "Organization",
        name: "Bismillah Pakhi & Aquarium",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
}

// ── 3. BlogPosting Schema ────────────────────────────────────────────────────
export function BlogPostingJsonLd({
  blog,
}: {
  blog: {
    id: string | number;
    title?: any;
    excerpt?: any;
    coverImage?: any;
    publishedAt?: string;
    updatedAt?: string;
  };
}) {
  const siteUrl = getSiteUrl();

  const title =
    typeof blog.title === "object"
      ? blog.title?.bn || blog.title?.en || "ব্লগ পোস্ট"
      : String(blog.title || "ব্লগ পোস্ট");

  const excerpt =
    typeof blog.excerpt === "object"
      ? blog.excerpt?.bn || blog.excerpt?.en || title
      : String(blog.excerpt || title);

  let imageUrl = `${siteUrl}/images/og-image.png`;
  if (blog.coverImage) {
    if (typeof blog.coverImage === "string") {
      imageUrl = blog.coverImage.startsWith("http")
        ? blog.coverImage
        : `${siteUrl}${blog.coverImage}`;
    } else if (typeof blog.coverImage === "object" && blog.coverImage?.url) {
      imageUrl = blog.coverImage.url.startsWith("http")
        ? blog.coverImage.url
        : `${siteUrl}${blog.coverImage.url}`;
    }
  }

  const datePublished = blog.publishedAt || new Date().toISOString();
  const dateModified = blog.updatedAt || datePublished;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteUrl}/blog/${blog.id}#article`,
    headline: title,
    description: excerpt,
    image: imageUrl,
    datePublished: datePublished,
    dateModified: dateModified,
    mainEntityOfPage: `${siteUrl}/blog/${blog.id}`,
    author: {
      "@type": "Person",
      name: "Arfin (আরফিন)",
    },
    publisher: {
      "@type": "Organization",
      name: "Bismillah Pakhi & Aquarium",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo_shop.webp`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
    />
  );
}

// ── 4. BreadcrumbList Schema ─────────────────────────────────────────────────
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const siteUrl = getSiteUrl();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const fullUrl = item.url.startsWith("http")
        ? item.url
        : `${siteUrl}${item.url.startsWith("/") ? "" : "/"}${item.url}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: fullUrl,
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

// ── 5. FAQPage Schema ────────────────────────────────────────────────────────
export function FAQJsonLd({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
