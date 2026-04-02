import {addEscapeEvent} from './utils';
import {COMMENTS_PER_LOAD} from './const';

const bigPictureElement = document.querySelector('.big-picture');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentElement = socialCommentsElement.querySelector('.social__comment');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('#picture-cancel');

let loadedComments = [];
let loadedCommentsCount;

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

  loadedCommentsCount += COMMENTS_PER_LOAD;

  if (comments.length <= loadedCommentsCount) {
    commentsLoaderElement.classList.add('hidden');
  }

  comments.slice(0, loadedCommentsCount).forEach((comment) => fragment.append(createComment(comment)));

  commentShownCountElement.textContent = Math.min(loadedCommentsCount, comments.length).toString();
  commentTotalCountElement.textContent = comments.length;

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

const onCommentsLoaderClick = () => getComments(loadedComments);

function closeModal() {
  document.body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
  commentsLoaderElement.classList.remove('hidden');

  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
  document.removeEventListener('keydown', onEscapeKeyDown);
}

function openModal() {
  document.body.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');

  closeButtonElement.addEventListener('click', onCloseButtonClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
  document.addEventListener('keydown', onEscapeKeyDown);
}

export const renderBigPicture = (picture) => {
  loadedCommentsCount = 0;
  loadedComments = picture.comments;

  getPicture(picture);
  getComments(loadedComments);

  openModal();
};
