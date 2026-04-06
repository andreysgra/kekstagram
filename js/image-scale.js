const imageFormElement = document.querySelector('#upload-select-image');
const imagePreviewElement = imageFormElement.querySelector('.img-upload__preview img');
const smallerButtonElement = imageFormElement.querySelector('.scale__control--smaller');
const biggerButtonElement = imageFormElement.querySelector('.scale__control--bigger');

const ScaleValues = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const resizeImage = (scale = ScaleValues.MAX) => {
  imageFormElement.scale.value = `${scale}%`;
  imagePreviewElement.style.transform = `scale(${scale / 100})`;
};

const onSmallerButtonClick = () => {
  let currentScale = parseInt(imageFormElement.scale.value, 10);

  if (currentScale > ScaleValues.MIN) {
    currentScale -= ScaleValues.STEP;
  }

  resizeImage(currentScale);
};

const onBiggerButtonClick = () => {
  let currentScale = parseInt(imageFormElement.scale.value, 10);

  if (currentScale < ScaleValues.MAX) {
    currentScale += ScaleValues.STEP;
  }

  resizeImage(currentScale);
};

export const activateImageScale = () => {
  resizeImage();

  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);
};

export const deactivateImageScale = () => {
  smallerButtonElement.removeEventListener('click', onSmallerButtonClick);
  biggerButtonElement.removeEventListener('click', onBiggerButtonClick);
};
