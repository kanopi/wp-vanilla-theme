Kanopi Starter Theme
===

Based on `_s` or `_`underscores`.

This starter theme has been modified to use sassified, uses to use NPM and Gulp.

Requires:
* Node v10.12.0
* Gulp 3

Notes:
* NPM does not install the gulp-cli. This theme assumes the package is installed globally.
* package.json and package-lock.json were built within a docksal docker container.
* NPM packages are out of date. These are being updated in the move to Gulp 4.

To use browser sync besure to update the localUrl found here `gulp/config/browserSync.js`.

Getting Started
---------------

If you want to keep it simple, head over to https://underscores.me and generate your `_s` based theme from there. You just input the name of the theme you want to create, click the "Generate" button, and you get your ready-to-awesomize starter theme.

When renaming the theme, rename the direcotry and search/replace the following.

1. Search for `'_s'` (inside single quotations) to capture the text domain.
2. Search for `_s_` to capture all the function names.
3. Search for `Text Domain: _s` in `style.css`.
4. Search for <code>&nbsp;_s</code> (with a space before it) to capture DocBlocks.
5. Search for `_s-` to capture prefixed handles.
6. Search for kanopi.
7. Search for Kanopi.

NPM and Gulp
------------

The site should Glob your JS and and SCSS together.
Right now, if you add a new SCSS partial or an new JS file you may need to stop and restart Gulp or the NVM script. We are in the process of resolving this.

1. Run `npm install`.
1. Run `npm run watch` to watch for changes. Alternatively run `gulp watch`.
1. Run `npm run serve` to launch browserSync. Alternatively run `gulp serve`.
1. Run `npm run build` to clean and compile for PROD. Alternatively run `gulp build`.

Check our the gulp directory or the `package.json` file for more task to run.

Good luck!
