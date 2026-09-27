# HERO V5 — BEHANCE-INSPIRED PREMIUM HERO
## Bismillah Pakhi & Aquarium — Aquarium Light / Premium Motion Edition

> Goal:
> Rebuild the hero visual language inspired by the supplied Behance reference:
> https://www.behance.net/gallery/221423493/Pet-Care-Website-Hero-Section-Design
>
> IMPORTANT:
> We are borrowing composition principles, not copying the artwork, text, branding, exact layout, or assets.

---

# 1. WHAT WE ARE TAKING FROM THE REFERENCE

The reference hero uses a warm, soft background, a large rounded/organic white presentation surface, a strong hero visual on the right, floating informational UI elements around the subject, and a clear action hierarchy. The project is a pet-care hero design published on Behance in March 2025. citeturn726987search0turn726987image1

Our version should translate those ideas into the Bismillah Pakhi & Aquarium brand:

Reference principles:
- large hero composition
- generous breathing space
- rounded premium surface language
- strong visual subject
- floating information tags
- soft warm/pastel atmosphere
- clear primary CTA
- friendly, human pet-world feel

Our version:
- Bangla-first
- real local shop / real animals
- Aquarium Light palette
- premium interactive cursor
- Liquid Glass lens/refraction
- aquarium caustics
- subtle parallax
- stronger O2O CTA
- mobile-first
- no generic SaaS card layout
- no copy of the Behance asset

---

# 2. REPLACE THE CURRENT HERO APPROACH

The previous “text left + shop photo inside a rounded card right” is too plain.

Do NOT build:
- a standard two-column SaaS hero
- a simple right-side rectangle image
- a huge flat rounded image card
- a pile of glass cards
- a generic dashboard-like layout

Instead build:

## “Premium Pet-World Stage”

The hero feels like a designed scene.

The main visual is a large, rounded/organic stage that contains the shop/animal visual, but it should feel like a premium editorial surface rather than a product card.

The visual surface can be:
- a large asymmetrical soft-rectangle
- corner radii with variation
- very subtle border
- deep layered shadow
- ambient glow
- image bleed beyond the surface where useful

It should visually feel closer to a physical display / gallery frame than a UI card.

---

# 3. HERO COMPOSITION

## Desktop

Approximate structure:

LEFT / CENTER:
- small live-status chip
- large Bangla headline
- short supporting text
- primary WhatsApp CTA
- secondary “কীভাবে আসবেন?” / Directions CTA
- small trust signal

RIGHT / CENTER:
- large hero visual stage
- real shop photo OR real animal cutout composition
- floating micro-information elements
- lens/refraction interactions
- Aquarium Light lighting

Do NOT force a rigid 50/50 grid.

Use asymmetric editorial balance.

Suggested visual weight:
- content 40–45%
- visual 55–60%

But the visual should overlap the layout slightly so the page feels composed rather than divided.

---

# 4. MAIN HERO VISUAL

## Preferred content

Use the real shop photograph already present in the project.

Enhance composition through:
- intelligent crop
- subtle depth
- layered masking
- light gradients
- floating labels

Do not replace the real shop with AI-generated fake store imagery.

If real cutout animal assets become available, they may be layered over the shop environment.

Potential composition:
- shop image as environmental layer
- one hero animal cutout / aquarium focal subject in foreground
- soft aqua halo behind focal subject
- small floating label cards
- subtle water/light movement

This is closer to the reference’s visual storytelling than a plain photo card.

---

# 5. BACKGROUND

Use a soft premium atmosphere inspired by the reference, but translated to Aquarium Light.

Base:
- warm off-white / cream
- extremely subtle mint/aqua tint
- light sand
- tiny warm mango accents

Add:
- large blurred aqua/green atmospheric blobs
- soft aquarium-light bloom
- very low-opacity organic wave lines
- occasional tiny bubbles/paw/feather motif

Do NOT:
- make the background neon
- create a children’s website
- use excessive gradients
- cover the page with blobs

---

# 6. OUTER HERO SURFACE

