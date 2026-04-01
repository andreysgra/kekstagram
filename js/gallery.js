import {getPicture} from './picture';
import {renderBigPicture} from './big-picture';

const picturesElement = document.querySelector('.pictures');

const createGallery = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => fragment
    .append(getPicture(picture))
  );

  return fragment;
};

const onPictureClick = (pictures) => (evt) => {
  const pictureElement = evt.target.closest('.picture');

  if (pictureElement) {
    const currentPicture = pictures.find((picture) => picture.id === Number(pictureElement.dataset.id));

    evt.preventDefault();

    renderBigPicture(currentPicture);
  }
};

export const renderGallery = (pictures) => {
  picturesElement.append(createGallery(pictures));
  picturesElement.addEventListener('click', onPictureClick(pictures));
};
