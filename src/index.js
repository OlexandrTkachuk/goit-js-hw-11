// import { refs } from './js/refs';
// import { fetchImages } from './js/fetch';
// import {
//   renderMarkup,
//   clearMarkup,
//   addLoadMoreBtnHidden,
//   removeLoadMoreBtnHidden,
// } from './js/render';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  searchBtn: document.querySelector('.search-form button'),
  gallery: document.querySelector('.gallery .container'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onFormSubmit(event) {
  event.preventDefault();
}

function onLoadMoreBtnClick(event) {}

function renderMarkup(array) {
  clearMarkup();

  const markup = array.map(({}) => ``).join('');
  return markup;
}

function fetchImages(searchQuery, page) {
  const url = ``;
  const options = {
    headers: {
      Authorization: '',
    },
  };

  return fetch(url, options).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

function clearMarkup() {
  refs.gallery.innerHTMLq = '';
}

function addLoadMoreBtnHidden() {
  refs.loadMoreBtn.classList.add('visually-hidden');
}

function removeLoadMoreBtnHidden() {
  refs.loadMoreBtn.classList.remove('visually-hidden');
}
