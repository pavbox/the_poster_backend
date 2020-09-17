'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.database = exports.mongoose = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./../service/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Connect to Database.
 * Use default nodejs promises instead.
 */

_mongoose2.default.Promise = global.Promise;

var database = _mongoose2.default.connect(_config.nconf.get('mongoose:uri'), { useMongoClient: true });

exports.mongoose = _mongoose2.default;
exports.database = database;