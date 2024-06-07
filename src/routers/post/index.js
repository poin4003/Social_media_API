// Import framework and library
const express = require('express');

// Import controller
const postController = require('../../controllers/post.controller');

// Setup Router
const router = express.Router();

router.route('/')
  .get(postController.getPosts)
  .post(postController.createPost)
  
router.route('/:postId')
  .get(postController.getPostDetail)
  .put(postController.updatePost)
  .delete(postController.deletePost)

module.exports = router;