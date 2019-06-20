import { actionTypes } from '../constants/action-types';

const initialState = {
  seanceInfo: {
    seanceId: null,
    seance: null,
    cinemaInfo: null,
  },
  bookingStage: 1,
};

export default function seanceReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SEANCE_LOADED:
      return { ...state, seanceInfo: { ...state.seanceInfo, ...action.payload } };

    case actionTypes.SET_SEANCE_ID:
      return { ...state, seanceInfo: { ...state.seanceInfo, seanceId: action.payload } };

    case actionTypes.SET_BOOKING_STAGE:
      return { ...state, bookingStage: action.payload };
    default:
      return state;
  }
}
