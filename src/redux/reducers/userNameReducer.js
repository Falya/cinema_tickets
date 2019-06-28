import { actionTypes } from '../constants/action-types';

const initialState = {
  userName: null,
};

export default function userNameReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_NAME_LOADED:
      return { ...state, userName: action.payload };

    default:
      return state;
  }
}
