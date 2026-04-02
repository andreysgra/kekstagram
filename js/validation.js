import {COMMENT_MAX_LENGTH, ErrorMessage, HASHTAG_MAX_LENGTH, HASHTAGS_MAX_COUNT, VALID_SYMBOLS} from './const';
import {checkStringLength} from './utils';

const imageFormElement = document.querySelector('#upload-select-image');

const getHashTags = (value) => value.trim().toLowerCase().split(/\s+/);

const validateHashtagSymbols = (value) => !value || getHashTags(value).every((hashtag) => VALID_SYMBOLS.test(hashtag));

const validateHashtagLength = (value) => getHashTags(value).every((hashtag) => hashtag.length <= HASHTAG_MAX_LENGTH);

const validateHashtagCount = (value) => getHashTags(value).length <= HASHTAGS_MAX_COUNT;

const validateHashtagUnique = (value) => {
  const hashtags = getHashTags(value);
  const uniqueHashtags = new Set(hashtags);

  return hashtags.length === uniqueHashtags.size;
};

const validateComment = (value) => checkStringLength(value, COMMENT_MAX_LENGTH);

const pristine = new Pristine(imageFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

pristine.addValidator(imageFormElement.hashtags, validateHashtagSymbols, ErrorMessage.HASHTAG_INVALID_SYMBOL);
pristine.addValidator(imageFormElement.hashtags, validateHashtagLength, ErrorMessage.HASHTAG_TOO_LONG);
pristine.addValidator(imageFormElement.hashtags, validateHashtagCount, ErrorMessage.HASHTAG_INVALID_COUNT);
pristine.addValidator(imageFormElement.hashtags, validateHashtagUnique, ErrorMessage.HASHTAG_INVALID_UNIQUE);
pristine.addValidator(imageFormElement.description, validateComment, ErrorMessage.COMMENT_TOO_LONG);

export const setValidation = () => pristine.validate();

export const resetValidation = () => pristine.reset();
