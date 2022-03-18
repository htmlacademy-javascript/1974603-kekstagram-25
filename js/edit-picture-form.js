import {isEscapeKey, clearSelectionField} from '/.random.js';
const choosePhoto=document.querySelector('#upload-file');
//let editRealPhoto=document.querySelector('.img-upload__preview-container');
const editPhoto=document.querySelector('.img-upload__overlay');
const modalOpen=document.querySelector('body');
const choosePhotoClose=document.querySelector('#upload-cancel');


const onEditEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault(); //evt.stopPropagation();
    closeEditPhoto();
  }
};

function openEditPhoto () {
  editPhoto.classList.remove('hidden');
  modalOpen.classList.add('modal-open');
  document.addEventListener('keydown', onEditEscKeydown);
}


choosePhoto.addEventListener('click', () => {
  openEditPhoto();
});

function closeEditPhoto () {
  editPhoto.classList.add('hidden');
  modalOpen.classList.remove('modal-open');
  document.addEventListener('keydown', onEditEscKeydown);
}


choosePhotoClose.addEventListener('click', () => {
  closeEditPhoto ();
  clearSelectionField ();
});
export{closeEditPhoto};
