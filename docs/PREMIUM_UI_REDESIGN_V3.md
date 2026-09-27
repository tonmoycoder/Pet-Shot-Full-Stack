# PET SHOP — PREMIUM IMMERSIVE UI REDESIGN V3
## “Aquarium Light — Premium Motion Edition”

**Status:** Proposed replacement for the previous simple/flat UI direction
**Audience:** Claude, Antigravity, Ralph-style coding agents, frontend engineers, UI/UX designers
**Purpose:** This is the new visual + interaction source of truth. The previous “too simple / too safe” presentation is explicitly superseded by this document.

---

# 0. IMPORTANT CORRECTION

The previous UI direction optimized too aggressively for simplicity, which removed too much of the premium layer.

The final website must still be clear and conversion-focused, but it must **look and feel like a high-end interactive digital showroom**, not a generic SaaS landing page or ordinary pet-shop template.

The target emotional reaction is:

> “এটা শুধু একটা pet shop website না — এটা use করতে ভালো লাগে।”

A user should notice:

- premium visual composition
- depth and light
- fluid motion
- beautiful transitions
- responsive touch feedback
- interactive hero
- elegant cursor behavior on desktop
- shader/refraction effects
- strong photography/video treatment
- unusually polished CTA interactions

But the experience must never become a visual-demo website that hides information.

**Premium does not mean cluttered. Premium means controlled richness.**

---

# 1. PROJECT NORTH STAR

## Product

A premium, mobile-first digital showroom for a real pet store in Bangladesh.

## Business model

This is **not** conventional e-commerce.

Do NOT introduce:

- cart
- checkout
- online payment
- courier workflow
- delivery tracking
- artificial scarcity
- fake reviews
- fake inventory counts
- fabricated health claims

The business conversion path remains:

`Discover → Explore → Trust → See → Contact → Visit`

Primary conversion actions:

1. WhatsApp
2. Live video request through WhatsApp
3. Phone call
4. Directions
5. Store visit

## Language

Bangla first.

English available through a visible language toggle.

## Device priority

Mobile is the primary experience.

Desktop is the premium cinematic experience.

The two experiences must be related, but desktop must NOT simply be a scaled-up mobile UI.

---

# 2. NEW VISUAL THESIS

## Name

# Aquarium Light — Premium Motion Edition

The visual metaphor is not “glassmorphism”.

It is:

> **A warm pet shop at dusk, viewed through layers of glass, aquarium light, humid air, reflections and soft ambient movement.**

This gives Liquid Glass a reason to exist instead of making it a trend decoration.

The experience combines:

- aquarium refraction
- warm indoor light
- soft tropical greens
- wet/glossy surfaces
- glass depth
- natural material texture
- premium editorial composition
- controlled 3D depth
- subtle organic motion
- photographic realism
- tactile touch feedback

---

# 3. DESIGN LANGUAGE

## 3.1 Visual hierarchy

The website uses four visual layers.

### Layer 1 — Real world

The physical store, real animals, real people, real products, real location.

### Layer 2 — Ambient atmosphere

Light, glow, reflection, blur, grain, depth and shader movement.

### Layer 3 — Interactive interface

Glass panels, pills, controls, cards, CTA surfaces.

### Layer 4 — Motion

Scroll choreography, mouse response, touch response, transitions, reveals.

The real content always wins over the effects.

---

# 4. COLOR SYSTEM

Primary palette:

- Deep Forest: `#10382F`
- Pine: `#174C40`
- Aquarium Teal: `#67D8CE`
- Deep Aqua: `#248F88`
- Warm Sand: `#F3EEE3`
- Concrete Cream: `#E8E0D2`
- Mango: `#FFC85C`
- Coral: `#F7816C`
- Ink: `#10201C`
- Soft Mist: `#F8F6F0`

### Rules

Do not use all accent colors simultaneously.

Each screen should have:

- one dominant neutral
- one primary brand color
- one accent
- optional warm highlight

Accent colors should appear as signals, not decoration.

---

# 5. TYPOGRAPHY

## English

Plus Jakarta Sans.

## Bangla

Hind Siliguri.

## Bangla typography rules

Bangla headings may use heavier visual weight than English equivalents.

Use generous line-height.

Never compress Bangla typography to fit the Latin spacing system.

