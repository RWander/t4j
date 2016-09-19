'use strict';

const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const config = require(`./config/${NODE_ENV}`);

const options = {
  devtool: 'eval-source-map',
  entry: [
    'whatwg-fetch',
    //'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(_.merge({ 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) }, config))
  ],
  module: {
    preLoaders:	[{
      test:	/\.js$/,
      loaders: ['eslint'],
      exclude: /node_modules/,
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        'presets': ['react', 'es2015', 'stage-0']
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      //loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss')
    }]
  },
  postcss: [
    require('autoprefixer')
  ]
};

if (NODE_ENV === 'production') {
  options.plugins[options.plugins.length] = new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
      screw_ie8: true
    }
  });
}

module.exports = options;
