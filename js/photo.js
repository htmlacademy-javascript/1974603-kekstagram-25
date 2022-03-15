import {getRandomPositiveInteger, getRandomArrayElement} from './random.js';
import {createComments} from './comment.js';

const DESCRIPTION=[
  'Я на прогулке',
  'Я и моя команда',
  'Я на спорте',
  'Я на пробежке',
];

const createPhotoObject=(id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes:getRandomPositiveInteger(15,200),
  comments:createComments(),
});
const createPhotoObjects= () => {
  const arrayOfPhotos = [];
  for (let i=0; i<25; i++){
    arrayOfPhotos.push(createPhotoObject(i));
  }
  return arrayOfPhotos;
};

export {createPhotoObjects};
