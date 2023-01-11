function renderMarkup(array) {
  clearMarkup();

  const markup = array.map(({}) => ``).join('');
  return markup;
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

// --------------------------------- export ----------------------------

export {
  renderMarkup,
  clearMarkup,
  addLoadMoreBtnHidden,
  removeLoadMoreBtnHidden,
};
