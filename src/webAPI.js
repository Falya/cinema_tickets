import { BASE_URL } from './config/config';

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
