import { actionTypes } from '../constants/action-types';

const initialState = {
  movies: {
    currentMovies: [],
    featureMovies: [],
  },
};

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MOVIES_LOADED:
      return { ...state, movies: { ...action.payload } };

    default:
      return state;
  }
}
