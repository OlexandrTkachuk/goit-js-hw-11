import { refs } from './refs';

function renderMarkup(array) {
  const markup = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a class="gallery__link" href="${largeImageURL}">
                <div class="photo-card">
                  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                  <div class="info">
                    <p class="info-item">
                      <b>Likes</b>
                      ${likes}
                    </p>
                    <p class="info-item">
                      <b>Views</b>
                      ${views}
                    </p>
                    <p class="info-item">
                      <b>Comments</b>
                      ${comments}
                    </p>
                    <p class="info-item">
                      <b>Downloads</b>
                      ${downloads}
                    </p>
                  </div>
                </div>
              </a>`
    )
    .join('');

  return markup;
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

function isHiddenLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('visually-hidden');
}

function isVisibleLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('visually-hidden');
}

// --------------------------------- export ----------------------------

export { renderMarkup, clearMarkup, isHiddenLoadMoreBtn, isVisibleLoadMoreBtn };
