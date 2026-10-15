import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { ProductClient } from './product-client';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/structured-data';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const payload = await getPayload({ config: configPromise });
    const product = await payload.findByID({ collection: 'products', id, depth: 2 });
    
    const nameBn = product?.name?.bn || product?.internalName || 'পণ্য বিস্তারিত';
    const nameEn = product?.name?.en || '';
    const title = nameEn ? `${nameBn} (${nameEn})` : nameBn;
    const description = product?.description?.bn || product?.description?.en || 'বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম - উচ্চমানের পেট এক্সেসরিজ, পাখির খাবার ও অ্যাকোয়ারিয়াম সামগ্রী। চুয়াডাঙ্গা।';
    
    let imageUrl = '';
    if (product?.imageUpload && typeof product.imageUpload === 'object' && product.imageUpload.url) {
      imageUrl = product.imageUpload.url;
    } else if (product?.image && typeof product.image === 'string') {
      imageUrl = product.image;
    }

    return {
      title,
      description,
      alternates: {
        canonical: `/products/${id}`,
      },
      openGraph: {
        title: `${title} | Bismillah Pakhi & Aquarium`,
        description,
        type: 'website',
        url: `/products/${id}`,
        ...(imageUrl && { images: [imageUrl] }),
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} | Bismillah Pakhi & Aquarium`,
        description,
        ...(imageUrl && { images: [imageUrl] }),
      },
    };
  } catch {
    return {
      title: 'পণ্য বিস্তারিত',
      alternates: {
        canonical: `/products/${id}`,
      },
    };
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

  const productTitle = resolvedProduct.name?.bn || resolvedProduct.name?.en || resolvedProduct.internalName || 'পণ্য বিস্তারিত';

  return (
    <>
      <ProductJsonLd item={resolvedProduct} isAnimal={false} />
      <BreadcrumbJsonLd
        items={[
          { name: "হোম", url: "/" },
          { name: "কালেকশন", url: "/collection" },
          { name: "পোষা প্রাণীর পণ্য", url: "/categories/food" },
          { name: productTitle, url: `/products/${id}` },
        ]}
      />
      <ProductClient product={resolvedProduct} settings={settings} />
    </>
  );
}
