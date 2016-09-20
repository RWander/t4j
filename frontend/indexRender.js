/* This module for NODE only! */

const fetch = require('node-fetch');
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const Provider = require('react-redux').Provider;
const App = require('./app/containers/App').default;
const DevTools = require('./app/containers/_DevTools').default;
const configureStore = require('./app/store/configureStore').default;
const { LOAD_DATA_SUCCESS } = require('./app/constants/Data');

const env = process.env.NODE_ENV;
const config = require(`./config/${env ? env : 'development'}`);
const backendUrl = config.BACKEND.replace(/"/g,'');

module.exports.getHtml = function (data) {
  // Create a new Redux store instance
  const store = configureStore();

  store.dispatch({
    type: LOAD_DATA_SUCCESS,
    payload: data
  });

  // Render the component to a string
  const html = renderToString(
    // <Provider store={store}><div><App /><DevTools /></div></Provider>
    React.createElement(
      Provider,
      { store: store },
      React.createElement(
        'div',
        null,
        React.createElement(App, null),
        process.env.NODE_ENV !== 'production' ? React.createElement(DevTools, null) : null
      )
    )
  );

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  // Send the rendered page back to the client
  return `
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
    </html>
    `;
};

module.exports.getInitData = function(next) {
  _backendGET(
    'data',
    // success
    res => next(null, res.data),
    // fail
    err => next(err)
  );
};

function _backendGET(serverMethod, success, fail) {
  const url = `${backendUrl}/${serverMethod}`;
  return fetch(url)
    .then(response => response.json())
    .then(success)
    .catch(fail);
}