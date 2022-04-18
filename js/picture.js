import {openFullWindow} from './full-picture.js';
const pictureListElement=document.querySelector('.pictures');
const pictureTemplate=document.querySelector('#picture').content.querySelector('.picture');


const getRenderPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.addEventListener('click', () => openFullWindow(picture));
  return pictureElement;
};
const cleanPictureList = () => {
  const pictureList= document.querySelectorAll('.picture');
  pictureList.forEach((photo) => photo.remove());
};
const getRenderPictures = (pictures) => {
  const fragment = new DocumentFragment();
  pictures.forEach((picture) => {
    fragment.appendChild(getRenderPicture(picture));
  });
  pictureListElement.appendChild(fragment);
};

export{getRenderPictures,cleanPictureList};
