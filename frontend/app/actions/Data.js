import { SET_DATA } from '../constants/Data';

export function setData(title) {

  return {
    type: SET_DATA,
    payload: title
  };

}
