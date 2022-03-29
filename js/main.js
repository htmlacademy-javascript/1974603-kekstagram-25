import {createPhotoObjects} from './photo.js';
import {renderPictures} from './picture.js';
import {initPhotoForm} from './edit-picture-form.js';
import {initScale, initFilters} from './effects-scale.js';

const pictures = createPhotoObjects();
renderPictures(pictures);
initPhotoForm();
initScale();
initFilters();

