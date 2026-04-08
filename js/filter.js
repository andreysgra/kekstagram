import {shuffleArray} from './utils';

const PICTURES_NUMBER = 10;

const compareByDiscussed = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const filterDefault = (pictures) => [...pictures];

const filterRandom = (pictures) => shuffleArray(pictures).slice(0, PICTURES_NUMBER);

const filterDiscussed = (pictures) => [...pictures].sort(compareByDiscussed);

const filterMap = new Map([
  ['filter-default', filterDefault],
  ['filter-random', filterRandom],
  ['filter-discussed', filterDiscussed]
]);

export const applyFilter = (pictures, id = 'filter-default') => filterMap.get(id)(pictures);
