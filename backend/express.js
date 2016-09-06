'use strict';

const morgan = require('morgan');
const bodyParser = require('body-parser');
const winston = require('winston');

const env = process.env.NODE_ENV || 'development';

module.exports = function (app) {
  // Don't log during tests
  // Logging middleware
  if (env !== 'test') {
    // Use winston on production
    const log = env !== 'development'
      ? { stream: { write: message => winston.info(message) } }
      : 'dev';

    app.use(morgan(log));
  }

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
