# Free Tier Validation Matrix

This document validates the free-tier deployment and dependency assumptions for the Pet Shop O2O project, ensuring a strict $0-compatible baseline without requiring a credit card for core infrastructure during the free-first phase.

| Service Area | Provider / Tool | $0-Compatible | Limits That Matter | Fallback | Credit Card Requirement (Phase 1) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Frontend Hosting** | Firebase Hosting (Spark Plan) | Yes | 10GB storage, 360MB/day transfer. Cannot use App Hosting, Cloud Functions, or Cloud Storage on Spark. | Vercel Free, Netlify Free, GitHub Pages | **Never** requires a credit card on the Spark plan. |
| **Full-Stack Runtime** | Render Free Web Service | Yes | Sleeps after 15 mins inactivity (cold starts). 500 build mins/mo, 512 MB RAM, 750 hrs/mo. | Local hosting, Fly.io (Free tier), Vercel (if purely serverless Next.js). | Must not require billing account for strictly $0 phase (Target A). |
| **Database** | Supabase (Free Tier) | Yes | 500MB DB space, 2GB bandwidth. Pauses after 1 week of inactivity. | Neon Free (500MB, less pausing), Local SQLite (if Postgres is dropped). | Does not require a credit card for the free tier. |
| **Search** | PostgreSQL FTS & `pg_trgm` | Yes | Constrained by Supabase Free tier compute/memory limits. | Basic Payload CMS filtering. | **Never**. Uses existing DB infrastructure. (No paid AI/Typesense). |
| **Image Hosting** | Local Assets & Cloudinary Free | Yes | Cloudinary: 25 credits/mo (1 credit = 1GB storage/bandwidth or 1k transformations). | Purely local static assets in the repo. | Does not require a credit card. |
| **Video Hosting** | YouTube Embeds | Yes | Potential ads and YouTube branding. | Cloudinary Free for very small, budgeted clips. | **Never**. |
| **Analytics & Security** | Firebase Analytics & App Check | Yes | App Check: 10k calls/day limit on DeviceCheck/PlayIntegrity. | Umami Free, PostHog Free, or omit entirely. | **Never**. Included in Spark plan. |

## Critical Free-Tier Rules

1. **No Paid APIs:** Do not implement paid AI embedding APIs (OpenAI/Claude/Gemini) in the website backend during the zero-cost phase.
2. **No Billing-Required Infrastructure:** Firebase App Hosting and Firebase Cloud Storage are explicitly excluded because they force a Blaze (pay-as-you-go) billing account.
3. **No Unverified Dependencies:** Before adding any package or service, ensure it has a free local/self-hosted fallback and does not require a billing account even if usage is within a free quota.
