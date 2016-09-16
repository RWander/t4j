/* global BACKEND */

import 'whatwg-fetch';

import {
  SET_DATA,
  GET_ASYNC_DATA_REQUEST,
  GET_ASYNC_DATA_SUCCESS,
  PING_BACKEND_REQUEST,
  PING_BACKEND_SUCCESS,
  PING_BACKEND_FAIL,
  LOAD_DATA_REQUEST,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAIL
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

export const pingBackend = () => _backendGET('ping', PING_BACKEND_REQUEST, PING_BACKEND_SUCCESS, PING_BACKEND_FAIL);
export const loadData = () => _backendGET('data', LOAD_DATA_REQUEST, LOAD_DATA_SUCCESS, LOAD_DATA_FAIL);

function _backendGET(serverMethod, requestType, successType, failType) {

  return (dispatch) => {
    dispatch({
      type: requestType
    });

    return fetch(`${BACKEND}/${serverMethod}`)
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: successType,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: failType,
          payload: err,
          error: true
        });
      });
  };

}

// function _backendGET(serverMethod, success, fail) {
//   return fetch(`${BACKEND}/${serverMethod}`)
//     .then(response => response.json())
//     .then(success)
//     .catch(fail);
// }
