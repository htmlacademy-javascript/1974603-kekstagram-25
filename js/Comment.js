import {getRandomPositiveInteger, getRandomArrayElement} from './random';
import {NAMES, MESSAGE} from './main';
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
export {createComment, createComments};
