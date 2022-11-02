import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '29750578-eee0acb86335d7ce904d8b56e',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImages = async (searchQuery, page) => {
  const response = await axios.get(`?q=${searchQuery}&page=${page}`);
  return response.data;
};

export function needValues(data) {
  return data.map(({ id, tags, largeImageURL, webformatURL }) => ({
    id,
    tags,
    largeImageURL,
    webformatURL,
  }));
}
