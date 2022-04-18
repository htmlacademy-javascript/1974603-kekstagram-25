import {isEscapeKey} from './random.js';
import {sendData} from './server.js';
import {getTurnEffectLevel} from './effects-scale.js';
const MAX_COMMENT_LENGTH = 140;
const choosePhoto=document.querySelector('#upload-file');
const editPhoto=document.querySelector('.img-upload__overlay');
const choosePhotoClose=document.querySelector('#upload-cancel');
const pictureForm=document.querySelector('.img-upload__form');
const sendButtonComments=document.querySelector('.img-upload__submit');
const inputHashtag=document.querySelector('.text__hashtags');
const commentText=document.querySelector('.text__description');
const picturePreview=document.querySelector('.img-upload__preview');
const fullPhoto=picturePreview.querySelector('img');
const successMessage=document.querySelector('#success').content;
const errorMessage=document.querySelector('#error').content;
const regular = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(pictureForm, {
  classTo: 'form__field',
  errorTextParent: 'form__field',
  errorTextTag: 'p',
  errorTextClass: 'form__error',
});


const onCloseSuccessMessage = () => {
  const successClass=document.querySelector('.success');
  if (successClass) {
    successClass.remove();
    document.removeEventListener('click', onCloseSuccessMessage);
  }
};

const onCloseErrorMessage = () => {
  const errorClass=document.querySelector('.error');
  if (errorClass) {
    errorClass.remove();
    document.removeEventListener('click', onCloseErrorMessage);
  }
};

const onEditEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditPhoto();
    onCloseSuccessMessage();
    onCloseErrorMessage();
  }
};

const getSetEditFormSubmit = () => {
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
      sendData(
        () => {
          closeEditPhoto();
          const successElement=successMessage.cloneNode(true);
          document.body.appendChild(successElement);
          document.addEventListener('click', onCloseSuccessMessage);
          document.addEventListener('keydown', onEditEscKeydown);
          getTurnEffectLevel('none');
          picturePreview.style.transform= `scale(${100/100})`;
          pictureForm.reset();
          sendButtonComments.disabled=false;
        },
        () => {
          closeEditPhoto();
          const errorElement=errorMessage.cloneNode(true);
          document.body.appendChild(errorElement);
          document.addEventListener('click', onCloseErrorMessage);
          document.addEventListener('keydown', onEditEscKeydown);
          getTurnEffectLevel('none');
          picturePreview.style.transform = `scale(${100/100})`;
          pictureForm.reset();
          sendButtonComments.disabled = false;
        },
        new FormData(evt.target),
      );
    }
  });
  inputHashtag.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  });

  commentText.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
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

  pristine.addValidator(inputHashtag, (value) => {
    const tags = value.trim().split(/\s+/);
    return tags.length <= 5;
  }, 'Тегов должно быть не больше 5');

  pristine.addValidator(inputHashtag, (value) => {
    const tags = value.toLowerCase().trim().split(/\s+/);
    const tagsSet = new Set(tags);
    return tags.length === tagsSet.size;
  }, 'Теги не должны повторяться');

  pristine.addValidator(commentText, () => commentText.value.length <= MAX_COMMENT_LENGTH, 'Комментарий должен быть меньше 140 символов');
};

const getResetForm = () => {
  fullPhoto.style.transform = `scale(${1})`;
  getTurnEffectLevel('none');
};

function openEditPhoto() {
  getResetForm();
  editPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEditEscKeydown);
}

function closeEditPhoto () {
  editPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEditEscKeydown);
}


export{getSetEditFormSubmit, closeEditPhoto,openEditPhoto};
