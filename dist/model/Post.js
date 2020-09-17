'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

/*
 * Create Scheme for Mongo documents.
 * Returns PostModel.
 */

var Post = new Schema({
  title: { type: String },
  hashtag: { type: String },
  description: { type: String },
  imageName: { type: String }
}, {
  timestamps: { createdAt: 'created_at' }
});

var PostModel = _mongoose2.default.model('Post', Post);

exports.PostModel = PostModel;