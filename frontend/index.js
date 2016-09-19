/* eslint no-console: 0 */

const express = require('express');
const { getInitData } = require('./app/initState');

const isDev = process.env.NODE_ENV !== 'production';
const port = isDev ? 3000 : process.env.PORT;
const app = express();

const expressConfig = require('./express');
const getHtmlContent = expressConfig.getHtmlContent;

// configure Express
expressConfig.configure(app);

// routes
app.get('/',
  function(req, res, next) {
    getInitData((err, data) => {
      if (err) next(err);
      req.data = data;
      next();
    });
  },
  function response(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write(getHtmlContent(req.data));
    res.end();
  }
);

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) console.log(err);
  console.info(`Listening on port ${port}. Open up http://0.0.0.0:${port}/ in your browser.`);
});
