
const pictureListElement=document.querySelector('.pictures');
const pictureTemplate=document.querySelector('#picture').content.querySelector('.picture');


const renderPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.pucture__img').src = picture.url;
  pictureElement.querySelector('.pucture__comments').src = picture.comments.length;
  pictureElement.querySelector('.pucture__likes').src = picture.likes;
  return pictureElement;
};

const renderPictures = (pictures) => {
  const fragment = DocumentFragment();
  pictures.forEach((picture) => {
    fragment.appendChild(renderPicture(picture));
  });
  pictureListElement.appendChild(fragment);
};
export{renderPictures};
