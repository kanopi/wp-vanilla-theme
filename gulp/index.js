'use strict';

// Globals
var gulp = global.gulp = require('gulp');
gulp.$ = require('gulp-load-plugins')();
var browserSync = global.browserSync = require('browser-sync').create();
var tasks = global.tasks = {
  compile: [],
  watch: [],
  validate: [],
  clean: []
};
// Modules
var requireDir = require('require-dir');
var runSequence = require('run-sequence').use(gulp);
// Helpers
var _ = {
  defaults: require('lodash/defaults')
};

requireDir('./tasks');
