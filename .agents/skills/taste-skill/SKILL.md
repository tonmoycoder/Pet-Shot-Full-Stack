---
name: taste-skill
description: Anti-slop Agent Skills for premium frontends. Enforces good layout, typography, motion, spacing, and contrast.
---

# Taste Skill

## Typography & Contrast
- Minimum WCAG AA contrast (4.5:1). Avoid text-zinc-500 on white backgrounds; use text-zinc-600 or darker.
- Headings should be `tracking-tight` or `tracking-tighter`.
- Paragraphs should have `leading-relaxed` (1.625) or `leading-7`.
- Body font should be crisp. Apply `antialiased`.
- Use a robust font stack. In this project, `font-sans` for English and `font-bangla` for Bangla.

## Spacing & Layout
- Generous padding and margins. Use `py-16` to `py-24` for sections.
- Max width for text should be constrained (e.g., `max-w-2xl` or `max-w-prose`) to avoid eye fatigue.
- Use rounded corners intentionally.
- Ensure tap targets on mobile are at least 44x44px.

## Motion & Interaction
- Smooth hover states. Always include `transition-colors`, `transition-all`, or `transition-transform` with `duration-300` or `duration-500`.
- Avoid janky animations. Use `ease-out` for entering and `ease-in` for exiting.
- Add `active:scale-95` on interactive buttons for tactile feedback.

## Implementation Guide
- Check all routes and components to replace generic slop with this premium aesthetic.
- Verify that `category-client.tsx`, `collection/page.tsx`, `hero-section.tsx` follow these standards.
