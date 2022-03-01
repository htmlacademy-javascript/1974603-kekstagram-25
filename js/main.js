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


const getRandomPositiveInteger = (minIndex, maxIndex) => {
  const lower = Math.ceil(Math.min(Math.abs(minIndex), Math.abs(maxIndex)));
  const upper = Math.floor(Math.max(Math.abs(minIndex), Math.abs(maxIndex)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
const createComment= ()=>
  ({
    id: getRandomPositiveInteger (1,10),
    avatar: `img/avatar-${getRandomPositiveInteger(1,6)}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES),
  });
const createComments=()=>
{
  const comments=[];
  for (let i=getRandomPositiveInteger(1,10); i>0; i--)
  {
    comments.push(createComment());
  }
  return comments;
};
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
createPhotoObjects();

const lengthString=(checkString, maxLength) => checkString <= maxLength;

lengthString();


