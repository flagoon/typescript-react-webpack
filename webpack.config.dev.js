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
    new ForkTsCheckerWebpackPlugin({
      eslint: true,
      useTypescriptIncrementalApi: true,
    }),
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
