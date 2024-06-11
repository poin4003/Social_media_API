// Import services
const PostService = require('../services/post.service');

// Create post 
const createPost = async (req, res) => {
  const newPost = await PostService.createPost(req.body);

  return res.status(201).json({
    message: "Success: created post!",
    data: newPost
  });
}

// Get all posts
const getPosts = async (req, res, next) => {
  try {
    const posts = await PostService.getPosts();

    if (posts.length === 0) return res.status(404).json({
      message: "Error: can not find posts!"
    })

    return res.status(200).json({
      message: "Success: posts found!",
      data: posts
    })
  } catch (error) {
    next(error);
  }
}

// Get post detail
const getPostDetail = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await PostService.getPostDetail(postId);

    if (post === null) return res.status(404).json({
      message: "Error: can not find post!"
    })

    return res.status(200).json({
      message: "Success: post found!",
      data: post
    })
  } catch (error) {
    next(error);
  }
}

// Update post 
const updatePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await PostService.updatePost(postId, req.body);

    if (post === null) return res.status(404).json({
      message: "Error: can not find post!"
    })

    return res.status(200).json({
      message: "Success: udpated post!"
    })
  } catch (error) {
    next(error);
  }
}

// Delete post 
const deletePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await PostService.deletePost(postId);

    if (post === null) return res.status(404).json({
      message: "Error: can not find post!"
    })

    return res.status(200).json({
      message: "Success: deleted post!"
    })
  } catch (error) {
    next(error);
  }
}

// Export module
module.exports = {
  createPost,
  getPosts,
  getPostDetail,
  updatePost,
  deletePost
}