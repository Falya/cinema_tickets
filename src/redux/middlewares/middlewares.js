import { actionTypes } from '../constants/action-types';

function isLoadingMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === actionTypes.MOVIE_REQUESTED || action.type === actionTypes.SEANCES_REQUESTED) {
        dispatch({
          type: actionTypes.SET_LOADING_STATE,
          payload: true
        });
      } else if ((action.type === actionTypes.MOVIE_LOADED) | (action.type === actionTypes.SEANCES_LOADED)) {
        dispatch({
          type: actionTypes.SET_LOADING_STATE,
          payload: false
        });
      }
      return next(action);
    };
  };
}

function onMovieIdset({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === actionTypes.SET_MOVIE_ID) {
        dispatch({
          type: actionTypes.FILTERS_REQUESTED,
          payload: { movieId: action.payload }
        });
      }
      return next(action);
    };
  };
}

export default [isLoadingMiddleware, onMovieIdset];
