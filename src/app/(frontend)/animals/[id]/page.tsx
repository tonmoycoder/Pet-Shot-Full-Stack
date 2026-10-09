import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { AnimalClient } from './animal-client';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const payload = await getPayload({ config: configPromise });
    const animal = await payload.findByID({ collection: 'animals', id, depth: 2 });
    
    const title = `${animal?.name?.bn || animal?.name?.en || 'প্রাণী বিস্তারিত'} | Bismillah Pakhi & Aquarium`;
    const description = animal?.description?.bn || animal?.description?.en || '';
    
    let imageUrl = '';
    if (animal?.imageUpload && typeof animal.imageUpload === 'object' && animal.imageUpload.url) {
      imageUrl = animal.imageUpload.url;
    } else if (animal?.image && typeof animal.image === 'string') {
      imageUrl = animal.image;
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
    return { title: 'প্রাণী বিস্তারিত | Bismillah Pakhi & Aquarium' };
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

  return <AnimalClient animal={resolvedAnimal} settings={settings} />;
}
