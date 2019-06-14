import { actionTypes } from '../constants/action-types';

const initialState = {
  loading: true
};

export default function loadingStateReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING_STATE:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}
