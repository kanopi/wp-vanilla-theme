Kanopi Starter Theme
===

# Asset Bundles

The theme utilizes Kanopi Pack (orchestrates Webpack) to bundle JS/CSS assets. An .nvmrc contains NPM version requirements, is it strongly recommended to use NVM to manage Node/NPM at the project level.

## Kanopi Pack

The package [@kanopi/pack](https://github.com/kanopi/kanopi-pack) orchestrates Webpack and Webpack Dev Server (WDS). An in-theme [asset loader](https://github.com/rleeson/wp-webpack-loader) module which allows switching the theme between development and production versions.

Configuration for Kanopi Pack is defined in `assets/configuration/kanopi-pack.js`. The only required entries in the file are entry points, defined under `filePatterns.entryPoints`, which each generate either a style (CSS) or script (JS) file based on the entry file type and available loaders/processors.

By default, the theme runs WDS on a local port, which can be overriden in the configuration file. To enable development mode on the site itself, set the constant `KANOPI_DEVELOPMENT_ASSET_URL` to the URL of WDS, `http://localhost:4400/`.

The **preferred** method to run Kanopi Pack for local development is through a Docksal CLI service which runs WDS and proxies onto a subdomain of the Docksal instance. For instance, if your instance domain is `kanopi.docksal` set a proxy for Kanopi Pack at `theme-assets.kanopi.docksal`. In this example, set the constant `KANOPI_DEVELOPMENT_ASSET_URL` to `http://theme-assets.kanopi.docksal/`. An example for a proxy based Kanopi Pack configuration is commented out in the default configuration file.

Script based assets are all minified by default using Terser.

Following are the commands to run per the appropriate situations:

### Local Development
```bash
npm run development
```

### Production|CI/CD
```bash
npm run production
```

## SASS Utilities

### Breakpoints

File: `assets/src/scss/shared/variables/_breakpoints.scss`

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

### Interpolation

You can interpolate items for better responsive control over things like padding and font sizes. 

In the following example, we can have the font-size at 30px on `bear(teen)` and lower, with `bear(grandpa)` and higher using 60px. In between, the font size will gradually increase and decrease with a percentage value.

		div {
			@include interpolate(font-size, bear(teen), bear(grandpa), 30px, 60px);
		}


In the following example, we can apply interpolate-many to multiple items to use the same values. In this case, the left and right padding would 10px on `bear(papa)` and gradually increase up to 50px at `bear(mama)`.

		div {
			@include interpolate-many(bear(papa), bear(mama), 10px, 50px, padding-right, padding-left);
		}

### Color Presets

File: `assets/src/scss/shared/variables/_colors.scss`

You can add as many color presets as your theme needs, and even create new palettes.
Use: `color: color-preset(black);` 

# Other Development Tools

This theme follows WordPress Core for PHP standards. The included `phpcs.xml.dist` file can be used with your IDE to do automatic code sniffing and beautificaiton.
