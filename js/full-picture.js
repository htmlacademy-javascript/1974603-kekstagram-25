import {isEscapeKey} from './random.js';
const fullPictureDisplay=document.querySelector('.big-picture'); //полноэранный показ картинки
const commentCounter=document.querySelector('.social__comment-count'); // блок счетчика комментариев
const commentDownload=document.querySelector('.comments-loader'); // загрузка новых комментариев
const bigPictureCancel=document.querySelector('.big-picture__cancel');
const QUANTITY_COMMENTS=5;


const onEditEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    fullWindowClose();
  }
};

const comments=[];
//отображение окна с полноразмерным изображением
function fullWindowOpen (fullPicture) {
  comments.length=0;
  fullPictureDisplay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentCounter.classList.remove('hidden');
  commentDownload.classList.remove('hidden');
  fullPictureDisplay.querySelector('.social__comments').innerHTML='';
  fullPictureDisplay.querySelector('.big-picture__img img').src = fullPicture.url;
  fullPictureDisplay.querySelector('.likes-count').textContent = fullPicture.likes;
  fullPictureDisplay.querySelector('.comments-count').textContent = fullPicture.comments.length;
  const fragment = new DocumentFragment();
  const count=fullPicture.comments.length<QUANTITY_COMMENTS ? fullPicture.comments.length : QUANTITY_COMMENTS;
  for(let f=0;f<count;f++){
    fragment.appendChild(commentData(fullPicture.comments[f]));
  }
  comments.push(...fullPicture.comments);
  if (comments.length<QUANTITY_COMMENTS){
    fullPictureDisplay.querySelector('.comments-count-begin').textContent=comments.length;
    commentDownload.classList.add('hidden');
  }
  fullPictureDisplay.querySelector('.social__comments').appendChild(fragment);
  fullPictureDisplay.querySelector('.social__caption').textContent = fullPicture.description;
  commentDownload.addEventListener('click',()=>addComments(fullPicture.comments));
  document.addEventListener('keydown', onEditEscKeydown);
}

function addComments(pictureComments){
  const createdComments=document.querySelectorAll('.social__comment');
  const fragment = new DocumentFragment();
  if(createdComments.length===comments.length-1){
    commentDownload.classList.add('hidden');
  }
  if(createdComments.length<comments.length){
    const moreComments=comments.slice(createdComments.length,createdComments.length+QUANTITY_COMMENTS);
    for(let j=0;j<moreComments.length;j++){
      fragment.appendChild(commentData(pictureComments.comments[j]));
    }
    fullPictureDisplay.querySelector('.comments-count-begin').textContent=createdComments.length+moreComments.length;
    fullPictureDisplay.querySelector('.social__comments').appendChild(fragment);
  }
}
//блок, в который вставляются комментарии
function commentData (commentInfo) {
  const commentListItem = document.createElement('li');
  commentListItem.classList.add('social__comment');
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
  textComment.textContent=commentInfo.message;
  return commentListItem;
}


//закрытие окна
function fullWindowClose () {
  fullPictureDisplay.classList.add('hidden');
  commentCounter.classList.remove('hidden');
  commentDownload.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEditEscKeydown);
  commentDownload.addEventListener('click',addComments);
}
bigPictureCancel.addEventListener('click', () => {
  fullWindowClose();

});


export {fullWindowOpen};
