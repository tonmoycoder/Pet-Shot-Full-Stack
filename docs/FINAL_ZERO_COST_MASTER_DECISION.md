# PET SHOP O2O — FINAL ZERO-COST MASTER DECISION

**Status:** Approved baseline for the free-first phase
**Audience:** Claude, Gemini, DeepSeek, Antigravity, Ralph-style coding agents
**Priority:** This document supersedes older contradictory architecture notes.

## 1. Product North Star

Build a premium, mobile-first **digital showroom for a real pet shop in Bangladesh**.

This is NOT a conventional e-commerce store.

Core journey:

`Discover → Explore → Trust → See → Ask → Visit`

Primary conversions:
- WhatsApp conversation
- Live video request via WhatsApp
- Direct call
- Store directions
- Physical visit

Do NOT add cart, checkout, online payment, courier, delivery tracking, fake urgency, fake reviews, fake inventory, or fabricated health claims.

## 2. The Most Important Design Correction

Previous versions became too minimal.

The final site must be **premium and visibly interactive**, not merely clean.

The correct visual target is:

> **Aquarium Light — Premium Motion Edition**

Think of entering a real pet shop around dusk: aquarium light, glass reflections, warm wood/concrete, plants, animal habitats, subtle humidity/light movement, tactile surfaces, and editorial composition.

It must NOT look like a generic SaaS dashboard or a generic glassmorphism template.

## 3. Final Visual Language

### 3.1 Aquarium Light

- Upper-left soft light direction across hero and important glass surfaces.
- Warm-turquoise aquarium glow mixed with Dhaka concrete sand, leaf green, warm mango and coral accents.
- Glass is motivated by the aquarium/habitat metaphor, not used as decoration everywhere.
- Use brass, wood, terracotta, aquarium-glass and habitat textures as visual anchors when genuine photography/assets support them.
- Editorial asymmetry and specimen-book composition.
- Bangla-first typography with generous line height.

### 3.2 Signature Materials

Use three material levels:

1. **Solid editorial surfaces** for main content.
2. **Soft tactile / clay surfaces** for cards and controls where depth helps.
3. **Selective Liquid Glass** for navigation, overlays, primary CTAs, hero controls and signature moments.

Do NOT make every section glass.

## 4. Premium Interaction System

### 4.1 Hero

Hero is the primary visual statement.

Required layers:
- Real/approved pet-store visual.
- Strong Bangla headline.
- Glass control layer.
- WhatsApp primary CTA.
- Directions/call secondary CTA.
- Open-now status.
- Real shopkeeper identity when available and consented.
- Ambient aquarium-light effect.

### 4.2 Liquid Glass Motion

- Slow directional drift.
- One-way movement; never bounce.
- 12–20 second ambient cycle.
- Approx. 2–8 px perceived movement.
- No per-frame animated backdrop-filter blur.
- Prefer pseudo-elements, masked gradients, transform and opacity.
- Reduced-motion users get a static glass surface.

### 4.3 Mouse Interaction

Desktop only:
- custom cursor only where it adds meaning.
- subtle magnetic CTA.
- pointer-follow micro-parallax in hero and selected cards.
- no cursor effects over every element.

### 4.4 Touch Interaction

Mobile must feel tactile:
- tap scale 0.98–0.99 where appropriate.
- spring-like confirmation on primary CTA.
- swipeable galleries.
- touch-friendly hit targets.
- no hover-only feature.
- no desktop cursor dependency.

### 4.5 Scroll Choreography

Use moderate scroll-linked storytelling on a few high-value sections:
- hero reveal
- discovery transition
- live-video story
- store reveal

No constant scroll hijacking.

## 5. Animation Technology Policy

Use progressive enhancement.

### Default
- CSS transitions for small state changes.
- Motion for React component enter/exit/layout/gesture/in-view interactions.

### Specialist
- GSAP + ScrollTrigger ONLY for complex, measured scroll scenes.

### Visual signature
- WebGPU/WebGL/shader only for one or two signature surfaces.

### Optional
- Spline only if a specific 3D scene proves useful and has a strong mobile fallback.

A library must earn its place by improving a specific user experience.

Never add a library merely because it can make an effect.

## 6. Mobile-First Performance Rule

The site must remain fast on mid-range Android devices and metered connections.

