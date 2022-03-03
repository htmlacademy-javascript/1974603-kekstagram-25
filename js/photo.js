import {getRandomPositiveInteger, getRandomArrayElement} from './random';
import {createComment, createComments} from './Comment';
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
createPhotoObjects ();
export {createPhotoObject, createPhotoObjects};
