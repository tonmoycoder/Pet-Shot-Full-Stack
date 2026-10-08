require('dotenv').config();
const { Client } = require('pg');

async function run() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URI,
  });

  try {
    await client.connect();
    
    // Add columns if they don't exist
    await client.query(`
      ALTER TABLE animals ADD COLUMN IF NOT EXISTS numeric_price numeric DEFAULT 0;
    `);
    console.log('Added numeric_price to animals table.');
    
    await client.query(`
      ALTER TABLE products ADD COLUMN IF NOT EXISTS numeric_price numeric DEFAULT 0;
    `);
    console.log('Added numeric_price to products table.');
    
  } catch (err) {
    console.error('Error adding columns:', err);
  } finally {
    await client.end();
  }
}

run();
