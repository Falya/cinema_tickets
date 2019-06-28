import { actionTypes } from '../constants/action-types';

const initialState = {
  movieTheaters: null,
};

export default function seancesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SEANCES_LOADED:
      return { ...state, movieTheaters: action.payload };

    default:
      return state;
  }
}
