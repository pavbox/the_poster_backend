
/**
 * All methods for work with images.
 * Images has name in form: <ObjectId>.jpeg
 */

import fs from 'fs';
import path from 'path';
import Thumbnail from 'thumbnail';


class ImageWorker {
  constructor() {
    this.removeByUrl = this.removeByUrl.bind(this);
    this.createThumbFromSource = this.createThumbFromSource.bind(this);
    this._rootdir = path.dirname(require.main.filename);
  }

  /**
   * Create Thumb image from source_image.
   * @param {String} source_image - path to source_image at /upload folder
   */
  createThumbFromSource(source_image) {
    var thumbnail = new Thumbnail(
      this._rootdir + '/upload',
      this._rootdir + '/upload_thumbs'
    );

    thumbnail.ensureThumbnail(source_image, null, 90, function (err, filename) {
      console.log(err);
	    console.log(`${filename} thumb created!`);
    });
  }


  /**
   * Remove images: large and thumb.
   * @param {String} imageURL - relative path to large image folder /upload/<img.name>
   */
  removeByUrl(imageURL) {
    let imageURL_thumb = imageURL.replace('/upload/', '/upload_thumbs/');

    fs.unlink(imageURL, (err) => {
      if (!err)
        console.log('image successfully deleted ' + path.basename(imageURL));
    });

    // FIXME: unflexible usage
    fs.unlink(`${imageURL_thumb.replace('.jpeg', '-x90.jpeg')}`, (err) => {
      if (!err)
        console.log('thumb successfully deleted ' + path.basename(imageURL_thumb));
    });
  }
}

export default ImageWorker;
