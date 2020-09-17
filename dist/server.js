'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./service/config');

var _FetchData = require('./model/FetchData');

var _FetchData2 = _interopRequireDefault(_FetchData);

var _database = require('./model/database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchData = new _FetchData2.default();

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

/**
 * Default blank page.
 */
app.get('/', function (req, res) {
  res.end('Serve application.');
});

/**
 * Upload source (original) image to server.
 * @param {String}   - URL Pattern
 * @param {Function} - middleware function for request processing.
 * @return {JSONP Object} - return JSONP response with status, code and Array of posts.
 */
app.post('/api/v1/post/:id/upload', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetchData.uploadImage(req.params.id, req);

          case 2:
            response = _context.sent;

            res.jsonp(response);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * Download source (original) image from server.
 * @param {String}   - URL Pattern
 * @param {Function} - middleware function for request processing.
 * @return {Binary Stream} - return file by address
 */
app.get('/api/v1/post/:id/upload', function (req, res) {
  res.download(__dirname + '/upload/' + req.params.id + '.jpeg');
});

/**
 * Download thumb image from server.
 * @param {String}   - URL Pattern
 * @param {Function} - middleware function for request processing.
 * @return {Binary Stream} - return file by address
 */
app.get('/api/v1/post/:id/upload_thumbs', function (req, res) {
  res.download(__dirname + '/upload_thumbs/' + req.params.id + '-x90.jpeg');
});

/**
 * Add new user to Database.
 * @param {String}   - URL Pattern
 * @param {Function} - middleware function for request processing.
 * @return {JSONP Object} - return JSONP response with status, code and Array of posts.
 */
app.post('/api/v1/post', function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetchData.addPost(req.body);

          case 2:
            response = _context2.sent;

            res.jsonp(response);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

/**
 * Get all posts from Database.
 * @param {String}   - URL Pattern
 * @param {Function} - middleware function for request processing.
 * @return {JSONP Object} - return JSONP response with status, code and Array of posts.
 */
app.get('/api/v1/post', function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var response, newresp;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetchData.getPostList();

          case 2:
            response = _context3.sent;
            newresp = {
              "status": "ok",
              "body": response
            };

            console.log(response);
            res.jsonp(newresp);

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

/**
 * Get one Post from Database by Id.
 * @param {String}   - URL Pattern
 * @param {Function} - middleware function for request processing.
 * @return {JSONP Object} - return JSONP response with status, code and Array of posts.
 */
app.get('/api/v1/post/:id', function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log('try to get post by id');
            _context4.next = 3;
            return fetchData.getPostById(req.params.id);

          case 3:
            response = _context4.sent;

            res.jsonp(response);

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

/**
 * Find and update post by Id.
 * @param {String}   - URL Pattern
 * @param {Function} - middleware function for request processing.
 * @return {JSONP Object} - return JSONP response with status, code and Array of posts.
 */
app.put('/api/v1/post/:id', function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    var response;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log('try to update');
            _context5.next = 3;
            return fetchData.updatePostById(req.params.id, req.body);

          case 3:
            response = _context5.sent;

            res.jsonp(response);

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

/**
 * Delete post from Database.
 * @param {String}   - URL Pattern
 * @param {Function} - middleware function for request processing.
 * @return {JSONP Object} - return JSONP response with status, code and Array of posts.
 */
app.delete('/api/v1/post/:id', function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
    var response;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log('try to delete');
            _context6.next = 3;
            return fetchData.deletePostById(req.params.id);

          case 3:
            response = _context6.sent;

            res.jsonp(response);

          case 5:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

app.get('*', function (req, res) {
  res.end('404.');
});

/**
 * Start Listen on Port. Gets settings from Config.js
 * Create Folders for images (original and thumbs).
 * @param {String}   - port number
 * @param {Function} - middleware function for request processing.
 */
app.listen(_config.nconf.get('port'), function () {
  function mkdirSync(path) {
    try {
      _fs2.default.mkdirSync(path);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.log(err);
        console.log('but continue...');
      }
    }
  }

  mkdirSync(_path2.default.resolve('./upload'));
  mkdirSync(_path2.default.resolve('./upload_thumbs'));

  console.log('----------------------------------------');
  console.log('- Serving The Poster. iOS application. -');
  console.log('----------------------------------------');
});