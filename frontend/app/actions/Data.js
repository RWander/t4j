import 'whatwg-fetch';

import {
  SET_DATA,
  GET_ASYNC_DATA_REQUEST,
  GET_ASYNC_DATA_SUCCESS,
  PING_BACKEND_REQUEST,
  PING_BACKEND_SUCCESS,
  PING_BACKEND_FAIL
} from '../constants/Data';

export function setData(title) {

  return {
    type: SET_DATA,
    payload: title
  };

}

export function setDataAsync() {

  return (dispatch) => {
    dispatch({
      type: GET_ASYNC_DATA_REQUEST
    });

    setTimeout(() => {
      dispatch({
        type: GET_ASYNC_DATA_SUCCESS,
        payload: Date.now()
      });
    }, 1000);
  };

}

export function pingBackend() {

  return (dispatch) => {
    dispatch({
      type: PING_BACKEND_REQUEST
    });

    fetch('http://ya.ru')
      .then(function(response) {
        dispatch({
          type: PING_BACKEND_SUCCESS,
          payload: response
        });
      }).catch(function(ex) {
        dispatch({
          type: PING_BACKEND_FAIL,
          payload: ex,
          error: true
        });
      });
  };
  
}
