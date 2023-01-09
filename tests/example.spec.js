// @ts-check
const { test, expect } = require('@playwright/test');
const v8toIstanbul = require('v8-to-istanbul');
const pti = require('playwright-to-istanbul')
const mkdirp = require('mkdirp')
const fs = require('fs')

test.use({ headless: true });

test('has title', async ({ page }) => {
  await page.coverage.startJSCoverage({ resetOnNavigation: false });
  await page.coverage.startCSSCoverage({ resetOnNavigation: false });
  await page.goto('http://localhost:8099/hello.erb');
  //const coverage = await page.coverage.stopJSCoverage();  
  const [jsCoverage, cssCoverage] = await Promise.all([page.coverage.stopJSCoverage(), page.coverage.stopCSSCoverage()]);
  const coverage = [...jsCoverage, ...cssCoverage]
  /*let jsonPart = {}
  for (const entry of coverage) {
    const converter = v8toIstanbul('', 0, { source: entry.source });
    await converter.load();
    converter.applyCoverage(entry.functions);
    console.log(entry);
    let out = converter.toIstanbul();
    out[""].path = entry.url;
    jsonPart[entry.url] = { ...jsonPart[entry.url], ...out[""] };
    console.log(JSON.stringify(out));
  }
  console.log(JSON.stringify(jsonPart));*/

  //pti.write([...jsCoverage, ...cssCoverage], { includeHostname: true, storagePath: './.nyc_output' })
  pti.write([...jsCoverage,...cssCoverage], { includeHostname: true, storagePath: './.nyc_output' })
  // Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle(/Playwright/);
});

/*test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});*/

