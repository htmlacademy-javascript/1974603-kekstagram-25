import {isEscapeKey} from '/.random.js';
const pictureForm=document.querySelector('.img-upload__form');
const inputComment=document.querySelector('.social__footer-text');
const sendButtonComments=document.querySelector('.social__footer-btn');
const pristine= new Pristine(pictureForm, {
  classTo: inputComment,
});

inputComment.addEventListener('submit',(evt)=>{
  evt.preventDefault();

  const isValid=pristine.validate();
  if (isValid){
    sendButtonComments.disabled=false;
  }
  sendButtonComments.disabled=true;
});

inputComment.addEventListener('focus', (evt) => {
  if (isEscapeKey(evt)){
    evt.stopPropagation();
  }
});
