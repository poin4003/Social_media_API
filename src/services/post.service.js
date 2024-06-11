// Import models
const postModel = require('../models/post.model');
const userModel = require('../models/user.model')

const PostService = {
  createPost: async (body) => {
    try {
      const newPost = new postModel(body);
      const foundUser = await userModel.findById(newPost.userId);
      foundUser.posts.push(newPost._id);
      await foundUser.save();
      await newPost.save();
      return newPost;
    } catch (error) {
      throw error;
    }
  },

  getPosts: async () => {
    try {
      const posts = await postModel.find();
      return posts;
    } catch (error) {
      throw error;
    }
  },

  getPostDetail: async (postId) => {
    try {
      const post = await postModel.findById(postId).populate('userId');
      return post;
    } catch (error) {
      throw error;
    }
  },

  updatePost: async (postId, body) => {
    try {
      const post = await postModel.findByIdAndUpdate(postId, body);
      return post;
    } catch (error) {
      throw error;
    }
  },

  deletePost: async (postId) => {
    try {
      const post = await postModel.findByIdAndDelete(postId);
      return post;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostService;