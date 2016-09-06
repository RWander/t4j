'use strict';

module.exports = function(app) {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers
  /* eslint-disable no-unused-vars */
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: app.get('env') === 'production' ? { } : err
    });
  });
  /* eslint-enable no-unused-vars */
};
