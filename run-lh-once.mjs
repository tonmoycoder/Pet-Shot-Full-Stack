import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

async function run() {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless', '--no-sandbox']});
  const options = {
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance'],
    port: chrome.port,
    formFactor: 'mobile',
    screenEmulation: {
      mobile: true,
      width: 360,
      height: 640,
      deviceScaleFactor: 2.625,
      disabled: false,
    },
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      requestLatencyMs: 150,
      downloadThroughputKbps: 1638.4,
      uploadThroughputKbps: 750,
      cpuSlowdownMultiplier: 4,
    }
  };
  const runnerResult = await lighthouse('http://localhost:3001', options);
  const lcpAudit = runnerResult.lhr.audits['largest-contentful-paint-element'];
  
  if (lcpAudit && lcpAudit.details && lcpAudit.details.items && lcpAudit.details.items[0]) {
    console.log('LCP Element:', lcpAudit.details.items[0].node.snippet);
    console.log('LCP Phases:', lcpAudit.details.items[0].phases);
  } else {
    console.log('No LCP Element found in audit details');
  }
  console.log('LCP Value:', runnerResult.lhr.audits['largest-contentful-paint'].displayValue);
  await chrome.kill();
}
run();
