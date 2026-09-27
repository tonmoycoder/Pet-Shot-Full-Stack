# Project Core Rules

## Product

- This is a premium O2O digital showroom for a real pet shop in Bangladesh.
- It is NOT a conventional e-commerce store.
- Never add cart, checkout, online payment, courier delivery, delivery tracking, or mandatory account creation unless a future decision document explicitly changes scope.
- Primary conversions: WhatsApp, live-video request via WhatsApp, phone call, directions, physical visit.
- Bangla is the default UI language. English is available through a visible language toggle.
- Mobile is the primary experience; desktop must also feel premium.

## Trust

- Never invent stock, reviews, health claims, customer counts, business history, store hours, or staff identity.
- Fresh/live signals must come from CMS data.
- Any shopkeeper identity must be real and consented.
- No fake scarcity or fake countdowns.

## Source of truth

- Product and architecture truth: docs/FINAL_ZERO_COST_MASTER_DECISION.md
- Visual truth: docs/PREMIUM_UI_REDESIGN_V3.md when present
- Security truth: docs/SECURITY_SPEC.md when present
- Task truth: .ralph/prd.json
- Progress memory: .ralph/progress.md
- Major architectural changes: docs/DECISIONS.md

## Agent behavior

1. Inspect before editing.
2. Work on ONE task only.
3. Do not refactor unrelated code.
4. Prefer existing dependencies and patterns.
5. Do not install a new library without a written reason in the task completion note.
6. Preserve mobile behavior for every interaction.
7. Verify before claiming completion.
8. Record unresolved issues instead of hiding them.
