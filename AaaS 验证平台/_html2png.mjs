import puppeteer from 'puppeteer';
import { resolve } from 'path';
import { homedir } from 'os';

const files = [
  {
    html: resolve('AaaS 验证平台/diagram-三层嵌套聚合示意图.html'),
    png: resolve(homedir(), 'Desktop/diagram-三层嵌套聚合示意图.png'),
    width: 1200,
  },
  {
    html: resolve('AaaS 验证平台/diagram-聚合路径全景图.html'),
    png: resolve(homedir(), 'Desktop/diagram-聚合路径全景图.png'),
    width: 1300,
  },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  for (const f of files) {
    const page = await browser.newPage();
    await page.setViewport({ width: f.width, height: 800, deviceScaleFactor: 2 });
    await page.goto('file://' + f.html, { waitUntil: 'networkidle0' });

    // Get actual body height
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    await page.setViewport({ width: f.width, height: bodyHeight, deviceScaleFactor: 2 });

    await page.screenshot({ path: f.png, fullPage: true, type: 'png' });
    console.log('Saved:', f.png);
    await page.close();
  }

  await browser.close();
  console.log('Done!');
})();
