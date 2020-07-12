/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
  // Change to your "entry-point".
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundles.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', 'jpg'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|tsx|js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            emitError: true,
          },
        },
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        // we use transpilation only, because error checking in on different process.
        // ForkTsCheckerWebpackPlugin is checking types while in develop mode.
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(svg|png|jp?g|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets',
          },
        },
      },
    ],
  },
};
