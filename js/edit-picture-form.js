import {isEscapeKey} from './random.js';
import { sendData } from './server.js';
import {turnEffectLevel} from './effects-scale.js';
const choosePhoto=document.querySelector('#upload-file');
const editPhoto=document.querySelector('.img-upload__overlay');
const choosePhotoClose=document.querySelector('#upload-cancel');
const pictureForm=document.querySelector('.img-upload__form');
const inputComment=document.querySelector('.social__footer-text');
const sendButtonComments=document.querySelector('.img-upload__submit');
const inputHashtag=document.querySelector('.text__hashtags');
const commentText=document.querySelector('.text__description');
const successMessage=document.querySelector('#success').content;//блок успешной загрузки
const errorMessage=document.querySelector('#error').content;
const picturePreview=document.querySelector('.img-upload__preview');

const regular=/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_COMMENT_LENGTH=140;

const pristine = new Pristine(pictureForm, {
  classTo: 'form__field',
  errorTextParent: 'form__field',
  errorTextTag: 'p',
  errorTextClass: 'form__error',
});

const onEditEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditPhoto();
    closeSuccessMessage();
    closeErrorMessage();
  }
};
function closeSuccessMessage(){
  const successClass=document.querySelector('.success');
  if (successClass){
    successClass.remove();
    document.removeEventListener('click', closeSuccessMessage);
  }
}

function closeErrorMessage() {
  const errorClass=document.querySelector('.error');
  if (errorClass){
    errorClass.remove();
    document.removeEventListener('click', closeErrorMessage);
  }
}


function setEditFormSubmit (){
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
      sendButtonComments.disabled=true;
      // отправка данных на сервер
      sendData(
        ()=>{
          closeEditPhoto();
          const successElement=successMessage.cloneNode(true);
          document.body.appendChild(successElement);
          document.addEventListener('click', closeSuccessMessage);
          document.addEventListener('keydown', onEditEscKeydown);
          turnEffectLevel('none');
          picturePreview.style.transform= `scale(${100/100})`;
          pictureForm.reset();
          sendButtonComments.disabled=false;
        },
        ()=>{
          closeEditPhoto ();
          const errorElement=errorMessage.cloneNode(true);
          document.body.appendChild(errorElement);
          document.addEventListener('click', closeErrorMessage);
          document.addEventListener('keydown', onEditEscKeydown);
          turnEffectLevel('none');
          picturePreview.style.transform= `scale(${100/100})`;
          pictureForm.reset();
          sendButtonComments.disabled=false;
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
