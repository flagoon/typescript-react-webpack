/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const merge = require('webpack-merge');
const webpackBase = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = merge(webpackBase, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundles.js',
  },
  plugins: [
    // this plugin is checking and reporting problems with typescript types. Without it,
    // webpack will not report errors, if compilation is correct. If we don't use {transpileOnly: true}
    // webpack will check types differently and therefore would take more time.
    new ForkTsCheckerWebpackPlugin({
      eslint: true,
      useTypescriptIncrementalApi: true,
    }),
    // show system notification while typescript has checked types correctly or not.
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      alwaysNotify: true,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
    }),
  ],
  devtool: 'source-map',
  devServer: {
    clientLogLevel: 'warning',
    open: true,
    port: 3000,
    historyApiFallback: true,
    stats: 'errors-only',
  },
});
