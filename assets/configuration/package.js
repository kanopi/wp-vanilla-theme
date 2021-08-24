const path = require('path');

let project_directory = process.cwd();
let package_variables = require(path.resolve(project_directory, 'package.json'));
let assets = path.resolve(project_directory, 'assets');

let dev_server_port = package_variables?.config?.devServerPort ?? 4400;

module.exports = {
    devServer: {
        host: `http://localhost:${dev_server_port}/assets/dist/`,
        port: dev_server_port
    },
    assets: assets,
    distribution: path.resolve(assets, 'dist'),
    node: path.resolve(project_directory, 'node_modules'),
    source: path.resolve(assets, 'src'),
    scssIncludes: package_variables?.config?.scssIncludes ?? []
}