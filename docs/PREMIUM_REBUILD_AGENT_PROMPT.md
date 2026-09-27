# PREMIUM UI REBUILD — AGENT PROMPT

You are rebuilding the Pet Shop O2O Digital Showroom frontend.

Read these files before coding:

1. `docs/10_CLAUDE_MASTER_HANDOFF.md`
2. `docs/FINAL_DECISION_DOCUMENT.md`
3. `docs/PREMIUM_UI_REDESIGN_V3.md`
4. `docs/04_FRONTEND_SPEC.md`
5. `docs/05_MOTION_ANIMATION_SPEC.md`
6. `ralph/prd.json`

The newest visual authority is:

`docs/PREMIUM_UI_REDESIGN_V3.md`

It supersedes any older instruction that made the visual system too minimal or disabled shaders/GSAP/advanced interaction entirely.

## Mission

Build a premium interactive digital showroom, not a generic SaaS landing page and not a conventional e-commerce store.

The expected experience includes:

- immersive hero
- aquarium-light shader/refraction effect
- directional Liquid Glass movement
- premium typography and composition
- desktop pointer interaction
- mobile touch interaction
- tactile CTA states
- subtle magnetic CTA on fine-pointer devices
- scroll storytelling
- spatial card interaction
- live-video story section
- premium store experience
- warm final CTA

## Technology behavior

Use the smallest appropriate tool per interaction:

- CSS → simple ambient effects
- Motion → React interaction, gesture, layout, in-view, state transitions
- GSAP + ScrollTrigger → complex scroll choreography only
- WebGPU/Shaders → hero signature effect and optionally one additional visual surface
- Spline → only when a real 3D story exists; provide a mobile fallback

Do not import libraries just to demonstrate them.

## Critical mobile requirement

Every desktop interaction must have a touch-safe alternative.

Never rely on `hover` for essential information.

Mobile must have:

- no custom cursor
- reduced shader complexity
- controlled parallax
- tactile button press feedback
- swipe-friendly discovery
- safe-area support
- `100dvh`
- no blocked navigation while animations play

## Performance requirement

Use feature detection and fallbacks.

Support:

- `prefers-reduced-motion`
- pointer/coarse detection
- WebGPU support detection
- reduced motion mode
- Save-Data where available

Do not animate backdrop-filter per frame.

Do not run multiple heavyweight canvases simultaneously.

## Visual QA requirement

Before finishing each major UI milestone, ask:

> “Could this screenshot be mistaken for a generic modern SaaS template?”

If yes, revise the composition.

Another test:

> “Does the visual interaction make sense specifically for a pet shop and a physical store in Bangladesh?”

If no, revise it.

## Do not regress

Do not turn the design back into:

- plain static hero
- standard card grid
- generic buttons
- repetitive fade-up animations
- glass everywhere
- basic map block
- desktop-only hover behavior

## Implementation sequence

1. Read all source files.
2. Produce a visual conflict map between old specs and V3.
3. Update the design token system.
4. Build GlassSurface and GlassButton.
5. Build Motion primitives.
6. Build custom pointer system.
7. Build touch interaction helpers.
8. Build hero shader with fallback.
9. Build immersive hero.
10. Build discovery surface.
11. Build live-video story.
12. Build store experience.
13. Build final CTA.
14. Run mobile visual QA.
15. Run reduced-motion QA.
16. Run performance QA.
17. Only then proceed to CMS wiring.

For each step, change only what the current ticket requires, verify it, and update the persistent progress file.

Do not silently rewrite project architecture.
