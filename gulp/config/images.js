'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Globals
var paths = global.paths;
global.config.images = {
  src: paths.img + '/**/*',
  dest: paths.themeDir + 'dist/images/',
  sizeReport: {
  enabled: true,
    options: {}
  }
};
