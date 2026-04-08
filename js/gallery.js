import {getPicture} from './picture';
import {renderBigPicture} from './big-picture';
import {applyFilter} from './filter';
import {debounce} from './utils';

const picturesElement = document.querySelector('.pictures');
const imgFiltersFormElement = document.querySelector('.img-filters__form');
const imgFiltersElement = document.querySelector('.img-filters');

const activeClassName = 'img-filters__button--active';

const createGallery = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => fragment
    .append(getPicture(picture))
  );

  return fragment;
};

const filterPictures = debounce((pictures, id) => {
  picturesElement.querySelectorAll('.picture')
    .forEach((element) => element.remove());

  picturesElement.append(createGallery(applyFilter(pictures, id)));
});

const onPictureClick = (pictures) => (evt) => {
  const pictureElement = evt.target.closest('.picture');

  if (pictureElement) {
    const currentPicture = pictures.find((picture) => picture.id === Number(pictureElement.dataset.id));

    evt.preventDefault();

    renderBigPicture(currentPicture);
  }
};

const onFilterClick = (pictures) => (evt) => {
  const buttonElement = evt.target.closest('.img-filters__button');

  if (buttonElement) {
    const activeButton = imgFiltersFormElement.querySelector(`.${activeClassName}`);

    if (activeButton !== buttonElement) {
      activeButton.classList.remove(activeClassName);
      buttonElement.classList.add(activeClassName);

      filterPictures(pictures, buttonElement.id);
    }
  }
};

export const renderGallery = (pictures) => {
  imgFiltersElement.classList.remove('img-filters--inactive');

  picturesElement.append(createGallery(applyFilter(pictures)));

  picturesElement.addEventListener('click', onPictureClick(pictures));
  imgFiltersFormElement.addEventListener('click', onFilterClick(pictures));
};
