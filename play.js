const url = "http://localhost:8099/hello.erb";

const puppeteer = require('puppeteer');
const p2i = require("puppeteer-to-istanbul");
let foo;
(async () => {
    console.log(0);
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
    });
    console.log(1);
    const page = await browser.newPage();
    console.log(2);
    // カバレッジの取得開始
    await page.coverage.startJSCoverage();
    await page.coverage.startCSSCoverage();
    // 対象ページに移動
    await page.goto(url);
    console.log(3);
    // カバレッジの取得終了
    const [jsCoverage, cssCoverage] = await Promise.all([page.coverage.stopJSCoverage(), page.coverage.stopCSSCoverage()])
    console.log(4);
    p2i.write(jsCoverage);
    console.log(5);
})();
