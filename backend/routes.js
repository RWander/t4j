'use strict';

//const mongoose = require('mongoose');
//const Job = mongoose.model('jobs');

module.exports = function (app) {
  app.get('/ping', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('pong!');
  });

  // app.get('/getComments', function(req, res, next) {
  //   Comment.getAll().then(
  //     comments => res.json(comments),
  //     err => next(err)
  //   );
  // });
};
