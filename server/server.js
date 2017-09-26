
import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import { nconf as config } from './service/config';
import FetchData from './model/FetchData';
import { database } from './model/database';

const fetchData = new FetchData();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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
app.post('/api/v1/post/:id/upload', async function (req, res) {
  const response = await fetchData.uploadImage(req.params.id, req);
  res.jsonp(response);
});


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
app.post('/api/v1/post', async function(req, res) {
  const response = await fetchData.addPost(req.body);
  res.jsonp(response);
});


/**
 * Get all posts from Database.
 * @param {String}   - URL Pattern
 * @param {Function} - middleware function for request processing.
 * @return {JSONP Object} - return JSONP response with status, code and Array of posts.
 */
app.get('/api/v1/post', async function(req, res) {
  const response = await fetchData.getPostList();
  const newresp = {
    "status": "ok",
    "body": response
  }
  console.log(response);
  res.jsonp(newresp);
});



/**
 * Get one Post from Database by Id.
 * @param {String}   - URL Pattern
 * @param {Function} - middleware function for request processing.
 * @return {JSONP Object} - return JSONP response with status, code and Array of posts.
 */
app.get('/api/v1/post/:id', async function(req, res) {
  console.log('try to get post by id');
  const response = await fetchData.getPostById(req.params.id);
  res.jsonp(response);
});


/**
 * Find and update post by Id.
 * @param {String}   - URL Pattern
 * @param {Function} - middleware function for request processing.
 * @return {JSONP Object} - return JSONP response with status, code and Array of posts.
 */
app.put('/api/v1/post/:id', async function (req, res) {
  console.log('try to update');
  const response = await fetchData.updatePostById(req.params.id, req.body);
  res.jsonp(response);
});


/**
 * Delete post from Database.
 * @param {String}   - URL Pattern
 * @param {Function} - middleware function for request processing.
 * @return {JSONP Object} - return JSONP response with status, code and Array of posts.
 */
app.delete('/api/v1/post/:id', async function (req, res) {
  console.log('try to delete');
  const response = await fetchData.deletePostById(req.params.id);
  res.jsonp(response);
});


app.get('*', function (req, res) {
  res.end('404.');
});


/**
 * Start Listen on Port. Gets settings from Config.js
 * Create Folders for images (original and thumbs).
 * @param {String}   - port number
 * @param {Function} - middleware function for request processing.
 */
app.listen(config.get('port'), () => {
  function mkdirSync(path) {
    try {
      fs.mkdirSync(path);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.log(err);
        console.log('but continue...');
      }
    }
  }

  mkdirSync(path.resolve('./upload'));
  mkdirSync(path.resolve('./upload_thumbs'));

  console.log('----------------------------------------');
  console.log('- Serving The Poster. iOS application. -');
  console.log('----------------------------------------');
});
