'use strict';

/* eslint-disable no-console */

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
const env = app.get('env');

// Bootstrap models
const models = join(__dirname, 'models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

// Bootstrap routes
require('./express')(app);  // express settings
require('./routes')(app);   // routes
require('./errors')(app);   // error handlers

function start(callback) {
  dbConnect()
    .on('error', console.log)
    .on('disconnected', dbConnect)
    .once('open', () => listen(callback));
}

function listen (callback) {
  const server = app.listen(config.http.port, config.http.host, () => {
    const address = server.address();
    const host = address.address;
    const port = address.port;

    console.log(`RESTful server "${env}" listening at http://${host}:${port}`);

    if (callback) {
      callback();
    }
  });
}

function dbConnect () {
  mongoose.Promise = global.Promise;
  const options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.get('db').uri, options).connection;
}

module.exports.start = start;
module.exports.app = app;
module.exports.dbConnect = dbConnect;
