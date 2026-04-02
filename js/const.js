export const HASHTAGS_MAX_COUNT = 5;
export const HASHTAG_MAX_LENGTH = 20;
export const COMMENT_MAX_LENGTH = 140;
export const VALID_SYMBOLS = /^#[A-Za-zА-яЁё0-9]+$/;

export const ErrorMessage = {
  HASHTAG_INVALID_SYMBOL: 'Хэш-тег должен начинаться с символа # и не может содержать спецсимволы и пробелы',
  HASHTAG_TOO_LONG: `Длина одного хэш-тега не должна превышать ${HASHTAG_MAX_LENGTH} символов`,
  HASHTAG_INVALID_COUNT: `Нельзя использовать больше ${HASHTAGS_MAX_COUNT} хэш-тегов`,
  HASHTAG_INVALID_UNIQUE: 'Хэш-теги не должны повторяться',
  COMMENT_TOO_LONG: `Длина комментария не должна превышать ${COMMENT_MAX_LENGTH} символов`
};
