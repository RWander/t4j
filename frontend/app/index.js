import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import DevTools from './containers/_DevTools';
import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore(browserHistory, window.__PRELOADED_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
      { process.env.NODE_ENV === 'production' ? null : <DevTools /> }
    </div>
  </Provider>,
  document.getElementById('root')
);
