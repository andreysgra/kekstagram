const pictureElement = document.querySelector('#picture').content.querySelector('.picture');

export const getPicture = (picture) => {
  const {id, url, description, likes, comments} = picture;
  const element = pictureElement.cloneNode(true);

  element.dataset.id = id;
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__likes').textContent = likes;
  element.querySelector('.picture__comments').textContent = comments.length;

  return element;
};
