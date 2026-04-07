const ALERT_SHOW_TIME = 5000;

const dataErrorElement = document.querySelector('#data-error')
  .content.querySelector('.data-error');

export const loadFailMessage = (error) => {
  const errorTextElement = document.createElement('p');

  errorTextElement.textContent = error.message;

  dataErrorElement.append(errorTextElement);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};
