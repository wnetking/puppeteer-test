const { makeScreenshot } = require('./makeScreenshot');
const { config } = require('../config');

const devices = ['desctop', 'iPad', 'iPhone X'];

const layoutFullShot = (layout, path = '') => {
  devices.forEach(item => {
    makeScreenshot(path, layout, item);
  });
};

exports.layoutFullShot = layoutFullShot;
