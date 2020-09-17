
/**
 * Network manager.
 * Fetch Data and compute.
 */

import fs from 'fs';
import path from 'path';

import { PostModel } from './Post';
import createStatus from './../utils/status';
import ImageWorker from './../utils/ImageWorker';

class FetchData {
  constructor() {
    this.uploadImage = this.uploadImage.bind(this);

    this.addPost = this.addPost.bind(this);
    this.getPostList = this.getPostList.bind(this);
    this.getPostById = this.getPostById.bind(this);

    this.updatePostById = this.updatePostById.bind(this);
    this.deletePostById = this.deletePostById.bind(this);

    this._rootdir = path.dirname(require.main.filename);

    this.imageWorker = new ImageWorker();
  }

  /**
   * Save new post to Database.
   * Return id after and create image name as <id>.jpeg
   * @param {String} id - post id
   * @param {Object} requestEvent - request Event with user data
   * @return {undefined} - break function
   */
   async uploadImage(id, request) {
     await this.imageWorker.createThumbFromSource(request.files[0].filename);
   }

  /**
   * Save new post to Database.
   * Return id after and create image name as <id>.jpeg
   * @param {Object} post - post object with data from frontend
   * @return {JSON Object} - return JSON response with status, code and Array of posts.
   */
  addPost(post) {
    const postModel = new PostModel({
      title:       post.title,
      description: post.description,
      hashtag:     post.hashtag,
      imageName:   post.imageName
    });

    return postModel.save()
      .then((createdPost) => {
        // gets id and create imageName
        let query  = { _id: createdPost._id }
        let update = {"$set": { imageName: `${createdPost._id}.jpeg` } }

        // use model for update (not variable)
        PostModel.update(query, update, () => { console.log('updated'); })
        return createStatus('success', 'add', [createdPost])
      });
  }


  /**
   * Find and update post by id.
   * @param {String} id - post id
   * @param {String} requestBody - post object with data from frontend
   * @return {JSON Object} - return JSON response with status, code and Array of posts.
   */
  updatePostById(id, requestBody) {

    let post = {
      _id: id,
      title:       requestBody.title,
      description: requestBody.description,
      hashtag:     requestBody.hashtag,
      imageName:   `${id}.jpeg`,
    };

    let query  = { _id: id }
    let update = { "$set": post };
    PostModel.update(query, update, (err) => {
      if (err) return createStatus('errorUser', 'notfound');
    })

    return createStatus('success', 'add', [post])
  }


  /**
   * Get all posts from Database.
   * @return {JSON Object} - return JSON response with status, code and Array of posts.
   */
  getPostList() {
    return PostModel.find((err, posts) => {
      return (!err) ? createStatus('success', 'get', posts)
                    : createStatus('errorServer', 'errorServer');
    })
  }


  /**
   * Find and return Post by id.
   * @param {String} id - post id
   * @return {JSON Object} - return JSON response with status, code and Array of posts.
   */
  getPostById(id) {
    return PostModel.findById(id, (err, post) => {
      if (!post) return createStatus('errorUser', 'notfound');
      return (!err) ? createStatus('success', 'get', post)
                    : createStatus('errorServer', 'errorServer');
    });
  }


  /**
   * Remove post from database and remove images from folders
   * @param {image} id - identifier of Post in database.
   * @return {JSONP Object} - return JSON response with status, code and Array of posts.
   */
  deletePostById(id) {
    return PostModel.findById(id, (err, post) => {
      if(!post) return createStatus('errorUser', 'notfound');

      return post.remove((err) => {
        if (!err) {
          if (post.imageName.length > 0) {
            this.imageWorker.removeByUrl(`${this._rootdir}/upload/${post.imageName}.jpeg`);
          }
          return createStatus('success', 'delete');
        } else {
          return createStatus('errorServer', 'errorServer');
        }
      });
    });
  }
}




export default FetchData;
