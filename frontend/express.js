'use strict';

const express = require('express');

const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const Provider = require('react-redux').Provider;
const App = require('./app/containers/App').default;
const configureStore = require('./app/store/configureStore').default;
const { LOAD_DATA_SUCCESS } = require('./app/constants/Data');

module.exports.configure = function (app) {
  app.use(express.static(__dirname + '/dist'));
};

module.exports.getHtmlContent = function (data) {
  // Create a new Redux store instance
  const store = configureStore();

  store.dispatch({
    type: LOAD_DATA_SUCCESS,
    payload: data
  });

  // Render the component to a string
  const html = renderToString(
    //<Provider store={store}><App /></Provider>
    React.createElement(
      Provider,
      { store: store },
      React.createElement(App, null)
  ));

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  // Send the rendered page back to the client
  return renderFullPage(html, preloadedState);
};

function renderFullPage(html, preloadedState) {
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
}
