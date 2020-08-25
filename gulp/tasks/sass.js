'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Modules
var del           = require('del');
var sassdoc       = require('sassdoc');
var normalizeScss = require('node-normalize-scss');
// Globals
var gulp        = global.gulp;
var config      = global.config;
var tasks       = global.tasks;
var browserSync = global.browserSync;

/*************************************************************
 * Operations
 ************************************************************/
// 'Compile Scss to CSS using Libsass with Autoprefixer and SourceMaps'
gulp.task('sass:compile', function () {
  return gulp.src(config.sass.themeSrc)
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
    .pipe(gulp.dest(config.sass.dest))
    .pipe(gulp.$.if(config.sass.sizeReport.enabled,
      gulp.$.sizereport(config.sass.sizeReport.options)
    ))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

// 'Delete compiled CSS files'
gulp.task('sass:clean', function (done) {
  del([
    config.sass.dest + '*.{css,css.map}'
  ]).then(function () {
    done();
  });
});

// 'Lint Scss files'
gulp.task('sass:lint', function () {
  var src = config.sass.watchSrc;
  if (config.sass.lint.extraSrc) {
    src = src.concat(config.sass.lint.extraSrc);
  }
  return gulp.src(src)
    .pipe(gulp.$.cached('validate:css'))
    .pipe(gulp.$.sassLint())
    .pipe(gulp.$.sassLint.format())
    .pipe(gulp.$.if(config.sass.lint.failOnError, gulp.$.sassLint.failOnError()));
});

// 'Build CSS docs using SassDoc'
gulp.task('sass:docs', function () {
  return gulp.src(config.sass.src)
    .pipe(sassdoc({
      dest: config.sass.docs.dest,
      verbose: config.sass.docs.verbose,
      basePath: config.sass.docs.basePath,
      exclude: config.sass.docs.exclude,
      theme: config.sass.docs.theme,
      sort: config.sass.docs.sort
    }));
});

// 'Delete compiled CSS docs'
gulp.task('sass:docs:clean', function (done) {
  del([
    config.sass.docs.dest
  ]).then(function () {
    done();
  });
});

/*************************************************************
 * Builders
 ************************************************************/
// var sassTasks = ['sass:compile'];
// if (config.sass.lint.enabled) {
//   sassTasks.push('sass:lint');
// }
// if (config.sass.docs.enabled) {
//   sassTasks.push('sass:docs');
//   tasks.clean.push('sass:docs:clean');
// }

// 'Execute all configured Sass actions (compile, optional lint/sourcemaps based on config)'
// gulp.task('sass', sassTasks);
gulp.task('sass', function () {
	var sassTasks = ['sass:compile'];
	if (config.sass.lint.enabled) {
	  sassTasks.push('sass:lint');
	}
	if (config.sass.docs.enabled) {
	  sassTasks.push('sass:docs');
	  tasks.clean.push('sass:docs:clean');
	}
})

tasks.compile.push('sass');
tasks.clean.push('sass:clean');
tasks.validate.push('sass:lint');

/*************************************************************
 * Watchers
 ************************************************************/
gulp.task('sass:watch', function () {
  // return gulp.watch(config.sass.watchSrc, gulp.series('sassTasks'));
  return gulp.watch(config.sass.watchSrc, gulp.series('sass:compile'));
});
tasks.watch.push('sass:watch');
