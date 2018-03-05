const puppeteer = require('puppeteer');
const merge = require('merge-img');
const { config } = require('../config');
const devices = require('puppeteer/DeviceDescriptors');
const { createDiffImage } = require('./createDiffImage');
const pageElement = 'body';

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let makeScreenshot = async (
  route = '',
  layout = 1,
  device = 'desctop',
  fallbackOnDisconect = () => {
    console.log(`----- DISCONECT ${device}:  PAGE /${route}`);

    if (device === 'desctop') {
      createDiffImage(layout);
    }
  }
) => {
  const browser = await puppeteer.launch(config.launch);
  browser.on('disconnected', fallbackOnDisconect);
  const page = await browser.newPage();

  if (device === 'desctop') {
    await page.setViewport(config.desktopViewport);
  } else {
    await page.emulate(devices[device]);
  }

  await page.goto(config.path + `/${route}`, {
    waitLoad: true,
    waitNetworkIdle: true
  });
  const $ele = await page.$(pageElement);
  const { width, height } = await $ele.boundingBox();

  console.log(`----- DEVICE ${device} : CONECT PAGE /${route}`);

  if (device === 'desctop') {
    await page.screenshot({
      path: `${config.output}/${`${layout}-layout`}/${device}.png`,
      fullPage: true
    });

    await browser.close();
  } else {
    return Promise.all([
      page.screenshot({
        clip: {
          x: 0,
          y: 0,
          height,
          width: Math.floor(width / 2)
        }
      }),
      page.screenshot({
        clip: {
          x: Math.floor(width / 2),
          y: 0,
          height,
          width: Math.floor(width / 2)
        }
      })
    ])
      .then(([left, right]) => merge([left, right]))
      .then(final =>
        final.write(
          `${config.output}/${`${layout}-layout`}/${device}.png`,
          () => browser.close()
        )
      )
      .catch(error => {
        console.error(error);
        browser.close();
      });
  }
};

exports.makeScreenshot = makeScreenshot;
