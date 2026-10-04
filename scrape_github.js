const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://github.com/payloadcms/payload/discussions/17910', { waitUntil: 'networkidle', timeout: 15000 });
  const text = await page.evaluate(() => document.body.innerText);
  
  const fs = require('fs');
  fs.writeFileSync('github_issue.txt', text);
  
  await browser.close();
})();
