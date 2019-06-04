import { BASE_URL } from './config/config';

export function getMovies() {
  const options = {
    method: 'GET'
  };
  return fetch(`${BASE_URL}/movies`, options).then(res => res.json());
}

export function getSeancesByMovieId(id) {
  const options = {
    method: 'GET'
  };

  return fetch(`${BASE_URL}/movies/movie/seances/${id}`, options).then(res => res.json());
}
