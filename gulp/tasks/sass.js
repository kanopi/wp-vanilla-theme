'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Modules
var del = require('del');
var sassdoc = require('sassdoc');
var normalizeScss = require('node-normalize-scss');
// Globals
var gulp = global.gulp;
var config = global.config;
var tasks = global.tasks;
var browserSync = global.browserSync;

/*************************************************************
 * Operations
 ************************************************************/
const sass_compile = function (done) {
  gulp.src(config.sass.themeSrc)
    .pipe(gulp.$.sassGlob())
    .pipe(gulp.$.plumber({
      errorHandler: function (error) {
        gulp.$.notify.onError({
          title: 'CSS <%= error.name %> - Line <%= error.line %>',
          message: '<%= error.message %>'
        })(error);
        this.emit('end');
      }
    }))
    .pipe(gulp.$.sourcemaps.init({
      debug: config.debug
    }))
    .pipe(gulp.$.sass({
      outputStyle: config.sass.outputStyle,
      sourceComments: config.sass.sourceComments,
      includePaths: normalizeScss.with(config.sass.includePaths)
    }).on('error', gulp.$.sass.logError))
    .pipe(gulp.$.autoprefixer(config.sass.autoPrefixerBrowsers))
    .pipe(gulp.$.sourcemaps.init())
    .pipe(gulp.$.cleanCss())
    .pipe(gulp.$.sourcemaps.write((config.sass.sourceMapEmbed) ? null : './'))
    .pipe(gulp.$.if(config.sass.flattenDestOutput, gulp.$.flatten()))
    // .pipe(gulp.dest(config.sass.themeDest))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(gulp.$.if(config.sass.sizeReport.enabled,
      gulp.$.sizereport(config.sass.sizeReport.options)
    ))
		.pipe(browserSync.stream({match: '**/*.css'}));
	done();
}
sass_compile.displayName = 'sass:compile';
sass_compile.description = 'Compile Scss to CSS using Libsass with Autoprefixer and SourceMaps';
gulp.task(sass_compile);

const sass_clean = function (done) {
  del([
    config.sass.dest + '*.{css,css.map}'
  ]).then(function () {
    done();
  });
}
sass_clean.displayName = 'sass:clean';
sass_clean.description = 'Delete compiled CSS files';
gulp.task(sass_clean);

const sass_lint = function (done) {
  var src = config.sass.watchSrc;
  if (config.sass.lint.extraSrc) {
    src = src.concat(config.sass.lint.extraSrc);
  }
  gulp.src(src)
    .pipe(gulp.$.cached('validate:css'))
    .pipe(gulp.$.sassLint())
    .pipe(gulp.$.sassLint.format())
		.pipe(gulp.$.if(config.sass.lint.failOnError, gulp.$.sassLint.failOnError()));
	done();
}
sass_lint.displayName = 'sass:lint';
sass_lint.description = 'Lint Scss files';
gulp.task(sass_lint);

const sass_docs = function (done) {
  gulp.src(config.sass.src)
    .pipe(sassdoc({
      dest: config.sass.docs.dest,
      verbose: config.sass.docs.verbose,
      basePath: config.sass.docs.basePath,
      exclude: config.sass.docs.exclude,
      theme: config.sass.docs.theme,
      sort: config.sass.docs.sort
		}));
	done();
};
sass_docs.displayName = 'sass:docs';
sass_docs.description = 'Build CSS docs using SassDoc';
gulp.task(sass_docs);

const sass_docs_clean = function (done) {
  del([
    config.sass.docs.dest
  ]).then(function () {
    done();
  });
}
sass_docs_clean.displayName = 'sass:docs:clean';
sass_docs_clean.description = 'Delete compiled CSS docs';
gulp.task(sass_docs_clean);

/*************************************************************
 * Builders
 ************************************************************/
var sassTasks = ['sass:compile'];
if (config.sass.lint.enabled) {
  sassTasks.push('sass:lint');
}
if (config.sass.docs.enabled) {
  sassTasks.push('sass:docs');
  tasks.clean.push('sass:docs:clean');
}

const sass_run = gulp.series(sassTasks);
sass_run.displayName = 'sass';
sass_run.description = 'Execute all configured Sass actions (compile, optional lint/sourcemaps based on config)';
gulp.task(sass_run);

tasks.compile.push('sass');
tasks.clean.push('sass:clean');
tasks.validate.push('sass:lint');

/*************************************************************
 * Watchers
 ************************************************************/
const sass_watch = function () {
  var options = {interval: 800, usePolling: true};
  gulp.watch(config.sass.src, options, gulp.series(['sass']));
};
sass_watch.displayName = 'sass:watch';
sass_watch.description = 'Watch and execute configured SASS tasks';
gulp.task(sass_watch);

tasks.watch.push('sass:watch');
