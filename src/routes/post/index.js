const express = require("express");
const router = express.Router();
const postController = require("../../controllers/post.controller");
const { validateBody, validateParam, schemas } = require('../../helper/validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - userId
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           format: objectid
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         userId:
 *           type: string
 *           format: objectid
 *           description: The ID of the user who created the blog post
 *         category:
 *           type: string
 *           enum:
 *             - Technology
 *             - Travel
 *             - Food
 *             - Fashion
 *             - Health
 *           description: The category of the post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the blog post was created
 *           example: 2024-06-28T14:20:00Z
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         title: Introduction to Swagger
 *         content: This is a blog post about how to use Swagger in your project.
 *         category: Technology
 *         userId: 60d0fe4f5311236168a109cb
 *         createdAt: 2024-06-28T14:20:00Z
 */

/**
 * @swagger
 * /api/v1/post:
 *   get:
 *     summary: Retrieves a list of posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 */
router.get("/", postController.getPosts);

/**
 * @swagger
 * /api/v1/post:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post("/", validateBody(schemas.postSchema), postController.createPost);

/**
 * @swagger
 * /api/v1/post/{postId}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: A post object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 */
router.get("/:postId", validateParam(schemas.idSchema, 'postId'), postController.getPostDetail);

/**
 * @swagger
 * /api/v1/post/{postId}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 */
router.put("/:postId", validateParam(schemas.idSchema, 'postId'), validateBody(schemas.postOptionalSchema), postController.updatePost);

/**
 * @swagger
 * /api/v1/post/{postId}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 */
router.delete("/:postId", validateParam(schemas.idSchema, 'postId'), postController.deletePost);

module.exports = router;
