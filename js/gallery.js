import {getPicture} from './picture';

const picturesElement = document.querySelector('.pictures');

export const renderGallery = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => fragment
    .append(getPicture(picture))
  );

  picturesElement.append(fragment);
};
