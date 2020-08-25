'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Modules
var del = require('del');
// Globals
var gulp = global.gulp;
var config = global.config;
var paths = global.paths;
var tasks = global.tasks;
var browserSync = global.browserSync;

/*************************************************************
 * Operations
 ************************************************************/
 // 'Compile & minify JS sources, with optional source maps'
gulp.task('js:compile', function () {
  return gulp.src(config.js.src, { base: paths.themeDir })
  // Concatenate everything within the JavaScript folder.
    // .pipe(gulp.$.naturalSort())
    .pipe(gulp.$.sourcemaps.init())
    .pipe(gulp.$.concat('scripts.js'))
    .pipe(gulp.$.sourcemaps.write((config.js.sourceMapEmbed) ? null : './', {
      addComment: false,
    }))
    .pipe(gulp.dest(config.js.dest))
    .pipe(gulp.$.if(config.js.sizeReport.enabled, gulp.$.sizereport(config.js.sizeReport.options)))
    .pipe(browserSync.stream({
      match: '**/*.js',
    }));
});

// 'Delete compiled JS files'
gulp.task('js:clean', function (done) {
  del([
    config.js.dest + '*.{js,js.map}'
  ]).then(function () {
    done();
  });
});

// 'Perform JS hint checks on sources'
gulp.task('js:hint', function () {
  return gulp.src(config.js.hint.src)
    .pipe(gulp.$.jshint())
    .pipe(gulp.$.jshint.reporter(require('jshint-stylish')));
});

/*************************************************************
 * Builders
 ************************************************************/
var jsTasks = ['js:compile'];
if (config.js.hint.enabled) {
  jsTasks.push('js:hint');
}
gulp.task('js', gulp.series('js:compile'));
// js.description = 'Execute all configured JS actions (compile, optional hint & lints based on config)';
tasks.compile.push('js');
tasks.clean.push('js:clean');
tasks.validate.push('js:hint');

/*************************************************************
 * Watchers
 ************************************************************/
// 'Watch and execute configured JS tasks'
gulp.task('js:watch', function () {
  gulp.watch(config.js.src, gulp.series('js'));
});
tasks.watch.push('js:watch');
