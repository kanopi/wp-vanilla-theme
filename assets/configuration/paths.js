const path = require('path');

let dev_server_port = process?.env?.npm_package_config_devServerPort ?? 4400,
    project_directory = process.cwd(),
    assets = path.resolve(project_directory, 'assets');

module.exports = {
    devServer: {
        host: `http://localhost:${dev_server_port}/assets/dist/`,
        port: dev_server_port
    },
    assets: assets,
    distribution: path.resolve(assets, 'dist'),
    node: path.resolve(project_directory, 'node_modules'),
    source: path.resolve(assets, 'src')
}