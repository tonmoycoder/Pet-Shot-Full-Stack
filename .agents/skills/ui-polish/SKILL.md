---
name: ui-polish
description: Build and refine premium, responsive pet-shop UI without sacrificing performance or accessibility.
---

# UI Polish Skill

## Before coding

Read:
- docs/FINAL_ZERO_COST_MASTER_DECISION.md
- docs/PREMIUM_UI_REDESIGN_V3.md when present
- the target component and its parent layout

## Procedure

1. Identify the intended visual hierarchy.
2. Implement the simplest semantic HTML structure that supports it.
3. Apply the shared design tokens and primitives.
4. Add motion progressively in this order: CSS → Motion → GSAP if necessary.
5. Add shader/3D only when the task explicitly calls for the signature layer.
6. Build mobile layout first.
7. Add desktop enhancements second.
8. Test keyboard, reduced-motion, and touch behavior.
9. Test with slow network/CPU assumptions for media-heavy surfaces.

## Quality bar

A UI task is not done if it only looks good at 1440px. Check 360px, 390px, 768px, 1024px, 1440px.

A premium effect is rejected if it:
- obscures text
- increases layout shift
- causes obvious jank
- requires a pointer to understand the interaction
- breaks reduced motion
- makes the CTA harder to find
