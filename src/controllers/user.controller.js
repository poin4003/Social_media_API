// Import services
const UserServices = require('../services/user.service');

const UserController = {
  // Create user
  createUser: async (req, res) => {
    const newUser = await UserServices.createUser(req.body);

    return res.status(201).json({
      message: "Success: created user!",
      data: newUser
    });
  },

  // Get all user
  getUsers: async (req, res, next) => {
    try {
      const users = await UserServices.getUsers();

      if (users.length === 0) return res.status(404).json({
        message: "Error: can not find users!"
      })

      return res.status(200).json({
        message: "Success: users found!",
        data: users
      });
    } catch (error) {
      next(error);
    }
  },

  // Get user by id
  getUserDetail: async (req, res, next) => {
    const { userId } = req.params;

    try {
      const user = await UserServices.getUserDetail(userId);

      if (user === null) return res.status(404).json({
        message: "Error: can not find user!"
      })

      return res.status(200).json({
        message: "Success: user found!",
        data: user
      })
    } catch (error) {
      next(error);
    }
  },

  // Update user
  updateUser: async (req, res, next) => {
    const { userId } = req.params;

    try {
      const user = await UserServices.updateUser(userId, req.body);

      if (user === null) return res.status(404).json({
        message: "Error: can not find users!"
      })

      return res.status(200).json({
        message: "Success: updated user!"
      })
    } catch (error) {
      next(error);
    }
  },

  // Delete user
  deleteUser: async (req, res, next) => {
    const { userId } = req.params;

    try {
      const user = await UserServices.deleteUser(userId);
      
      if (user === null) return res.status(404).json({
        message: "Error: can not find users!"
      })

      return res.status(200).json({
        message: "Success: deleted user!"
      })
    } catch (error) {
      next(error);
    }
  }
}

// Export module
module.exports = UserController;