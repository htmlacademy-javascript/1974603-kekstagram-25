import {renderPictures} from './picture.js';
//import {initPhotoForm} from './edit-picture-form.js';
import {initScale, initFilters} from './effects-scale.js';
import {setEditFormSubmit} from './edit-picture-form.js';
import {closeEditPhoto} from './edit-picture-form.js';
import{getData} from './server.js';


initScale();
initFilters();

getData((pictures)=>{
  renderPictures(pictures);
});
setEditFormSubmit(closeEditPhoto);
