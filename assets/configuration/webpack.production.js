const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const path = require('path');

const AssetsPlugin = require('assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BaseScssRules = require('./loaders/base.scss' );

const { distribution, source } = require('./paths');

module.exports = merge(
  common,
  {
    mode: "production",
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    module: {
      rules: [
        {
          test: /\.(scss|sass)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            }
          ].concat(BaseScssRules([path.resolve(source, 'scss', 'shared', 'utilities.scss')]))
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),
      new CleanWebpackPlugin(),
      new AssetsPlugin({
        fileTypes: [ "js", "css" ],
        includeAllFileTypes: false,
        includeManifest: "manifest",
        manifestFirst: true,
        path: distribution,
        prettyPrint: true
      })
    ]
  }
);