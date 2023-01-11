import { refs } from './js/refs';
import { fetchImages } from './js/fetch';
import {
  renderMarkup,
  clearMarkup,
  isHiddenLoadMoreBtn,
  isVisibleLoadMoreBtn,
} from './js/render';
import { autoScroll } from './js/autoscroll';

// --- import notify library ---
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

// --- import simpleLightBox libruary---
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// -- main code ---
isHiddenLoadMoreBtn();

let query = ''; // дефолтне значення інпуту
let page = 1; // дефолтне значення сторінки

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(event) {
  event.preventDefault(); // прибираємо перезавантаження сторінки
  clearMarkup();
  query = event.currentTarget.elements.searchQuery.value; // отримауєо значення інпуту

  if (query) {
    try {
      const response = await fetchImages(query, (page = 1));
      // якщо отримали пустий масив  - нотіфікашка -->
      if (response.data.hits.length === 0) {
        clearMarkup(); //очистка
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        ); // нотіфікашка
      }
      // рендер + нотішікашка + видима кнопка пагінації -->
      else {
        refs.gallery.insertAdjacentHTML(
          'beforeend',
          renderMarkup(response.data.hits)
        ); // рендер
        Notify.success(`"Hooray! We found ${response.data.totalHits} images."`); // нотіфікашка
        lightbox.refresh(); // бібліотека simpleLightBox

        if (response.data.totalHits > 40) {
          isVisibleLoadMoreBtn(); // видима кнопка, якшо кількіть знайдених картинок більше 40
        } else {
          isHiddenLoadMoreBtn();
        }
      }
    } catch (error) {
      Notify.failure(error);
      clearMarkup();
    } // ловимо помилку}
  } else {
    Notify.warning('Please start typing.'); // якщо нічого не було введено
  }
}

async function onLoadMoreBtnClick() {
  page += 1;

  try {
    const response = await fetchImages(query, page);
    const totalPages = response.data.totalHits / 40; // отримуємо значення максимальої кількості сторінок

    if (totalPages < page) {
      isHiddenLoadMoreBtn();
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        renderMarkup(response.data.hits)
      ); // рендер розмітки за сторінками += 1;
      lightbox.refresh(); // бібліотека simpleLightBox
    }
  } catch (error) {
    Notify.failure(error);
    clearMarkup();
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
