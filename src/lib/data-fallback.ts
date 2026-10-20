/**
 * Master Local Fallback Data Source
 * Bismillah Pakhi & Aquarium (বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম)
 * 
 * Provides 100% offline/DB-timeout resilience for all frontend routes:
 * - Categories Hub (/categories/[slug])
 * - Collection Grid (/collection)
 * - Animal Details (/animals/[id])
 * - Product Details (/products/[id])
 * - Blog Posts & Journal (/blog, /blog/[id])
 */

export interface FallbackItem {
  id: string | number;
  internalName: string;
  isAnimal: boolean;
  name: { en: string; bn: string };
  tag?: { en: string; bn: string };
  price: { en: string; bn: string };
  image: string;
  objectPosition?: string;
  category: 'bird' | 'fish' | 'food' | 'accessories' | 'medicine' | 'other' | 'exotic';
  status: 'available' | 'in_stock' | 'out_of_stock';
  description: { en: string; bn: string };
  gallery?: { url: string }[];
  isFeatured?: boolean;
  isRareExotic?: boolean;
}

export interface FallbackBlog {
  id: string | number;
  title: { en: string; bn: string };
  excerpt: { en: string; bn: string };
  content: { en: string | any; bn: string | any };
  coverImage?: {
    url?: string;
    sourceUrl?: string;
    alt?: string;
  } | string;
  publishedAt: string;
  authorName?: string;
}

export const FALLBACK_CATEGORIES = [
  { slug: "birds", title: "Birds", titleBn: "পাখি", icon: "🦜", count: 7 },
  { slug: "aquarium", title: "Aquarium & Fish", titleBn: "অ্যাকোয়ারিয়াম ও মাছ", icon: "🐟", count: 6 },
  { slug: "fish", title: "Fish", titleBn: "মাছ", icon: "🐠", count: 6 },
  { slug: "food", title: "Pet Food", titleBn: "খাবার", icon: "🌿", count: 5 },
  { slug: "accessories", title: "Accessories", titleBn: "এক্সেসরিজ", icon: "🛒", count: 5 },
  { slug: "medicine", title: "Medicine", titleBn: "ওষুধ", icon: "💊", count: 3 },
  { slug: "others", title: "Others", titleBn: "অন্যান্য", icon: "📦", count: 4 },
];

