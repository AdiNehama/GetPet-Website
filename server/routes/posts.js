var express = require("express");
const authenticate = require("../middelware/authMiddelware");
const allPosts = require("../controllers/posts/getAllPostsController");
const postByUid = require("../controllers/posts/postsByUidController");
const newPost = require("../controllers/posts/uploadPostController");
const updateMyPost = require("../controllers/posts/updateMyPostController");
var deletePost = require("../controllers/posts/deletePostController");
const postByPostId = require("../controllers/posts/getPostByPostIdController");

var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts API
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

//schema

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - userId
 *         - ownerName
 *         - image
 *         - kind
 *         - birthDate
 *         - about
 *         - phone
 *         - location
 *       properties:
 *         userId:
 *           type: string
 *           description: The user id
 *         ownerName:
 *           type: string
 *           description: The owner name
 *         image:
 *           type: string
 *           description: The dog picture
 *         kind:
 *           type: string
 *           description: The dog kind
 *         birthDate:
 *           type: string
 *           description: The dog birthdate
 *         about:
 *           type: string
 *           description: The dog discription
 *         phone:
 *           type: string
 *           description: The owners phone
 *         location:
 *           type: string
 *           description: The dogs location
 *       example:
 *           userId: '65ea29fc58870fbcf56abfaf'
 *           ownerName: 'maya'
 *           image: '1710243749001aboutImg.jpeg'
 *           kind: 'poodel'
 *           birthDate: '2/2/2021'
 *           about: 'cute and loud12'
 *           phone: '0544460415'
 *           location: 'tel aviv'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tokens:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *       properties:
 *         accessToken:
 *           type: string
 *           description: The JWT access token
 *         refreshToken:
 *           type: string
 *           description: The JWT refresh token
 *       example:
 *         accessToken: '123cd123x1xx1'
 *         refreshToken: '134r2134cr1x3c'
 */

//swagger's requests:

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: get all posts
 *     tags: [Posts]
 *     description: the posts get description
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The posts list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Post'
 */

//get all posts
router.get("/", authenticate, allPosts.FetchAllPosts);

/**
 * @swagger
 * /posts/:userId:
 *   get:
 *     summary: get all posts by user id
 *     tags: [Posts]
 *     description: the posts uid get description
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user id that have a post list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Tokens'
 */

//get app posts by uid
router.get("/:userId", authenticate, postByUid.FetchPostsByUid);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: upload a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tokens'
 */

//post a new post
router.post("/", authenticate, newPost.UploadPost);

/**
 * @swagger
 * /posts/:postId:
 *   put:
 *     summary: post id
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tokens'
 */

//update post
router.put("/:postId", authenticate, updateMyPost.UpdateMyPost);

/**
 * @swagger
 * /posts/:postId:
 *   delete:
 *     summary: delete post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tokens'
 */
//delete post
router.delete("/:postId", authenticate, deletePost.DeletePost);

/**
 * @swagger
 * /posts/:userId:
 *   get:
 *     summary: get post by post id
 *     tags: [Posts]
 *     description: the posts id get description
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The post id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tokens'
 */

//get post by post id
router.get("/postbyid/:postId", authenticate, postByPostId.getPostByPostId);

module.exports = router;
