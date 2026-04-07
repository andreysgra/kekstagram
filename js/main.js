import {renderGallery} from './gallery';
import {initImageForm} from './upload-image-form';
import {getData} from './api';
import {loadFailMessage} from './messages';

getData(renderGallery, loadFailMessage)
  .then(initImageForm());