export const FALLBACK_ANIMALS: FallbackItem[] = [
  {
    id: "1",
    internalName: "DEMO-MACAW",
    isAnimal: true,
    name: { en: "Blue and Gold Macaw", bn: "ব্লু অ্যান্ড গোল্ড ম্যাকাও পাখি" },
    tag: { en: "Exotic Bird", bn: "বিদেশী পাখি" },
    price: { en: "Contact for price", bn: "দামের জন্য যোগাযোগ করুন" },
    image: "/images/bento/birds.webp",
    objectPosition: "center 20%",
    category: "bird",
    status: "available",
    description: {
      en: "The Blue and Gold Macaw is highly intelligent, majestic, and social. Known for vibrant plumage and speech imitation. Health verified and captive-bred.",
      bn: "ব্লু অ্যান্ড গোল্ড ম্যাকাও অত্যন্ত বুদ্ধিমান ও আকর্ষণীয় পাখি। এদের উজ্জ্বল নীল-হলুদ পালক এবং কথা বলার দক্ষতা বিশ্বখ্যাত। সম্পূর্ণ সুস্থ ও অ্যাক্লিমেটাইজড।"
    },
    gallery: [{ url: "/images/bento/birds.webp" }, { url: "/images/hero.webp" }],
    isFeatured: true,
    isRareExotic: true,
  },
  {
    id: "2",
    internalName: "DEMO-COCKATIEL",
    isAnimal: true,
    name: { en: "Cockatiel (Lutino / Grey)", bn: "ককাটেল পাখি (লুটিনো ও গ্রে)" },
    tag: { en: "Friendly Companion", bn: "বন্ধুত্বপূর্ণ পাখি" },
    price: { en: "৳ 2,500 - ৳ 4,500", bn: "২৫০০ - ৪৫০০ টাকা" },
    image: "/images/bento/birds.webp",
    objectPosition: "center center",
    category: "bird",
    status: "available",
    description: {
      en: "Cockatiels are gentle, whistling parrots with iconic crests. Ideal for family homes, whistle tunes easily, and love human affection.",
      bn: "ককাটেল শান্ত স্বভাবের জনপ্রিয় তোতাপাখি। এদের মাথায় সুন্দর ঝুঁটি থাকে, সহজেই শিষ বাজানো শেখে এবং মানুষের সাথে খুব দ্রুত বন্ধুত্ব গড়ে তোলে।"
    },
    gallery: [{ url: "/images/bento/birds.webp" }],
    isFeatured: true,
    isRareExotic: false,
  },
  {
    id: "3",
    internalName: "DEMO-BUDGERIGAR",
    isAnimal: true,
    name: { en: "Budgerigar (Bajrigar Pair)", bn: "বাজরিগার পাখি (এক জোড়া)" },
    tag: { en: "Beginner Friendly", bn: "সহজ পালনযোগ্য" },
    price: { en: "৳ 700 - ৳ 1,200", bn: "৭০০ - ১২০০ টাকা" },
    image: "/images/bento/birds.webp",
    objectPosition: "center center",
    category: "bird",
    status: "available",
    description: {
      en: "Active, colorful budgerigar pairs. Excellent for new bird keepers, fast breeders, and very hardy.",
      bn: "চঞ্চল ও রঙিন বাজরিগার পাখির জোড়া। নতুনদের জন্য সেরা, খাঁচায় সহজে ডিম-বাচ্চা করে এবং এদের রোগবালাই কম হয়।"
    },
    gallery: [{ url: "/images/bento/birds.webp" }],
    isFeatured: true,
    isRareExotic: false,
  },
  {
    id: "4",
    internalName: "DEMO-LOVEBIRD",
    isAnimal: true,
    name: { en: "Lovebird (Fischer / Peach-faced)", bn: "লাভবার্ড পাখি" },
    tag: { en: "Vibrant Color", bn: "রঙিন জুটি" },
    price: { en: "৳ 2,800 - ৳ 4,000", bn: "২৮০০ - ৪০০০ টাকা" },
    image: "/images/bento/birds.webp",
    objectPosition: "center center",
    category: "bird",
    status: "available",
    description: {
      en: "Playful African lovebirds known for strong pair bonding and striking color variations.",
      bn: "ভালোবাসার প্রতীক লাভবার্ড। এদের প্রাণবন্ত ডাকাডাকি ও সুন্দর রঙের বৈচিত্র্য যে কোনো পাখির প্রেমিককে মুগ্ধ করে।"
    },
    gallery: [{ url: "/images/bento/birds.webp" }],
    isFeatured: false,
    isRareExotic: false,
  },
  {
    id: "5",
    internalName: "DEMO-SUN-CONURE",
    isAnimal: true,
    name: { en: "Sun Conure", bn: "সান কনুর পাখি" },
    tag: { en: "Exotic Feather", bn: "বিদেশী প্রজাতি" },
    price: { en: "৳ 18,000 - ৳ 25,000", bn: "১৮০০০ - ২৫০০০ টাকা" },
    image: "/images/bento/birds.webp",
    objectPosition: "center center",
    category: "bird",
    status: "available",
    description: {
      en: "Sun Conures possess fiery golden-orange plumage and playful personalities. Excellent hand-tamed companions.",
      bn: "সান কনুরের মনকাড়া সোনালী-কমলা পালক ও খেলাধুলার স্বভাব অনন্য। হ্যান্ড টেম ও পোষ মানানোর জন্য চমৎকার পাখি।"
    },
    gallery: [{ url: "/images/bento/birds.webp" }],
    isFeatured: true,
    isRareExotic: true,
  },
  {
    id: "6",
    internalName: "DEMO-AROWANA",
    isAnimal: true,
    name: { en: "Silver Arowana Fish", bn: "সিলভার অ্যারোওয়ানা মাছ" },
    tag: { en: "Monster Fish", bn: "লাক ও সমৃদ্ধির মাছ" },
    price: { en: "৳ 3,500 - ৳ 7,500", bn: "৩৫০০ - ৭৫০০ টাকা" },
    image: "/images/bento/aquarium.webp",
    objectPosition: "center center",
    category: "fish",
    status: "available",
    description: {
      en: "The ancient dragon fish of aquariums. Graceful swimmer requiring spacious aquariums and protein-rich nutrition.",
      bn: "অ্যাকোয়ারিয়ামের ড্রাগন ফিশ। এদের সাঁতারের রাজকীয় ভঙ্গি ও চকচকে রুপালি আঁশ শুভ ভাগ্যের প্রতীক মনে করা হয়।"
    },
    gallery: [{ url: "/images/bento/aquarium.webp" }],
    isFeatured: true,
    isRareExotic: true,
  },
  {
    id: "7",
    internalName: "DEMO-FLOWERHORN",
    isAnimal: true,
    name: { en: "Kamfa Flowerhorn Cichlid", bn: "কামফা ফ্লাওয়ারহর্ন মাছ" },
    tag: { en: "Interactive Pet", bn: "ইন্টারেক্টিভ মাছ" },
    price: { en: "৳ 2,000 - ৳ 5,500", bn: "২০০০ - ৫৫০০ টাকা" },
    image: "/images/bento/aquarium.webp",
    objectPosition: "center center",
    category: "fish",
    status: "available",
    description: {
      en: "High-grade Flowerhorn with large head kok, intense pearl patterns, and lively human interaction.",
      bn: "বড় হেডের আকর্ষণীয় কামফা ফ্লাওয়ারহর্ন। হাতের ইশারায় সাড়া দেয় এবং একাকী ট্যাঙ্কে রাজত্ব করে।"
    },
    gallery: [{ url: "/images/bento/aquarium.webp" }],
    isFeatured: true,
    isRareExotic: false,
  },
  {
    id: "8",
    internalName: "DEMO-GOLDFISH",
    isAnimal: true,
    name: { en: "Oranda & Black Moor Goldfish", bn: "ওরান্ডা ও ব্ল্যাক মুর গোল্ডফিশ" },
    tag: { en: "Classic Aquarium", bn: "জনপ্রিয় মাছ" },
    price: { en: "৳ 150 - ৳ 450", bn: "১৫০ - ৪৫০ টাকা" },
    image: "/images/bento/aquarium.webp",
    objectPosition: "center center",
    category: "fish",
    status: "available",
    description: {
      en: "Hardy, rounded fancy goldfish with cap heads and flowing fins. Perfect for tranquil community tanks.",
      bn: "মাথার আকর্ষণীয় টুপি ও মখমলের মতো রঙের গোল্ডফিশ। শান্ত পানির ট্যাঙ্কে নতুনদের জন্য অত্যন্ত উপযোগী।"
    },
    gallery: [{ url: "/images/bento/aquarium.webp" }],
    isFeatured: false,
    isRareExotic: false,
  },
  {
    id: "9",
    internalName: "DEMO-BETTA",
    isAnimal: true,
    name: { en: "Halfmoon Betta Fighter", bn: "হাফমুন বেট্টা ফাইটার মাছ" },
    tag: { en: "Solo Tank Beauty", bn: "ফাইটার মাছ" },
    price: { en: "৳ 250 - ৳ 650", bn: "২৫০ - ৬৫০ টাকা" },
    image: "/images/bento/aquarium.webp",
    objectPosition: "center center",
    category: "fish",
    status: "available",
    description: {
      en: "Splendid Halfmoon Betta with 180-degree spread fins. Thrives in desktop nano planted tanks.",
      bn: "১৮০ ডিগ্রি ছড়ানো রাজকীয় লেজযুক্ত হাফমুন বেট্টা। ছোট ডেসকটপ ট্যাঙ্ক বা অ্যাকোয়ারিয়ামের অপূর্ব শোভা।"
    },
    gallery: [{ url: "/images/bento/aquarium.webp" }],
    isFeatured: true,
    isRareExotic: false,
  },
];

