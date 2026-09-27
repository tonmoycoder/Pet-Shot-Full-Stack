# ANTIGRAVITY — ZERO-COST PROJECT RULES

Read `docs/FINAL_ZERO_COST_MASTER_DECISION.md` before coding.

## Absolute rules

1. Do not add paid SaaS.
2. Do not add any API that requires a paid key for core functionality.
3. Do not move to Firebase App Hosting; it requires Blaze billing.
4. Firebase Hosting Spark is allowed for static output.
5. If a dynamic Next.js + Payload runtime is required at $0, use a genuinely free-tier web runtime such as Render Free, subject to its limits and cold starts.
6. Do not use Prisma with Payload Postgres.
7. Do not require Typesense for MVP.
8. Do not require AI/RAG embeddings for MVP.
9. Do not use Cloudflare R2/Stream unless the project is explicitly moved out of the strict-$0 phase.
10. Cloudinary Free is allowed only with documented monthly usage limits.
11. YouTube is acceptable for large marketing/store videos.
12. Premium animation is required, but it must be progressively enhanced.
13. WebGPU/Shaders must never block LCP.
14. Mobile must not be the degraded desktop version.
15. Every hover interaction needs a touch equivalent or must disappear on touch.
16. Every heavy visual effect needs a fallback.
17. Reduced-motion support is mandatory.
18. Do not fake stock, reviews, health data, or urgency.

## Before installing a new service/library

Record:
- purpose
- license/cost
- free-tier requirement
- billing-account requirement
- quota
- fallback
- why the feature cannot be implemented with current tools

Reject anything that introduces unavoidable paid usage into the free phase.

## Before deployment

Run a cost audit:
- hosting
- database
- storage
- CDN
- media
- search
- analytics
- AI
- maps
- email/SMS
- auth

The answer must be `$0` for the strict-free deployment path.
