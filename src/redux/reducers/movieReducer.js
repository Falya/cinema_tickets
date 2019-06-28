import { actionTypes } from '../constants/action-types';

const initialState = {
  movie: null
};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MOVIE_LOADED:
      return { ...state, movie: action.payload };

    default:
      return state;
  }
}