export const FALLBACK_PRODUCTS: FallbackItem[] = [
  {
    id: "101",
    internalName: "DEMO-PROD-BIRDFOOD",
    isAnimal: false,
    name: { en: "Premium Bird Seed Mix (1kg)", bn: "প্রিমিয়াম বার্ড সিড মিক্স (১ কেজি)" },
    tag: { en: "Nutrition Feed", bn: "পুষ্টিকর খাবার" },
    price: { en: "৳ 220", bn: "২২০ টাকা" },
    image: "/images/bento/food.webp",
    objectPosition: "center center",
    category: "food",
    status: "in_stock",
    description: {
      en: "Balanced seed blend of millets, canary seeds, sunflower, and safflower enriched with essential vitamins.",
      bn: "কাউন, চিনা, সূর্যমুখীর বীজ, গুজি তিল ও প্রয়োজনীয় ভিটামিনের সঠিক সংমিশ্রণ। বাজরিগার ও তোতাপাখির সেরা পুষ্টি।"
    },
    gallery: [{ url: "/images/bento/food.webp" }],
    isFeatured: true,
    isRareExotic: false,
  },
  {
    id: "102",
    internalName: "DEMO-PROD-FISHFOOD",
    isAnimal: false,
    name: { en: "Optimum Fish Food Pellets (500g)", bn: "অপটিমাম ফিশ ফুড পেলেটস (৫০০ গ্রাম)" },
    tag: { en: "Color Enhancing", bn: "রঙ বৃদ্ধিকারী খাবার" },
    price: { en: "৳ 280", bn: "২৮০ টাকা" },
    image: "/images/bento/food.webp",
    objectPosition: "center center",
    category: "food",
    status: "in_stock",
    description: {
      en: "Rich in spirulina and astaxanthin to enhance natural colors in goldfish, koi, and community fishes without clouding water.",
      bn: "স্পিরুলিনা ও ক্যারোটিন সমৃদ্ধ ভাসমান মাছের খাবার। পানি ঘোলা করে না এবং মাছের উজ্জ্বল প্রাকৃতিক রঙ বাড়ায়।"
    },
    gallery: [{ url: "/images/bento/food.webp" }],
    isFeatured: false,
    isRareExotic: false,
  },
  {
    id: "103",
    internalName: "DEMO-PROD-AQUARIUM",
    isAnimal: false,
    name: { en: "Ultra-Clear Rimless Glass Tank (18x12x12)", bn: "রিমলেস আল্ট্রা-ক্লিয়ার গ্লাস অ্যাকোয়ারিয়াম" },
    tag: { en: "Aquascaping Tank", bn: "প্রিমিয়াম গ্লাস" },
    price: { en: "৳ 1,800", bn: "১৮০০ টাকা" },
    image: "/images/bento/accessories.webp",
    objectPosition: "center center",
    category: "accessories",
    status: "in_stock",
    description: {
      en: "High-transparency 5mm float glass with German silicone seams. Crystal-clear view for planted tanks and shrimp setups.",
      bn: "উচ্চ স্বচ্ছতার ৫মিমি ফ্লোট গ্লাস এবং টেকসই জার্মান সিলিকনে তৈরি রিমলেস ট্যাঙ্ক। প্লান্টেড সেটআপের জন্য সেরা।"
    },
    gallery: [{ url: "/images/bento/accessories.webp" }],
    isFeatured: true,
    isRareExotic: true,
  },
  {
    id: "104",
    internalName: "DEMO-PROD-FILTER",
    isAnimal: false,
    name: { en: "Submersible Power Filter & Aerator (15W)", bn: "সাবমারসিবল পাওয়ার ফিল্টার ও অক্সিজেন পাম্প" },
    tag: { en: "Water Care", bn: "পানি পরিষ্কারক" },
    price: { en: "৳ 450", bn: "৪৫০ টাকা" },
    image: "/images/bento/accessories.webp",
    objectPosition: "center center",
    category: "accessories",
    status: "in_stock",
    description: {
      en: "Quiet, energy-efficient internal mechanical and biological filter with oxygen venturi tube for clean water.",
      bn: "শব্দহীন ও বিদ্যুৎ সাশ্রয়ী ফিল্টার যা একাধারে ময়লা টানে এবং পানিতে প্রচুর অক্সিজেন সরবরাহ করে।"
    },
    gallery: [{ url: "/images/bento/accessories.webp" }],
    isFeatured: true,
    isRareExotic: false,
  },
  {
    id: "105",
    internalName: "DEMO-PROD-CAGE",
    isAnimal: false,
    name: { en: "Spacious Galvanized Bird Breeding Cage (18x14x14)", bn: "গ্যালভানাইজড পাখি ব্রিডিং খাঁচা" },
    tag: { en: "Heavy Duty", bn: "মরিচারোধী খাঁচা" },
    price: { en: "৳ 650", bn: "৬৫০ টাকা" },
    image: "/images/bento/accessories.webp",
    objectPosition: "center center",
    category: "accessories",
    status: "in_stock",
    description: {
      en: "Rust-resistant wire cage with breeding box door, pull-out plastic tray, perches, and dual feeding cups.",
      bn: "টেকসই খাঁচা যাতে সহজে ব্রিডিং বক্স ঝুলানো যায়। নিচের ট্রে টেনে পরিষ্কার করা যায়, সাথে খাবার ও পানির পাত্র রয়েছে।"
    },
    gallery: [{ url: "/images/bento/accessories.webp" }],
    isFeatured: false,
    isRareExotic: false,
  },
  {
    id: "106",
    internalName: "DEMO-PROD-MED-VITAMIN",
    isAnimal: false,
    name: { en: "Bird Multi-Vitamin & Calcium Drops (100ml)", bn: "পাখির মাল্টি-ভিটামিন ও ক্যালসিয়াম ড্রপ" },
    tag: { en: "Health & Vitality", bn: "স্বাস্থ্য সুরক্ষা" },
    price: { en: "৳ 180", bn: "১৮০ টাকা" },
    image: "/images/bento/food.webp",
    objectPosition: "center center",
    category: "medicine",
    status: "in_stock",
    description: {
      en: "Supports egg shell thickness, plumage luster, and boosts immune system during seasonal molting.",
      bn: "পাখির ডিমের খোসা মজবুত করতে, পালক পড়া রোধ করতে এবং রোগ প্রতিরোধ ক্ষমতা বাড়াতে নিয়মিত ব্যবহার্য ভিটামিন।"
    },
    gallery: [{ url: "/images/bento/food.webp" }],
    isFeatured: false,
    isRareExotic: false,
  },
  {
    id: "107",
    internalName: "DEMO-PROD-MED-AQUARIUM",
    isAnimal: false,
    name: { en: "Aquarium Anti-Ich & General Tonic (120ml)", bn: "মাছের সাদা দাগ ও ফাঙ্গাস নিরাময় টনিক" },
    tag: { en: "Disease Care", bn: "রোগ নিরাময়" },
    price: { en: "৳ 140", bn: "১৪০ টাকা" },
    image: "/images/bento/accessories.webp",
    objectPosition: "center center",
    category: "medicine",
    status: "in_stock",
    description: {
      en: "Effective against white spot (Ich), fin rot, velvet, and fungal infections in freshwater tropical fishes.",
      bn: "অ্যাকোয়ারিয়ামের মাছের হোয়াইট স্পট, লেজ পচা ও ফাঙ্গাসজনিত রোগ নিরাময়ে দ্রুত কাজ করে।"
    },
    gallery: [{ url: "/images/bento/accessories.webp" }],
    isFeatured: false,
    isRareExotic: false,
  },
  {
    id: "108",
    internalName: "DEMO-PROD-PLANTS",
    isAnimal: false,
    name: { en: "Natural Aquarium Driftwood & Live Java Moss", bn: "প্রাকৃতিক ড্রিফটউড ও লাইভ জাভা মস" },
    tag: { en: "Aquascape", bn: "অ্যাকোয়াস্কেপ সামগ্রী" },
    price: { en: "৳ 350", bn: "৩৫০ টাকা" },
    image: "/images/bento/aquarium.webp",
    objectPosition: "center center",
    category: "other",
    status: "in_stock",
    description: {
      en: "Cured natural driftwood with healthy aquatic moss. Provides shelter for baby fish and shrimp.",
      bn: "প্লান্টেড অ্যাকোয়ারিয়ামের জন্য প্রস্তুতকৃত ড্রিফটউড ও জীবন্ত গাছ। ছোট মাছ ও শ্রিম্পের জন্য নিরাপদ আশ্রয়স্থল।"
    },
    gallery: [{ url: "/images/bento/aquarium.webp" }],
    isFeatured: false,
    isRareExotic: false,
  },
];