The main hero stage should have:

- large asymmetric rounded corners
- soft depth
- subtle glass edge
- warm shadow
- slight inner highlight
- slight surface variation

Suggested:
- radius: 32–56px desktop
- radius: 24–32px mobile
- border: 1px maximum, very low opacity
- shadow: multi-layer but static
- no continuously animated shadow

The surface should feel tactile.

---

# 7. FLOATING UI DETAILS

Inspired by the reference’s floating informational badges.

Use no more than 3 floating details at once.

Examples:

### Badge 1
`● এখন দোকান খোলা`

### Badge 2
`বাস্তব দোকান · চুয়াডাঙ্গা`

### Badge 3
`আজকের আপডেট`

Optional:
`WhatsApp-এ Live Video`

Each badge:
- compact
- organic capsule
- subtle glass
- tiny icon
- micro-shadow

The badges should NOT look like random stickers.

They must be positioned as editorial annotations.

---

# 8. VISUAL LENS / LIQUID GLASS

The existing lens concept must become functional rather than decorative.

## Principle

The lens effect should only activate where there is actual visual material to refract.

Good areas:
- hero image
- floating media badges
- hero focal subject
- premium CTA surface
- special image sections

Bad areas:
- normal body text
- every card
- every button
- footer
- static content blocks

## Lens behavior

When pointer moves over the main hero visual:
- lens subtly follows pointer
- local light/refraction shifts
- background image under lens slightly distorts
- highlight direction changes naturally
- effect remains bounded inside the hero visual

The lens should NOT cover the entire screen.

## Strength

Very subtle.

Suggested:
- displacement: 2–8px
- scale/refraction: tiny
- opacity: low
- highlight movement: slow
- no heavy blur

## Interaction rule

No pointer:
→ lens remains calm

Pointer over hero:
→ lens activates smoothly

Pointer leaves hero:
→ lens fades out smoothly

Pointer moves quickly:
→ lens follows with slight lag

Do not snap.

---

# 9. LENS TECHNICAL RULE

Prefer:
- CSS variables
- transforms
- pseudo-elements
- masked gradients
- SVG filters only where necessary

If WebGPU/WebGL is used:
- keep the shader restricted to hero media
- do not block LCP
- progressively mount after primary content is ready
- provide CSS/static fallback

No full-page WebGL.

---

# 10. HERO MOTION

The hero should not be static.

Use several very slow layers.

## Layer A — Main visual
Very subtle:
- scale 1.00 → 1.018
- vertical drift 0–4px

Duration:
18–28s

## Layer B — Aquarium Light
Direction:
top-left → bottom-right

Duration:
12–20s

## Layer C — Background atmosphere
Ultra-slow:
25–40s

## Layer D — Floating badge
Tiny:
2–4px vertical drift

Duration:
6–10s

All loops:
- smooth
- seamless
- no bounce
- no abrupt reset

---

# 11. MOUSE PARALLAX

Desktop only.

Pointer movement should create depth:

Main visual:
4–8px

Foreground subject:
8–12px

Lens/light layer:
10–16px

Floating badges:
5–10px

Text:
0–2px maximum

The text must remain visually stable.

Use transform only.

Do not create layout shift.

---

# 12. BIRD CURSOR — V5

The bird cursor remains a signature feature but should now be more visible and interactive.

## Size

Previous:
~20–30px

New:
### ~32–42px desktop

Hover/active:
### ~38–48px

Do not make it enormous.

The bird should feel like a small premium creature flying beside the user’s pointer.

---

# 13. BIRD CURSOR MOVEMENT

The bird should:
- follow pointer smoothly
- have slight natural lag
- orient toward velocity
- subtly tilt into turns
- lightly flap when moving
- glide when stationary

NO jitter.

NO shaking.

NO frame-to-frame snapping.

## Important

The bird must not mathematically chase the pointer in a way that creates micro-oscillation.

Use:
- velocity smoothing
- target interpolation
- dead-zone / epsilon threshold
- damped spring
- clamped rotation

