import {
  SET_DATA,
  GET_ASYNC_DATA_REQUEST,
  GET_ASYNC_DATA_SUCCESS,
  PING_BACKEND_REQUEST,
  PING_BACKEND_SUCCESS,
  PING_BACKEND_FAIL
} from '../constants/Data';

const	initialState =	{
  title: 'Initial State',
  fetching: false,
};

export default function data(state = initialState, action) {

  switch (action.type) {
  case SET_DATA:
    return {...state, title: action.payload};

  case GET_ASYNC_DATA_REQUEST:
    return {...state, fetching:true};

  case GET_ASYNC_DATA_SUCCESS:
    return {...state, title: action.payload, fetching:false};

  case PING_BACKEND_REQUEST:
    return {...state, fetching:true};

  case PING_BACKEND_SUCCESS:
  case PING_BACKEND_FAIL:
    return {...state, title: action.payload, fetching:false};

  default:
    return state;
  }

}
