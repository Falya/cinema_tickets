import { actionTypes } from '../constants/action-types';

const initialState = {
  loading: true,
  seatLoading: false,
};

export default function loadingStateReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING_STATE:
      return { ...state, loading: action.payload };

    case actionTypes.SET_SEAT_LOADING_STATE:
      return { ...state, seatLoading: action.payload };

    default:
      return state;
  }
}
