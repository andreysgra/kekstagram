import {renderGallery} from './gallery';
import {getPictures} from './data';
import {initImageForm} from './upload-image-form';

const PICTURES_COUNT = 25;

renderGallery(getPictures(PICTURES_COUNT));

initImageForm();
