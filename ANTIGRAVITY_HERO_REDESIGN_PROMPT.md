# ANTIGRAVITY TASK — REPLACE CURRENT HERO VISUAL

Read:
- docs/HERO_REDESIGN_V4_IMMERSIVE_STORE_FRONT.md
- docs/PREMIUM_UI_REDESIGN_V3.md
- docs/FINAL_ZERO_COST_MASTER_DECISION.md
- relevant `.agents/rules/`
- existing hero components

The current hero uses a conventional rounded rectangular image card. This is NOT the desired final direction.

Implement the new “Immersive Storefront — Aquarium Light Hero” specified in the V4 document.

IMPORTANT:
- Reuse the existing real shop photo.
- Do not treat the photo as a card.
- Make the photo the visual environment of the hero.
- Use edge bleed and an organic aperture/mask.
- Keep text stable and editorial.
- Keep WhatsApp CTA primary.
- Preserve the approved Bird Cursor; integrate with it rather than creating a second cursor system.
- Use CSS/Motion first.
- Shader is progressive enhancement only.
- Do not introduce paid infrastructure.
- Do not introduce unnecessary animation libraries.
- Mobile must be a separately considered composition.

Implementation sequence:
1. Remove current card treatment.
2. Build immersive media stage.
3. Add organic edge/mask.
4. Add subtle image motion.
5. Add desktop pointer parallax.
6. Add Aquarium Light overlay.
7. Add shader only if it improves the visual without harming performance.
8. Integrate existing Bird Cursor subtly.
9. Refine CTA interactions.
10. Build mobile variant.
11. Run accessibility/performance checks.

Before coding:
- inspect the existing hero architecture;
- identify components/styles that can be reused;
- do not duplicate existing motion systems.

Before completion test at:
- 360px
- 390px
- 768px
- 1024px
- 1440px

Check:
- no horizontal overflow
- LCP image remains stable
- no hydration mismatch
- no console errors
- reduced-motion behavior
- keyboard accessibility
- shader fallback
- smooth pointer behavior

Do not modify unrelated sections.

At the end report:
1. files changed
2. architecture changes
3. animation approach
4. mobile approach
5. performance observations
6. tests
7. anything still visually weak
