import { actionTypes } from '../constants/action-types';

export function getMoviesApi() {
  return {
    type: actionTypes.MOVIES_REQUESTED,
  };
}

export function getMovieApi(payload) {
  return {
    type: actionTypes.MOVIE_REQUESTED,
    payload,
  };
}

export function getFiltersApi(payload) {
  return {
    type: actionTypes.FILTERS_REQUESTED,
    payload,
  };
}

export function getSeancesApi(payload) {
  return {
    type: actionTypes.SEANCES_REQUESTED,
    payload,
  };
}

export function getSeanceApi(payload) {
  return {
    type: actionTypes.SEANCE_REQUESTED,
    payload: { seanceId: payload },
  };
}

export function setMovieId(payload) {
  return {
    type: actionTypes.SET_MOVIE_ID,
    payload,
  };
}

export function setFilterParams(payload) {
  return {
    type: actionTypes.SET_FILTER_PARAMS,
    payload,
  };
}

export function setBlur(payload) {
  return {
    type: actionTypes.SET_BLUR,
    payload,
  };
}

export function setSeanceId(payload) {
  return {
    type: actionTypes.SET_SEANCE_ID,
    payload,
  };
}

export function setBookingStage(payload) {
  return {
    type: actionTypes.SET_BOOKING_STAGE,
    payload,
  };
}

export function getUserName() {
  return {
    type: actionTypes.USER_NAME_REQUESTED,
  };
}

export function resetUserName() {
  return {
    type: actionTypes.USER_NAME_LOADED,
    payload: null,
  };
}

export function setOrderFeature(payload) {
  return {
    type: actionTypes.SET_ORDER_FEATURE,
    payload,
  };
}
