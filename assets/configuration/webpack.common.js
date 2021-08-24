const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

const { assets, distribution, source } = require('./package');

module.exports = {
  entry: {
    /** Apps/Scripts **/
    customizer: [path.resolve(source, 'js', 'customizer.js')],
    legacy: [path.resolve(source, 'js', 'legacy.js')],
    /** Styles **/
    theme: [path.resolve(source, 'scss', 'theme.scss')],
  },
  externals: {
    jquery: 'jQuery'
  },
  output: {
    path: distribution,
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': source
    }
  },
  optimization: {
    chunkIds: 'named',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      name: 'central',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor'
        }
      }
    }
  },
  plugins: [
    new StyleLintPlugin({
      configFile: path.resolve(assets, 'configuration', 'tools', '.stylelintrc'),
      fix: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './assets/src/static',
          to: 'static/',
          toType: 'dir'
        }
      ]
    }),
    new webpack.HashedModuleIdsPlugin({
      context: source,
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 8
    })
  ]
};