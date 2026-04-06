const imageFormElement = document.querySelector('#upload-select-image');
const imagePreviewElement = imageFormElement.querySelector('.img-upload__preview img');
const sliderElement = imageFormElement.querySelector('.effect-level__slider');
const effectsListElement = imageFormElement.querySelector('.effects__list');
const effectFieldsetElement = imageFormElement.querySelector('.effect-level');
const effectLevelElement = imageFormElement.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value)
  }
});

const getFilter = (value, effect) => {
  const effects = {
    'chrome': `grayscale(${value})`,
    'sepia': `sepia(${value})`,
    'marvin': `invert(${value}%)`,
    'phobos': `blur(${value}px)`,
    'heat': `brightness(${value})`
  };

  return effects[effect];
};

const setEffect = () => {
  const level = sliderElement.noUiSlider.get();
  const effect = imageFormElement.effect.value;

  imagePreviewElement.style.filter = getFilter(level, effect);
  effectLevelElement.value = level;
};

sliderElement.noUiSlider.on('update', setEffect);

const onEffectsListElementChange = (evt) => {
  const effect = evt.target.value;

  let minValue = 0;
  let maxValue = 1;
  let stepValue = 0.1;

  switch (effect) {
    case 'marvin':
      maxValue = 100;
      stepValue = 1;
      break;
    case 'phobos':
      maxValue = 3;
      stepValue = 0.1;
      break;
    case 'heat':
      minValue = 1;
      maxValue = 3;
      stepValue = 0.1;
      break;
  }

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue
    },
    step: stepValue
  });

  sliderElement.noUiSlider.set(maxValue);

  imagePreviewElement.style.filter = '';
  imagePreviewElement.className = '';

  if (effect === 'none') {
    effectFieldsetElement.classList.add('hidden');
  } else {
    effectFieldsetElement.classList.remove('hidden');
    imagePreviewElement.classList.add(`effects__preview--${effect}`);
  }

  effectLevelElement.value = maxValue;
};

export const activateImageEffect = () => {
  effectFieldsetElement.classList.add('hidden');
  effectsListElement.addEventListener('change', onEffectsListElementChange);
};

export const deactivateImageEffect = () => {
  imagePreviewElement.removeAttribute('class');
  imagePreviewElement.removeAttribute('style');
  effectsListElement.removeEventListener('change', onEffectsListElementChange);
};
