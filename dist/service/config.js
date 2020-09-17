'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nconf = undefined;

var _nconf = require('nconf');

var _nconf2 = _interopRequireDefault(_nconf);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nconf2.default.defaults({
  "port": "3020",
  "mongoose": {
    "uri": "mongodb://localhost/real_poster"
  }
});

exports.nconf = _nconf2.default;