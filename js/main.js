import {renderPictures,cleanPictureList} from './picture.js';
import {initScale, initFilters} from './effects-scale.js';
import {setEditFormSubmit} from './edit-picture-form.js';
import {closeEditPhoto} from './edit-picture-form.js';
import{getData} from './server.js';
import {showAlert,debounce} from './random.js';
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
    defaultButton.addEventListener('click', debounce(()=>{
      if (randomButton.classList.contains('img-filters__button--active')|| discussedButton.classList.contains('img-filters__button--active')){
        randomButton.classList.remove('img-filters__button--active');
        discussedButton.classList.remove('img-filters__button--active');
      }
      defaultButton.classList.add('img-filters__button--active');
      cleanPictureList();
      renderPictures(pictures);
    },RERENDER_DELAY));
    randomButton.addEventListener('click', debounce(()=>{
      if (defaultButton.classList.contains('img-filters__button--active')|| discussedButton.classList.contains('img-filters__button--active')){
        defaultButton.classList.remove('img-filters__button--active');
        discussedButton.classList.remove('img-filters__button--active');
      }
      randomButton.classList.add('img-filters__button--active');
      cleanPictureList();
      const randomTenPictures=pictures.map((item) => [Math.random(), item]).sort().map((element) => element[1]).slice(0, RANDOM_PICTURE);
      renderPictures(randomTenPictures);
    }, RERENDER_DELAY));
    discussedButton.addEventListener('click',debounce(()=>{
      if (randomButton.classList.contains('img-filters__button--active')|| defaultButton.classList.contains('img-filters__button--active')){
        randomButton.classList.remove('img-filters__button--active');
        defaultButton.classList.remove('img-filters__button--active');
      }
      discussedButton.classList.add('img-filters__button--active');
      cleanPictureList();
      const comparePictures = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;
      const mostCommented = pictures.sort(comparePictures).slice(0,10);
      renderPictures(mostCommented);
    }, RERENDER_DELAY));
  },
  showAlert,
);
setEditFormSubmit(closeEditPhoto);
