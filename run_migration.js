const { Client } = require('pg');

const DB_URL = 'postgresql://postgres.uzocrhcjymjqhmcppvhl:Hisenberg4545%23@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true';

async function migrate() {
  const client = new Client({ connectionString: DB_URL });
  await client.connect();
  console.log('Connected to production Supabase!');

  // Check what columns currently exist in media table
  const colsRes = await client.query(`
    SELECT column_name FROM information_schema.columns 
    WHERE table_name = 'media' ORDER BY ordinal_position
  `);
  const existingCols = colsRes.rows.map(r => r.column_name);
  console.log('Existing media columns:', existingCols);

  // List of columns that might be missing
  const requiredCols = [
    { name: '_objectkey', def: 'VARCHAR' },
    { name: 'thumbnail_u_r_l', def: 'VARCHAR' },
    { name: 'source_url', def: 'VARCHAR' },
    { name: 'sizes_avatar_url', def: 'VARCHAR' },
    { name: 'sizes_avatar_width', def: 'NUMERIC' },
    { name: 'sizes_avatar_height', def: 'NUMERIC' },
    { name: 'sizes_avatar_mime_type', def: 'VARCHAR' },
    { name: 'sizes_avatar_filesize', def: 'NUMERIC' },
    { name: 'sizes_avatar_filename', def: 'VARCHAR' },
    { name: 'sizes_thumbnail_url', def: 'VARCHAR' },
    { name: 'sizes_thumbnail_width', def: 'NUMERIC' },
    { name: 'sizes_thumbnail_height', def: 'NUMERIC' },
    { name: 'sizes_thumbnail_mime_type', def: 'VARCHAR' },
    { name: 'sizes_thumbnail_filesize', def: 'NUMERIC' },
    { name: 'sizes_thumbnail_filename', def: 'VARCHAR' },
    { name: 'sizes_card_url', def: 'VARCHAR' },
    { name: 'sizes_card_width', def: 'NUMERIC' },
    { name: 'sizes_card_height', def: 'NUMERIC' },
    { name: 'sizes_card_mime_type', def: 'VARCHAR' },
    { name: 'sizes_card_filesize', def: 'NUMERIC' },
    { name: 'sizes_card_filename', def: 'VARCHAR' },
    { name: 'sizes_tablet_url', def: 'VARCHAR' },
    { name: 'sizes_tablet_width', def: 'NUMERIC' },
    { name: 'sizes_tablet_height', def: 'NUMERIC' },
    { name: 'sizes_tablet_mime_type', def: 'VARCHAR' },
    { name: 'sizes_tablet_filesize', def: 'NUMERIC' },
    { name: 'sizes_tablet_filename', def: 'VARCHAR' },
  ];

  for (const col of requiredCols) {
    if (!existingCols.includes(col.name)) {
      console.log(`Adding missing column: ${col.name}`);
      await client.query(`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "${col.name}" ${col.def}`);
    } else {
      console.log(`Column OK: ${col.name}`);
    }
  }

  console.log('\n✅ Migration complete!');
  await client.end();
}

migrate().catch(err => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
