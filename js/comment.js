import {getRandomPositiveInteger, getRandomArrayElement} from './random.js';

const NAMES = [
  'Max',
  'Alex',
  'Tom',
  'Kate',
  'Molly',
];
const MESSAGE=[
  'Всё отлично!',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];

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
export {createComments};
