import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_5muZ6uejuqApziv1AbIJFiRAnz5FKqSjWh6zh7cLPYikE5Nv91LEEUJnm7IyQd6Q';

export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
  return axios
    .get(BASE_URL)
    .then(resp => resp.data)
    .catch(err => error(err));
}

export function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1/images/search';
  return axios
    .get(`${BASE_URL}?breed_ids=${breedId}`)
    .then(resp => resp.data)
    .catch(err => error(err));
}
