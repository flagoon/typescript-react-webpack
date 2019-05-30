import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import webpackBase from './webpack.config.base';

module.exports = merge(webpackBase, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'app.bundles.js',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle_sizes.html',
    }),
  ],
  externals: { react: 'React', 'react-dom': 'ReactDOM' },
});
