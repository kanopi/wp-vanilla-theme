/**
 * Main configuration file for Kanopi's Webpack Implementation
 */
const path = require('path');

let project_directory = process.cwd();
let package_variables = require(path.resolve(project_directory, 'package.json'));
let assets = path.resolve(project_directory, 'assets');
let distribution_path = path.resolve(assets, 'dist');

let dev_server_allowed_hosts = package_variables?.kanopiPackConfig?.devServerAllowedHosts ?? [];
let dev_server_port = package_variables?.kanopiPackConfig?.devServerPort ?? 4400;
let typescript_filetype_patterns = package_variables?.kanopiPackConfig?.additionalTypescriptFileTypes ?? [];

dev_server_allowed_hosts = dev_server_allowed_hosts.concat([
    '.localhost',
    'localhost',
    '.docksal',
    '127.0.0.1'
]);
typescript_filetype_patterns.concat([/\.vue$/])

module.exports = {
    devServer: {
        allowedHosts: dev_server_allowed_hosts,
        host: `http://localhost:${dev_server_port}/assets/dist/`,
        port: dev_server_port
    },
    filePatterns: {
        cssOutputPattern: package_variables?.kanopiPackConfig?.jsOutputPath ?? 'css/[name].css',
        entryPoints: package_variables?.kanopiPackConfig?.entry ?? {},
        jsOutputPattern: {
            filename: package_variables?.kanopiPackConfig?.jsOutputPath ?? 'js/[name].js',
            path: distribution_path
        }
    },
    paths: {
        assets: assets,
        distribution: distribution_path,
        node: path.resolve(project_directory, 'node_modules'),
        source: path.resolve(assets, 'src')
    },
    scripts: {
        additionalTypescriptFileTypes: typescript_filetype_patterns,
    },
    sourceMaps: package_variables?.kanopiPackConfig?.forceProductionSourceMaps ?? false,
    styles: {
        scssIncludes: package_variables?.kanopiPackConfig?.scssIncludes ?? [],
        stylelintAutoFix: package_variables?.kanopiPackConfig?.scssAutoFix ?? true,
        stylelintConfigPath: path.resolve(assets, 'configuration', 'tools', '.stylelintrc'),
    }
}