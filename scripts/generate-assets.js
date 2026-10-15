const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const LOGO_SRC = 'C:/Users/Tonmoy/Downloads/petshop_logo.jpg';
const FAV_SRC = 'C:/Users/Tonmoy/Downloads/petshop_logo_fav.jpg';

async function generateAssets() {
  console.log('🚀 Starting Brand Asset & Favicon Generation...');

  if (!fs.existsSync(LOGO_SRC) || !fs.existsSync(FAV_SRC)) {
    throw new Error('Source logo files not found!');
  }

  // Ensure directories exist
  const publicDir = path.resolve(__dirname, '../public');
  const imagesDir = path.resolve(__dirname, '../public/images');
  const appDir = path.resolve(__dirname, '../src/app');

  [publicDir, imagesDir, appDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  // 1. Copy source files
  fs.copyFileSync(LOGO_SRC, path.join(imagesDir, 'logo_shop.jpg'));
  fs.copyFileSync(FAV_SRC, path.join(imagesDir, 'logo_shop_fav.jpg'));
  console.log('✅ Backed up original sources to public/images/');

  // 2. Generate Main Logo variants from petshop_logo.jpg
  console.log('🖼️  Processing Main Logo (petshop_logo.jpg)...');
  const logoSharp = sharp(LOGO_SRC);

  // 512x512 webp (Primary)
  await sharp(LOGO_SRC)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 92, effort: 6 })
    .toFile(path.join(imagesDir, 'logo.webp'));

  await sharp(LOGO_SRC)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 92, effort: 6 })
    .toFile(path.join(publicDir, 'logo.webp'));

  await sharp(LOGO_SRC)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 92, effort: 6 })
    .toFile(path.join(imagesDir, 'logo-512.webp'));

  // 256x256 webp (Mobile/Compact)
  await sharp(LOGO_SRC)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 92, effort: 6 })
    .toFile(path.join(imagesDir, 'logo-256.webp'));

  // 512x512 png
  await sharp(LOGO_SRC)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(imagesDir, 'logo.png'));

  await sharp(LOGO_SRC)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(imagesDir, 'logo-compressed.png'));

  await sharp(LOGO_SRC)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'logo.png'));

  // 512x512 jpeg
  await sharp(LOGO_SRC)
    .resize(512, 512, { fit: 'contain', background: { r: 12, g: 25, b: 23, alpha: 1 } })
    .jpeg({ quality: 90 })
    .toFile(path.join(imagesDir, 'logo.jpg'));

  await sharp(LOGO_SRC)
    .resize(512, 512, { fit: 'contain', background: { r: 12, g: 25, b: 23, alpha: 1 } })
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'logo.jpg'));

  // 1024x1024 webp
  await sharp(LOGO_SRC)
    .resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90 })
    .toFile(path.join(imagesDir, 'logo_shop.webp'));

  // OpenGraph Image (1200x630)
  const ogLogo = await sharp(LOGO_SRC)
    .resize(560, 560, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 10, g: 24, b: 20, alpha: 1 } // Deep emerald luxury background
    }
  })
    .composite([
      {
        input: ogLogo,
        top: 35,
        left: 320,
      }
    ])
    .png()
    .toFile(path.join(imagesDir, 'og-image.png'));

  console.log('✅ Generated all Main Logo variants and OpenGraph image');

  // 3. Generate Favicon & App Icons from petshop_logo_fav.jpg
  console.log('🔮 Processing Favicon & App Icons (petshop_logo_fav.jpg)...');

  // 512x512 icon.png for PWA / App Manifest
  const icon512 = await sharp(FAV_SRC)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon.png'), icon512);
  fs.writeFileSync(path.join(appDir, 'icon.png'), icon512);
  fs.writeFileSync(path.join(imagesDir, 'favicon-512.png'), icon512);

  // 192x192 favicon.webp & favicon.png
  await sharp(FAV_SRC)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 95 })
    .toFile(path.join(imagesDir, 'favicon.webp'));

  await sharp(FAV_SRC)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(imagesDir, 'favicon.png'));

  await sharp(FAV_SRC)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(imagesDir, 'favicon-192.png'));

  // 32x32 favicon.png
  await sharp(FAV_SRC)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(imagesDir, 'favicon-32.png'));

  // 180x180 apple-icon.png
  const appleIcon = await sharp(FAV_SRC)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), appleIcon);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), appleIcon);

  // Multi-resolution favicon.ico (16x16, 32x32, 48x48) - strict RGBA color type 6 for Turbopack
  const png16 = await sharp(FAV_SRC).resize(16, 16).ensureAlpha(0.9999).png().toBuffer();
  const png32 = await sharp(FAV_SRC).resize(32, 32).ensureAlpha(0.9999).png().toBuffer();
  const png48 = await sharp(FAV_SRC).resize(48, 48).ensureAlpha(0.9999).png().toBuffer();

  const icoImages = [
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(icoImages.length, 4);

  let offset = 6 + icoImages.length * 16;
  const entries = [];
  for (const img of icoImages) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width, 0);
    entry.writeUInt8(img.height, 1);
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // size of image in bytes
    entry.writeUInt32LE(offset, 12); // offset from start of file
    entries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...icoImages.map(img => img.buffer)]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);

  console.log('✅ Generated standard multi-resolution favicon.ico (16, 32, 48)');
  console.log('🎉 Brand asset & Favicon optimization complete!');
}

generateAssets().catch(err => {
  console.error('❌ Error generating assets:', err);
  process.exit(1);
});
