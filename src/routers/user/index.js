// Import framework and library
const express = require('express');

// Import controller
const UserController = require('../../controllers/user.controller');

// Import helper
const { validateBody, validateParam, schemas } = require('../../helper/validator')

// Setup Router
const router = express.Router();


router.route('/')
  .get(UserController.getUsers)
  .post(validateBody(schemas.userSchema), 
    UserController.createUser)
  
router.route('/:userId')
  .get(validateParam(schemas.idSchema, 'userId'), 
    UserController.getUserDetail)
  .put(validateParam(schemas.idSchema, 'userId'),
    validateBody(schemas.userOptionalSchema), 
    UserController.updateUser)
  .delete(validateParam(schemas.idSchema, 'userId'),
    UserController.deleteUser)

module.exports = router;