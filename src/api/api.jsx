import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32106201-0c90331702e18f870e8d36f12';
export const fetchImagesWithQuery = async (searchQuery, page) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: KEY,
      q: encodeURIComponent(searchQuery).replaceAll('%20', '+'),
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 12,
      page,
    },
  });
  return {
    hits: response.data.hits,
    totalHits: response.data.totalHits,
  };
};

const api = {
  fetchImagesWithQuery,
};

export default api;
