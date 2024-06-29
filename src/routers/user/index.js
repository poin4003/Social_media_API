// Import framework and library
const express = require('express');

// Import controller
const UserController = require('../../controllers/user.controller');

// Import helper
const { validateBody, validateParam, schemas } = require('../../helper/validator')

// Setup Router
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - age
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         age:
 *           type: integer
 *           description: The age of the user
 *       example:
 *         id: 1
 *         name: John Doe
 *         age: 25
 */

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Retrieves a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.route('/')
  .get(UserController.getUsers)
  .post(validateBody(schemas.userSchema), 
    UserController.createUser);

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.route('/:userId')
  .get(validateParam(schemas.idSchema, 'userId'), 
    UserController.getUserDetail)
  .put(validateParam(schemas.idSchema, 'userId'),
    validateBody(schemas.userOptionalSchema), 
    UserController.updateUser)
  .delete(validateParam(schemas.idSchema, 'userId'),
    UserController.deleteUser);

module.exports = router;
