// Import models
const postModel = require('../models/post.model');

// Create post 
const createPost = async (req, res) => {
  const newPost = new postModel(req.body);
  await newPost.save();

  return res.status(201).json({
    message: "Success: created post!",
    data: newPost
  });
}

// Get all posts
const getPosts = async (req, res, next) => {
  try {
    const posts = await postModel.find();

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
    const post = await postModel.findById(postId);

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
    await postModel.findByIdAndUpdate(postId, req.body);

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
    await postModel.findByIdAndDelete(postId);

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