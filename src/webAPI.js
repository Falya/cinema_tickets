import { BASE_URL } from './config/config';
import store from './redux/store/store';
import { actionTypes } from './redux/constants/action-types';

export function getMovies() {
  const options = {
    method: 'GET',
  };
  return fetch(`${BASE_URL}/movies`, options).then(res => res.json());
}

export function getMovieById(movieId) {
  const options = {
    method: 'GET',
  };

  return fetch(`${BASE_URL}/movies/movie/?id=${movieId}`, options).then(res => res.json());
}

export function getSeancesByMovieId(params) {
  const { movieTheaterId } = params;
  const options = {
    method: 'GET',
  };

  let customParams = { ...params };

  if (movieTheaterId === 'All cinemas') {
    customParams.movieTheaterId = '';
  }

  const url = new URL(`${BASE_URL}/movies/movie/seances/`);
  url.search = new URLSearchParams(customParams);

  return fetch(url, options).then(res => res.json());
}

export function getFilters(params) {
  const options = {
    method: 'GET',
  };
  const url = new URL(`${BASE_URL}/movies/filters/`);
  url.search = new URLSearchParams(params);

  return fetch(url, options).then(res => res.json());
}

export function getSeance(params) {
  const url = new URL(`${BASE_URL}/seance/`);
  url.search = new URLSearchParams(params);
  return fetch(url).then(res => res.json());
}

export function signUp(params) {
  const url = new URL(`${BASE_URL}/signup`);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  };
  return fetch(url, options)
    .then(res => res.json())
    .then(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        store.dispatch({
          type: actionTypes.USER_NAME_REQUESTED,
        });
      }
      return res;
    });
}

export function logIn(params) {
  const url = new URL(`${BASE_URL}/login`);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  };

  return fetch(url, options)
    .then(res => res.json())
    .then(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        store.dispatch({
          type: actionTypes.USER_NAME_REQUESTED,
        });
      }
      return res;
    });
}

export function getUserName() {
  const url = new URL(`${BASE_URL}/getusername`);
  const token = localStorage.getItem('token');
  const options = {
    headers: {
      Authorization: token,
    },
  };

  return fetch(url, options).then(res => res.json());
}
