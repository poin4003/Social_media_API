// Import framework and library
const express = require('express');

// Import controller
const postController = require('../../controllers/post.controller');

// Import helper
const { validateBody, validateParam, schemas } = require('../../helper/validator')

// Setup Router
const router = express.Router();

router.route('/')
  .get(postController.getPosts)
  .post(validateBody(schemas.postSchema), 
    postController.createPost)
  
router.route('/:postId')
  .get(validateParam(schemas.idSchema, 'postId'),
    postController.getPostDetail)
  .put(validateParam(schemas.idSchema, 'postId'),
    validateBody(schemas.postOptionalSchema), 
    postController.updatePost)
  .delete(validateParam(schemas.idSchema, 'postId'),
    postController.deletePost)

module.exports = router;