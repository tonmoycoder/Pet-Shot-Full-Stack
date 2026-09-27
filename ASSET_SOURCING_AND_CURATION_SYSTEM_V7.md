# ASSET SOURCING & CURATION SYSTEM V7
## Bismillah Pakhi & Aquarium — Premium O2O Digital Showroom

Purpose: make the agent proactively find, legally reusable, high-quality real-looking assets that match the project's Aquarium Light visual language, download them locally, optimize them, and map them to actual UI components.

## 1. PRIORITY
1. Real shop/client assets
2. Free licensed external photography/video for generic supporting visuals
3. Decorative/abstract generated assets only when real photography is not required

Never use stock/AI images as if they are the shop's actual animals, products, staff, customers, or premises.

## 2. CURATION PROCESS
Discover → shortlist → verify license → download → optimize → map to component → visual QA.

Do not take the first search result. Research 10–20 candidates when practical, shortlist 3–5, then select the best fit.

## 3. SEARCH CATEGORIES

### Birds
budgerigar/budgie, Indian ringneck, Alexandrine, pigeons/fancy pigeons, quail, ornamental poultry, bird cages, feeders, seed mix.

Search terms:
- budgerigar close up natural light
- budgie premium photography
- indian ringneck parakeet portrait
- fancy pigeon portrait
- pigeon iridescent feathers
- quail bird close up
- ornamental chicken natural light
- premium bird cage
- bird feeding close up

### Aquarium fish
goldfish, fancy goldfish, betta, guppy, molly, platy, angelfish, neon tetra, corydoras, koi, Oscar, Flowerhorn.

Search terms:
- goldfish aquarium premium photography
- fancy goldfish close up
- betta fish macro aquarium
- guppy aquarium natural
- angelfish aquarium
- neon tetra school aquarium
- corydoras aquarium
- koi water reflection

### Aquarium atmosphere
planted aquarium, aquascape, water reflections, bubbles, caustic light, aquarium glass, warm aquarium store interiors, aquarium equipment.

Search terms:
- premium planted aquarium
- aquascape cinematic
- aquarium blue light reflection
- aquarium caustic light
- water caustics
- aquarium glass reflection
- aquarium shop interior

### Accessories
bird cages, feeders, perches, toys, seed mix, aquarium filters, sponge filters, air pumps, heaters, lights, gravel, plants, nets, aquarium food, water testing.

## 4. VISUAL STYLE
Match:
- warm cream/off-white
- forest/deep green
- aqua/teal/cyan
- sand
- mango/gold
- restrained coral/lavender only for iridescent accents

Lighting:
- warm natural light
- aquarium blue/teal ambient
- soft side light
- controlled highlights
- realistic reflections

Reject assets that look:
- generic corporate
- childish
- neon gaming RGB
- heavily AI-generated
- anatomically wrong
- over-saturated
- low resolution
- watermarked
- badly compressed
- visually inconsistent

## 5. HERO ASSET SET
Prepare:
- real shop interior image
- one strong animal/aquarium focal image
- one aquarium caustic/light asset
- one subtle feather/bubble texture

The hero must support desktop/tablet/mobile crops, parallax, local lens/refraction and the Aquarium Light atmosphere.

## 6. AUTHENTICITY RULE
If UI says:
“আজকের সঙ্গী” → prefer real shop animal photo.
“আমাদের দোকান” → only real Bismillah Pakhi & Aquarium photo.
Educational/care content → external stock may be used.

Never imply a sourced external shop/person/animal is the client's.

## 7. FREE SOURCES
Preferred:
- Pexels
- Unsplash
- Pixabay
- Openverse
- Wikimedia Commons

Current license notes:
- Pexels: photos/videos are free for commercial use, attribution not required; separate rights may apply to recognizable people/brands.
- Unsplash: images are generally free for commercial/personal use under its license; prohibited uses still apply.
- Pixabay: free use under its content license, but standalone redistribution and trademark/other rights have restrictions.
- Wikimedia Commons/Openverse: verify the individual asset's license; attribution or share-alike may be required.

Never assume “free” means “no restrictions.”

## 8. DOWNLOAD RULE
Prefer downloading selected assets into the project rather than hotlinking them.

Suggested folders:
public/assets/sourced/birds
public/assets/sourced/fish
public/assets/sourced/aquarium
public/assets/sourced/store-atmosphere
public/assets/sourced/products
public/assets/sourced/textures

Keep originals separate from optimized derivatives when practical.

## 9. PROVENANCE
Create:
docs/assets/asset-manifest.json

Each entry:
- id
- filename
- category
- sourceSite
- sourceUrl
- creator
- license
- licenseUrl
- downloadedAt
- attributionRequired
- attributionText if needed
- usedIn
- notes

Also create:
docs/assets/ASSET_BOARD.md

For each asset: why selected, where used, crop notes, source, license, replacement option.

## 10. FILE NAMES
Use:
bird-budgerigar-natural-01.webp
fish-goldfish-aquarium-01.webp
aquarium-caustics-aqua-01.webp
store-atmosphere-aquarium-shop-01.webp

Never use IMG_1234.jpg / download(2).png.

## 11. OPTIMIZATION
Use the project's image pipeline. Prefer AVIF/WebP derivatives where appropriate, responsive dimensions, correct aspect ratios, and lazy loading below the fold. Only preload genuine LCP assets. Do not ship giant source files directly.

## 12. VIDEO
Only free/licensed video. Prefer clean loops, no watermark, no external logos. Use selectively. Do not autoplay heavy video on mobile by default.

## 13. NO IMAGE DUMP
Initial curated target:
- 8–12 bird images
- 10–15 fish images
- 6–10 aquarium/plant images
- 4–8 cage/accessory images
- 4–6 store-atmosphere images
- 4–8 caustic/texture assets
- 3–6 short clips if needed

Quality > quantity.

## 14. REQUIRED OUTPUTS
- docs/assets/ASSET_BOARD.md
- docs/assets/asset-manifest.json
- docs/assets/ASSET_SOURCING_REPORT.md
- downloaded/optimized assets in existing project folders
- list of missing real shop photos
- list of attribution/license-required assets
- rejected assets + reason

## 15. FINAL ACCEPTANCE
[ ] Real shop assets prioritized
[ ] Premium, realistic bird/fish imagery
[ ] Aquarium Light visual consistency
[ ] Every asset has a UI destination
[ ] Every external asset has provenance
[ ] License verified
[ ] No paid asset/service
[ ] No unclear copyright
[ ] Mobile crops work
[ ] Assets optimized
[ ] No stock asset falsely presented as shop inventory

Final question:
“If the UI layout were frozen and only the assets changed, would this still feel like a premium, distinctive pet/aquarium brand?”
If not, keep curating.
