const puppeteer = require('puppeteer');
const axeCore = require('axe-core');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  
  // Inject and run axe-core
  await page.evaluate(axeCore.source);
  const results = await page.evaluate(async () => {
    return await window.axe.run();
  });
  
  const violations = results.violations.map(v => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    help: v.help,
    nodes: v.nodes.map(n => n.html)
  }));
  
  console.log(JSON.stringify(violations, null, 2));
  
  await browser.close();
})();
