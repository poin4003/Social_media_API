// Import models
const userModel = require('../models/user.model');

// Create user
const createUser = async (req, res) => {
  const newUser = new userModel(req.body);
  await newUser.save();

  return res.status(201).json({
    message: "Success: created user!",
    data: newUser
  });
}

// Get all user
const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();

    return res.status(200).json({
      message: "Success: users found!",
      data: users
    });
  } catch (error) {
    next(error);
  }
}

// Get user by id
const getUserDetail = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId);

    return res.status(200).json({
      message: "Success: user found!",
      data: user
    })
  } catch (error) {
    next(error);
  }
}

// Update user
const updateUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    await userModel.findByIdAndUpdate(userId, req.body);

    return res.status(200).json({
      message: "Success: updated user!"
    })
  } catch (error) {
    next(error);
  }
}

// Delete user
const deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    await userModel.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "Success: deleted user!"
    })
  } catch (error) {
    next(error);
  }
}

// Export module
module.exports = {
  createUser,
  getUsers,
  getUserDetail,
  updateUser,
  deleteUser
}