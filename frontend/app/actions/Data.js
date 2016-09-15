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

    _backendGET(
      'ping',
      // success
      res => {
        dispatch({
          type: PING_BACKEND_SUCCESS,
          payload: res.data
        });
      },
      // fail
      err => {
        dispatch({
          type: PING_BACKEND_FAIL,
          payload: err,
          error: true
        });
      }
    );
  };

}

function _backendGET(serverMethod, success, fail) {
  return fetch(`http://127.0.0.1:1111/${serverMethod}`)
    .then(response => response.json())
    .then(success)
    .catch(fail);
}
