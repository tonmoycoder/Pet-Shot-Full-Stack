import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { ProductClient } from './product-client';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const payload = await getPayload({ config: configPromise });
    const product = await payload.findByID({ collection: 'products', id, depth: 2 });
    
    const title = `${product?.name?.bn || product?.name?.en || 'পণ্য বিস্তারিত'} | Bismillah Pakhi & Aquarium`;
    const description = product?.description?.bn || product?.description?.en || '';
    
    let imageUrl = '';
    if (product?.imageUpload && typeof product.imageUpload === 'object' && product.imageUpload.url) {
      imageUrl = product.imageUpload.url;
    } else if (product?.image && typeof product.image === 'string') {
      imageUrl = product.image;
    }

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        ...(imageUrl && { images: [imageUrl] }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(imageUrl && { images: [imageUrl] }),
      },
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
      depth: 2,
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

  const getImageUrl = (imageField: any): string => {
    if (typeof imageField === 'object' && imageField?.url) return imageField.url;
    if (typeof imageField === 'string') return imageField;
    return '';
  };

  const resolvedProduct = {
    ...product,
    image: getImageUrl(product.imageUpload) || product.image,
    gallery: product.gallery?.map((g: any) => ({
      ...g,
      url: getImageUrl(g.image) || g.url
    })) || []
  };

  return <ProductClient product={resolvedProduct} settings={settings} />;
}
