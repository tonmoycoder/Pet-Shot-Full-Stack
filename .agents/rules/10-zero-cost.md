# Strict Zero-Cost Phase Rules

## Non-negotiable

For the current phase, introduce no paid service, paid API, paid hosting requirement, or billing-required infrastructure.

## Default stack

- Frontend/runtime target: free-tier-compatible deployment.
- Firebase Hosting Spark is acceptable for static/compatible frontend hosting.
- Do not assume Firebase App Hosting is $0; verify billing requirements before using it.
- If a serverful Node/Payload deployment is required, use the project-approved free-tier path documented in docs/FINAL_ZERO_COST_MASTER_DECISION.md and keep the backend replaceable.
- Use managed free Postgres only if the selected provider's current free tier supports the actual workload without requiring payment.
- Do not introduce Cloudflare Stream, paid R2 usage, paid AI APIs, paid vector databases, paid search services, or paid observability in the $0 phase.

## Media

- Prefer optimized static images and YouTube/lite embeds for large public video.
- Short product/animal media may use an approved free-tier media service only within documented limits.
- All fallbacks must remain functional if an external media service is removed.

## AI/search

- No paid LLM or embedding API for MVP.
- Start with local/server-side deterministic search and filters.
- Semantic/RAG features are future-phase work unless they can be implemented with zero external cost and no unacceptable complexity.

## Environment safety

- Never commit secrets.
- Never add billing-required services silently.
- If a dependency requires a paid plan, STOP the task, document it, and propose a free alternative.
