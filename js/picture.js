
import {fullWindowOpen} from './full-picture.js';
const pictureListElement=document.querySelector('.pictures');
const pictureTemplate=document.querySelector('#picture').content.querySelector('.picture');


const renderPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.addEventListener('click', () => fullWindowOpen(picture));
  return pictureElement;
};
const cleanPictureList=()=>{
  pictureListElement.innerHTML='';
};
const renderPictures = (pictures) => {
  const fragment = new DocumentFragment();
  pictures.forEach((picture) => {
    fragment.appendChild(renderPicture(picture));
  });
  pictureListElement.appendChild(fragment);
};

export{renderPictures,cleanPictureList};