Long Bangla labels should wrap intentionally instead of becoming tiny.

Price numbers should use Latin numerals by default for universal scanning:

`৳ 1,800`

Bangla numerals may be used in editorial/marketing copy where they improve the visual rhythm.

---

# 6. LAYOUT SYSTEM

## Desktop

12-column grid.

Max content width: approximately 1280–1440px.

Large negative space.

Editorial asymmetry is allowed.

Not every section should be a centered card grid.

## Tablet

8-column logical grid.

## Mobile

4-column logical grid.

Primary content width should remain comfortable for thumb use.

Use full-bleed media selectively.

Avoid excessive horizontal padding that makes cards tiny.

---

# 7. SURFACE SYSTEM

There are three primary surfaces.

## A. Glass Surface

Used for:

- navbar
- hero controls
- featured CTA
- floating action controls
- selected cards
- live-video overlay

Properties:

- translucent fill
- `backdrop-filter: blur(...)`
- 1px low-opacity border
- inner highlight
- soft shadow
- subtle ambient light
- no animated blur radius

## B. Editorial Surface

Used for:

- dark storytelling blocks
- store section
- live-video section
- testimonial moments

Characteristics:

- large type
- fewer elements
- strong image treatment
- asymmetric layout

## C. Physical Surface

Used for subtle visual anchoring:

- wood
- concrete
- terracotta
- paper
- aquarium glass

Never use texture everywhere.

---

# 8. SIGNATURE VISUAL EFFECTS

This version intentionally restores premium effects.

## Effect 01 — Aquarium Caustics Shader

Primary hero visual.

A lightweight interactive shader simulates soft water-light refraction.

It should look like light moving through water, not like a generic neon gradient.

Inputs:

- time
- pointer x/y on desktop
- scroll progress
- optional touch position on mobile

Behavior:

- slow ambient motion continuously
- slight pointer influence
- slight intensity increase near hero focal object
- no aggressive distortion

Fallback:

CSS animated gradient + masked highlight.

WebGPU support should be feature-detected.

Do not make the entire page WebGL.

---

# 9. SIGNATURE GLASS MOTION

Liquid Glass uses **directional movement**.

Do not bounce.

Do not oscillate visibly.

Do not reverse direction every few seconds.

Preferred motion:

`upper-left → center → lower-right`

Duration:

12–20 seconds.

Amplitude:

2–8px perceived movement.

The moving light should appear to pass through the surface.

Recommended implementation:

- pseudo-element
- masked gradient
- `transform` / `opacity`
- optional CSS custom properties

Do NOT animate `backdrop-filter` every frame.

---

# 10. CUSTOM DESKTOP CURSOR

Use only on fine-pointer devices.

Two-layer system:

### Outer ring

Small soft circular ring following pointer with slight spring delay.

### Inner state

Contextual label such as:

- `দেখুন`
- `খুলুন`
- `জিজ্ঞাসা করুন`
- `টানুন`

When entering CTA:

- ring expands
- label appears
- background changes subtly

When over an image:

- cursor may become a small “view” indicator

When over non-interactive content:

- keep cursor minimal

Never hide the native cursor for keyboard or accessibility users.

Disable custom cursor when:

- pointer is coarse
- touch is detected
- reduced motion is requested
- user has accessibility constraints

---

# 11. MAGNETIC CTA SYSTEM

Primary CTA buttons can have subtle magnetic attraction.

Desktop only.

Maximum translation:

6–10px.

Never make buttons chase the cursor dramatically.

Primary CTAs:

- WhatsApp
- Live Video
- Directions
- Call

Hover:

- magnetic pull
- slight scale
- inner shine

Press:

- slight compression
- spring return

Mobile:

Do NOT use magnetic behavior.

Instead use touch press response.

---

# 12. TOUCH INTERACTION SYSTEM

Every hover interaction must have a touch equivalent.

Examples:

### CTA

Desktop:

hover → magnetic + highlight

Mobile:

tap → compress + glow + release

### Product card

Desktop:

hover → image tilt / depth

Mobile:

touch → 1–2% scale + content emphasis

### Image

Desktop:

pointer → subtle parallax

Mobile:

drag/swipe or tap → controlled movement

### Glass panel

Desktop:

pointer spotlight

Mobile:

