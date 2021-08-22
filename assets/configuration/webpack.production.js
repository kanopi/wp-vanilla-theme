const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const path = require('path');

const AssetsPlugin = require('assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PostCSSPresetEnv = require("postcss-preset-env");
const Sass = require('sass');

const { distribution } = require('./paths');

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
          test: /\.(scss|sass|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  plugins: [
                    PostCSSPresetEnv,
                    {
                      autoprefixer: { 'grid': 'autoplace' }
                    }
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                additionalData: '@import "./assets/src/scss/shared/utilities";',
                implementation: Sass,
                sassOptions: {
                  includePaths: [
                    path.resolve(__dirname, 'node_modules')
                  ],
                  linefeed: 'lf',
                  outputStyle: 'expanded',
                }
              }
            },
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