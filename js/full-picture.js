import {isEscapeKey} from './random.js';
//import {MESSAGE,NAMES} from './comment.js';
const fullPictureDisplay=document.querySelector('.big-picture'); //полноэранный показ картинки
//const viewPicture=document.querySelector('.big-picture__img'); //просмотр изображения
//const informationPicture=document.querySelector('.big-picture__social'); // информация об изображении
const commentBlock=document.querySelector('.social__comments'); // блок со списком комментариев
const commentCounter=document.querySelector('.social__comment-count'); // блок счетчика комментариев
const commentDownload=document.querySelector('.comments-loader'); // загрузка новых комментариев
const modapOp=document.querySelector('body');


const onEditEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    fullWindowClose();
  }
};
// открытие окна
const openWindow = () => {
  fullPictureDisplay.addEventListener('change', () => {
    fullWindowOpen();
  });
  //отображение окна с полноразмерным изображением
  function fullWindowOpen (fullPicture) {
    fullPictureDisplay.classList.remove('.hidden');
    commentCounter.classList.add('.hidden');
    commentDownload.classList.add('.hidden');
    modapOp.classList.remove('.modal-open');
    fullPictureDisplay.querySelector('.big-picture__img').src = fullPicture.url;
    fullPictureDisplay.querySelector('.likes-count').textContent = fullPicture.likes;
    fullPictureDisplay.querySelector('.comments-count').textContent = fullPicture.comment;
    fullPictureDisplay.querySelector('.social__comments').textContent = commentData();
    fullPictureDisplay.querySelector('.social__caption').textContent = fullPicture.description;
    document.addEventListener('keydown', onEditEscKeydown);
  }
  //блок, в который вставляются комментарии
  function commentData (commentInfo) {
    const parametrs='width="35" height="35"';
    const commentListItem = commentBlock.createElement('li');
    commentListItem.classList.add('social__comment');
    const imgTeg=commentListItem.createElement('img');
    imgTeg.classList.add('social__picture');
    imgTeg.querySelector('social__picture').src=commentInfo.avatar;
    imgTeg.querySelector('social__picture').textContent=commentInfo.name;
    imgTeg.innerHTML=parametrs;
    const textComment=commentListItem.createElement('p');
    textComment.classList.add('social__text').textContent=commentInfo.comment;


  }
};
//закрытие окна
function fullWindowClose () {
  fullPictureDisplay.classList.add('.hidden');
  commentCounter.classList.remove('.hidden');
  commentDownload.classList.remove('.hidden');
  modapOp.classList.add('.modal-open');
  document.removeEventListener('keydown', onEditEscKeydown);
}
fullPictureDisplay.addEventListener('click', () => {
  fullWindowClose();

});
