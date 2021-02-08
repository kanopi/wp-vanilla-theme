Kanopi Starter Theme
===

Based on `_s` or `_`underscores`.

This starter theme has been modified to use sassified, uses to use NPM and Gulp.

Requires:
* Node 10+
* Gulp 4

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
4. Search for `<code>&nbsp;_s</code>` (with a space before it) to capture DocBlocks.
5. Search for `_s-` to capture prefixed handles.
6. Search for kanopi.
7. Search for Kanopi.

NPM and Gulp
------------

The site should Glob your JS and and SCSS together.
Right now, if you add a new SCSS partial or an new JS file you may need to stop and restart Gulp, use `gulp build`, or the NVM script. We are in the process of resolving this.

1. Run `npm install`.
1. Run `npm run watch` to watch for changes. Alternatively run `gulp watch`.
1. Run `npm run serve` to launch browserSync. Alternatively run `gulp serve`.
1. Run `npm run build` to clean and compile for PROD. Alternatively run `gulp build`.

Check our the gulp directory or the `package.json` file for more task to run.

Good luck!


About Using the Theme
------------

#### Breakpoints

File: `sass/utilities/variables/_breakpoints.scss`

Breakpoints are managed with an array of bears, because who doesn't love bears. If you need additional breakpoints, you can add them here with a custom name. Breakpoints should be applied to the selector they are controlling, rather than applying several different selectors to a breakpoint. Example:

		div {
			display: none;

			@include breakpoint(bear(mama)) {
				display: block;
			}

			a {
				width: 100%;

				@include breakpoint(bear(mama)) {
					width: 50%;
				}

			}
		}

Breakpoints by default are "minimum width", meaning you should be building mobile first whenever possible. 


#### Interpolation

You can interpolate items for better responsive control over things like padding and font sizes. 

In the following example, we can have the font-size at 30px on `bear(teen)` and lower, with `bear(grandpa)` and higher using 60px. In between, the font size will gradually increase and decrease with a percentage value.

		div {
			@include interpolate(font-size, bear(teen), bear(grandpa), 30px, 60px);
		}


In the following example, we can apply interpolate-many to multiple items to use the same values. In this case, the left and right padding would 10px on `bear(papa)` and gradually increase up to 50px at `bear(mama)`.

		div {
			@include interpolate-many(bear(papa), bear(mama), 10px, 50px, padding-right, padding-left);
		}

#### Color Presets

File: `sass/utilities/variables/_colors.scss`

You can add as many color presets as your theme needs, and even create new palettes.
Use: `color: color-preset(black);` 

#### Sass Lint, PHPCS, & Beautification

You can set your IDE up to read the `.sass-lint.yml` file and alert you to errors against the theme standards. A beautifier can also be a helpful tool to keep your sass looking clean.

This theme follows WordPress Core for PHP standards. The included `phpcs.xml.dist` file can be used with your IDE to do automatic code sniffing and beautificaiton.

Kanopi expects their developers to imploy these standards. If you are a contractor and do not have your IDE configured to accommodate, please let your tech lead know.
