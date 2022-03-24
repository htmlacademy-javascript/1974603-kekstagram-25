import {createPhotoObjects} from './photo.js';
import {renderPictures} from './picture.js';
import {initPhotoForm} from './edit-picture-form.js';
import{openWindow} from './full-picture.js';

const pictures = createPhotoObjects();
renderPictures(pictures);
initPhotoForm();
openWindow();

