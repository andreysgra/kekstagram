import {getRandomArrayElement, getRandomPositiveInteger} from './utils.js';

const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MAX = 10;

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'In rutrum ac purus sit amet tempus.'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Игорь',
  'Валентина',
  'Лена',
  'Света',
  'Сергей',
  'Алексей',
  'Наташа'
];

const createPictureUrl = (index) => `photos/${index}.jpg`;

const createMessage = () => Array.from({length: getRandomPositiveInteger(1, 2)},
  () => getRandomArrayElement(MESSAGES)).join(' ');

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});

const createPicture = (index) => {
  const quantityComments = getRandomPositiveInteger(0, COMMENTS_MAX);

  return {
    id: index,
    url: createPictureUrl(index),
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(LIKES_MIN, LIKES_MAX),
    comments: Array.from({length: quantityComments}, (_, i) => createComment(i + 1))
  };
};

const getPictures = (count) => Array.from({length: count}, (_, i) => createPicture(i + 1));

export {getPictures};
