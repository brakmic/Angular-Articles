'use strict';

const webpack = require('webpack');
const path = require('path');
const helper = require('./helper');

/*
 * Webpack Plugins
 */
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const resolveNgRoute = require('@angularclass/resolve-angular-routes');
const WatchIgnorePlugin = require('webpack/lib/WatchIgnorePlugin');

module.exports = {
  entry: {
    'worker': './src/workers/storage.worker.ts'
  },
  output: {
    path: helper.getRoot('src/workers'),
    filename: "[name].js",
    sourceMapFilename: '[name].map',
  },
  devtool: 'source-map',
  resolve: {

    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['.ts', '.js', '.json'],

    // An array of directory names to be resolved to the current directory
    modules: [
        helper.getRoot('src'),
        helper.getRoot('src/app'),
        helper.getRoot('src/vendor'),
        helper.getRoot('node_modules')
    ],
    alias: {
      'lodash': helper.getRoot('node_modules/lodash/index.js')
    },

  },
  module: {
      rules: [
            /*
            * Typescript loader support for .ts and Angular 2 async routes via .async.ts
            *
            * See: https://github.com/s-panferov/awesome-typescript-loader
            */
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                  // these packages have problems with their sourcemaps
                  helper.getRoot('node_modules/rxjs'),
                  helper.getRoot('node_modules/@angular'),
                ]
            },
            /*
            * Json loader support for *.json files.
            *
            * See: https://github.com/webpack/json-loader
            */
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
      ]
  },
  plugins: [
    new WatchIgnorePlugin([
       helper.getRoot('src/workers/*.js')
    ]),
  ],
  node: {
    global: true,
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
