const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

const { assets, distribution, source } = require('./paths');

const babel_loader_options = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true
        }
      }
    ]
  ],
  sourceMaps: true
};

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
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babel_loader_options
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babel_loader_options
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true
            }
          }
        ]
      }
    ]
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