When pointer movement becomes tiny:
freeze orientation rather than constantly adjusting.

---

# 14. BIRD CURSOR INTERACTION ZONES

The cursor should know where it is.

## Normal page
Normal glide.

## Hero visual zone
More expressive.

Bird:
- slightly brighter
- subtle aqua rim
- tiny feather trail
- lens may react

## Primary CTA
Bird:
- slows
- leans toward CTA
- tiny wing flare

## Animal / product image
Bird:
- circles or arcs slightly
- tiny feather particle
- lens response may activate

## Interactive card
Bird:
- subtle scale
- slight orbit/peek behavior

Do not trigger all behaviors simultaneously.

---

# 15. RAINBOW FEATHER TRAIL

The trail should be clearly visible enough to understand.

Not a smoke trail.

Not a blurry line.

Not a generic particle trail.

It should look like tiny luminous feathers following the bird.

## Color language

Use a restrained premium rainbow:

- aqua
- cyan
- mint
- soft blue
- lavender
- warm yellow
- soft coral

The rainbow should be:
- low saturation
- luminous
- semi-transparent

Do NOT use a rainbow neon gaming look.

Think:
### “iridescent feather light”

---

# 16. TRAIL BEHAVIOR

When the pointer moves slowly:
- almost no trail

Normal movement:
- 1 feather every ~50–90ms

Fast movement:
- up to ~3 feathers per ~100ms

Maximum active feather pool:
### 12–18

Each feather:
- random small rotation
- random scale
- slight side drift
- fades after ~350–850ms
- disappears cleanly

Trail should be noticeable but short.

Maximum visible tail:
~80–140px behind the bird

Never create an infinitely long trail.

---

# 17. FEATHER VISUAL

Each particle should resemble:
- a tiny feather
- tapered silhouette
- soft luminous edge
- slight transparency

Avoid:
- dots
- circles
- generic confetti
- firefly particles

The shape must communicate “feather”.

SVG is preferred.

---

# 18. TRAIL IMPLEMENTATION

Performance first.

Do NOT:
- create a React component per feather
- set React state on every pointermove
- append unlimited DOM elements
- animate filters every frame

Use:
- a fixed pool
- requestAnimationFrame
- transform
- opacity
- rotation
- scale

Maximum:
12–18 active feathers.

Reuse them.

When idle:
animation loop should reduce activity.

---

# 19. CLICK INTERACTION — BIRD

When user clicks:

Sequence:
1. tiny pause
2. wing flutter
3. small forward hop
4. 3–5 feathers burst
5. tiny iridescent ring
6. return to glide

Duration:
350–550ms

The effect should feel tactile and premium.

No giant explosion.

---

# 20. CLICK ON PRIMARY CTA

Primary CTA click gets a different response:

- button compresses
- bird leans toward button
- tiny feather burst
- subtle aqua/gold ring
- WhatsApp/navigation action continues immediately

Never delay the actual click/navigation.

---

# 21. “LENS” + CURSOR COORDINATION

This is important.

The bird is the pointer identity.

The lens is the environmental reaction.

The two should NOT both try to animate independently in a noisy way.

Suggested relationship:

bird moves
→ hero visual reacts slightly

bird enters image
→ lens becomes visible

bird crosses image
→ tiny refraction trails behind

bird stops
→ lens settles

bird exits
→ lens fades

This creates the feeling that:
### the bird is moving through a physical visual world.

That should become one of the website’s signature interactions.

---

# 22. HERO CTA

Primary:
`WhatsApp-এ Live Video দেখুন`

Secondary:
`কীভাবে আসবেন?`

Primary CTA:
- deep green
- premium tactile surface
- subtle internal highlight
- magnetic desktop movement
- strong mobile press state

Do NOT make CTA glass-on-glass.

---

# 23. MOBILE

The desktop reference-inspired composition must NOT be blindly stacked.

Mobile hero:

1. status chip
2. large Bangla heading
3. short copy
4. WhatsApp CTA
5. visual stage
6. small floating badge
7. next-section transition

