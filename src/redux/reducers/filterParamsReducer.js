import { actionTypes } from '../constants/action-types';

const initialState = {
  filterParameters: {
    city: null,
    movieTheaterId: 'All cinemas',
    movieId: null,
    features: {},
    date: new Date().toISOString(),
  },
};

export default function filterParamsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_FILTER_PARAMS:
      return { ...state, filterParameters: { ...action.payload } };

    case actionTypes.SET_MOVIE_ID:
      return { ...state, filterParameters: { ...state.filterParameters, movieId: action.payload } };

    default:
      return state;
  }
}
