const DOMAIN_URL = `http://localhost:5000/api`;

export function getMovies() {
  const options = {
    method: 'GET'
  };
  return fetch(`${DOMAIN_URL}/movies`, options)
    .then(res => res.json());

}
