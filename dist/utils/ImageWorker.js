'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _thumbnail = require('thumbnail');

var _thumbnail2 = _interopRequireDefault(_thumbnail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageWorker = function () {
  function ImageWorker() {
    (0, _classCallCheck3.default)(this, ImageWorker);

    this.removeByUrl = this.removeByUrl.bind(this);
    this.createThumbFromSource = this.createThumbFromSource.bind(this);
    this._rootdir = _path2.default.dirname(require.main.filename);
  }

  /**
   * Create Thumb image from source_image.
   * @param {String} source_image - path to source_image at /upload folder
   */


  (0, _createClass3.default)(ImageWorker, [{
    key: 'createThumbFromSource',
    value: function createThumbFromSource(source_image) {
      var thumbnail = new _thumbnail2.default(this._rootdir + '/upload', this._rootdir + '/upload_thumbs');

      thumbnail.ensureThumbnail(source_image, null, 90, function (err, filename) {
        console.log(err);
        console.log(filename + ' thumb created!');
      });
    }

    /**
     * Remove images: large and thumb.
     * @param {String} imageURL - relative path to large image folder /upload/<img.name>
     */

  }, {
    key: 'removeByUrl',
    value: function removeByUrl(imageURL) {
      var imageURL_thumb = imageURL.replace('/upload/', '/upload_thumbs/');

      _fs2.default.unlink(imageURL, function (err) {
        if (!err) console.log('image successfully deleted ' + _path2.default.basename(imageURL));
      });

      // FIXME: unflexible usage
      _fs2.default.unlink('' + imageURL_thumb.replace('.jpeg', '-x90.jpeg'), function (err) {
        if (!err) console.log('thumb successfully deleted ' + _path2.default.basename(imageURL_thumb));
      });
    }
  }]);
  return ImageWorker;
}();
/**
 * All methods for work with images.
 * Images has name in form: <ObjectId>.jpeg
 */

exports.default = ImageWorker;