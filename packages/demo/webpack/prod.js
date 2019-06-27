const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const common = require('./common');


module.exports = {
  mode: 'production',
  entry: [
    path.resolve(__dirname, '../src/index.ts')
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      inject: true
    }),

  ],
  optimization: {
    splitChunks: {
      // name: '',
      chunks: 'all',
      minChunks: 1,
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  resolve: common.resolve,
  module: {
    rules: common.module.rules
  }
};
