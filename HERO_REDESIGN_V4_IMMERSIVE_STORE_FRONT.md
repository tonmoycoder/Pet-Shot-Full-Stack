# HERO REDESIGN V4 — IMMERSIVE AQUARIUM LIGHT HERO
## Pet Shop O2O Digital Showroom — Bismillah Pakhi & Aquarium

> Status: VISUAL DIRECTION / ANTIGRAVITY IMPLEMENTATION SPEC
> Priority: High
> Replaces: the current hero image-in-a-rounded-card treatment
> Goal: premium, editorial, immersive, memorable — without sacrificing conversion or mobile performance.

---

# 1. PROBLEM WITH THE CURRENT HERO

The current hero places the real shop photograph inside a conventional rounded rectangular/card container on the right.

That creates three problems:

1. It reads like a normal SaaS/e-commerce hero.
2. The photograph feels like a component rather than part of the environment.
3. The Liquid Glass / Aquarium Light concept has no reason to exist around the photograph.

The image itself is useful and should remain. The presentation is what needs to change.

## DO NOT:
- use a bordered photo card
- use a standard 16:9 image box
- put a heavy shadow around the image
- place a generic glass panel over the image
- make the hero look like two unrelated columns
- turn the entire hero into a grid of cards

---

# 2. FINAL DIRECTION

## Name
### “Immersive Storefront — Aquarium Light Hero”

The hero should feel like the visitor is looking through a large opening into the real store.

The photograph is not a card.

The photograph is the HERO ENVIRONMENT.

The interface/content sits around and partially over that environment.

Core visual language:

- editorial asymmetry
- oversized Bangla typography
- edge-to-edge photographic composition
- organic media masking
- selective Liquid Glass
- aquarium caustic light
- subtle depth/parallax
- directional ambient movement
- real local store imagery
- strong CTA hierarchy

---

# 3. VISUAL COMPOSITION

## Desktop

Use approximately:

- 44% textual/content area
- 56% visual/environment area

BUT do not create a hard 44/56 split line.

The image should visually bleed into the page.

### Recommended composition

Left:
- tiny eyebrow/status
- very large Bangla headline
- short supporting copy
- primary WhatsApp CTA
- secondary Store CTA

Right:
- real store image occupying almost the full hero height
- image extends beyond the right viewport edge
- image can slightly extend below the hero baseline
- no visible card border
- no obvious rectangular frame

### Image crop

Use the existing real shop interior image.

Prefer:
- full-height crop
- slightly tighter crop
- shelves/aquariums/birds visible
- readable signboard where possible
- warm interior light

The image should feel like a photographic scene rather than a UI asset.

---

# 4. IMAGE SHAPE / MASK

Do not use the current rounded rectangle.

Use an organic “aperture” mask.

Recommended shape:
- large asymmetric organic curve on the left edge
- mostly open/clean right edge
- soft irregular bottom edge
- image can visually disappear into background through a gradient/fade

Conceptually:

          TEXT
       ┌─────────
       │
       │      ╭──────────────────── image
       │    ╭─
       │  ╭─
       │ ╭
       │╭
       └────────────────────────────

It should feel like an opening/window into the shop.

Do NOT make it look like a decorative blob.

The mask should be subtle and editorial.

---

# 5. EDGE BLEED

The hero image should reach the viewport edge on desktop.

No surrounding empty margin around the image.

Possible implementation:
- absolute visual layer
- `inset-inline-end: 0`
- width approximately 58vw
- height approximately 92vh
- object-fit: cover

The left edge is shaped with:
- clip-path
- SVG mask
or
- CSS mask-image

Choose the least expensive solution supported by the current browser matrix.

Prefer CSS/SVG mask over heavy WebGL geometry.

---

# 6. DEPTH STACK

The hero should have 4 visual layers.

## Layer 1 — Base
Warm off-white / pale aqua background.

## Layer 2 — Store photograph
The real shop image.

## Layer 3 — Aquarium Light
Very subtle aqua caustic/refraction overlay.

This layer must NOT reduce text readability.

## Layer 4 — Micro-depth accents
Very small:
- soft bubbles
- floating dust/light particles
- tiny feather motif
- ambient aqua glow

No particle explosion.

No generic star-field.

---

# 7. AQUARIUM LIGHT EFFECT

The existing Aquarium Light identity stays.

But the effect should be tied to the photograph.

The photo should feel as though aquarium light is moving across the space.

### Direction
Top-left → bottom-right.

### Movement
Slow.

Approx:
12–20 seconds per cycle.

