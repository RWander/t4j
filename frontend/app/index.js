import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import DevTools from './containers/_DevTools';
import configureStore from './store/configureStore';

// Grab the state from a global injected into server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = configureStore(preloadedState);

const html = process.env.NODE_ENV === 'production' ?
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
  :
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>;

render(
  html,
  document.getElementById('root')
);
