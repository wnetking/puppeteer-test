const puppeteer = require('puppeteer');
const {config} = require('./config');
const devices = require('puppeteer/DeviceDescriptors');

(async () => {
  const browser = await puppeteer.launch(config.launch);
  const page = await browser.newPage();
  await page.goto(config.path);
  await page.setViewport(config.desktopViewport);
//   await page.click('main  div.block-new-series div div.serial-top  div.field-img > a')
  await page.waitFor(1000);
  await page.screenshot({path: 'example.png', fullPage: true});
  
  await browser.close();
})();