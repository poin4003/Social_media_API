const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 * /api/v1/user:
 *   get:
 *     summary: Endpoint for user-related operations
 *     tags: 
 *       - User
 *     responses:
 *       200:
 *         description: Successful response
 * 
 * tags:
 *   name: Post
 *   description: Post management
 * /api/v1/post:
 *   get:
 *     summary: Endpoint for post-related operations
 *     tags:
 *       - Post
 *     responses:
 *       200:
 *         description: Successful response
 */

router.use('/api/v1/user', require('./user/index'));
router.use('/api/v1/post', require('./post/index'));

module.exports = router;

