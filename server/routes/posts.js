var express = require('express');
const authenticate = require('../middelware/authMiddelware');
const allPosts = require('../controllers/posts/getAllPostsController');
const postByUid = require('../controllers/posts/postsByUidController');
const newPost = require('../controllers/posts/uploadPostController');
const updateMyPost = require('../controllers/posts/updateMyPostController');
var deletePost = require('../controllers/posts/deletePostController');

var router = express.Router();

//get all posts
router.get('/', authenticate, allPosts.FetchAllPosts); 

//get app posts by uid
router.get('/:userId', authenticate, postByUid.FetchPostsByUid);

//post a new post
router.post('/', authenticate, newPost.UploadPost);

//update post
router.put('/:postId', authenticate, updateMyPost.UpdateMyPost);

//delete post
router.delete('/:postId', authenticate, deletePost.DeletePost);


module.exports = router;