module.exports = {
    /*
     * Docksal Proxy Based Configuration
     *  - Uses a Proxied CLI service running Kanopi Pack
     *      - Set this up on a subdomain of the .docksal for the project
     *      - For instance, theme-assets.kanopi.docksal, see example below
     *  - Polling is required for running inside a container/VM
    *   - In order for the site/theme to use WDS, the constant KANOPI_DEVELOPMENT_ASSET_URL is required
    *       - For instance, if using port 4200, set in wp-config.php or a location before theme load:
    *           define('KANOPI_DEVELOPMENT_ASSET_URL', 'http://theme-assets.kanopi.docksal');
     */
    /*
        "devServer": {
            "sockHost": "theme-assets.kanopi.docksal",
            "sockPort": 80,
            "useProxy": true,
            "watchOptions": {
                "poll": true
            }
        },
    */
   /*
    * Direct Webpack Dev Server (WDS) Configuration
    *   - The built-in Webpack Loader uses Production bundles by default
    *   - Kanopi Pack exposes Webpack Dev Server (WDS) on port 4400 by default
    *   - In order for the site/theme to use WDS, the constant KANOPI_DEVELOPMENT_ASSET_URL is required
    *       - For instance, if using port 4200, set in wp-config.php or a location before theme load:
    *           define('KANOPI_DEVELOPMENT_ASSET_URL', 'http://localhost:4200');
    */
   /*
        "devServer": {
            "port": 4200
        },
    */
    "filePatterns": {
        "entryPoints": {
            // CSS/JS file entry points, add/remove per project requirements
            "customizer": "./assets/src/js/customizer.js",
            "legacy": "./assets/src/js/legacy.js",
            "theme": "./assets/src/scss/theme.scss"
        }
    },
    "styles": {
        "scssIncludes": [
            // Functions, Mixins, Variables, etc imported to each SCSS file automatically
            "./assets/src/scss/shared/utilities.scss"
        ]
    }
}