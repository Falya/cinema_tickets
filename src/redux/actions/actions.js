import { actionTypes } from '../constants/action-types';

export function getMoviesApi() {
  return {
    type: actionTypes.MOVIES_REQUESTED
  };
}

export function getMovieApi(payload) {
  return {
    type: actionTypes.MOVIE_REQUESTED,
    payload
  };
}

export function getFiltersApi(payload) {
  return {
    type: actionTypes.FILTERS_REQUESTED,
    payload
  };
}

export function getSeancesApi(payload) {
  return {
    type: actionTypes.SEANCES_REQUESTED,
    payload
  };
}

export function setMovieId(payload) {
  return {
    type: actionTypes.SET_MOVIE_ID,
    payload
  };
}

export function setFilterParams(payload) {
  return {
    type: actionTypes.SET_FILTER_PARAMS,
    payload
  };
}

export function setBlur(payload) {
  return {
    type: actionTypes.SET_BLUR,
    payload
  };
}