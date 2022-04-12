import {renderPictures,cleanPictureList} from './picture.js';
import {initScale, initFilters} from './effects-scale.js';
import {setEditFormSubmit} from './edit-picture-form.js';
import {closeEditPhoto} from './edit-picture-form.js';
import{getData} from './server.js';
import {showAlert,debounce,randomButtonStyle,deleteStyleRandom,deleteStyleDefault,discussButtonStyle,deleteStyleDiscuss,defaultButtonStyle} from './random.js';
const defaultButton=document.querySelector('#filter-default');
//const defaultButton=document.querySelector('img-filters__button  img-filters__button--active');
const RERENDER_DELAY = 500;
const imgFilters=document.querySelector('.img-filters');
const RANDOM_PICTURE=10;
const randomButton=document.querySelector('#filter-random');
const discussedButton=document.querySelector('#filter-discussed');

initScale();
initFilters();

getData(
  (pictures)=>{
    renderPictures(pictures);
    imgFilters.classList.remove('img-filters--inactive');
    defaultButton.addEventListener('click', debounce(()=>{
      defaultButtonStyle();
      deleteStyleDiscuss();
      deleteStyleRandom();
      cleanPictureList();
      renderPictures(pictures);
    },RERENDER_DELAY));
    randomButton.addEventListener('click', debounce(()=>{
      deleteStyleDefault();
      deleteStyleDiscuss();
      randomButtonStyle();
      cleanPictureList();
      const randomTenPictures=pictures.map((item) => [Math.random(), item]).sort().map((element) => element[1]).slice(0, RANDOM_PICTURE);
      renderPictures(randomTenPictures);
    }, RERENDER_DELAY));
    discussedButton.addEventListener('click',debounce(()=>{
      discussButtonStyle();
      deleteStyleRandom();
      deleteStyleDefault();
      cleanPictureList();
      const comparePictures = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;
      const mostCommented = pictures.sort(comparePictures).slice(10);
      renderPictures(mostCommented);
    }, RERENDER_DELAY));
  },
  showAlert,
);
setEditFormSubmit(closeEditPhoto);
