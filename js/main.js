import {createPhotoObjects} from './photo.js';
import {renderPictures} from './picture.js';
const pictures = createPhotoObjects();
renderPictures(pictures);
const lengthString=(checkString, maxLength) => checkString <= maxLength;
lengthString();

