const fs = require('fs');

function extract(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // simple tag stripper
  let text = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/\s+/g, ' ');
  console.log('--- ' + filePath + ' ---');
  console.log(text.substring(0, 3000));
}

extract('C:/Users/Tonmoy/.gemini/antigravity-ide/brain/355c97fd-350b-412d-8a27-c15df0a07633/.system_generated/steps/707/content.md');
extract('C:/Users/Tonmoy/.gemini/antigravity-ide/brain/355c97fd-350b-412d-8a27-c15df0a07633/.system_generated/steps/708/content.md');
