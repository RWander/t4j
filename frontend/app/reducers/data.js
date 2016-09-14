import {
  SET_DATA,
  GET_ASYNC_DATA_REQUEST,
  GET_ASYNC_DATA_SUCCESS
} from '../constants/Data';

const	initialState =	{
  title: 'Важная информация',
  fetching: false
};

export default function data(state = initialState, action) {

  switch (action.type) {
  case SET_DATA:
    return {...state, title: action.payload};

  case GET_ASYNC_DATA_REQUEST:
    return {...state, fetching:true};

  case GET_ASYNC_DATA_SUCCESS:
    return {...state, title: action.payload, fetching:false};

  default:
    return state;
  }

}
