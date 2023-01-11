import axios from 'axios';

function fetchImages(searchQuery, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '32726500-03dfd36849e15fa774dddfe55';
  const options = 'image_type=photo&orientation=horizontal&safesearch=true';

  return axios.get(
    `${BASE_URL}?key=${KEY}&q=${searchQuery}&${options}&per_page=40&page=${page}`
  );
}

// // --------------------------------- export ----------------------------

export { fetchImages };
