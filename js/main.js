import {getRandomPositiveInteger, getRandomArrayElement} from './random';
import {createComment, createComments} from './Comment';
import {createPhotoObject, createPhotoObjects} from './photo';
const NAMES = [
  'Max',
  'Alex',
  'Tom',
  'Kate',
  'Molly',
];
const DESCRIPTION=[
  'Я на прогулке',
  'Я и моя команда',
  'Я на спорте',
  'Я на пробежке',
];

const MESSAGE=[
  'Всё отлично!',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];


const lengthString=(checkString, maxLength) => checkString <= maxLength;

lengthString();


