const path = require('path');

let dev_server_port = process?.env?.npm_package_config_devServerPort ?? 4400,
    project_directory = process.cwd();

module.exports = {
    devServer: {
        host: `http://localhost:${dev_server_port}/assets/dist/`,
        port: dev_server_port
    },
    distribution: path.resolve(project_directory, 'assets', 'dist'),
    node: path.resolve(project_directory, 'node_modules'),
    source: path.resolve(project_directory, 'assets', 'src')
}