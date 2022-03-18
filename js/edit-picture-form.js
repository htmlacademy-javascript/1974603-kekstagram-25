import {isEscapeKey, clearSelectionField} from './random.js';
const choosePhoto=document.querySelector('#upload-file');
//let editRealPhoto=document.querySelector('.img-upload__preview-container');
const editPhoto=document.querySelector('.img-upload__overlay');
const modalOpen=document.querySelector('body');
const choosePhotoClose=document.querySelector('#upload-cancel');
const pictureForm=document.querySelector('.img-upload__form');
const inputComment=document.querySelector('.social__footer-text');
const sendButtonComments=document.querySelector('.social__footer-btn');
const inputHashtag=document.querySelector('.text__hashtags');

const regular=/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine= new Pristine(pictureForm, {
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
    closeEditPhoto ();
    clearSelectionField ();
  });
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

pristine.addValidator(inputHashtag, function(value) {
  const tags = this.value.split(/\s+/);
  for (let tag=0; tag<=tags.length; tag++){
    if (!regular.test(tags[tag])){
      return false;
    }
  }
  return true;
}, 'Тег не соответствует правилам', 1, false);

pristine.addValidator(inputHashtag, function(value) {
  const tags = this.value.split(/\s+/);
  for (let tag of tags){
    if (!regular.test(tag)){
      return false;
    }
  }
  return true;
}, 'Тег не соответствует правилам', 1, false);

pristine.addValidator(inputHashtag, function(value) {
  const tags = this.value.split(/\s+/);
  for (let tag=0; tag<=tags.length; tag++){
    const regTeg=regular.test(tags[tag]);
    if (regTeg===false){
      return false;
    }
  }
}, 'Тег не соответствует правилам', 1, false);
//проверка на количество тегов
pristine.addValidator(inputHashtag, function(value) {
  const tags = this.value.split(/\s+/);
  return tags.length <= 5;
}, 'Тегов должно быть не больше 5', 1, false);

//повторы в тегах
pristine.addValidator(inputHashtag, function(value) {
  const tags = this.value.split(/\s+/);
  const tagsSet = new Set(tags);
  return tags.length === tagsSet.size;
}, 'Теги не должны повторяться', 2, false);

//незакрытие при фокусе на esc
inputHashtag.addEventListener('focus', (evt) => {
  if (isEscapeKey(evt)){
    evt.stopPropagation();
  }
});

export{initPhotoForm};

