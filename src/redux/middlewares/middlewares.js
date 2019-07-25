import { actionTypes } from '../constants/action-types';

function isLoadingMiddleware({ getState, dispatch }) {
  return function(next) {
    return function(action) {
      const { loadingStateReducer, seanceReducer } = getState();
      const { loading } = loadingStateReducer;
      const { seanceInfo } = seanceReducer;
      const { seanceId } = seanceInfo;
      switch (action.type) {
        case actionTypes.MOVIE_REQUESTED:
        case actionTypes.SEANCES_REQUESTED:

        case actionTypes.MOVIES_REQUESTED:
        case actionTypes.USER_PROFILE_REQUESTED:
          if (!loading) {
            dispatch({
              type: actionTypes.SET_LOADING_STATE,
              payload: true,
            });
          }
          break;

        case actionTypes.SEANCE_REQUESTED:
          if (seanceId !== action.payload.seanceId) {
            dispatch({
              type: actionTypes.SET_LOADING_STATE,
              payload: true,
            });
          }
          dispatch({
            type: actionTypes.SET_SEAT_LOADING_STATE,
            payload: true,
          });
          break;

        case actionTypes.SEANCE_LOADED:
          if (seanceId !== action.payload.seanceId) {
            dispatch({
              type: actionTypes.SET_LOADING_STATE,
              payload: false,
            });
          }
          dispatch({
            type: actionTypes.SET_SEAT_LOADING_STATE,
            payload: false,
          });
          break;

        case actionTypes.SEANCES_LOADED:
        case actionTypes.MOVIES_LOADED:
        case actionTypes.USER_PROFILE_LOADED:
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

function onMovieIdSet({ dispatch }) {
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

export default [isLoadingMiddleware, onMovieIdSet, onSeanceIdSet, setTotalSum];
