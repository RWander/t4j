'use strict';

var fs = require('fs');

module.exports = function (app) {
  app.get('/ping', function(req, res) {
    res.json({data: Date.now()});
  });

  app.get('/data', function(req, res) {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data[i] = Date.now() + i;
    }
    res.json({data:data});
  });

  fs.readdirSync(__dirname).forEach(function(file) {
    if (file !== 'index.js') {
      let name = file.substr(0, file.indexOf('.'));
      app.use('/' + name, require('./' + name));
    }
  });
};