ambient light remains autonomous

---

# 13. PHONE / APP-LIKE MICRO-INTERACTION

The website should feel tactile on mobile.

When a user taps a primary CTA:

1. button compresses slightly
2. icon moves 1–2px
3. highlight brightens
4. label remains readable
5. action launches immediately

For cards:

1. tactile scale response
2. image settles
3. route transition begins

Do not delay actual navigation for animation.

Animation must feel attached to the action, not block it.

---

# 14. HERO — THE “WOW” ZONE

The hero must be the highest-polish area on the website.

## Composition

Desktop:

Left:

- large Bangla headline
- supporting copy
- primary CTA
- secondary CTA
- store-open signal

Right / full-frame:

- premium real store or animal photography
- shader light layer
- floating glass information card
- subtle depth

Optional atmospheric object:

- glass aquarium orb / floating water-light object

This object must never become a cartoon illustration.

## Hero animation sequence

### Phase A — 0–600ms

Very subtle logo/surface reveal.

### Phase B — 500–1100ms

Headline lines reveal vertically.

### Phase C — 700–1400ms

Hero image/subject enters with scale + blur-to-sharp transition.

### Phase D — 900–1600ms

CTA surfaces settle into place.

### Phase E — continuous

Shader / caustic light movement.

### Phase F — pointer interaction

Photo/parallax layer moves by 2–12px.

Shader intensity responds gently.

Glass card reacts with slight depth.

## Hero scroll behavior

As user scrolls:

- hero copy moves slightly slower
- image moves slightly faster
- glass surface catches light
- next section rises before hero completely disappears

Avoid aggressive pinned hero takeover on mobile.

---

# 15. HERO COPY DIRECTION

Default concept:

> **সঙ্গী খুঁজে আসুন, ঘরে আলো নিয়ে যান।**

Supporting copy should explain the physical-store advantage.

Primary:

> **WhatsApp-এ কথা বলুন**

Secondary:

> **স্টোরে আসুন**

Live status:

> `● এখন খোলা`

Freshness signal:

> `আজকের আপডেট · ২ ঘণ্টা আগে`

The “fresh” signal must be real CMS data.

---

# 16. DISCOVERY SURFACE

Do not create a standard product-grid section.

Create an interactive discovery canvas.

## Top control

Three modes:

`প্রাণী` · `খাবার` · `অ্যাক্সেসরিজ`

Below:

filter chips:

`সব` · `পাখি` · `মাছ` · `কুকুর` · `বিড়াল`

## Visual treatment

Cards should have different sizes.

1 dominant feature card.

2–4 supporting cards.

Images may break the grid slightly.

## Card interactions

Desktop:

- hover image scale
- subtle tilt
- spotlight
- CTA reveal

Touch:

- press response
- horizontal swipe where appropriate

Each card shows:

- name
- type
- age where relevant
- health/status where available
- price/range
- availability
- “জিজ্ঞাসা করুন”

No Add to Cart.

---

# 17. SHARED ELEMENT TRANSITIONS

Use shared-layout style transitions where useful.

Example:

Animal thumbnail → animal detail hero image.

Category chip → filtered discovery surface.

CTA → WhatsApp/action state.

The transition should make the interface feel spatially continuous.

Do not animate every navigation.

---

# 18. LIVE VIDEO SECTION

This is one of the premium signature sections.

Visual metaphor:

A phone floating inside a dark editorial aquarium-light environment.

Inside phone:

- WhatsApp conversation style
- Live video preview
- animal image
- “এখন দেখুন” action

Outside phone:

- explanatory text
- short trust note
- CTA

## Motion

Phone:

- slow 3D-like floating motion
- tiny tilt linked to scroll progress

Screen:

- subtle animated live preview

Glass frame:

- directional light drift

CTA:

- press/magnetic interaction on desktop
- tap compression on mobile

---

# 19. STORE EXPERIENCE

Do not make this a basic map block.

Use storytelling.

## Desktop

Large visual storefront scene.

Small floating information cards:

- এখন খোলা
- আজকের সময়
- কীভাবে আসবেন
- কী আশা করবেন

Store image can have:

- depth layer
- light bloom
- subtle camera pan

Map is secondary.

The human/store story is primary.

## Important trust element

Real named shopkeeper / owner profile:

