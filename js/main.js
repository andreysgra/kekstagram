import {renderGallery} from './gallery';
import {getPictures} from './data';

const PICTURES_COUNT = 25;

renderGallery(getPictures(PICTURES_COUNT));

