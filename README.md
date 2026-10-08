# 🐾 Bismillah Pakhi & Aquarium - Full Stack E-commerce & CMS

A modern, high-performance, and visually stunning e-commerce and content management platform tailored for a premium pet shop. This application showcases rare & exotic pets, premium pet products, educational blogs, and interactive experiences for pet lovers.

## 🚀 Overview

This project is a complete full-stack web application built using the latest modern web technologies. It seamlessly integrates a robust frontend with a powerful Headless CMS, providing an exceptional user experience with rich animations, dark/light mode support, and interactive elements.

## 🛠️ Technologies Used

### Frontend
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/), Base UI, Lucide React (Icons)
- **Theming:** `next-themes` (Dark/Light mode support)

### Backend & CMS
- **CMS:** [Payload CMS v3](https://payloadcms.com/)
- **Database:** Supabase PostgreSQL (`@payloadcms/db-postgres`)
- **Rich Text:** Lexical Editor (`@payloadcms/richtext-lexical`)
- **Storage:** Vercel Blob Storage (`@payloadcms/storage-vercel-blob`)
- **API:** GraphQL & REST (via Payload), Next.js API Routes

### Tooling & Testing
- **E2E Testing:** [Playwright](https://playwright.dev/)
- **Image Optimization:** `sharp`
- **Linting & Formatting:** ESLint, Prettier

---

## 🏗️ Architecture

The project follows a scalable and modular architecture utilizing the Next.js App Router:

- **`src/app/(frontend)`**: Contains all the public-facing pages, UI layouts, and routing logic for the storefront.
- **`src/app/(payload)`**: The Payload CMS admin panel routing and configuration.
- **`src/app/api`**: Custom Next.js API routes (e.g., Search integrations, Vercel Blob integrations, Bulk Markdown to Lexical Uploads, Testing Endpoints).
- **`src/collections`**: Payload CMS database schemas defining `Animals`, `Products`, `Blogs`, `Media`, `Testimonials`, `Categories`, etc.
- **`src/components`**: Reusable React components organized by domains:
  - `home`: Landing page sections (Hero, Featured Pets, Rare Collection).
  - `layout`: Global elements (Header, Footer, Floating Contact, Shortlist Drawer).
  - `ui`: Base Shadcn/Custom components (Buttons, Modals, Custom Cursor, Skeleton Loaders).
  - `quiz`: Interactive components (e.g., Compatibility Quiz).

---

## 🗺️ Routes & Navigation

### Public Routes
- `/` - **Home Page**: Interactive landing page with hero animations and featured collections.
- `/animals/[id]` - **Animal Details**: In-depth profiles for pets with image galleries and care info.
- `/products/[id]` - **Product Details**: E-commerce view for pet supplies.
- `/blog` & `/blog/[id]` - **Blog**: Pet care guides and articles.
- `/categories/[slug]` - **Category View**: Filtered lists of animals/products by category.

### Admin Routes
- `/admin` - **Payload Dashboard**: Secure area for content managers to update stock, add pets, upload media to Vercel Blob, and write blogs.

---

## 💡 Features Implemented

1. **Seamless Full-Stack Integration:** Deep integration between Next.js and Payload CMS for dynamic, SSR/SSG rendering.
2. **Advanced UI/UX:**
   - Custom mouse cursor (`custom-cursor.tsx`).
   - Floating contact widgets and shortlist drawers.
   - Smooth reveal animations using Framer Motion and GSAP.
3. **Interactive Features:** Pet Compatibility Quiz to help users find the perfect pet.
4. **Content Management Power:** Vercel Blob integration for media uploads directly from the Payload Admin panel.
5. **Quality Assurance:** Comprehensive E2E testing setup via Playwright for critical user flows.
6. **Responsive & Accessible:** Built mobile-first with ARIA attributes and keyboard navigation in mind.

---

## 🤖 MCP & AI Agent Tooling Used

This project was built and refined using advanced AI Agent workflows, utilizing specific Skills and MCP (Model Context Protocol) servers:

### MCP Servers
- **Code Review Graph MCP**: Leveraged to understand the impact radius of changes, trace callers/callees, and ensure high code quality and architectural integrity.
- **Chrome DevTools MCP**: For debugging layout shifts (CLS), accessibility (a11y) audits, memory leaks, and performance tuning (LCP/INP).
- **Playwright MCP**: For writing, executing, and debugging End-to-End browser tests automatically, testing live production URLs, and extracting visual feedback.

### Agent Skills
- **`ui-polish`**: Used to build and refine premium, responsive UI without sacrificing performance or accessibility.
- **`taste-skill`**: Anti-slop skill used to enforce premium frontend design rules (good layout, typography, motion, spacing, and contrast).
- **`qa-check`**: Used to verify implementation tasks with functional, responsive, accessibility, and visual checks before pushing to production.
- **`troubleshooting`**: Used during deployment debugging to fix Payload CMS bundling issues on Vercel.

---

## 📦 Deployment & Troubleshooting

### Environment Variables
For Vercel and Supabase deployment, ensure you have the following environment variables configured:
```env
DATABASE_URI=postgres://postgres.xxxxxx:password@aws-0-region.pooler.supabase.com:6543/postgres
PAYLOAD_SECRET=your-secret-key
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
BLOB_STORE_ID=store_xxxxx
BLOB_WEBHOOK_PUBLIC_KEY=xxxxxx
```

### Known Production Issues
If you experience a **Blank White Page** on the `/admin` route after deployment, or missing images on the `/blog` sections, please consult the [`PRODUCTION_FIXES.md`](./PRODUCTION_FIXES.md) document. 

It contains detailed schematic instructions on how to resolve Vercel caching issues with `importMap.js` and how to run Supabase database migrations for the Media table.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database (Local or Supabase)

### Installation
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables (`.env`):
   ```env
   DATABASE_URI=postgres://user:password@localhost:5432/petshop
   PAYLOAD_SECRET=your-secret-key-for-development-only
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

*Visit `http://localhost:3000` for the frontend and `http://localhost:3000/admin` for the CMS.*
