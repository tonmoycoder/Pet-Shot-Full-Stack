import fs from 'fs';
import path from 'path';
import https from 'https';

const SEARCH_TERMS = [
  { term: 'Budgerigar pet', category: 'birds', filename: 'bird-budgerigar-natural-01.jpg', usedIn: 'Discovery Bento (Birds) / Featured Pets' },
  { term: 'Fancy pigeon', category: 'birds', filename: 'bird-pigeon-fancy-01.jpg', usedIn: 'Featured Pets' },
  { term: 'Planted aquarium', category: 'aquarium', filename: 'aquarium-planted-aquascape-01.jpg', usedIn: 'Discovery Bento (Aquarium)' },
  { term: 'Water caustics', category: 'textures', filename: 'texture-water-caustics-01.jpg', usedIn: 'Store Experience Background' },
  { term: 'Goldfish aquarium', category: 'fish', filename: 'fish-goldfish-aquarium-01.jpg', usedIn: 'Featured Pets' },
  { term: 'Betta fish macro', category: 'fish', filename: 'fish-betta-macro-01.jpg', usedIn: 'Featured Pets' },
];

const manifest = [];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'PetShopBot/1.0 (contact@example.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'PetShopBot/1.0' } }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const item of SEARCH_TERMS) {
    try {
      console.log(`Searching for ${item.term}...`);
      const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(item.term)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url|extmetadata&format=json`;
      const data = await fetchJson(searchUrl);
      
      if (!data.query || !data.query.pages) {
        console.log(`No results for ${item.term}`);
        continue;
      }
      
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      const imageInfo = pages[pageId].imageinfo[0];
      const fileUrl = imageInfo.url;
      const extMeta = imageInfo.extmetadata;
      
      const destPath = path.join('public/assets/sourced', item.category, item.filename);
      
      console.log(`Downloading ${fileUrl} to ${destPath}...`);
      await downloadFile(fileUrl, destPath);
      
      manifest.push({
        id: item.filename.split('.')[0],
        filename: item.filename,
        category: item.category,
        sourceSite: 'Wikimedia Commons',
        sourceUrl: fileUrl,
        creator: extMeta.Artist ? extMeta.Artist.value : 'Unknown',
        license: extMeta.LicenseShortName ? extMeta.LicenseShortName.value : 'Unknown',
        licenseUrl: extMeta.LicenseUrl ? extMeta.LicenseUrl.value : '',
        downloadedAt: new Date().toISOString(),
        attributionRequired: true,
        usedIn: item.usedIn,
        notes: `Searched for: ${item.term}`
      });
      console.log(`Successfully downloaded ${item.filename}`);
    } catch (e) {
      console.error(`Error processing ${item.term}:`, e.message);
    }
  }

  fs.writeFileSync('docs/assets/asset-manifest.json', JSON.stringify(manifest, null, 2));
  
  const report = `# Asset Sourcing Report

We searched Wikimedia Commons for high-quality, free-to-use images and downloaded the following:

${manifest.map(m => `- **${m.filename}**: [Source](${m.sourceUrl}) - License: ${m.license} (${m.creator})`).join('\n')}

**Note**: All assets require attribution as per Wikimedia Commons licenses.
`;
  fs.writeFileSync('docs/assets/ASSET_SOURCING_REPORT.md', report);
  fs.writeFileSync('docs/assets/ASSET_BOARD.md', report);
  
  console.log('Manifest and reports written.');
}

run();
