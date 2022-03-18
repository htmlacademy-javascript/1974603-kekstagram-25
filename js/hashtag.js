import {isEscapeKey} from '/.random.js';
const pictureForm=document.querySelector('.img-upload__form');
const inputHashtag=document.querySelector('.text__hashtags');
//const sendDataButton=document.querySelector('.img-upload__submit');
const pristine= new Pristine(pictureForm);

const regular=/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

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


