'use strict';

const express = require('express');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports.configure = function (app) {
  if (NODE_ENV === 'production') {
    // production
    app.use(express.static(__dirname + '/dist'));
  } else {
    // development, test
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackConfig = require('./webpack.config');
    app.use(webpackDevMiddleware(webpack(webpackConfig), {
      publicPath: '/',
      stats: {
        colors: true
      }
    }));
  }
};
