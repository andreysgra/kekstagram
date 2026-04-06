import {addEscapeEvent} from './utils';
import {resetValidation, setValidation} from './validation';
import {activateImageScale, deactivateImageScale} from './image-scale';
import {activateImageEffect, deactivateImageEffect} from './image-effect';

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

const onImageFormSubmit = (evt) => {
  if (!setValidation()) {
    evt.preventDefault();
  }
};

function closeModal() {
  imageFormElement.reset();
  resetValidation();

  document.body.classList.remove('modal-open');
  uploadOverlayElement.classList.add('hidden');

  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onEscapeKeyDown);

  deactivateImageScale();
  deactivateImageEffect();

  imageFormElement.removeEventListener('submit', onImageFormSubmit);
}

function openModal() {
  document.body.classList.add('modal-open');
  uploadOverlayElement.classList.remove('hidden');

  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscapeKeyDown);

  activateImageScale();
  activateImageEffect();

  imageFormElement.addEventListener('submit', onImageFormSubmit);
}

export const initImageForm = () => imageFormElement.filename.addEventListener('change', onUploadFileChange);
