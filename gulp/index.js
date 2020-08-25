'use strict';

// Globals
var gulp = global.gulp = require('gulp-help')(require('gulp'));
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

/**
 * Global Tasks
 */
gulp.task('compile', gulp.series(tasks.compile));
// compile.description = 'Runs all required compile tasks';
gulp.task('clean', gulp.series(tasks.clean));
// clean.description 'Runs all required clean tasks';
gulp.task('validate', gulp.series(tasks.validate));
// validate.description 'Runs all validation tasks, no exceptions';
gulp.task('watch', gulp.parallel(tasks.watch));
// watch.description 'Runs default watches across the board';
gulp.task('build', '', gulp.series('clean', 'compile'));
// build.description 'Runs default watches across the board';

// gulp.task('default',  '', function () {
//   runSequence('clean', 'compile', 'watch');
// });
gulp.task('default', gulp.series('compile', 'watch'));
