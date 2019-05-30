import path from 'path';
import merge from 'webpack-merge';
import webpackBase from './webpack.config.base';

module.exports = merge(webpackBase, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundles.js',
  },
  devServer: {
    port: 3000,
  },
  devtool: 'source-map',
});