- real photo
- real name
- years serving customers
- first-person sentence

Only use verified/consented data.

---

# 20. STORE MAP

The map must remain functional and visually subordinate.

Use:

- custom store marker
- landmark-based address
- directions CTA
- open/closed status

Visual rule:

Map should appear like part of the brand experience, not an embedded generic map taking over the page.

---

# 21. TRUST STRIP

Keep it inline.

Use 3–4 concise proof points.

Example:

`২৭ বছর ধরে · বাস্তব স্টোর · সরাসরি যোগাযোগ · Facebook-এ যাচাইযোগ্য মতামত`

Only show real claims.

No invented star ratings.

---

# 22. FINAL CTA

Final CTA is not a form.

It should feel like a warm invitation.

Suggested direction:

> **চলে আসুন — চা খেতে খেতে গল্প করি।**

Background:

- warm dark green
- glass portal
- aquarium light
- slow light movement

Buttons:

- WhatsApp
- Call
- Directions

The final CTA is a visual “landing” after the journey.

---

# 23. FOOTER

Minimal but premium.

Use:

- logo
- address
- hours
- contact actions
- language switch
- social links
- small editorial line

Optional:

small animated SVG mark.

---

# 24. MOBILE EXPERIENCE — THIS IS NOT A SHRUNK DESKTOP

Mobile must be deliberately designed.

## Hero

Use 72–88vh rather than oversized desktop cinematic height.

The text should appear above or overlapping image intelligently.

Shader intensity reduced.

No cursor.

No hover.

## Cards

Use horizontal scroll or stacked layouts.

Avoid 3-column desktop grids becoming tiny cards.

## Motion

Allowed:

- tap scale
- press spring
- scroll-linked transforms
- image reveal
- section entrance
- subtle light drift

Reduced:

- shader complexity
- parallax amplitude
- simultaneous motion layers

Disabled:

- custom cursor
- aggressive tilt
- desktop-only hover reveals

---

# 25. MOBILE NAVIGATION

Five slots:

`হোম · এক্সপ্লোর · WhatsApp · কল · স্টোর`

The WhatsApp and Call actions must remain immediately reachable.

Use safe-area support.

Support `100dvh`, not only `100vh`.

Do not cover browser UI on modern mobile devices.

---

# 26. MOTION STACK — FINAL V3

This is intentionally richer than the previous MVP-only stack.

## Tier 1 — CSS

Use for:

- glass ambient drift
- gradients
- opacity
- simple hover
- shimmer
- border changes
- transform transitions

## Tier 2 — Motion for React

Use for:

- enter/exit
- layout transitions
- gestures
- tap
- hover
- drag
- in-view
- route transitions
- shared element transitions

## Tier 3 — GSAP + ScrollTrigger

Use selectively for:

- hero scroll choreography
- pinned editorial scenes
- scroll-linked camera-style movement
- layered reveal
- complex sequence timing

Do not use GSAP for ordinary buttons/cards.

## Tier 4 — WebGPU / Shaders

Use only for:

- hero aquarium light
- one premium image/visual interaction

Do not render the entire page through WebGL.

## Tier 5 — Spline

Optional.

Only if a real product/story need exists.

Potential use:

- a small aquarium/store object
- interactive 3D product visual

Must have:

- mobile static fallback
- reduced-motion fallback
- lazy load

If the Spline object does not improve UX, do not ship it.

---

# 27. LIBRARY INSPIRATION MAP

## Unsection

Use for:

- unusual section compositions
- asymmetrical layouts
- hero patterns
- hover ideas
- bento variations
- SVG shapes

Do not copy layouts literally.

## Supahero

Use for:

- premium hero composition
- headline/image hierarchy
- hero CTA positioning

## Animmaster

Use as motion inspiration for:

- hero animation
- hover effect
- WebGL shader
- scroll animation
- mouse effect
- SVG animation
- physics effect
- navigation motion

## React Bits

Use selective React patterns for:

- spotlight effects
- magnetic interactions
- text effects
- hover surfaces
- animated cards
- fluid glass ideas

## Spline

Use only for intentional 3D.

## Shaders

Use for signature WebGPU visual effects.

## Awwwards / Timace

Use as reference for current high-end web interaction patterns.

Do not turn the site into an Awwwards clone.

