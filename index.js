const { config } = require('./config');
const { layoutFullShot } = require('./src/layoutFullShot');
const { createDirs } = require('./src/createDirs');

createDirs();
layoutFullShot(1);
layoutFullShot(
  2,
  'index.php?live_configurator&header_layout=5&top_layout=12&home_layout=8&footer_layout=2'
);
layoutFullShot(
  3,
  'index.php?live_configurator&header_layout=6&top_layout=13&home_layout=9&footer_layout=3'
);
