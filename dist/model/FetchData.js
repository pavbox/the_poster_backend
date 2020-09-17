'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Post = require('./Post');

var _status = require('./../utils/status');

var _status2 = _interopRequireDefault(_status);

var _ImageWorker = require('./../utils/ImageWorker');

var _ImageWorker2 = _interopRequireDefault(_ImageWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FetchData = function () {
  function FetchData() {
    (0, _classCallCheck3.default)(this, FetchData);

    this.uploadImage = this.uploadImage.bind(this);

    this.addPost = this.addPost.bind(this);
    this.getPostList = this.getPostList.bind(this);
    this.getPostById = this.getPostById.bind(this);

    this.updatePostById = this.updatePostById.bind(this);
    this.deletePostById = this.deletePostById.bind(this);

    this._rootdir = _path2.default.dirname(require.main.filename);

    this.imageWorker = new _ImageWorker2.default();
  }

  /**
   * Save new post to Database.
   * Return id after and create image name as <id>.jpeg
   * @param {String} id - post id
   * @param {Object} requestEvent - request Event with user data
   * @return {undefined} - break function
   */


  (0, _createClass3.default)(FetchData, [{
    key: 'uploadImage',
    value: function uploadImage(id, requestEvent) {
      var _this = this;

      var body = '',
          header = '';
      var content_type = requestEvent.headers['content-type'];
      var boundary = content_type.split('; ')[1].split('=')[1];
      var content_length = parseInt(requestEvent.headers['content-length']);
      var headerFlag = true;
      var filename = 'unknown_uploaded';
      var filenameRegexp = /filename="(.*)"/m;

      requestEvent.on('data', function (raw) {
        var idx_i = 0;

        while (idx_i < raw.length) {
          if (headerFlag) {
            var chars = raw.slice(idx_i, idx_i + 4).toString();
            if (chars === '\r\n\r\n') {

              headerFlag = false;
              header = raw.slice(0, idx_i + 4).toString();

              var result = filenameRegexp.exec(header);
              if (result[1]) filename = result[1];
              idx_i += 4;
            } else {
              idx_i += 1;
            }
          } else {
            // parsing body include footer
            body += raw.toString('binary', idx_i, raw.length);
            idx_i = raw.length;
          }
        }
      });

      requestEvent.on('end', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // removing footer '\r\n'--boundary--\r\n' = (boundary.length + 8)
                body = body.slice(0, body.length - boundary.length);
                //await fs.writeFile(this._rootdir + '/upload/' + filename, body, 'binary');

                _context.next = 3;
                return _fs2.default.writeFile(_this._rootdir + '/upload/' + filename, body, function (err, result) {
                  if (err) console.log('error', err);else console.log('success');
                });

              case 3:
                _context.next = 5;
                return _this.imageWorker.createThumbFromSource(filename);

              case 5:
                return _context.abrupt('return');

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      })));
    }

    /**
     * Save new post to Database.
     * Return id after and create image name as <id>.jpeg
     * @param {Object} post - post object with data from frontend
     * @return {JSON Object} - return JSON response with status, code and Array of posts.
     */

  }, {
    key: 'addPost',
    value: function addPost(post) {
      var postModel = new _Post.PostModel({
        title: post.title,
        description: post.description,
        hashtag: post.hashtag,
        imageName: post.imageName
      });

      return postModel.save().then(function (createdPost) {
        // gets id and create imageName
        var query = { _id: createdPost._id };
        var update = { "$set": { imageName: createdPost._id + '.jpeg' }

          // use model for update (not variable)
        };_Post.PostModel.update(query, update, function () {
          console.log('updated');
        });
        return (0, _status2.default)('success', 'add', [createdPost]);
      });
    }

    /**
     * Find and update post by id.
     * @param {String} id - post id
     * @param {String} requestBody - post object with data from frontend
     * @return {JSON Object} - return JSON response with status, code and Array of posts.
     */

  }, {
    key: 'updatePostById',
    value: function updatePostById(id, requestBody) {

      var post = {
        _id: id,
        title: requestBody.title,
        description: requestBody.description,
        hashtag: requestBody.hashtag,
        imageName: id + '.jpeg'
      };

      var query = { _id: id };
      var update = { "$set": post };
      _Post.PostModel.update(query, update, function (err) {
        if (err) return (0, _status2.default)('errorUser', 'notfound');
      });

      return (0, _status2.default)('success', 'add', [post]);
    }

    /**
     * Get all posts from Database.
     * @return {JSON Object} - return JSON response with status, code and Array of posts.
     */

  }, {
    key: 'getPostList',
    value: function getPostList() {
      return _Post.PostModel.find(function (err, posts) {
        return !err ? (0, _status2.default)('success', 'get', posts) : (0, _status2.default)('errorServer', 'errorServer');
      });
    }

    /**
     * Find and return Post by id.
     * @param {String} id - post id
     * @return {JSON Object} - return JSON response with status, code and Array of posts.
     */

  }, {
    key: 'getPostById',
    value: function getPostById(id) {
      return _Post.PostModel.findById(id, function (err, post) {
        if (!post) return (0, _status2.default)('errorUser', 'notfound');
        return !err ? (0, _status2.default)('success', 'get', post) : (0, _status2.default)('errorServer', 'errorServer');
      });
    }

    /**
     * Remove post from database and remove images from folders
     * @param {image} id - identifier of Post in database.
     * @return {JSONP Object} - return JSON response with status, code and Array of posts.
     */

  }, {
    key: 'deletePostById',
    value: function deletePostById(id) {
      var _this2 = this;

      return _Post.PostModel.findById(id, function (err, post) {
        if (!post) return (0, _status2.default)('errorUser', 'notfound');

        return post.remove(function (err) {
          if (!err) {
            if (post.imageName.length > 0) {
              _this2.imageWorker.removeByUrl(_this2._rootdir + '/upload/' + post.imageName + '.jpeg');
            }
            return (0, _status2.default)('success', 'delete');
          } else {
            return (0, _status2.default)('errorServer', 'errorServer');
          }
        });
      });
    }
  }]);
  return FetchData;
}();
/**
 * Network manager.
 * Fetch Data and compute.
 */

exports.default = FetchData;