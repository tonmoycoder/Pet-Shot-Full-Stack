const fs = require('fs');

async function main() {
  const res = await fetch('http://localhost:3000/api/blogs?limit=10');
  const json = await res.json();
  fs.writeFileSync('blogs_utf8.json', JSON.stringify(json.docs.map(b => ({ id: b.id, title: b.title.en, title_bn: b.title.bn, coverImage: b.coverImage })), null, 2));
}

main().catch(console.error);
