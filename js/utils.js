const getRandomPositiveInteger = (a = 0, b = 1) => {

  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};
const checkStringLength = (string, length) => string.length <= length;

export {checkStringLength, getRandomPositiveInteger};
