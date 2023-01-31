import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32106201-0c90331702e18f870e8d36f12';

export const fetchImagesWithQuery = (searchQuery = '', page = 1) => {
  return axios
    .get(`${BASE_URL}`, {
      params: {
        key: KEY,
        q: encodeURIComponent(searchQuery).replaceAll('%20', '+'),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 12,
        page,
      },
    })
    .then(response => response.data);
};

const api = {
  fetchImagesWithQuery,
};

export default api;