### Properties
Animate primarily:
- transform
- opacity
- gradient position

Do not animate expensive:
- full-screen blur
- box-shadow
- large filter stacks

The light should be felt, not watched.

---

# 8. OPTIONAL WEBGL / SHADER LAYER

WebGL/WebGPU is allowed here because this is the visual signature area.

But:

CRITICAL CONTENT MUST EXIST WITHOUT IT.

Rendering order:

1. HTML/text
2. optimized static photograph
3. CSS lighting
4. shader enhancement

The page must look premium even when shader is unavailable.

### Feature detection

Desktop capable device:
WebGPU → use shader.

Fallback:
WebGL2 → lighter effect.

Fallback:
CSS caustic overlay.

Fallback:
static image.

Reduced motion:
static image + no moving caustics.

---

# 9. IMAGE MOTION

The shop photo should very slowly move.

Suggested:
- scale: 1.00 → 1.025
- translateX: ~0 → -8px
- translateY: ~0 → -4px

Duration:
18–28 seconds.

This is not a video effect.

It should feel like the image is breathing.

Do not continuously animate layout-affecting properties.

---

# 10. POINTER PARALLAX — DESKTOP

When pointer moves:
- image shifts very slightly
- aquarium light reacts slightly
- decorative layer shifts independently

Suggested maximum:
- photograph: 4–8px
- light layer: 8–14px
- micro accents: 10–18px

Use transform only.

Do NOT move the headline significantly.

The content must stay stable for readability.

---

# 11. BIRD CURSOR INTEGRATION

The previously approved Bird Cursor remains.

Do not redesign it here.

The hero should respond indirectly to it.

When the bird cursor enters the image area:
- aquarium light becomes a tiny bit brighter
- a small feather particle may appear once
- photo parallax can increase by a small amount

Do not trigger continuous extra effects.

The cursor remains the primary pointer interaction.

---

# 12. HERO TYPOGRAPHY

The headline must become more editorial.

Avoid a generic:
“আপনার ঘরে আসুক নতুন বন্ধু!”

Instead use something with brand emotion and place.

Candidate:

### “চোখের সামনে দেখুন।
তারপর পছন্দের সঙ্গীকে
কাছ থেকে চিনুন।”

Alternative:

### “দেখুন। পছন্দ করুন।
তারপর চলে আসুন
আমাদের দোকানে।”

The final copy should be chosen by the content system and may change.

Headline rules:
- 3–4 lines max desktop
- strong Bangla weight
- generous line-height
- no gradient text
- no huge outline
- no decorative effects that reduce readability

---

# 13. HERO EYEBROW / LIVE SIGNAL

Above headline:

`● এখন দোকান খোলা`

or:

`● আজকের আপডেট`

This must be dynamic and CMS-driven.

Do not display fake “live” data.

Possible supporting line:
`আজ নতুন পাখি এসেছে · ২ ঘণ্টা আগে`

Only if true.

---

# 14. CTA SYSTEM

Primary CTA:

### `WhatsApp-এ Live Video দেখুন`

Style:
- deep forest green
- cream/white text
- subtle aqua inner highlight
- magnetic desktop response
- tactile mobile press

Secondary:

### `কীভাবে আসবেন?`

Do not give both buttons the same visual weight.

Primary should clearly dominate.

---

# 15. MICRO-INTERACTIONS

## Primary CTA hover
- +2px lift
- subtle magnetic pull
- tiny highlight drift
- bird cursor reacts

## Primary CTA press
- scale 0.975
- fast spring back
- subtle aqua ring

## Secondary CTA
- minimal shift
- no large animation

---

# 16. STORE IMAGE ANNOTATIONS

Instead of placing large glass cards over the photo, use tiny editorial annotations.

Examples:

`বাস্তব দোকান`

`আজকের মাছ`

`পাখির খাঁচা`

`খাবার ও সরঞ্জাম`

These should behave like marginal notes.

Use:
- tiny typography
- thin connector line
- subtle glass only where needed

Maximum 2 annotations visible at once.

---

# 17. “SHOPKEEPER” TRUST MOMENT

A very small trust element can sit near the bottom of the content side:

`রফিক আহমেদ`
`বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম`

Only use an actual person's name/photo after owner confirmation and consent.

Do not invent a shopkeeper identity.

---

# 18. HERO TRANSITION INTO NEXT SECTION

Do NOT end the hero with a hard rectangular bottom edge.

Use one of:

A. image bleed into next section
B. curved organic section transition
C. overlapping discovery content
D. horizontal “today” strip that appears to emerge from the hero

