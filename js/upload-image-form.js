import {addEscapeEvent} from './utils';

const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const imageFormElement = document.querySelector('#upload-select-image');
const closeButtonElement = imageFormElement.querySelector('#upload-cancel');
const hashtagsElement = imageFormElement.querySelector('.text__hashtags');
const commentElement = imageFormElement.querySelector('.text__description');

const isTextElementFocused = () => document.activeElement === hashtagsElement ||
  document.activeElement === commentElement;

const onUploadFileChange = () => openModal();

const onCloseButtonClick = () => closeModal();

const onEscapeKeyDown = (evt) => {
  if (!isTextElementFocused()) {
    addEscapeEvent(evt, closeModal);
  }
};

function closeModal() {
  imageFormElement.reset();

  document.body.classList.remove('modal-open');
  uploadOverlayElement.classList.add('hidden');

  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onEscapeKeyDown);
}

function openModal() {
  document.body.classList.add('modal-open');
  uploadOverlayElement.classList.remove('hidden');

  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscapeKeyDown);
}

export const initImageForm = () => imageFormElement.filename.addEventListener('change', onUploadFileChange);
