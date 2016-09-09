//const webpack = require('webpack');

module.exports = {
  entry: './index',
  resolve: {
    modulesDirectories: [
      '.'
    ]
  },
  output: {
    filename: 'public/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  }
};
