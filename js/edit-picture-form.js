import {isEscapeKey} from './random.js';
import { sendData } from './server.js';
const choosePhoto=document.querySelector('#upload-file');
const editPhoto=document.querySelector('.img-upload__overlay');
const choosePhotoClose=document.querySelector('#upload-cancel');
const pictureForm=document.querySelector('.img-upload__form');
const inputComment=document.querySelector('.social__footer-text');
const sendButtonComments=document.querySelector('.img-upload__submit');
const inputHashtag=document.querySelector('.text__hashtags');
const commentText=document.querySelector('.text__description');
const successMessage=document.querySelector('#success').сontent;//блок успешной загрузки
//const successButton=document.querySelector('.success__button');
const errorMessage=document.querySelector('#error');
//const errorButton=document.querySelector('.error__button');

const regular=/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_COMMENT_LENGTH=140;

const pristine = new Pristine(pictureForm, {
  classTo: 'form__field',
  errorTextParent: 'form__field',
  errorTextTag: 'p',
});

const onEditEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditPhoto();
    closeSuccessMessage();
    closeErrorMessage();
  }
};
function closeSuccessMessage() {
  document.querySelector('.success').remove();
  document.removeEventListener('click', closeSuccessMessage);
}
document.addEventListener('click', closeSuccessMessage);


function closeErrorMessage() {
  document.querySelector('.error').remove();
  document.removeEventListener('click', closeErrorMessage);
}
document.addEventListener('click', closeErrorMessage);


function setEditFormSubmit (){

  //const initPhotoForm =()=> {
  choosePhoto.addEventListener('change', () => {
    openEditPhoto();
  });

  choosePhotoClose.addEventListener('click', () => {
    closeEditPhoto();
    pictureForm.reset();
  });

  pictureForm.addEventListener('submit',(evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const isValid = pristine.validate();
    if (isValid) {
      // отправка данных на сервер
      sendData(
        ()=>{
          const successElement=successMessage.cloneNode(true);
          document.body.appendChild(successElement);
        },
        ()=>{
          const errorElement=errorMessage.cloneNode(true);
          document.body.appendChild(errorElement);
        },
        new FormData(evt.target),
      );
    }
  });

  //незакрытие при фокусе на esc
  inputHashtag.addEventListener('focus', (evt) => {
    if (isEscapeKey(evt)){
      evt.stopPropagation();
    }
  });

  inputComment.addEventListener('focus', (evt) => {
    if (isEscapeKey(evt)){
      evt.stopPropagation();
    }
  });

  inputHashtag.addEventListener('input', () => {
    sendButtonComments.disabled = !pristine.validate();
  });

  commentText.addEventListener('input', () => {
    sendButtonComments.disabled = !pristine.validate();
  });

  pristine.addValidator(inputHashtag, (value) => {
    value = value.trim();
    if (value.length > 0) {
      const tags = value.split(/\s+/);
      for (const tag of tags) {
        if (!regular.test(tag)) {
          return false;
        }
      }
    }
    return true;
  }, 'Тег не соответствует правилам');

  //проверка на количество тегов
  pristine.addValidator(inputHashtag, (value) => {
    const tags = value.trim().split(/\s+/);
    return tags.length <= 5;
  }, 'Тегов должно быть не больше 5');

  //повторы в тегах
  pristine.addValidator(inputHashtag, (value) => {
    const tags = value.trim().split(/\s+/);
    const tagsSet = new Set(tags);
    return tags.length === tagsSet.size;
  }, 'Теги не должны повторяться');

  pristine.addValidator(commentText, () => commentText.value.length <= MAX_COMMENT_LENGTH, 'Комментарий должен быть меньше 140 символов');
}


function openEditPhoto () {
  editPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEditEscKeydown);
}

function closeEditPhoto () {
  editPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEditEscKeydown);
}


export{setEditFormSubmit, closeEditPhoto,openEditPhoto};