---

# 28. ANIMATION QUALITY RULES

Every animation must answer at least one of these:

1. What did the user just do?
2. What is changing?
3. Where should the user's attention move?
4. What makes the product feel tangible?
5. What makes the brand memorable?

If the answer is “it looks cool”, the animation is suspect.

---

# 29. MOTION TIMING TOKENS

Suggested tokens:

```text
micro: 120–180ms
standard: 220–360ms
expressive: 450–800ms
hero: 900–1600ms
ambient: 12–20s
```

Spring:

- low bounce
- medium stiffness
- quick settle

Avoid cartoonish overshoot.

---

# 30. SCROLL EXPERIENCE

The website should feel like a guided visual journey.

## Scroll rhythm

Hero
→ discovery
→ trust
→ live video
→ store
→ final invitation

Each section should have a distinct visual rhythm.

Do not animate every section identically.

Examples:

Hero:
parallax + shader

Discovery:
card depth + reveal

Live Video:
phone choreography

Store:
slow storytelling movement

Final CTA:
ambient light + portal transition

---

# 31. PERFORMANCE BUDGET

Premium does not justify poor performance.

## Desktop

Allow:

- one shader canvas
- one major scroll timeline
- multiple lightweight DOM animations

## Mobile

Prefer:

- CSS effects
- Motion for essential gestures/reveals
- reduced shader resolution or CSS fallback

Do not stack:

- shader
- large video
- several parallax layers
- huge blur surfaces
- 3D scene

all at once.

## Detection

Use:

- `prefers-reduced-motion`
- pointer type
- viewport size
- WebGPU support
- `navigator.connection?.saveData` when available

Fallback must be automatic.

---

# 32. ACCESSIBILITY

Premium interactions must never replace basic semantics.

Require:

- keyboard navigation
- focus-visible states
- semantic buttons/links
- alt text
- readable contrast
- reduced-motion mode
- screen-reader labels

Custom cursor is supplementary.

Animations are supplementary.

The CTA must remain understandable with all effects disabled.

---

# 33. REDUCED MOTION

When reduced motion is requested:

Disable:

- looping shader animation where possible
- cursor lag
- parallax
- aggressive scroll choreography
- floating phone motion
- repeated decorative motion

Keep:

- instant state change
- very short opacity transitions where appropriate
- essential feedback

---

# 34. CONTENT AUTHENTICITY RULE

The premium design depends on real content.

The following must be real before production:

- animal images
- current availability
- store hours
- address/landmark
- shopkeeper identity
- testimonials
- update timestamps

If data is unavailable:

Use a neutral placeholder state.

Never fabricate credibility.

---

# 35. COMPONENT ARCHITECTURE

Suggested components:

```text
ui/
  GlassSurface
  GlassButton
  MagneticButton
  TouchButton
  SpotlightCard
  TiltCard
  Reveal
  SplitText
  CursorFollower
  ScrollScene
  ShaderCanvas
  SafeImage
  MediaFrame

sections/
  HeroImmersive
  DiscoverySurface
  TrustStrip
  LiveVideoStory
  StoreExperience
  FinalCTA

navigation/
  Header
  MobileNav
  LanguageToggle

content/
  AnimalCard
  ProductCard
  AvailabilityBadge
  StoreStatus
  ShopkeeperProfile
  Testimonial

conversion/
  WhatsAppButton
  CallButton
  DirectionsButton
```

Do not put animation logic inside every content card.

Build shared interaction primitives.

---

# 36. FRONTEND IMPLEMENTATION PRINCIPLE

The developer must implement the design in this order:

1. visual tokens
2. surfaces
3. typography
4. motion tokens
5. interaction primitives
6. hero
7. discovery
8. live-video story
9. store experience
10. final CTA
11. mobile adaptations
12. CMS wiring

Do not wire complex CMS behavior before the visual skeleton works.

But do not hardcode final production data.

---

# 37. VISUAL QA GATE

A build fails visual QA if:

- it looks like a generic SaaS landing page
- every section is a centered card grid
- Liquid Glass is used everywhere
- the hero is static and flat
- there is no strong visual focal point
- buttons look like stock shadcn buttons
- mobile is merely a stacked desktop
- hover effects have no touch equivalent
- the premium effects are only gradients with no interaction

