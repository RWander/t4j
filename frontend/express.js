'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

module.exports.configure = function (app) {
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
};

module.exports.getHtmlContent = function (file) {
  return middleware.fileSystem.readFileSync(path.join(__dirname, file));
};
