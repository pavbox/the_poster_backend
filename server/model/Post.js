

/*
 * Create Scheme for Mongo documents.
 * Returns PostModel.
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Post = new Schema({
  title:       { type: String },
  hashtag:     { type: String },
  description: { type: String },
  imageName:   { type: String }
}, {
  timestamps:  { createdAt: 'created_at' }
});

const PostModel = mongoose.model('Post', Post);

export { PostModel };
