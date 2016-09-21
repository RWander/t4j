import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App'; // TODO: why `containers`??
import Root from './components/Root';
import Foo from './components/Foo';
import Bar from './components/Bar';

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={App}/>
    <Route path="foo" component={Foo}/>
    <Route path="bar" component={Bar}/>
  </Route>
);

export default routes;
