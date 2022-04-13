import {renderPictures,cleanPictureList} from './picture.js';
import {initScale, initFilters} from './effects-scale.js';
import {setEditFormSubmit} from './edit-picture-form.js';
import {closeEditPhoto} from './edit-picture-form.js';
import{getData} from './server.js';
import {showAlert,debounce,selectFilterButton} from './random.js';
const defaultButton=document.querySelector('#filter-default');
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
    defaultButton.addEventListener('click', debounce((evt)=>{
      selectFilterButton(evt.target);
      cleanPictureList();
      renderPictures(pictures);
    },RERENDER_DELAY));
    randomButton.addEventListener('click', debounce((evt)=>{
      selectFilterButton(evt.target);
      cleanPictureList();
      const randomTenPictures=pictures.map((item) => [Math.random(), item]).sort().map((element) => element[1]).slice(0, RANDOM_PICTURE);
      renderPictures(randomTenPictures);
    }, RERENDER_DELAY));
    discussedButton.addEventListener('click',debounce((evt)=>{
      selectFilterButton(evt.target);
      cleanPictureList();
      const comparePictures = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;
      const mostCommented = pictures.sort(comparePictures).slice(0,10);
      renderPictures(mostCommented);
    }, RERENDER_DELAY));
  },
  showAlert,
);
setEditFormSubmit(closeEditPhoto);
