'use strict';

module.exports = function(app) {
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
