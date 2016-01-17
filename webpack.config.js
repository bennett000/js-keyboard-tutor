'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './client/src/index.ts',
    vendor: [
      'es6-shim',
      'reflect-metadata',
      'redux',
      'redux-thunk',
      'immutable',
      'angular2/bundles/angular2-polyfills',
      'angular2/bootstrap',
      'angular2/platform/browser',
      'angular2/platform/common_dom',
      'angular2/core',
      'ng2-redux'
    ]
  },
  stats: {
    colors: true,
    reasons: true
  },
  output: {
    path: path.join(__dirname, 'client', 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ],
  preLoaders: [{
    test: /\.ts$/,
    loader: 'tslint'
  }],
  module: {
    preLoaders: [{
      test: /\.ts$/,
      loader: 'tslint'
    }],
    loaders: [
      { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ }
    ]
  },
  devServer: {
    inline: true,
    colors: true,
    contentBase: './client'
  },
  noParse: [ /zone\.js\/dist\/.+/, /angular2\/bundles\/.+/ ]
};