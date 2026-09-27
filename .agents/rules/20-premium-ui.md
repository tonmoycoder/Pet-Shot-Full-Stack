# Premium UI Rules — Aquarium Light / Premium Motion Edition

## Experience target

The site must feel premium, tactile, cinematic, memorable, and alive — not like a generic SaaS dashboard or ordinary Shopify template.

## Visual language

- Aquarium Light: warm dusk + aquarium caustics + tactile physical retail materials.
- Organic asymmetry is allowed, but every unusual layout must improve hierarchy or storytelling.
- Use glass selectively, never as a universal card treatment.
- Clay/tactile depth should be subtle and mostly simulated with layered pseudo-elements.
- Bangla typography must be deliberate, readable, and vertically generous.

## Motion hierarchy

1. Micro-interactions: CSS transitions.
2. React interaction / enter / layout: Motion.
3. Complex scroll choreography: GSAP only where the scene genuinely benefits.
4. Hero caustics / WebGL / WebGPU: one controlled signature layer only, progressively enhanced.
5. 3D/Spline is optional and off by default until a concrete scene earns it.

## Signature motion

Liquid Glass ambient light:
- one-way directional drift
- 12–20s cycle
- no bounce
- no visible reverse
- very low amplitude
- never animate expensive blur per frame

## Pointer / touch

- Desktop may use a refined custom cursor, magnetic CTA, and pointer-follow highlights.
- Mobile has NO desktop cursor logic.
- Mobile uses press-scale/spring/tactile feedback.
- Every gesture must work with keyboard and touch alternatives.

## Performance

- Never put premium effects in the critical rendering path when they can be layered later.
- LCP content must remain plain, optimized HTML/CSS/media.
- Prefer transform/opacity animation.
- Do not animate box-shadow or border-radius continuously.
- Provide reduced-motion fallbacks.
