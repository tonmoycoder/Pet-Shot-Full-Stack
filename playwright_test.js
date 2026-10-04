const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const logs = [];
  page.on('console', msg => logs.push('CONSOLE: ' + msg.text()));
  page.on('pageerror', err => logs.push('ERROR: ' + err.message));

  await page.goto('https://bismillahpakhiandaquarium.vercel.app/admin/login', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(3000); // Wait 3 seconds for hydration

  const html = await page.evaluate(() => document.body.innerHTML);
  console.log('HTML Prefix:', html.substring(0, 500));
  console.log('Logs:', logs);

  // Check if Next.js caught any errors
  const errs = await page.evaluate(() => {
    return window.next && window.next.router ? window.next.router.state : 'No router';
  });
  console.log('Next Router State:', errs);
  
  await browser.close();
})();
