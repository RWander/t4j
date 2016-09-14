import {
  SET_DATA,
  GET_ASYNC_DATA_REQUEST,
  GET_ASYNC_DATA_SUCCESS
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
