'use strict';

const path = require('path');
const express = require('express');
const fs = require('fs');

module.exports.configure = function (app) {
  app.use(express.static(__dirname + '/dist'));
};

module.exports.getHtmlContent = function (file) {
  return fs.readFileSync(path.join(__dirname, file));
};
