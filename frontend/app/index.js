import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, IndexRoute, Link, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App';
import DevTools from './containers/_DevTools';
import configureStore from './store/configureStore';

// Create Redux store with initial state
const store = configureStore(browserHistory, window.__PRELOADED_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

const Root = ({ children }) => (
  <div>
    <header>
      Links:
      {' '}
      <Link to="/">Home</Link>
      {' '}
      <Link to="/foo">Foo</Link>
      {' '}
      <Link to="/bar">Bar</Link>
    </header>
    { children }
  </div>
);

const Foo = () => (<div>Foo!</div>);
const Bar = () => (<div>Bar!</div>);

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={App}/>
    <Route path="foo" component={Foo}/>
    <Route path="bar" component={Bar}/>
  </Route>
);

render(
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
      { process.env.NODE_ENV === 'production' ? null : <DevTools /> }
    </div>
  </Provider>,
  document.getElementById('root')
);
