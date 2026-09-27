import { revalidatePath, revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

export const revalidateCollection = (collectionSlug: string): CollectionAfterChangeHook & CollectionAfterDeleteHook => {
  return ({ doc, req: { context } }: { doc: any; req: { context: any } }) => {
    if (!context.disableRevalidate) {
      // Revalidate the global layout/index
      revalidatePath('/');
      // Revalidate specific tags if used in fetch
      // @ts-ignore
      revalidateTag(collectionSlug);
      
      console.log(`Revalidated cache for collection: ${collectionSlug}`);
    }
    return doc;
  };
};

export const revalidateGlobal = (globalSlug: string): any => {
  return ({ doc, req: { context } }: { doc: any; req: { context: any } }) => {
    if (!context.disableRevalidate) {
      revalidatePath('/');
      // @ts-ignore
      revalidateTag(globalSlug);
      
      console.log(`Revalidated cache for global: ${globalSlug}`);
    }
    return doc;
  };
};
