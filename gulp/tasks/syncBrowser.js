'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Modules
var _ = {
  defaults: require('lodash/defaults')
};
// Globals
var gulp = global.gulp;
var config = global.config;
var browserSync = global.browserSync;

/*************************************************************
 * Operations
 ************************************************************/
const serve = gulp.series('compile', 'watch', function(done){
	if (config.browserSync.domain) {
		browserSync.init(_.defaults({
			injectChanges: true,
			// Add Proxy server URL
			proxy: {
				target: config.browserSync.domain
			}
		}, config.browserSync.defaults));
	}
	else {
		browserSync.init(_.defaults({
			injectChanges: true,
			server: {
				baseDir: config.browserSync.baseDir
			}
		}, config.browserSync.defaults));
	}
});
serve.displayName = 'serve';
serve.description = 'Launch BrowserSync and expected file watchers to serve PatternLab';
gulp.task(serve);


/*************************************************************
 * Builders
 ************************************************************/
gulp.task('theme', gulp.series('serve'));

/*************************************************************
 * Watchers
 ************************************************************/
