import {addEscapeEvent} from './utils.js';
import {resetValidation, setValidation} from './validation.js';
import {activateImageScale, deactivateImageScale} from './image-scale.js';
import {activateImageEffect, deactivateImageEffect} from './image-effect.js';
import {uploadFailMessage, uploadSuccessMessage} from './messages.js';
import {sendData} from './api.js';

const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const imageFormElement = document.querySelector('#upload-select-image');
const closeButtonElement = imageFormElement.querySelector('#upload-cancel');
const hashtagsElement = imageFormElement.querySelector('.text__hashtags');
const commentElement = imageFormElement.querySelector('.text__description');
const submitButtonElement = imageFormElement.querySelector('.img-upload__submit');
const imagePreviewElement = imageFormElement.querySelector('.img-upload__preview img');
const effectPreviewElements = imageFormElement.querySelectorAll('.effects__preview');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const isTextElementFocused = () => document.activeElement === hashtagsElement ||
  document.activeElement === commentElement;

const disableSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const enableSubmitButton = () => {
  submitButtonElement.disabled = false;
};

const isValidFileType = (file) => {
  const fileName = file.name.toLowerCase();

  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

const addImagePreview = (file) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    imagePreviewElement.src = reader.result;

    effectPreviewElements.forEach((element) => {
      element.style.backgroundImage = `url(${reader.result})`;
    });
  });

  reader.readAsDataURL(file);
};

const onUploadFileChange = () => {
  const file = imageFormElement.filename.files[0];

  if (!isValidFileType(file)) {
    return;
  }

  addImagePreview(file);
  openModal();
};

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
