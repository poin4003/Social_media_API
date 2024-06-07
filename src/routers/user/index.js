// Import framework and library
const express = require('express');

// Import controller
const userController = require('../../controllers/user.controller');

// Setup Router
const router = express.Router();


router.route('/')
  .get(userController.getUsers)
  .post(userController.createUser)
  
router.route('/:userId')
  .get(userController.getUserDetail)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router;