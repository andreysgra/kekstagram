import {addEscapeEvent} from './utils.js';

const ALERT_SHOW_TIME = 5000;

const dataErrorElement = document.querySelector('#data-error')
  .content.querySelector('.data-error');
const successElement = document.querySelector('#success')
  .content.querySelector('.success');
const errorElement = document.querySelector('#error')
  .content.querySelector('.error');
const successButtonElement = successElement.querySelector('.success__button');
const errorButtonElement = errorElement.querySelector('.error__button');

const onEscapeKeyDown = (evt) => addEscapeEvent(evt, closeMessage);

const onDocumentClick = (evt) => {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }

  closeMessage();
};

const onMessageButtonClick = () => closeMessage();

function closeMessage() {
  const message = document.querySelector('.success') || document.querySelector('.error');

  message.remove();

  document.removeEventListener('keydown', onEscapeKeyDown);
  document.removeEventListener('click', onDocumentClick);
}

export const loadFailMessage = (error) => {
  const errorTextElement = document.createElement('p');

  errorTextElement.textContent = error.message;

  dataErrorElement.append(errorTextElement);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};

export const uploadSuccessMessage = () => {
  successButtonElement.addEventListener('click', onMessageButtonClick);
  document.addEventListener('keydown', onEscapeKeyDown);
  document.addEventListener('click', onDocumentClick);

  document.body.append(successElement);
};

export const uploadFailMessage = () => {
  errorButtonElement.addEventListener('click', onMessageButtonClick);
  document.addEventListener('keydown', onEscapeKeyDown);
  document.addEventListener('click', onDocumentClick);

  document.body.append(errorElement);
};
