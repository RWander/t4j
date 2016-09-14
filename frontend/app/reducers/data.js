import { SET_DATA } from '../constants/Data';

const	initialState =	{
  title: 'Важная информация'
};

export default function data(state = initialState, action) {

  switch (action.type) {
  case SET_DATA:
    return {...state, title: action.payload};

  default:
    return state;
  }

}
