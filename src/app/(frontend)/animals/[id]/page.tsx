import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { AnimalClient } from './animal-client';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/structured-data';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const payload = await getPayload({ config: configPromise });
    const animal = await payload.findByID({ collection: 'animals', id, depth: 2 });
    
    const nameBn = animal?.name?.bn || animal?.internalName || 'পাখি ও পোষা প্রাণী';
    const nameEn = animal?.name?.en || '';
    const title = nameEn ? `${nameBn} (${nameEn})` : nameBn;
    const description = animal?.description?.bn || animal?.description?.en || 'বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম - সুস্থ ও সুন্দর পোষা পাখি ও অ্যাকোয়ারিয়াম মাছ। চুয়াডাঙ্গা, বাংলাদেশ।';
    
    let imageUrl = '';
    if (animal?.imageUpload && typeof animal.imageUpload === 'object' && animal.imageUpload.url) {
      imageUrl = animal.imageUpload.url;
    } else if (animal?.image && typeof animal.image === 'string') {
      imageUrl = animal.image;
    }

    return {
      title,
      description,
      alternates: {
        canonical: `/animals/${id}`,
      },
      openGraph: {
        title: `${title} | Bismillah Pakhi & Aquarium`,
        description,
        type: 'website',
        url: `/animals/${id}`,
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
      title: 'প্রাণী বিস্তারিত',
      alternates: {
        canonical: `/animals/${id}`,
      },
    };
  }
}

export default async function AnimalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let animal: any = null;
  let settings: any = null;

  try {
    const payload = await getPayload({ config: configPromise });
    
    animal = await payload.findByID({
      collection: 'animals',
      id,
      depth: 2,
    });

    settings = await payload.findGlobal({
      slug: 'store-settings',
    });
  } catch (error: any) {
    if (error?.message !== 'Not Found' && error?.name !== 'NotFound') {
      console.error("Error fetching animal data:", error);
    }
  }

  if (!animal) {
    notFound();
  }

  const getImageUrl = (imageField: any): string => {
    if (typeof imageField === 'object' && imageField?.url) return imageField.url;
    if (typeof imageField === 'string') return imageField;
    return '';
  };

  const resolvedAnimal = {
    ...animal,
    image: getImageUrl(animal.imageUpload) || animal.image,
    gallery: animal.gallery?.map((g: any) => ({
      ...g,
      url: getImageUrl(g.image) || g.url
    })) || []
  };

  const animalTitle = resolvedAnimal.name?.bn || resolvedAnimal.name?.en || resolvedAnimal.internalName || 'পাখি ও পোষা প্রাণী';

  return (
    <>
      <ProductJsonLd item={resolvedAnimal} isAnimal={true} />
      <BreadcrumbJsonLd
        items={[
          { name: "হোম", url: "/" },
          { name: "কালেকশন", url: "/collection" },
          { name: "পাখি ও পোষা প্রাণী", url: "/categories/birds" },
          { name: animalTitle, url: `/animals/${id}` },
        ]}
      />
      <AnimalClient animal={resolvedAnimal} settings={settings} />
    </>
  );
}
