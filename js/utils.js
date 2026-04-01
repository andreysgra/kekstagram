export const getRandomPositiveInteger = (a = 0, b = 1) => {

  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const checkStringLength = (string, length) => string.length <= length;

export const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

export const addEscapeEvent = (evt, action) => {
  if (evt.key === 'Escape') {
    action();
  }
};
