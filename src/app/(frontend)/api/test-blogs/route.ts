import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    const blogs = await payload.find({
      collection: 'blogs',
      limit: 10,
      depth: 0
    });
    
    const testimonials = await payload.find({
      collection: 'testimonials',
      limit: 10,
      depth: 0
    });

    return NextResponse.json({
      success: true,
      blogsCount: blogs.totalDocs,
      testimonialsCount: testimonials.totalDocs,
      blogs: blogs.docs,
      testimonials: testimonials.docs,
      envDbUri: process.env.DATABASE_URI ? 'SET' : 'NOT_SET',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || error.toString(),
      stack: error.stack
    }, { status: 500 });
  }
}
