import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { AnimalClient } from './animal-client';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const payload = await getPayload({ config: configPromise });
    const animal = await payload.findByID({ collection: 'animals', id });
    return {
      title: `${animal?.name?.bn || animal?.name?.en || 'প্রাণী বিস্তারিত'} | Bismillah Pakhi & Aquarium`,
      description: animal?.description?.bn || animal?.description?.en || '',
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

  return <AnimalClient animal={animal} settings={settings} />;
}
