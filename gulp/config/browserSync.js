'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Local
var localUrl = 'kanopi-2019.docksal'; // EG 'localhost', 'mysite.dev', leave blank for
// Globals
var paths = global.paths;


global.config.browserSync = {
  ui: true,
  enabled: false,
  baseDir: './',
  domain: localUrl,
  defaults: {
    startPath: './',
    open: true,
    browser: "google chrome",
    reloadDelay: 50,
    reloadDebounce: 750,
  },
};


global.config.wpt = {
  // WebPageTest API key https://www.webpagetest.org/getkey.php
  // key:
};
