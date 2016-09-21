/* This module for NODE only! */

const fetch = require('node-fetch');
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const Provider = require('react-redux').Provider;
const { createMemoryHistory, match, RouterContext } = require('react-router');
const { syncHistoryWithStore } = require('react-router-redux');

const routes = require('./app/routes').default;
const DevTools = require('./app/containers/_DevTools').default;
const configureStore = require('./app/store/configureStore').default;
const { LOAD_DATA_SUCCESS } = require('./app/constants/Data');

const env = process.env.NODE_ENV;
const config = require(`./config/${env ? env : 'development'}`);
const backendUrl = config.BACKEND.replace(/"/g,'');

module.exports.getInitData = function(next) {
  _backendGET(
    'data',
    // success
    res => next(null, res.data),
    // fail
    err => next(err)
  );
};

module.exports.returnResponse = function (req, res, data) {
  // Create a new Redux store instance
  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  store.dispatch({
    type: LOAD_DATA_SUCCESS,
    payload: data
  });

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      _renderHtml(res, store, renderProps);
    } else {
      res.status(404).send('Not Found');
    }
  });
};

function _renderHtml(res, store, renderProps) {
  // Render the component to a string
  const html = renderToString(
    React.createElement(
      Provider,
      { store: store },
      React.createElement(
        'div',
        null,
        React.createElement(RouterContext, renderProps),
        process.env.NODE_ENV !== 'production' ? React.createElement(DevTools, null) : null
      )
    )
  );

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  // Send the rendered page back to the client
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/main.js"></script>
      </body>
    </html>`
  );
}

function _backendGET(serverMethod, success, fail) {
  const url = `${backendUrl}/${serverMethod}`;
  return fetch(url)
    .then(response => response.json())
    .then(success)
    .catch(fail);
}
