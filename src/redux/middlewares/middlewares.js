import { actionTypes } from '../constants/action-types';

function isLoadingMiddleware({ getState, dispatch }) {
  return function(next) {
    return function(action) {
      const { loading } = getState().loadingStateReducer;
      switch (action.type) {
        case actionTypes.MOVIE_REQUESTED:
        case actionTypes.SEANCES_REQUESTED:
        case actionTypes.SEANCE_REQUESTED:
        case actionTypes.MOVIES_REQUESTED:
          if (!loading) {
            dispatch({
              type: actionTypes.SET_LOADING_STATE,
              payload: true,
            });
          }
          break;

        case actionTypes.MOVIE_LOADED:
        case actionTypes.SEANCES_LOADED:
        case actionTypes.SEANCE_LOADED:
        case actionTypes.MOVIES_LOADED:
          if (loading) {
            dispatch({
              type: actionTypes.SET_LOADING_STATE,
              payload: false,
            });
          }
          break;
      }

      return next(action);
    };
  };
}

function onMovieIdset({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === actionTypes.SET_MOVIE_ID && action.payload) {
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

function setTotalSum({ getState, dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === actionTypes.SEANCE_LOADED) {
        const { features } = getState().orderReducer.order;
        const totalSum = [...features, ...action.payload.blockedSeatsByUser].reduce((sum, order) => {
          sum += order.price;
          return sum;
        }, 0);
        dispatch({
          type: actionTypes.SET_TOTAL_PRICE,
          payload: totalSum,
        });
      }
      if (action.type === actionTypes.SET_ORDER_FEATURE) {
        const { blockedSeatsByUser } = getState().seanceReducer.seanceInfo;
        const totalSum = [...blockedSeatsByUser, ...action.payload].reduce((sum, order) => {
          sum += order.price;
          return sum;
        }, 0);
        dispatch({
          type: actionTypes.SET_TOTAL_PRICE,
          payload: totalSum,
        });
      }
      return next(action);
    };
  };
}

export default [isLoadingMiddleware, onMovieIdset, onSeanceIdSet, setTotalSum];
