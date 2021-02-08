'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Modules
var del = require('del');
var uglify = require('gulp-uglify');
const babel = require('gulp-babel');
// Globals
var gulp = global.gulp;
var config = global.config;
var paths = global.paths;
var tasks = global.tasks;
var browserSync = global.browserSync;

/*************************************************************
 * Operations
 ************************************************************/
const js_compile = function (done) {
  gulp.src(config.js.src, { base: paths.themeDir })
  // Concatenate everything within the JavaScript folder.
    // .pipe(gulp.$.naturalSort())
    .pipe(gulp.$.sourcemaps.init())
    .pipe(gulp.$.concat('scripts.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.$.sourcemaps.write((config.js.sourceMapEmbed) ? null : './', {
      addComment: false,
    }))
    .pipe(gulp.dest(config.js.dest))
    .pipe(gulp.$.if(config.js.sizeReport.enabled, gulp.$.sizereport(config.js.sizeReport.options)))
    .pipe(browserSync.stream({
      match: '**/*.js',
		}));
	done();
}
js_compile.displayName = 'js:compile';
js_compile.description = 'Compile & minify JS sources, with optional source maps';
gulp.task(js_compile);

const js_clean = function (done) {
  del([
    config.js.dest + '*.{js,js.map}'
  ]).then(function () {
    done();
  });
};
js_clean.displayName = 'js:clean';
js_clean.description = 'Delete compiled JS files';
gulp.task(js_clean);

const js_hint = function (done) {
  gulp.src(config.js.hint.src)
    .pipe(gulp.$.jshint())
		.pipe(gulp.$.jshint.reporter(require('jshint-stylish')));
	done();
}
js_hint.displayName = 'js:hint';
js_hint.description = 'Perform JS hint checks on sources';
gulp.task(js_hint);

/*************************************************************
 * Builders
 ************************************************************/
var jsTasks = ['js:compile'];
if (config.js.hint.enabled) {
  jsTasks.push('js:hint');
}
const js_run = gulp.series(jsTasks);
js_run.displayName = 'js';
js_run.description = 'Execute all configured JS actions (compile, optional hint & lints based on config)';
gulp.task(js_run);

tasks.compile.push('js');
tasks.clean.push('js:clean');
tasks.validate.push('js:hint');

/*************************************************************
 * Watchers
 ************************************************************/
const js_watch = function () {
	var options = {interval: 1000, usePolling: true};
  gulp.watch(config.js.src, options, gulp.series('js'));
};
js_watch.displayName = 'js:watch';
js_watch.description = 'Watch and execute configured JS tasks';
gulp.task(js_watch);

tasks.watch.push('js:watch');
