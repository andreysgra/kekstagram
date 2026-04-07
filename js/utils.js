export const checkStringLength = (string, length) => string.length <= length;

export const addEscapeEvent = (evt, action) => {
  if (evt.key === 'Escape') {
    action();
  }
};
