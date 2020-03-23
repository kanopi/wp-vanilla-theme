'use strict';
var path = require("path");
/*************************************************************
 * Variables
 ************************************************************/
// Local
var themeDir = process.cwd() + '/'; // Theme folder (where gulp is running)

// Global
global.paths = {
  relative: './',
  themeDir: themeDir,
  js: [
    // themeDir + '/node_modules/jquery/dist/jquery.min.js',
    // themeDir + 'libraries/smooth-scroll/dist/smooth-scroll.polyfills.min.js',
    // themeDir + 'node_modules/menuspy/dist/menuspy.min.js',
    themeDir + 'js/**/*.js',
		'!' + themeDir + 'js/customizer.js',
  ],
  sass: themeDir + 'sass/**/*.scss',
  img: themeDir + 'images'
};
