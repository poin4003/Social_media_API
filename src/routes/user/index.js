const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const { validateBody, validateParam, schemas } = require('../../helper/validator');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: number
 *           description: The role of the user
 *         posts:
 *           type: array
 *           items:
 *             type: string
 *       example:
 *         id: d5fE_asz
 *         name: Nguyễn Lê Anh Huy
 *         email: pchuy4003@gmail.com
 *         password: 123456
 *         role: 1
 *         posts: []
 */

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Retrieves a list of users
 *     tags: [Users]
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
router.get('/', UserController.getUsers);

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 */
router.post('/', validateBody(schemas.userSchema), UserController.createUser);

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [Users]
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
 *       404:
 *         description: User not found
 */
router.get('/:userId', validateParam(schemas.idSchema, 'userId'), UserController.getUserDetail);

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 */
router.put('/:userId', validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userOptionalSchema), UserController.updateUser);

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:userId', validateParam(schemas.idSchema, 'userId'), UserController.deleteUser);

module.exports = router;
