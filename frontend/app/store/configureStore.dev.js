import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import DevTools from '../containers/_DevTools';

export default function configureStore(history, initialState)	{
  const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(thunk, routerMiddleware(history)),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument()
  );

  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer	= require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
