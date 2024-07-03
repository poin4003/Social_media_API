const express = require("express");
const router = express.Router();
const postController = require("../../controllers/post.controller");
const { validateBody, validateParam, schemas } = require('../../helper/validator');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewPost:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - createdOn
 *         - userId
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         createdOn:
 *           type: string
 *           description: The date the post was created
 *         userId:
 *           type: string
 *           description: The user id associated with the post
 *       example:
 *         title: A sample post
 *         content: This is the content of the post
 *         createdOn: 2023-07-03
 *         userId: 60d0fe4f5311236168a109ca
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       allOf:
 *         - $ref: '#/components/schemas/NewPost'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The auto-generated id of the post
 *           example:
 *             id: d5fE_asz
 *             title: A sample post
 *             content: This is the content of the post
 *             createdOn: 2023-07-03
 *             userId: 60d0fe4f5311236168a109ca
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
 *                 $ref: '#/components/schemas/Post'
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
 *             $ref: '#/components/schemas/NewPost'
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad Request
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
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
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
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Post not found
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
 *       204:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
router.delete("/:postId", validateParam(schemas.idSchema, 'postId'), postController.deletePost);

module.exports = router;
