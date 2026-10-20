import { revalidatePath, revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

export const revalidateCollection = (collectionSlug: string): CollectionAfterChangeHook & CollectionAfterDeleteHook => {
  return ({ doc, req: { context } }: { doc: any; req: { context: any } }) => {
    if (!context.disableRevalidate) {
      try {
        // Revalidate the global layout/index
        revalidatePath('/');
        revalidatePath('/blog');
        revalidatePath('/blog/[id]', 'page');
        
        // Revalidate specific tags if used in fetch
        // @ts-ignore
        revalidateTag(collectionSlug);
        
        console.log(`Revalidated cache for collection: ${collectionSlug}`);
      } catch (err: any) {
        console.error(`Failed to revalidate collection ${collectionSlug}:`, err);
      }
    }
    return doc;
  };
};

export const revalidateGlobal = (globalSlug: string): any => {
  return ({ doc, req: { context } }: { doc: any; req: { context: any } }) => {
    if (!context.disableRevalidate) {
      try {
        revalidatePath('/');
        // @ts-ignore
        revalidateTag(globalSlug);
        
        console.log(`Revalidated cache for global: ${globalSlug}`);
      } catch (err: any) {
        console.error(`Failed to revalidate global ${globalSlug}:`, err);
      }
    }
    return doc;
  };
};
