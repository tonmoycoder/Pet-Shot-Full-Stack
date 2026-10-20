import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
});

async function addColumns() {
  const client = await pool.connect();
  try {
    console.log('Connecting to PostgreSQL to add upload columns...');

    // Animals - main image upload
    await client.query(`
      ALTER TABLE animals 
      ADD COLUMN IF NOT EXISTS image_upload_id integer REFERENCES media(id) ON DELETE SET NULL;
    `);
    console.log('✅ Added image_upload_id to animals');

    // Products - main image upload
    await client.query(`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS image_upload_id integer REFERENCES media(id) ON DELETE SET NULL;
    `);
    console.log('✅ Added image_upload_id to products');

    // Animals Gallery
    await client.query(`
      ALTER TABLE animals_gallery 
      ADD COLUMN IF NOT EXISTS image_id integer REFERENCES media(id) ON DELETE SET NULL;
    `);
    console.log('✅ Added image_id to animals_gallery');

    // Products Gallery
    await client.query(`
      ALTER TABLE products_gallery 
      ADD COLUMN IF NOT EXISTS image_id integer REFERENCES media(id) ON DELETE SET NULL;
    `);
    console.log('✅ Added image_id to products_gallery');

    console.log('🎉 All upload columns added successfully!');
  } catch (error) {
    console.error('❌ Error adding columns:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

addColumns();
