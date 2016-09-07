'use strict';

var fs = require('fs');

module.exports = function (app) {
  app.get('/ping', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('pong!');
  });

  fs.readdirSync(__dirname).forEach(function(file) {
    if (file !== 'index.js') {
      let name = file.substr(0, file.indexOf('.'));
      app.use('/' + name, require('./' + name));
    }
  });
};
