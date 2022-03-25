import {isEscapeKey} from './random.js';
const fullPictureDisplay=document.querySelector('.big-picture'); //полноэранный показ картинки
const commentCounter=document.querySelector('.social__comment-count'); // блок счетчика комментариев
const commentDownload=document.querySelector('.comments-loader'); // загрузка новых комментариев


const onEditEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    fullWindowClose();
  }
};

//отображение окна с полноразмерным изображением
function fullWindowOpen (fullPicture) {
  fullPictureDisplay.classList.remove('.hidden');
  commentCounter.classList.add('.hidden');
  commentDownload.classList.add('.hidden');
  document.body.classList.remove('.modal-open');
  fullPictureDisplay.querySelector('.big-picture__img').src = fullPicture.url;
  fullPictureDisplay.querySelector('.likes-count').textContent = fullPicture.likes;
  fullPictureDisplay.querySelector('.comments-count').textContent = fullPicture.comments.length;
  const fragment = new DocumentFragment();
  for (let i=0; i<fullPicture.comments.length;i++){
    fragment.appendChild(commentData(fullPicture.comments[i]));
  }
  fullPictureDisplay.querySelector('.social__caption').appendChild(fragment);
  fullPictureDisplay.querySelector('.social__caption').textContent = fullPicture.description;
  document.addEventListener('keydown', onEditEscKeydown);
}

//блок, в который вставляются комментарии
function commentData (commentInfo) {
  const commentListItem = document.createElement('li');
  commentListItem.classList.add('social__comment');
  fullPictureDisplay.appendChild(commentListItem);
  const imgTeg=document.createElement('img');
  imgTeg.classList.add('social__picture');
  commentListItem.appendChild(imgTeg);
  imgTeg.src=commentInfo.avatar;
  imgTeg.alt=commentInfo.name;
  imgTeg.width=35;
  imgTeg.height=35;
  const textComment=document.createElement('p');
  textComment.classList.add('social__text');
  commentListItem.appendChild(textComment);
  textComment.textContent=commentInfo.comments;
  return commentListItem;
}


//закрытие окна
function fullWindowClose () {
  fullPictureDisplay.classList.add('.hidden');
  commentCounter.classList.remove('.hidden');
  commentDownload.classList.remove('.hidden');
  document.body.classList.add('.modal-open');
  document.removeEventListener('keydown', onEditEscKeydown);
}
fullPictureDisplay.addEventListener('click', () => {
  fullWindowClose();

});
export {fullWindowOpen};