A successful build should feel:

- editorial
- tactile
- spatial
- warm
- cinematic
- premium
- local
- alive

---

# 38. “WOW” CHECKLIST

Before calling the homepage complete, verify:

- [ ] Hero has a memorable visual effect
- [ ] Hero responds to pointer on desktop
- [ ] Hero responds naturally to touch on mobile
- [ ] Glass surfaces have directional light movement
- [ ] CTA feels tactile
- [ ] Discovery cards feel spatial
- [ ] At least one shared-element transition exists
- [ ] Scroll reveals are not generic fade-ups everywhere
- [ ] One shader/WebGPU effect has a clear visual purpose
- [ ] Live-video section feels like an interactive product story
- [ ] Store section feels connected to a real physical place
- [ ] Final CTA feels like a designed ending
- [ ] Reduced-motion mode works
- [ ] Mobile remains fast

---

# 39. WHAT MUST NOT HAPPEN AGAIN

Do not reduce this design back to:

- plain white background
- static hero image
- standard rounded cards
- generic green buttons
- simple fade-up animations
- default shadcn styling
- “glass card” repeated everywhere
- a basic map section
- ordinary 3-column grids

The goal is not to make the project simpler than necessary.

The goal is to make it **rich where richness creates emotion and clarity**.

---

# 40. AGENT INSTRUCTION — NON-NEGOTIABLE

```text
Do not simplify this design direction merely because a simpler implementation is easier.

The project intentionally requires a premium interactive layer.

Preserve:
- immersive hero
- shader/refraction effect
- directional Liquid Glass motion
- desktop pointer interactions
- mobile touch interactions
- tactile CTA feedback
- scroll choreography
- editorial composition
- spatial card interactions
- premium final CTA

However:
- do not add random animation
- do not use every animation library everywhere
- do not sacrifice accessibility
- do not sacrifice mobile performance
- do not turn the site into a visual demo
- do not hide real product information behind effects

When forced to choose:
1. readability
2. conversion
3. performance
4. accessibility
5. premium motion

But do not eliminate premium motion simply because it is harder.
Instead, implement the smallest technically sound version that preserves the intended experience.
```

---

# 41. FINAL DESIGN PHILOSOPHY

The old approach was:

> “Make it clean, modern and easy.”

The new approach is:

> **“Make it clean enough to understand, rich enough to remember, and tactile enough to enjoy.”**

The website should feel like a **digital showroom**, not a template.

The animations should feel like a **physical environment reacting to the visitor**, not a slideshow.

The glass should feel like **real glass catching aquarium light**, not transparency CSS.

The shader should feel like **water and light**, not a random WebGL background.

The cursor should feel like **an extension of the interface**, not a gimmick.

Touch should feel like **pressing a physical object**, not merely tapping a link.

And every effect must ultimately serve the same business journey:

`Discover → Explore → Trust → See → Contact → Visit`

---

# 42. SOURCES / INSPIRATION REFERENCES

Primary inspiration sources supplied for the project:

- https://www.unsection.com/
- https://supahero.io/
- https://animmasterlib.dev/
- https://reactbits.dev/
- https://spline.design/
- https://shaders.com/
- https://soymarketingultra.com/en/animated-ui-component-libraries/
- https://www.awwwards.com/awwwards/collections/animation-libraries-examples-inspiration/
- https://www.timace.io/best/best-animation-libraries

Implementation/reference documentation:

- https://motion.dev/docs/react
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://payloadcms.com/docs/database/postgres
- https://www.postgresql.org/docs/current/pgtrgm.html

Current research confirms that Unsection provides a large library of hero/feature/CTA/hover patterns, Animmaster exposes hero, scroll, mouse, WebGL, 3D and text-animation examples, Shaders currently focuses on production WebGPU effects, Spline supports interactive 3D web experiences including React/Next.js, and Motion supports React gestures, scroll, layout and reduced-motion APIs. These should be used selectively rather than indiscriminately.

---

# 43. FINAL STATUS

**This document supersedes the previous “Motion + CSS only / minimal visual effects” direction.**

The new MVP direction is intentionally:

**Premium + Immersive + Interactive + Mobile-first + Conversion-first.**

Advanced effects are allowed and encouraged when they have a clear UX or brand purpose.
