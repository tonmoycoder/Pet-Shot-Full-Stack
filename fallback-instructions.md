# Fallback & Recovery Guide: UI Update & Dynamic Tags

If the recent structural rewrites to `featured-pets.tsx` and `rare-exotic-collection.tsx` cause issues or if you need to revert to the previous design, follow these steps.

## What was changed:
1. **`featured-pets.tsx`**: Completely rewritten to include a new UI design with a vertical progress bar, left/right scroll buttons, "swipe to explore" hints, and a separate action bar below the image cards.
2. **`rare-exotic-collection.tsx`**: Completely rewritten to match the same slider pattern as `featured-pets.tsx` while keeping the amber/dark theme.
3. **Backend Collections (`Products.ts`)**: Added the `tag` field so it matches `Animals.ts`.
4. **Data Fetching (`page.tsx`)**: Updated mapping for rare animals and rare products to include `tag: doc.tag`.

## How to Revert to the Previous (Grid/Original) UI:

If you need to revert the UI, please restore the previous versions of the files from your source control (GitHub/Git) or backup:

1. Restore `src/components/home/featured-pets.tsx` to the previous version.
2. Restore `src/components/home/rare-exotic-collection.tsx` to the previous version.

### To revert the Backend changes:
1. Remove the `tag` field block from `src/collections/Products.ts`.
2. In `src/app/(frontend)/page.tsx`, remove `tag: doc.tag,` from the `rareAnimalDocs` and `rareProductDocs` maps.

*Note: The new UI uses `useRef` and `useState` for tracking scroll progress and calculating the active card index for the indicator text.*
