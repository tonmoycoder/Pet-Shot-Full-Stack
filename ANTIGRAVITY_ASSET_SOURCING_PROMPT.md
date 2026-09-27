# ANTIGRAVITY — ASSET SOURCING TASK

Read:
- docs/ASSET_SOURCING_AND_CURATION_SYSTEM_V7.md
- docs/FINAL_ZERO_COST_MASTER_DECISION.md
- docs/PREMIUM_UI_REDESIGN_V3.md
- docs/HERO_BEHANCE_INSPIRED_V5.md (if present)
- existing media/asset directories
- relevant .agents rules/skills

Task: proactively find, select, download and integrate the best FREE high-quality assets needed by the current website.

Do not just download stock images. Inspect the current UI first and create an asset map.

Rules:
1. Real shop/client assets always come first.
2. External assets are for atmosphere/education/supporting visuals.
3. Never present external stock/AI images as real inventory, staff, customers, or the client's store.
4. Search Pexels, Unsplash, Pixabay, Openverse, and Wikimedia Commons first.
5. Verify the license of every selected external asset.
6. Save every selected asset locally.
7. Record source/creator/license/license URL/attribution in docs/assets/asset-manifest.json.
8. Create docs/assets/ASSET_BOARD.md and docs/assets/ASSET_SOURCING_REPORT.md.
9. Optimize images for the existing Next.js pipeline.
10. Use the Aquarium Light palette and lighting language.
11. Reject watermarks, obvious AI artifacts, poor anatomy, low resolution, unclear licenses, and assets that make the design look cheaper.
12. No paid assets, subscriptions, APIs, or services.
13. Do not replace approved real shop assets without a reason.
14. Do not modify unrelated UI.

Search for:
- budgies/budgerigars
- ringneck/alexandrine parrots
- pigeons
- quail
- ornamental poultry
- goldfish
- betta
- guppy
- molly/platy
- angelfish/neon tetras/corydoras where relevant
- planted aquariums
- aquarium caustics
- water reflections
- aquarium shop atmosphere
- bird cages
- aquarium equipment
- bird food/care imagery
- premium pet-shop textures

Before integrating, report:
- asset needs by component
- shortlist candidates
- licensing status

Then download, optimize, and map selected assets.

After integration:
- verify desktop/mobile crops
- verify image paths
- check LCP impact
- run lint/typecheck/build if available
- check console errors

Final report:
1. assets researched
2. assets selected
3. assets downloaded
4. source sites
5. license/attribution requirements
6. missing real shop assets
7. components updated
8. rejected assets and reasons
