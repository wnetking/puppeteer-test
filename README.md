puppeteer-test
========

You can created screenshot of the page and compare with some model picture.

Features
--------

- create screenshot on diferent breackpoints(1920(desctop), iPad, iPhoneX)
- create diff image between model picture and 1920(desctop)

How to use:
--------

You need modify config.js

    {
      path: 'path to you website',
      layouts: 3, // number of layouts
      desktopViewport: {
        width: 1920,
        height: 950
      }, // desctop vieport
      output: 'images/screenshots', // screenshots output
      designe: 'images/designe', // module pictures
      launch: {
        headless: true
      }, // settings for puppeteer.launch
      pixelmatch: {
        threshold: 0.5
      } // settings for pixelmatch
    }

The 'images' folder you need to create it by yourself. Inside this folder you need create folders  'screenshots' and 'designe'. 
Model images need put in folder 'designe/${layoutNuber}-layout'. 
  

Contribute
----------

- Issue Tracker: github.com/$project/$project/issues
- Source Code: github.com/$project/$project

Support
-------

If you are having issues, please let me know.
