// Import models
const postModel = require('../models/post.model');
const userModel = require('../models/user.model');

const UserServices = {
  createUser: async (body) => {
    try {
      const newUser = new userModel(body);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw(error);
    }
  },

  getUsers: async () => {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      throw(error);
    }
  },

  getUserDetail: async (userId) => {
    try {
      const user = await userModel.findById(userId).populate('posts');
      return user;
    } catch (error) {
      throw(error);
    }
  },

  updateUser: async (userId, body) => {
    try {
      const user = await userModel.findByIdAndUpdate(userId, body, { new: true });
      return user;
    } catch (error) {
      throw(error);
    }
  },

  deleteUser: async (userId) => {
    try {
      await postModel.deleteMany({ userId: userId });
      const user = await userModel.findByIdAndDelete(userId);
      return user;
    } catch (error) {
      throw(error);
    }
  }
}
module.exports = UserServices