Rules:
- Real HTML/CSS content renders first.
- LCP content must not depend on WebGPU, GSAP, or 3D.
- Shader layer mounts after critical content is available.
- Feature-detect WebGPU/WebGL.
- Static visual fallback must be designed, not an ugly emergency fallback.
- Respect `prefers-reduced-motion`.
- Animate mostly `transform` and `opacity`.
- Avoid per-frame box-shadow, blur, large filter stacks or layout-triggering animation.
- Reserve media aspect ratios to prevent CLS.

## 7. Homepage Information Architecture

Use a compact, conversion-focused structure rather than 13 generic marketing sections.

1. Hero + open-now + shopkeeper trust
2. Discovery surface: animals + food + accessories
3. Trust strip / freshness signal
4. Ask Live on WhatsApp
5. Store experience / what to expect
6. Final invitation CTA
7. Footer

Journal can live in navigation and dedicated pages rather than consuming homepage space in the free-first MVP.

## 8. O2O Conversion Enhancements

### 8.1 Pre-filled WhatsApp

Every pet-specific WhatsApp CTA must include:
- animal/product name
- stable identifier when appropriate
- page URL
- user intent such as availability/live-video request

Example intent:
`আমি [নাম]-এর availability জানতে চাই এবং সম্ভব হলে Live Video দেখতে চাই।`

### 8.2 Open-now / Freshness

Show honest freshness signals such as:
- এখন খোলা
- আজকের আপডেট
- সর্বশেষ আপডেটের সময়

Only show real data.

### 8.3 Compatibility Quiz

Do NOT make this a giant funnel.

Start as an optional 3-question lightweight experience:
- living space
- prior pet experience
- daily time/attention

It should recommend from known catalog data only.

Build after the core browsing/CTA flow works.

### 8.4 Shortlist

Optional local-only save-for-later using browser storage.
No login required in MVP.

## 9. Technical Architecture — FREE-FIRST

There are two separate targets:

### Target A — Zero-billing public demo / portfolio phase

Use this when the priority is **strictly $0 and no billing account required**.

- Next.js App Router
- Static export where necessary
- Firebase Hosting Spark for static frontend hosting
- No Firebase App Hosting
- No Firebase Cloud Storage on Spark
- No paid APIs
- Real content can initially come from local/mock JSON or a separately hosted free CMS/API

Firebase Hosting has a no-cost tier and does not require a billing account for small deployments. Firebase App Hosting, however, requires the Blaze pay-as-you-go plan, so it is explicitly out of the strict-$0 phase.

### Target B — Free-tier full-stack prototype

When live CMS is required without paying:

- Next.js + Payload 3.x as one application
- Render Free Web Service for the Node/Next/Payload process
- Supabase Free Postgres, OR another genuinely free compatible Postgres service
- Firebase Hosting may remain optional as a static marketing shell/CDN, but it is not required for the full-stack runtime

This is still a free-tier prototype, not a guarantee of indefinite production capacity.

Render Free services can sleep after inactivity, so cold starts are expected.

## 10. Payload Decision

Use **Payload 3.x** based on the currently published 3.x releases.

Do not use Prisma with Payload's own Postgres adapter.

Payload's current Postgres adapter uses Drizzle + node-postgres and exposes Drizzle/database access directly. Let Payload own the application database schema and migrations.

Use the Payload Local API / server-side database access instead of building a second ORM boundary.

## 11. Database

PostgreSQL.

Schema rule:

### Typed columns
Anything that is frequently:
- filtered
- sorted
- indexed
- used for availability
- displayed in major UI

Examples:
- name
- slug
- price
- species
- category
- availability
- featured
- createdAt/updatedAt

### JSONB
Only genuinely variable species-specific attributes.

Examples:
- bird temperament notes
- aquarium capacity
- fish size notes
- special care metadata

Avoid an EAV model.

## 12. Search — Free-First

Do NOT require a third-party hosted search service at launch.

First option:
- PostgreSQL FTS
- `pg_trgm`
- Payload Search plugin where useful

The architecture should expose a search interface so Typesense can be added later without changing UI components.

Typesense remains a future derived search index, not a source of truth.

## 13. Semantic / AI Search

Do NOT put paid AI embedding APIs into the strict-$0 MVP.

Payload's current ecosystem supports RAG/vector workflows, but a practical implementation still depends on an AI/embedding adapter/model and operational compute.

Therefore:
- MVP: deterministic Postgres search + filters
- Later: semantic pet matching once a genuinely free/locally hosted embedding route is chosen and tested

Never claim AI recommendations from embeddings until the embedding provider and cost model are explicitly verified.

## 14. Media Strategy — Free-First

