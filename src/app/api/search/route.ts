import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { NextRequest, NextResponse } from 'next/server';
import { getFallbackAnimals, getFallbackProducts } from '@/lib/data-fallback';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    
    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] });
    }

    // Sanitize and limit query length to 60 chars to prevent heavy regex / ReDoS
    const searchStr = query.trim().slice(0, 60).replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

    if (!searchStr) {
      return NextResponse.json({ results: [] });
    }

    try {
      const payload = await getPayload({ config: configPromise });

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
    } catch (dbErr) {
      console.warn('Payload search failed, falling back to local dataset:', dbErr);
      
      const qLower = searchStr.toLowerCase();
      const fbAnimals = getFallbackAnimals()
        .filter(a => 
          a.internalName.toLowerCase().includes(qLower) ||
          a.name.bn.toLowerCase().includes(qLower) ||
          a.name.en.toLowerCase().includes(qLower) ||
          (a.tag?.bn && a.tag.bn.toLowerCase().includes(qLower)) ||
          (a.tag?.en && a.tag.en.toLowerCase().includes(qLower))
        )
        .slice(0, 5)
        .map(a => ({ ...a, type: 'animal' }));

      const fbProducts = getFallbackProducts()
        .filter(p => 
          p.internalName.toLowerCase().includes(qLower) ||
          p.name.bn.toLowerCase().includes(qLower) ||
          p.name.en.toLowerCase().includes(qLower)
        )
        .slice(0, 5)
        .map(p => ({ ...p, type: 'product' }));

      return NextResponse.json({ results: [...fbAnimals, ...fbProducts].slice(0, 8) });
    }
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ results: [] });
  }
}
