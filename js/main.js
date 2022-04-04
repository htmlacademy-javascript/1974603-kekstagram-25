import {renderPictures} from './picture.js';
//import {initPhotoForm} from './edit-picture-form.js';
import {initScale, initFilters} from './effects-scale.js';
import {setEditFormSubmit} from './edit-picture-form.js';
import {closeEditPhoto} from './edit-picture-form.js';
import{getData} from './server.js';
import { showAlert } from './random.js';


initScale();
initFilters();

getData(
  renderPictures,
  showAlert,
);
setEditFormSubmit(closeEditPhoto);
