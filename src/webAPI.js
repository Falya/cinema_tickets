import { BASE_URL } from './config/config';

export function getMovies() {
  const options = {
    method: 'GET'
  };
  return fetch(`${BASE_URL}/movies`, options).then(res => res.json());
}

export function getMovieById(movieId) {
  const options = {
    method: 'GET'
  };

  return fetch(`${BASE_URL}/movies/movie/?id=${movieId}`, options).then(res => res.json());
}

export function getSeancesByMovieId(params) {
  const options = {
    method: 'GET'
  };

  return fetch(
    `${BASE_URL}/movies/movie/seances/?movieId=${params.movieId}&cityId=${params.city}&movieTheaterId=${params.movieTheaterId}&date=${
      params.date
    }&features=${params.features}`,
    options
  ).then(res => res.json());
}

export function getFilters(cityId, movieId, movieTheaterId) {
  const options = {
    method: 'GET'
  };
  return fetch(`${BASE_URL}/movies/filters/?cityId=${cityId}&movieId=${movieId}&movieTheaterId=${movieTheaterId}`, options).then(res => res.json());
}