Preferred:
### D — Today strip emerging from hero

Example:
`আজকের আপডেট → নতুন পাখি • নতুন মাছ • নতুন সরঞ্জাম`

This creates a continuous visual journey.

---

# 19. MOBILE HERO

Mobile must NOT simply stack the desktop hero.

Mobile layout:

1. eyebrow/status
2. headline
3. supporting copy
4. primary CTA
5. photo scene
6. today/update strip
7. next section

### Image presentation

Instead of a card:
- full-width viewport image
- approximately 58–68vh
- image edge bleeds left/right
- organic mask only if it improves composition
- no heavy border
- no glass card

The image should feel like a cinematic mobile poster.

### Mobile motion
- no pointer parallax
- very subtle scroll-linked depth
- touch press interactions
- CSS caustic or static image fallback
- no continuous particle trail

---

# 20. MOBILE PERFORMANCE

The hero image is likely LCP.

Therefore:

- image must be optimized
- correct aspect ratio declared
- preload/fetch priority where appropriate
- AVIF/WebP
- responsive `srcset`
- no shader before LCP
- no heavy JS before content is visible

Target:
- fast first render
- stable layout
- no hero height jump

---

# 21. WHY THIS IS BETTER

This direction changes the image from:

`photo inside a UI card`

to:

`photo = visual world of the hero`

That is the core difference.

It makes the website feel closer to editorial / interactive / award-style landing pages while still keeping the site useful.

Unsection's current hero inspiration library shows that contemporary hero patterns frequently combine large type with image, card, uncommon or colorful treatments rather than relying on a generic two-column card layout. citeturn769752search0turn769752search2

Awwwards examples explicitly feature interactive 3D heroes, cinematic/parallax hero images, and interactive WebGL hero treatments. citeturn787790search1turn787790search6

Animmaster's current library similarly categorizes hero, mouse, scroll, WebGL shader, SVG and 3D interactions as separate interaction patterns that can be composed selectively. citeturn787790search0

React Bits' current portfolio template demonstrates a similar principle: a signature WebGL flow shader + magnetic interaction can create a distinctive hero while retaining a responsive, accessible React implementation. citeturn787790search10

Supahero's Eddie example also combines bento, 3D animation and a character-led experience rather than treating the hero as a static card. citeturn787790search9

---

# 22. WHAT WE ARE NOT COPYING

Do NOT copy any reference site.

We are borrowing principles:

- large editorial type
- immersive media
- visual depth
- interactive hero
- asymmetric composition
- subtle 3D
- pointer response
- scroll continuity

The final result must remain specifically:
### Bismillah Pakhi & Aquarium
### Chuadanga
### Aquarium Light

---

# 23. IMPLEMENTATION ORDER

Antigravity must implement in this order:

### Task 1
Remove current right-side rounded image card.

### Task 2
Implement immersive photo stage.

### Task 3
Implement organic media mask / edge bleed.

### Task 4
Add editorial annotations.

### Task 5
Add subtle image breathing motion.

### Task 6
Add desktop pointer parallax.

### Task 7
Add Aquarium Light CSS overlay.

### Task 8
Integrate optional shader enhancement.

### Task 9
Integrate approved Bird Cursor response.

### Task 10
Refine CTA micro-interactions.

### Task 11
Implement mobile-specific hero.

### Task 12
Performance + accessibility audit.

---

# 24. HARD CONSTRAINTS

Never:
- turn the hero back into a rounded card
- use excessive glass
- cover the photo with a dark glass panel
- use giant 3D animals
- add autoplay video if it hurts mobile performance
- make shader required
- use paid services
- create layout shift
- sacrifice readability for animation
- add five different animation libraries for one hero

---

# 25. ACCEPTANCE CRITERIA

The hero passes only if:

[ ] Photo no longer looks like a card
[ ] Hero feels immersive
[ ] Text remains readable
[ ] Primary CTA is immediately obvious
[ ] Aquarium Light has a visual reason to exist
[ ] Pointer interaction is subtle
[ ] Bird cursor integrates naturally
[ ] Image movement feels cinematic
[ ] Mobile feels designed, not merely responsive
[ ] Hero works without WebGPU
[ ] Reduced motion works
[ ] LCP image remains optimized
[ ] No paid service is required
[ ] No horizontal overflow
[ ] No excessive visual noise

Final test question:

### “Does this feel like a premium digital window into a real pet store, or does it still look like a template?”

If it still looks like a template, continue refining before proceeding to the next homepage section.
