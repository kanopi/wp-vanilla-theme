const common = require('./webpack.common.js');
const merge = require('webpack-merge');

const AssetsPlugin = require('assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const FileRules = require('./rules/file');
const ScssLoaders = require('./loaders/scss');
const TypescriptRules = require('./rules/typescript');

const { distribution, scssIncludes } = require('./package');

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
        ...FileRules(),
        ...TypescriptRules(),
        {
          test: /\.(scss|sass)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            ...ScssLoaders(scssIncludes)
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),
      new CleanWebpackPlugin(),
      new AssetsPlugin({
        fileTypes: ["js", "css"],
        includeAllFileTypes: false,
        includeManifest: "manifest",
        manifestFirst: true,
        path: distribution,
        prettyPrint: true
      })
    ]
  }
);