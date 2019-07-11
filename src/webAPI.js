import { BASE_URL } from './config/config';
import store from './redux/store/store';
import { actionTypes } from './redux/constants/action-types';

function getHeaders() {
  const headers = new Headers();
  const token = localStorage.getItem('token');
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);
  return headers;
}

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

  let customParams = { ...params };

  if (movieTheaterId === 'All cinemas') {
    customParams.movieTheaterId = '';
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customParams),
  };

  const url = new URL(`${BASE_URL}/movies/movie/seances/`);
  // url.search = new URLSearchParams(customParams);

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
  const { token } = localStorage;
  const url = new URL(`${BASE_URL}/seance/${token ? 'authorized/' : ''}`);
  const options = {
    headers: getHeaders(),
  };
  url.search = new URLSearchParams(params);
  return fetch(url, options).then(res => res.json());
}

export function signUp(params) {
  const url = new URL(`${BASE_URL}/signup`);
  const options = {
    method: 'POST',
    headers: getHeaders(),
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
    headers: getHeaders(),
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
  const options = {
    headers: getHeaders(),
  };

  return fetch(url, options).then(res => res.json());
}

export function toBlockSeat(params) {
  const url = new URL(`${BASE_URL}/seance/to-block-seat`);
  const options = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(params),
  };

  return fetch(url, options)
    .then(res => {
      if (res.status < 400) {
        return res.json();
      }
      return res.status;
    })
    .catch(err => console.log(err));
}

export function unBlockSeat(params) {
  const url = new URL(`${BASE_URL}/seance/unblock-seat`);
  const token = localStorage.getItem('token');
  if (!token) {
    return Promise.reject({ succes: false, message: 'You aren`t logged' });
  }

  const options = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(params),
  };

  return fetch(url, options).then(res => res.json());
}

export function makePayment(params) {
  const url = new URL(`${BASE_URL}/payment`);
  const token = localStorage.getItem('token');
  if (!token) {
    return Promise.reject({ succes: false, message: 'You aren`t logged' });
  }
  const options = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(params),
  };

  return fetch(url, options).then(res => {
    console.log('response received');
    console.dir(res);
    return res.json();
  });
}

export function getUserProfile() {
  const url = new URL(`${BASE_URL}/user`);
  const token = localStorage.getItem('token');
  if (!token) {
    return Promise.reject({ succes: false, message: 'You aren`t logged' });
  }

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  return fetch(url, options)
    .then(res => res.json())
    .then(result => {
      return result;
    });
}
