const AssetsPlugin = require('assets-webpack-plugin');
const webpack = require('webpack');

const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const path = require('path');

const FileRules = require('./rules/file');
const ScssLoaders = require('./loaders/scss');
const TypescriptRules = require('./rules/typescript');

const { devServer, distribution, scssIncludes } = require('./package');

module.exports = merge.smart(
  common,
  {
    output: {
      publicPath: devServer.host
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      allowedHosts: [
        '.localhost',
        'localhost',
        '.docksal',
        '127.0.0.1'
      ],
      contentBase: distribution,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      hotOnly: true,
      historyApiFallback: true,
      inline: true,
      port: devServer.port,
      publicPath: devServer.host,
    },
    module: {
      rules: [
        ...FileRules(),
        ...TypescriptRules(),
        {
          test: /\.(scss|sass)$/,
          use: [
            'style-loader',
            ...ScssLoaders(scssIncludes, `$asset_root: '${devServer.host}/';`, true)
          ]
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new AssetsPlugin({
        fileTypes: [ 'js', 'css' ],
        keepInMemory: true,
        includeAllFileTypes: false,
        includeManifest: 'manifest',
        manifestFirst: true,
        path: path.join('assets', 'dist'),
        prettyPrint: true
      })
    ]
  }
);