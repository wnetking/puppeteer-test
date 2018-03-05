const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const { config } = require('../config');

const createDiffImage = layout => {
  if (
    !fs.existsSync(`./${config.designe}/${layout}-layout/desctop.png`) &&
    !fs.existsSync(`./${config.output}/${layout}-layout/desctop.png`)
  ) {
    console.log(`---- NOTHING TO DIFF: LAYOUT ${layout}`);
    return;
  }
  let img1 = fs
    .createReadStream(`./${config.output}/${layout}-layout/desctop.png`)
    .pipe(new PNG())
    .on('parsed', doneReading);
  let img2 = fs
      .createReadStream(`./${config.designe}/${layout}-layout/desctop.png`)
      .pipe(new PNG())
      .on('parsed', doneReading),
    filesRead = 0;

  function doneReading() {
    if (++filesRead < 2) return;
    var diff = new PNG({ width: img1.width, height: img1.height });

    pixelmatch(
      img1.data,
      img2.data,
      diff.data,
      img1.width,
      img1.height,
      config.pixelmatch
    );

    diff
      .pack()
      .pipe(
        fs.createWriteStream(
          `./${config.output}/${layout}-layout/desctop-diff.png`
        )
      );

    console.log(`----- DIFF CREATED: LAYOUT ${layout}`);
  }
};

exports.createDiffImage = createDiffImage;
