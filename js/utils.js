export const checkStringLength = (string, length) => string.length <= length;

export const addEscapeEvent = (evt, action) => {
  if (evt.key === 'Escape') {
    action();
  }
};

export const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[random]] = [shuffled[random], shuffled[i]];
  }

  return shuffled;
};
