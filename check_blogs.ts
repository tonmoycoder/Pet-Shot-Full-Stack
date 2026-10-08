import { getPayload } from 'payload';
import configPromise from './src/payload.config';

async function check() {
  try {
    const payload = await getPayload({ config: configPromise });
    console.log("Payload initialized");
    
    console.log("Fetching blogs...");
    const blogs = await payload.find({ collection: 'blogs', limit: 2, depth: 1 });
    console.log(`Total Blogs: ${blogs.totalDocs}`);
    
    console.log("Fetching testimonials...");
    const testimonials = await payload.find({ collection: 'testimonials', limit: 2, depth: 1 });
    console.log(`Total Testimonials: ${testimonials.totalDocs}`);
    
  } catch(e) {
    console.error("Error:", e);
  }
  process.exit(0);
}

check();
