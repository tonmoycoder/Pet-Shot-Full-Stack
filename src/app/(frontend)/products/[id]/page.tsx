import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { ProductClient } from './product-client';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const payload = await getPayload({ config: configPromise });
    const product = await payload.findByID({ collection: 'products', id });
    return {
      title: `${product?.name?.bn || product?.name?.en || 'পণ্য বিস্তারিত'} | Bismillah Pakhi & Aquarium`,
      description: product?.description?.bn || product?.description?.en || '',
    };
  } catch {
    return { title: 'পণ্য বিস্তারিত | Bismillah Pakhi & Aquarium' };
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product: any = null;
  let settings: any = null;

  try {
    const payload = await getPayload({ config: configPromise });
    
    product = await payload.findByID({
      collection: 'products',
      id,
    });

    settings = await payload.findGlobal({
      slug: 'store-settings',
    });
  } catch (error) {
    console.error("Error fetching product data:", error);
  }

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} settings={settings} />;
}
