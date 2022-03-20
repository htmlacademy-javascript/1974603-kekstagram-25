import {createPhotoObjects} from './photo.js';
import {renderPictures} from './picture.js';
import {initPhotoForm} from './edit-picture-form.js';
const pictures = createPhotoObjects();
renderPictures(pictures);
initPhotoForm();