export const FALLBACK_BLOGS: FallbackBlog[] = [
  {
    id: "14",
    title: {
      en: "Betta Fighter Fish Setup: Minimum Tank Size and Filter Tips",
      bn: "ফাইটার (Betta) মাছের অ্যাকুরিয়াম সেটআপ: সঠিক সাইজ এবং ফিল্টার"
    },
    excerpt: {
      en: "Learn how to house Betta fish humanely with proper filtration, gentle flow, and water parameters in Bangladesh.",
      bn: "ফাইটার মাছের দীর্ঘ ও সুস্থ জীবনের জন্য সঠিক ট্যাঙ্কের মাপ, ফিল্টার সিলেকশন এবং পানির যত্ন নিয়ে পূর্ণাঙ্গ গাইড।"
    },
    content: {
      en: "Betta splendens need at least a 3-5 gallon tank with a gentle filter and heated water around 26-28°C. Avoid keeping them in tiny un-filtered bowls.",
      bn: "ফাইটার মাছকে কখনোই ছোট কাচের বয়ামে আটকে রাখবেন না। অন্তত ১০-১৫ লিটার পানি, স্পঞ্জ ফিল্টার এবং স্বাভাবিক তাপমাত্রায় এরা সবচেয়ে বেশি অ্যাক্টিভ থাকে।"
    },
    coverImage: { url: "/images/bento/aquarium.webp", alt: "Betta Fighter Fish Tank Setup" },
    publishedAt: "2026-09-30T22:45:37.825Z",
    authorName: "Arfin (আরফিন)",
  },
  {
    id: "13",
    title: {
      en: "Budgerigar Breeding Secrets: Cage Size, Diet & Hatching Guide",
      bn: "বাজরিগার পাখির প্রজনন রহস্য: খাঁচার মাপ, খাবার এবং ডিম ফুটানোর গাইড"
    },
    excerpt: {
      en: "Comprehensive guide to breeding budgies successfully: selecting healthy pairs, egg food, and nesting box placement.",
      bn: "বাজরিগার পাখির সফল ব্রিডিংয়ের জন্য খাঁচার সঠিক সাইজ, ব্রিডিং বক্স সেটআপ এবং ভিটামিন খাবারের পূর্ণ বিবরণ।"
    },
    content: {
      en: "Ensure birds are at least 8-10 months old before breeding. Provide a wooden breeding box and egg food rich in calcium.",
      bn: "বাজরিগারের বয়স অন্তত ৮-১০ মাস না হলে ব্রিডিং বক্সে দেবেন না। পর্যাপ্ত সিড মিক্স, ক্যালসিয়াম ব্লক এবং সিদ্ধ ডিমের কুসুম প্রদান করুন।"
    },
    coverImage: { url: "/images/bento/birds.webp", alt: "Budgerigar Breeding Guide" },
    publishedAt: "2026-09-30T22:41:42.623Z",
    authorName: "Arfin (আরফিন)",
  },
  {
    id: "12",
    title: {
      en: "Best Aquarium Fish for Beginners in BD: Goldfish, Betta & Koi",
      bn: "নতুনদের জন্য সেরা অ্যাকুরিয়াম ফিশ: গোল্ডফিশ, বেট্টা এবং কই কার্প"
    },
    excerpt: {
      en: "Discover easy-to-care freshwater aquarium fish species that thrive in Bangladesh water temperatures.",
      bn: "অ্যাকোয়ারিয়াম শখের শুরুতে সহজে বেঁচে থাকে এবং রোগবালাই কম হয় এমন জনপ্রিয় মাছের তালিকা।"
    },
    content: {
      en: "Goldfish, Zebra Danios, Guppies, and Bettas are resilient choices for new aquarium owners.",
      bn: "গোল্ডফিশ, গাপ্পি, টেট্রা এবং বেট্টা মাছ নতুনদের জন্য সবচেয়ে সহনশীল। সঠিক সাইক্লিং সম্পন্ন ট্যাঙ্কে এদের বাঁচানো সহজ।"
    },
    coverImage: { url: "/images/bento/aquarium.webp", alt: "Best Beginner Aquarium Fish" },
    publishedAt: "2026-09-30T22:51:02.160Z",
    authorName: "Arfin (আরফিন)",
  },
  {
    id: "11",
    title: {
      en: "Top 5 Most Popular Pet Birds in Bangladesh",
      bn: "বাংলাদেশে সবচেয়ে বেশি বিক্রি হওয়া ৫টি পোষা পাখি"
    },
    excerpt: {
      en: "Explore the most loved cage birds in Bangladesh including Budgerigar, Cockatiel, Lovebird, Finch and Conure.",
      bn: "বাংলাদেশে গৃহপালিত পাখির মধ্যে সবচেয়ে চাহিদাসম্পন্ন ৫টি পাখির দাম, যত্ন ও পরিচর্যার তুলনা।"
    },
    content: {
      en: "From the affordable budgie to affectionate cockatiels and playful conures, discover why these 5 birds lead the pet market.",
      bn: "কম খরচে বাজরিগার থেকে শুরু করে ককাটেল, লাভবার্ড, ফিঞ্চ ও সান কনুর — জানুন এদের বৈশিষ্ট্য ও কোনটা আপনার জন্য সেরা।"
    },
    coverImage: { url: "/images/bento/birds.webp", alt: "Top Popular Pet Birds in Bangladesh" },
    publishedAt: "2026-09-29T18:03:25.000Z",
    authorName: "Arfin (আরফিন)",
  },
  {
    id: "10",
    title: {
      en: "Premium Exotic Birds in BD: Sun Conure, Macaw Care & Price",
      bn: "বাংলাদেশে সান কনুর ও ম্যাকাও: দাম, যত্ন এবং প্রি-বুকিং গাইড"
    },
    excerpt: {
      en: "Detailed insights into acquiring and caring for exotic large parrots legally and ethically in Chuadanga.",
      bn: "বিদেশী দামি পাখি যেমন সান কনুর ও ম্যাকাও কেনার সঠিক উপায়, খাঁচার মাপ এবং নিয়মিত স্বাস্থ্য পরিচর্যা।"
    },
    content: {
      en: "Large exotic parrots require lifetime commitment, high mental stimulation, and specialized fruit & pellet diets.",
      bn: "ম্যাকাও ও কনুর পাখির জন্য বড় জায়গা ও প্রচুর মনোযোগ দরকার। সঠিক খাদ্যাভ্যাস ও খাঁচার পরিবেশ এদের প্রাণবন্ত রাখে।"
    },
    coverImage: { url: "/images/hero.webp", alt: "Exotic Birds Care Guide" },
    publishedAt: "2026-09-28T14:20:00.000Z",
    authorName: "Arfin (আরফিন)",
  },
  {
    id: "9",
    title: {
      en: "Low-Cost Basic Aquarium Setup for Beginners in Bangladesh",
      bn: "অল্প খরচে নতুনদের জন্য বেসিক অ্যাকুরিয়াম সেটআপ করার নিয়ম"
    },
    excerpt: {
      en: "Step-by-step budget aquarium guide: glass tank, oxygen pump, gravel, and dechlorination under ৳1,500.",
      bn: "১৫০০ টাকার বাজেটে কীভাবে ঘরে সুন্দর একটি ফ্রেশওয়াটার অ্যাকোয়ারিয়াম চালু করবেন তার প্র্যাকটিক্যাল গাইড।"
    },
    content: {
      en: "Choose an 18-inch glass tank, basic air sponge filter, river gravel, and cycle the water for at least 3 days before adding fish.",
      bn: "দেড় ফুটের গ্লাস ট্যাঙ্ক, স্পঞ্জ ফিল্টার এবং অ্যাকোয়া সেফ দিয়ে পানি ক্লোরিনমুক্ত করে ৩ দিন ফিল্টার চালিয়ে তারপর মাছ ছাড়ুন।"
    },
    coverImage: { url: "/images/bento/aquarium.webp", alt: "Budget Aquarium Setup" },
    publishedAt: "2026-09-27T10:15:00.000Z",
    authorName: "Arfin (আরফিন)",
  },
  {
    id: "8",
    title: {
      en: "Koi Carp Care Guide: Pond Setup and Water Quality in BD",
      bn: "কই কার্প পালনের নিয়ম: অ্যাকুরিয়াম ও পুকুর সেটআপ এবং পানির মান"
    },
    excerpt: {
      en: "Maintain pristine water parameters, filtration, and winter diet for healthy, fast-growing Japanese Koi fish.",
      bn: "কই কার্পের রঙ উজ্জ্বল রাখতে এবং দ্রুত বৃদ্ধির জন্য সঠিক ওয়াটার ফিল্ট্রেশন ও খাদ্য ব্যবস্থাপনার নিয়ম।"
    },
    content: {
      en: "Koi need heavily oxygenated water and high-capacity biological filtration to process ammonia effectively.",
      bn: "কই কার্প প্রচুর খাবার খায় ও বর্জ্য তৈরি করে, তাই বড় ফিল্টার এবং সার্বক্ষণিক অক্সিজেন সরবরাহ জরুরি।"
    },
    coverImage: { url: "/images/bento/aquarium.webp", alt: "Koi Carp Fish Care" },
    publishedAt: "2026-09-26T09:30:00.000Z",
    authorName: "Arfin (আরফিন)",
  },
  {
    id: "7",
    title: {
      en: "Premium Imported Fish and Bird Food in BD: ZuPreem & Hikari",
      bn: "বিদেশি ও প্রিমিয়াম পাখির খাবার এবং ফিশ পেলেটস: বাংলাদেশে কোথায় পাবেন"
    },
    excerpt: {
      en: "Why imported pellets like ZuPreem and Hikari transform feather luster, bird immunity, and aquarium fish growth.",
      bn: "আমদানিকৃত প্রিমিয়াম প্যালেটস ও ভিটামিন সিড মিক্স কীভাবে আপনার পোষা প্রাণীর আয়ু ও উজ্জ্বলতা বৃদ্ধি করে।"
    },
    content: {
      en: "Pelleted diets ensure pets cannot selectively pick out fatty seeds, preventing obesity and nutrient deficiencies.",
      bn: "শুধুমাত্র সূর্যমুখী বা সাধারণ সিডের বদলে ব্যালান্সড প্যালেটস দিলে পাখি ভিটামিন এ ও ডি-এর ঘাটতিতে ভোগে না।"
    },
    coverImage: { url: "/images/bento/food.webp", alt: "Premium Pet Food ZuPreem Hikari" },
    publishedAt: "2026-09-25T16:45:00.000Z",
    authorName: "Arfin (আরফিন)",
  },
  {
    id: "6",
    title: {
      en: "Red Cherry Shrimp Care Guide for Planted Aquariums in BD",
      bn: "প্লান্টেড অ্যাকুরিয়ামের জন্য রেড চেরি শ্রিম্প পালনের গাইড ও দাম"
    },
    excerpt: {
      en: "Essential water chemistry, moss, and tank-mate recommendations for breeding Red Cherry Shrimps.",
      bn: "অ্যাকোয়ারিয়ামের শ্যাওলা পরিষ্কার এবং সুন্দর রঙের জন্য রেড চেরি শ্রিম্পের পরিচর্যা ও ব্রিডিং টিপস।"
    },
    content: {
      en: "Shrimps need stable pH (6.8-7.5), zero copper, and plenty of live plants like Java Moss to thrive.",
      bn: "শ্রিম্পের জন্য কপারযুক্ত ওষুধ সম্পূর্ণ ক্ষতিকর। ঘন গাছ ও জাভা মসে এরা নিরাপদে প্রজনন করে।"
    },
    coverImage: { url: "/images/bento/aquarium.webp", alt: "Red Cherry Shrimp Care" },
    publishedAt: "2026-09-24T12:00:00.000Z",
    authorName: "Arfin (আরফিন)",
  },
  {
    id: "5",
    title: {
      en: "Rare Cockatiel & Lovebird Mutations: Crimino & Violet Parblue",
      bn: "রেয়ার ককাটেল ও লাভবার্ড মিউটেশন: ক্রিমিনো ওপ্যালাইন ও ভায়োলেট পারব্লু"
    },
    excerpt: {
      en: "A collector's guide to identifying valuable color mutations in cockatiels and Fischer lovebirds.",
      bn: "দুর্লভ কালার মিউটেশন, যেমন ক্রিমিনো, অ্যালবিনো ও ভায়োলেট লাভবার্ড চেনার উপায় ও ব্রিডিং চার্ট।"
    },
    content: {
      en: "Genetics of rare mutations require careful pairing to avoid lethal gene combinations while preserving color depth.",
      bn: "রেয়ার মিউটেশনের পাখি প্রজননের ক্ষেত্রে জেনেটিক্স ও বংশ পরম্পরার সঠিক জ্ঞান রাখা অত্যন্ত প্রয়োজনীয়।"
    },
    coverImage: { url: "/images/bento/birds.webp", alt: "Rare Bird Mutations" },
    publishedAt: "2026-09-23T11:20:00.000Z",
    authorName: "Arfin (আরফিন)",
  },
];