### Images
Use:
- optimized local/static assets for small MVP catalog
- Cloudinary Free only when the 25-credit monthly allowance is sufficient

Cloudinary currently offers a free plan with no credit card required, but its 25-credit monthly allowance means media-heavy usage must be controlled.

### Video
- Use YouTube embeds for large marketing/store videos.
- Use Cloudinary Free only for small, carefully budgeted product/animal clips.
- Do not assume unlimited video bandwidth.
- Do not use paid Cloudflare R2 / Stream in the strict-$0 phase.

## 15. RAG / AI Rules

No paid OpenAI/Claude/Gemini API calls from the website backend in the zero-cost phase.

Coding agents are separate from runtime product AI.

Do not place private AI keys in client bundles.

## 16. Firebase Rules

Allowed on Spark:
- Firebase Hosting for static site
- Firebase Analytics / Crashlytics / App Check where appropriate and within limits
- Realtime Database if needed for a genuinely small prototype

Avoid on strict Spark:
- Firebase App Hosting
- Firebase Cloud Functions for production runtime
- Firebase Cloud Storage
- any feature that forces Blaze billing

## 17. Free-Only Dependency Rule

Before adding any package/service/API, the agent must answer:

1. Is the package open-source/free to install?
2. Does the runtime service require a paid account?
3. Does it require a billing account even if usage is within a free quota?
4. Is there a free local/self-hosted fallback?
5. What happens if the free quota is exceeded?

If any answer creates an unavoidable paid dependency, reject it from the strict-$0 baseline.

## 18. SEO

Keep:
- robots.txt
- sitemap.xml
- canonical URLs
- metadata / OG tags
- one primary H1
- LocalBusiness structured data
- Product structured data only when semantically valid
- clean URLs

Do not put dynamic CMS-dependent SEO into a static-only deployment unless generation is actually configured.

## 19. Security

- Zod for external input validation.
- Strict CSP.
- Secure cookies where authentication exists.
- Signed media upload where supported.
- MIME and size validation.
- EXIF stripping for uploaded images where applicable.
- Webhook signature verification (HMAC) for any external webhook.
- No secrets in client code.
- Staging `noindex`.
- Admin surfaces protected and not indexable.

## 20. Testing

MVP:
- TypeScript checks
- ESLint
- Vitest for meaningful utilities
- Playwright for critical user journeys
- visual regression snapshots for key breakpoints

Critical journeys:
- browse → detail
- search → result
- pet → WhatsApp
- call
- directions
- language switch
- mobile navigation
- reduced-motion mode

## 21. Ralph / Antigravity Workflow

The agent must not rebuild the project mentally on every turn.

Persistent project brain:
- `CLAUDE.md`
- `ANTIGRAVITY.md`
- `docs/FINAL_ZERO_COST_MASTER_DECISION.md`
- `docs/04_FRONTEND_SPEC.md`
- `docs/05_MOTION_ANIMATION_SPEC.md`
- `ralph/prd.json`
- `docs/tasks/progress.txt`
- git history

One story per iteration.

Each iteration:
1. Read relevant project-memory files.
2. Inspect only the relevant code.
3. Implement one bounded story.
4. Verify type/lint/test/build as appropriate.
5. Verify responsive behavior.
6. Update progress.
7. Stop.

Never silently change architecture.

## 22. Final Product Personality

The final site should feel:

**premium + immersive + local + trustworthy + tactile + alive**

Not:

**generic SaaS + excessive glass + animation showcase + childish pet theme**

The ideal reaction is:

> “এটা শুধু pet shop-এর website না — একটা real pet shop-এ ঢোকার digital experience.”

## 23. Definition of Done for the Free Phase

The project is ready when:

- it runs publicly at $0 within the chosen free-tier limits
- no paid API is required for core functionality
- no billing account is required for the selected strict-$0 hosting path
- the main homepage is premium and visibly interactive
- mobile experience is first-class
- motion has fallbacks
- WhatsApp/call/directions work
- content architecture can later move to a paid production runtime without rewriting the design system
- every free-tier quota is documented

## 24. Future Upgrade Path

When budget becomes available, migrate without redesigning:

- Firebase/Render free → production hosting
- Postgres free tier → managed production Postgres
- local/free media → Cloudinary/R2/Stream production media architecture
- Postgres search → Typesense if catalog/search complexity justifies it
- deterministic search → semantic matching/RAG
- optional advanced GSAP scenes
- optional Spline/3D scenes

The free phase is therefore a **cost-constrained production architecture**, not a throwaway prototype.
