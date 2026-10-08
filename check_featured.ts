import { getPayload } from 'payload';
import configPromise from './src/payload.config.ts';

async function check() {
  const payload = await getPayload({ config: configPromise });
  const allAnimals = await payload.find({ collection: 'animals', limit: 100 });
  
  console.log(`Total Animals: ${allAnimals.totalDocs}`);
  allAnimals.docs.forEach(doc => {
    console.log(`- ${doc.internalName}: isFeatured=${doc.isFeatured}, status=${doc.status}`);
  });

  const featured = await payload.find({
    collection: 'animals',
    where: {
      and: [
        { status: { equals: 'available' } },
        { isFeatured: { equals: true } }
      ]
    }
  });
  console.log(`\nFeatured Animals Count: ${featured.totalDocs}`);
  process.exit(0);
}

check().catch(console.error);
