import {isEscapeKey} from './random.js';
const choosePhoto=document.querySelector('#upload-file');
const editPhoto=document.querySelector('.img-upload__overlay');
const modalOpen=document.querySelector('body');
const choosePhotoClose=document.querySelector('#upload-cancel');
const pictureForm=document.querySelector('.img-upload__form');
const inputComment=document.querySelector('.social__footer-text');
const sendButtonComments=document.querySelector('.img-upload__submit');
const inputHashtag=document.querySelector('.text__hashtags');
const commentText=document.querySelector('.text__description');

const regular=/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(pictureForm, {
  classTo: 'form__field',
  errorTextParent: 'form__field',
  errorTextTag: 'p',
});

const onEditEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditPhoto();
  }
};

const initPhotoForm = () => {
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
    if (isValid){
      // Тут будет отправка данных на сервер
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

  pristine.addValidator(commentText, () => {
    if (commentText.value.length>=140){
      return false;
    }
    return true;
  }, 'Комментарий должен быть меньше 140 символов');
};

function openEditPhoto () {
  editPhoto.classList.remove('hidden');
  modalOpen.classList.add('modal-open');
  document.addEventListener('keydown', onEditEscKeydown);
}

function closeEditPhoto () {
  editPhoto.classList.add('hidden');
  modalOpen.classList.remove('modal-open');
  document.removeEventListener('keydown', onEditEscKeydown);
}


export{initPhotoForm};
