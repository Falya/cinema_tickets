import { actionTypes } from '../constants/action-types';

function isLoadingMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      switch (action.type) {
        case actionTypes.MOVIE_REQUESTED:
        case actionTypes.SEANCES_REQUESTED:
        case actionTypes.SEANCE_REQUESTED:
          dispatch({
            type: actionTypes.SET_LOADING_STATE,
            payload: true,
          });
          break;

        case actionTypes.MOVIE_LOADED:
        case actionTypes.SEANCES_LOADED:
        case actionTypes.SEANCE_LOADED:
          dispatch({
            type: actionTypes.SET_LOADING_STATE,
            payload: false,
          });
          break;
      }

      return next(action);
    };
  };
}

function onMovieIdSet({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === actionTypes.SET_MOVIE_ID) {
        dispatch({
          type: actionTypes.FILTERS_REQUESTED,
          payload: { movieId: action.payload },
        });
      }
      return next(action);
    };
  };
}

function onSeanceIdSet({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === actionTypes.SET_SEANCE_ID) {
        dispatch({
          type: actionTypes.SEANCE_REQUESTED,
          payload: { seanceId: action.payload },

        });
      }
      return next(action);
    };
  };
}

export default [isLoadingMiddleware, onMovieIdset, onSeanceIdSet];
