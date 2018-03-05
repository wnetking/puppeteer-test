let config = {
  path: 'http://192.168.9.37/prestashop_theme1509',
  layouts: 3,
  desktopViewport: {
    width: 1920,
    height: 950
  },
  output: 'images/screenshots',
  designe: 'images/designe',
  launch: {
    headless: true
  },
  pixelmatch: {
    threshold: 0.5
  }
};

exports.config = config;
