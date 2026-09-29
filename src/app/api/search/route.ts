import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { sql } from '@payloadcms/db-postgres/drizzle';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    
    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] });
    }

    const payload = await getPayload({ config: configPromise });
    const db = payload.db;

    const searchStr = query.trim();

    // Query for animals
    const animalsData = await payload.find({
      collection: 'animals',
      where: {
        or: [
          { internalName: { like: searchStr } },
          { 'name.bn': { like: searchStr } },
          { 'name.en': { like: searchStr } },
          { 'tag.bn': { like: searchStr } },
          { 'tag.en': { like: searchStr } },
        ]
      },
      limit: 5,
    });
    
    // Query for products
    const productsData = await payload.find({
      collection: 'products',
      where: {
        or: [
          { internalName: { like: searchStr } },
          { 'name.bn': { like: searchStr } },
          { 'name.en': { like: searchStr } },
        ]
      },
      limit: 5,
    });

    const fullAnimals = animalsData.docs.map(doc => ({ ...doc, type: 'animal' }));
    const fullProducts = productsData.docs.map(doc => ({ ...doc, type: 'product' }));

    const combined = [...fullAnimals, ...fullProducts];

    return NextResponse.json({ results: combined.slice(0, 8) });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
