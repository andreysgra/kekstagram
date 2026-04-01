import {addEscapeEvent} from './utils';

const bigPictureElement = document.querySelector('.big-picture');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentElement = socialCommentsElement.querySelector('.social__comment');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('#picture-cancel');

const createComment = (comment) => {
  const element = socialCommentElement.cloneNode(true);
  const {avatar, name, message} = comment;

  element.querySelector('.social__picture').src = avatar;
  element.querySelector('.social__picture').alt = name;
  element.querySelector('.social__text').textContent = message;

  return element;
};

const getComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => fragment.append(createComment(comment)));

  socialCommentsElement.innerHTML = '';
  socialCommentsElement.append(fragment);
};

const getPicture = (picture) => {
  const {url, description, likes} = picture;

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
};

const onCloseButtonClick = () => closeModal();

const onEscapeKeyDown = (evt) => addEscapeEvent(evt, closeModal);

function closeModal() {
  document.body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');

  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onEscapeKeyDown);
}

function openModal() {
  document.body.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');

  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscapeKeyDown);

  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
}

export const renderBigPicture = (picture) => {
  getPicture(picture);
  getComments(picture.comments);
  openModal();
};