// Helper functions for zero-breakage retrieval
export function getFallbackAnimals(): FallbackItem[] {
  return FALLBACK_ANIMALS;
}

export function getFallbackProducts(): FallbackItem[] {
  return FALLBACK_PRODUCTS;
}

export function getFallbackBlogs(): FallbackBlog[] {
  return FALLBACK_BLOGS;
}

export function getFallbackAnimalById(id: string | number): FallbackItem | undefined {
  const strId = String(id);
  const found = FALLBACK_ANIMALS.find(
    (a) => String(a.id) === strId || a.internalName.toLowerCase() === strId.toLowerCase()
  );
  if (found) return found;
  const num = parseInt(strId, 10);
  if (!isNaN(num) && num >= 1 && num <= FALLBACK_ANIMALS.length) {
    return FALLBACK_ANIMALS[num - 1];
  }
  return undefined;
}

export function getFallbackProductById(id: string | number): FallbackItem | undefined {
  const strId = String(id);
  const found = FALLBACK_PRODUCTS.find(
    (p) => String(p.id) === strId || p.internalName.toLowerCase() === strId.toLowerCase()
  );
  if (found) return found;
  const num = parseInt(strId, 10);
  if (!isNaN(num) && num >= 1 && num <= FALLBACK_PRODUCTS.length) {
    return FALLBACK_PRODUCTS[num - 1];
  }
  return undefined;
}

export function getFallbackBlogById(id: string | number): FallbackBlog | undefined {
  const strId = String(id);
  return FALLBACK_BLOGS.find((b) => String(b.id) === strId);
}
