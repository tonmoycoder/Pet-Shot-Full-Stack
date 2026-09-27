# ANTIGRAVITY — HERO V5 IMPLEMENTATION TASK

Read first:
- docs/HERO_BEHANCE_INSPIRED_V5.md
- docs/PREMIUM_UI_REDESIGN_V3.md
- docs/FINAL_ZERO_COST_MASTER_DECISION.md
- existing Bird Cursor implementation
- existing Liquid Glass/lens implementation
- relevant `.agents/rules/` and skills

The new hero must be inspired by the supplied Behance reference:
https://www.behance.net/gallery/221423493/Pet-Care-Website-Hero-Section-Design

We are taking composition principles only. Do not copy the reference.

Main objectives:
1. Move away from a plain SaaS-like two-column hero.
2. Build a premium “Pet-World Stage” with a large visual focal area.
3. Use rounded/organic premium surfaces similar in spirit to the reference.
4. Add intentional floating information badges.
5. Make the Aquarium Light lens/refractive effect functional and localized.
6. Make the Bird Cursor larger (~32–42px) and more expressive, but perfectly stable.
7. Implement a clearly recognizable iridescent/rainbow feather trail.
8. Make click behavior tactile and premium.
9. Keep all interactions performant and progressive.
10. Preserve mobile-first behavior.

IMPORTANT CURSOR REQUIREMENTS:
- no jitter
- no pointermove React setState loop
- use requestAnimationFrame/interpolation
- smooth velocity/orientation
- bounded particle pool (12–18 feathers)
- feather trail only above movement threshold
- premium low-saturation rainbow/iridescent feather colors
- click: flutter + 3–5 feather burst + subtle ring
- hover zones can modify behavior subtly
- only enable desktop custom cursor for `(pointer: fine) and (hover: hover)`

IMPORTANT LENS REQUIREMENTS:
- lens activates only over image/media areas
- no lens over normal text
- lens follows pointer smoothly
- localized refraction/displacement
- subtle highlight movement
- fade in/out by region entry/exit
- no full-page lens
- no heavy per-frame blur
- shader/WebGL only as progressive enhancement
- CSS/static fallback required

Do not create a second cursor system if one already exists.
Refactor the current one if necessary.

Do not add paid services or unnecessary animation libraries.

Implementation order:
1. visual stage
2. image/subject composition
3. floating badges
4. Aquarium Light ambient layer
5. lens behavior
6. cursor refinement
7. feather pool/trail
8. click interaction
9. desktop parallax
10. mobile composition
11. performance/a11y

Test:
360, 390, 412, 768, 1024, 1280, 1440, 1920.

Before completion:
- run lint
- typecheck
- production build
- verify console
- inspect pointer performance
- verify reduced-motion
- verify keyboard focus
- verify no horizontal overflow

Do not change unrelated sections.

At the end report:
- files changed
- design changes
- cursor architecture
- trail implementation
- lens implementation
- mobile behavior
- performance results
- remaining visual problems
