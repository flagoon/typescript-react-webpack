/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
const webpackBase = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// minimize and optimize CSS files
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// extracts css files to separate ones. If js/ts file has import '*.css' it will create new file during compilation.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(webpackBase, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].[contentHash].js',
  },
  /**
   * normally mode: 'production' determines that js code will be minimized. We want to minimize CSS as well, so we
   * need to use optimize-css-assets-webpack-plugin, but if we use only this, we will override optimization for production
   * so we have to include TerserPlugin as well.
   */
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    // required for above rule. We have to add names to css files.
    new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      useTypescriptIncrementalApi: true,
      memoryLimit: 4096,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle_sizes.html',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],

  // in production mode we are not including react/react-dom
  externals: { react: 'React', 'react-dom': 'ReactDOM' },
});
