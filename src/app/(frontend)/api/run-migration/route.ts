import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Secret token to prevent unauthorized runs
const MIGRATION_TOKEN = process.env.MIGRATION_TOKEN || process.env.PAYLOAD_SECRET;

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    
    if (!MIGRATION_TOKEN || token !== MIGRATION_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await getPayload({ config: configPromise });
    
    // Run Payload migrations
    const db = payload.db as any;
    if (db && typeof db.migrate === 'function') {
      await db.migrate();
      return NextResponse.json({ success: true, message: 'Migration completed successfully' });
    } else if (db && typeof db.createMigration === 'function') {
      return NextResponse.json({ success: false, message: 'Manual migration needed - db.migrate not found', methods: Object.keys(db) });
    } else {
      return NextResponse.json({ success: false, message: 'DB object found but no migrate method', dbKeys: Object.keys(db || {}) });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'POST to this endpoint with ?token=YOUR_PAYLOAD_SECRET to run migrations',
    usage: 'POST /api/run-migration?token=<PAYLOAD_SECRET>'
  });
}
