import {isEscapeKey} from './random.js';

const QUANTITY_COMMENTS = 5;
const fullPictureDisplay=document.querySelector('.big-picture');
const commentCounter=document.querySelector('.social__comment-count');
const commentDownload=document.querySelector('.comments-loader');
const bigPictureCancel=document.querySelector('.big-picture__cancel');
const commentsCountBegin = fullPictureDisplay.querySelector('.comments-count-begin');
const socialComments = fullPictureDisplay.querySelector('.social__comments');
const comments = [];

const onEditEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullWindow();
  }
};
const getCommentData = (commentInfo) => {
  const commentListItem = document.createElement('li');
  commentListItem.classList.add('social__comment');
  const imgTeg = document.createElement('img');
  imgTeg.classList.add('social__picture');
  commentListItem.appendChild(imgTeg);
  imgTeg.src = commentInfo.avatar;
  imgTeg.alt = commentInfo.name;
  imgTeg.width = 35;
  imgTeg.height = 35;
  const textComment=document.createElement('p');
  textComment.classList.add('social__text');
  commentListItem.appendChild(textComment);
  textComment.textContent=commentInfo.message;
  return commentListItem;
};

const onPictureCommentsCount = () => {
  const createdCommentCount = document.querySelectorAll('.social__comment').length;
  const moreComments = comments.slice(createdCommentCount, createdCommentCount + QUANTITY_COMMENTS);
  const nextCount = createdCommentCount + moreComments.length;

  if (createdCommentCount < comments.length) {
    const fragment = new DocumentFragment();
    moreComments.forEach((commentInfo) => {
      fragment.appendChild(getCommentData(commentInfo));
    });
    commentsCountBegin.textContent = nextCount;
    socialComments.appendChild(fragment);
  }

  if (nextCount >= comments.length) {
    commentDownload.classList.add('hidden');
  }
};


const openFullWindow = (fullPicture) => {
  comments.length = 0;
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
  for (let f = 0; f < count; f++) {
    fragment.appendChild(getCommentData(fullPicture.comments[f]));
  }
  comments.push(...fullPicture.comments);
  commentsCountBegin.textContent = QUANTITY_COMMENTS;
  if (comments.length < QUANTITY_COMMENTS) {
    commentsCountBegin.textContent=comments.length;
    commentDownload.classList.add('hidden');
  }
  socialComments.appendChild(fragment);
  fullPictureDisplay.querySelector('.social__caption').textContent = fullPicture.description;
  commentDownload.addEventListener('click',onPictureCommentsCount);
  document.addEventListener('keydown', onEditEscKeydown);
};

bigPictureCancel.addEventListener('click', () => {
  closeFullWindow();
});
function closeFullWindow () {
  fullPictureDisplay.classList.add('hidden');
  commentCounter.classList.remove('hidden');
  commentDownload.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEditEscKeydown);
  commentDownload.addEventListener('click',onPictureCommentsCount);
}

export {openFullWindow};
