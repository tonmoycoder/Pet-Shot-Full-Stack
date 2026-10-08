import { getPayload } from 'payload';
import configPromise from './src/payload.config';

async function check() {
  const payload = await getPayload({ config: configPromise });
  const blogs = await payload.find({ collection: 'blogs', limit: 100 });
  console.log(`Total Blogs: ${blogs.totalDocs}`);
  
  const testimonials = await payload.find({ collection: 'testimonials', limit: 100 });
  console.log(`Total Testimonials: ${testimonials.totalDocs}`);
  
  process.exit(0);
}

check().catch(console.error);
