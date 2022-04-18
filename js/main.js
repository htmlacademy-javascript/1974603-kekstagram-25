import {getRenderPictures,cleanPictureList} from './picture.js';
import {getInitScale, getInitFilters} from './effects-scale.js';
import {getSetEditFormSubmit,closeEditPhoto} from './edit-picture-form.js';
import {getData} from './server.js';
import {chooseAvatar} from './avatar.js';
import {showAlert,debounce,selectFilterButton} from './random.js';


const RANDOM_PICTURE=10;
const RERENDER_DELAY = 500;
const onDefaultButton=document.querySelector('#filter-default');
const imgFilters=document.querySelector('.img-filters');
const onRandomButton=document.querySelector('#filter-random');
const onDiscussedButton=document.querySelector('#filter-discussed');

const comparePictures = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const rerenderPictures = (evt, pictures) => {
  selectFilterButton(evt.target);
  cleanPictureList();
  pictures = pictures.slice();
  switch (evt.target.id) {
    case 'filter-random':
      pictures = pictures.map((item) => [Math.random(), item]).sort().map((element) => element[1]).slice(0, RANDOM_PICTURE);
      break;
    case 'filter-discussed':
      pictures = pictures.sort(comparePictures).slice(0,10);
  }
  getRenderPictures(pictures);
};

getInitScale();
getInitFilters();
chooseAvatar();
getData(
  (pictures)=>{
    getRenderPictures(pictures);
    imgFilters.classList.remove('img-filters--inactive');
    const debouncedRerenderPictures = debounce((evt) => rerenderPictures(evt, pictures), RERENDER_DELAY);
    onDefaultButton.addEventListener('click', debouncedRerenderPictures);
    onRandomButton.addEventListener('click', debouncedRerenderPictures);
    onDiscussedButton.addEventListener('click',debouncedRerenderPictures);
  },
  showAlert,
);
getSetEditFormSubmit(closeEditPhoto);
