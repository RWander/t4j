/* eslint no-console: 0 */

const express = require('express');
const { getInitData, returnResponse } = require('./indexRender');

const isDev = process.env.NODE_ENV !== 'production';
const port = isDev ? 3000 : process.env.PORT;
const app = express();

// configure Express
require('./express').configure(app);

// routes
app.get('/',
  (req, res, next) => getInitData((err, data) => {
    if (err) next(err);
    req.data = data;
    next();
  }),
  (req, res) => returnResponse(req, res, req.data)
);

// error handlers
require('./errors')(app);

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) console.log(err);
  console.info(`Listening on port ${port}. Open up http://0.0.0.0:${port}/ in your browser.`);
});
