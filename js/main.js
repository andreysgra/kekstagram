import {renderGallery} from './gallery.js';
import {initImageForm} from './upload-image-form.js';
import {getData} from './api.js';
import {loadFailMessage} from './messages.js';

getData(renderGallery, loadFailMessage)
  .then(initImageForm());
