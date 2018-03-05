var fs = require('fs');
const { config } = require('../config');

const createDirs = () => {
  for (let i = 1; i <= config.layouts; i++) {
    if (!fs.existsSync(`./${config.output}/${i}-layout`)) {
      fs.mkdirSync(`./${config.output}/${i}-layout`);
    }
  }
};

exports.createDirs = createDirs;
