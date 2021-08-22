const AssetsPlugin = require('assets-webpack-plugin');
const PostCSSPresetEnv = require('postcss-preset-env');
const Sass = require('sass');
const webpack = require('webpack');

const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const path = require('path');

const { devServer, distribution, node, source } = require('./paths');

let user;
try {
  user = require('./webpack.development.user.js');
}
catch ( e ) {
  user = {};
}

let sassPrependData = `$static-files: '${devServer.host}static/';`
  + `@import '${source}/scss/shared/utilities';`;

module.exports = merge.smart(
  common,
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor'
          }
        }
      },
    },
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
        {
          test: /\.(scss|sass|css)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
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
                  ],
                  sourceMap: true
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                additionalData: sassPrependData,
                implementation: Sass,
                sassOptions: {
                  includePaths: [
                    node
                  ],
                  linefeed: 'lf',
                  outputStyle: 'expanded',
                },
                sourceMap: true
              }
            }
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
  },
  user
);