The visual stage:
- full width
- organic rounded shape
- larger height
- no desktop cursor
- no complex parallax
- no continuous rainbow trail

Touch:
- press scale
- subtle ripple
- tiny feather response
- lens reacts only inside image if performance allows

---

# 24. PERFORMANCE

Target:
smooth 60fps on desktop.

Mobile:
prioritize battery/data/INP.

Cursor code:
- only load on `(pointer: fine) and (hover: hover)`
- no desktop cursor system on touch-only devices

Trail:
- capped pool
- no React state loop

Lens:
- only active on media regions

Shader:
- progressive enhancement

Main LCP:
- real shop image loads first

Effects:
- after primary content

---

# 25. ACCESSIBILITY / REDUCED MOTION

When:
`prefers-reduced-motion: reduce`

Disable:
- bird flight
- feather trail
- lens movement
- parallax
- ambient motion
- rainbow trail
- click particle burst

Keep:
- readable static layout
- normal focus
- accessible interaction

Keyboard users must never depend on the cursor.

---

# 26. VISUAL QUALITY RULE

The hero should feel:

- premium
- modern
- warm
- artistic
- editorial
- tactile
- alive
- trustworthy

NOT:

- gaming
- childish
- cartoonish
- neon cyberpunk
- generic SaaS
- template-like
- overloaded

The Behance reference gives the composition inspiration; our brand identity must come from:
- real Chuadanga shop
- birds
- aquarium
- Aquarium Light
- premium interaction

---

# 27. REFERENCE USE POLICY

The Behance design is inspiration only.

Source:
https://www.behance.net/gallery/221423493/Pet-Care-Website-Hero-Section-Design

Use:
- composition principles
- spacing
- layered hero presentation
- floating information cards
- rounded premium surfaces
- soft color atmosphere
- visual hierarchy

Do NOT copy:
- artwork
- exact typography
- exact card placement
- exact colors
- exact people/animals
- exact illustrations
- branding
- text

---

# 28. IMPLEMENTATION ORDER

1. Replace current plain hero composition.
2. Establish new visual stage.
3. Add large editorial content area.
4. Add main image/animal composition.
5. Add floating info badges.
6. Add Aquarium Light background.
7. Add local lens/refraction interaction.
8. Improve bird cursor size.
9. Implement stable bird cursor movement.
10. Implement feather particle pool.
11. Implement iridescent/rainbow feather trail.
12. Implement click response.
13. Integrate hero/cursor/lens relationship.
14. Add desktop parallax.
15. Create mobile-specific hero.
16. Run performance and accessibility audit.

---

# 29. ACCEPTANCE CHECKLIST

Hero:
[ ] No generic SaaS hero
[ ] No plain rectangular image card
[ ] Reference-inspired premium composition
[ ] Real store content remains authentic
[ ] Large visual focal point
[ ] Floating micro-info feels intentional
[ ] CTA hierarchy clear

Cursor:
[ ] Larger 32–42px base
[ ] Smooth
[ ] No jitter
[ ] Natural direction
[ ] No React pointermove re-render
[ ] No cursor on touch-only mobile
[ ] Click interaction works

Trail:
[ ] Clearly visible feather shape
[ ] Premium iridescent rainbow
[ ] Short tail
[ ] Capped particle count
[ ] No lag
[ ] No infinite DOM growth

Lens:
[ ] Only appears over relevant media
[ ] Smooth follow
[ ] Subtle refraction
[ ] Does not distort text
[ ] Fades when leaving target
[ ] Falls back cleanly

Mobile:
[ ] No horizontal overflow
[ ] Touch feedback present
[ ] Lightweight
[ ] No desktop cursor
[ ] Reduced-motion support

Performance:
[ ] No paid dependency
[ ] No unnecessary library
[ ] LCP remains fast
[ ] Effects are progressive enhancement
[ ] No console errors

Final judgment:
If the hero still looks like “a normal website with animations added,” the implementation is not finished.

It must feel like one coherent designed environment.
