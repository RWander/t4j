import { combineReducers } from 'redux';
import data from './data';
import user from './user';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  data,
  user,
  routing: routerReducer
});
