import { actionTypes } from '../constants/action-types';

const initialState = {
  isBlur: false,
};

export default function blurReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_BLUR:
      return { ...state, isBlur: action.payload };

    default:
      return state;
  }
}
