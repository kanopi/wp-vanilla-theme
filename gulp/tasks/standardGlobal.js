'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Globals
var gulp = global.gulp;
var config = global.config;

/*************************************************************
 * Operations
 ************************************************************/
const compile_run = gulp.series(tasks.compile);
compile_run.displayName = 'compile';
compile_run.description = 'Runs all required compile tasks';
gulp.task(compile_run);

console.log(tasks.clean);
const clean_run = gulp.series(tasks.clean);
clean_run.displayName = 'clean';
clean_run.description = 'Runs all required clean tasks';
gulp.task(clean_run);

const validate_run = gulp.series(tasks.validate);
validate_run.displayName = 'validate';
validate_run.description = 'Runs all validation tasks, no exceptions';
gulp.task(validate_run);

const watch_run = gulp.parallel(tasks.watch);
watch_run.displayName = 'watch';
watch_run.description = 'Runs default watches across the board';
gulp.task(watch_run);

gulp.task('build', gulp.series(['clean', 'compile']));
gulp.task('default', gulp.series(['compile', 'watch']));
