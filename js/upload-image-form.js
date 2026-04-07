import {addEscapeEvent} from './utils';
import {resetValidation, setValidation} from './validation';
import {activateImageScale, deactivateImageScale} from './image-scale';
import {activateImageEffect, deactivateImageEffect} from './image-effect';
import {uploadFailMessage, uploadSuccessMessage} from './messages';
import {sendData} from './api';

const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const imageFormElement = document.querySelector('#upload-select-image');
const closeButtonElement = imageFormElement.querySelector('#upload-cancel');
const hashtagsElement = imageFormElement.querySelector('.text__hashtags');
const commentElement = imageFormElement.querySelector('.text__description');
const submitButtonElement = imageFormElement.querySelector('.img-upload__submit');

const isTextElementFocused = () => document.activeElement === hashtagsElement ||
  document.activeElement === commentElement;

const disableSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const enableSubmitButton = () => {
  submitButtonElement.disabled = false;
};

const onUploadFileChange = () => openModal();

const onCloseButtonClick = () => closeModal();

const onEscapeKeyDown = (evt) => {
  if (document.querySelector('.error')) {
    return;
  }

  if (!isTextElementFocused()) {
    addEscapeEvent(evt, closeModal);
  }
};

const onFailUpload = () => {
  uploadFailMessage();
};

const onSuccessUpload = () => {
  closeModal();
  uploadSuccessMessage();
};

const onImageFormSubmit = (evt) => {
  evt.preventDefault();

  if (setValidation()) {
    disableSubmitButton();

    sendData(onSuccessUpload, onFailUpload, new FormData(evt.target))
      .then(enableSubmitButton);
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
