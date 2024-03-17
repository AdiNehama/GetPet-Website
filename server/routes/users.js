var express = require("express");
var userController = require("../controllers/users/userController");
var loginController = require("../controllers/users/loginController");
const authenticate = require("../middelware/authMiddelware");
var allUsers = require("../controllers/users/allUsersContoller");
const getUserById = require("../controllers/users/getUserByIdController");
const updateUser = require("../controllers/users/updateUserController");
const refreshToken = require("../controllers/users/refreshTokensController");
const logout = require("../controllers/users/logoutController");
const google = require("../controllers/users/googleSignInController");
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users API
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


//schemas :


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         email: 'meshi1@gmail.com'
 *         password: '123456'
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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: get all users
 *     tags: [Users]
 *     description: the users get description
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The users list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/User'
 */

//
router.get("/", authenticate, allUsers.FetchAllUsers);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: register a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *       500:
 *         description: The registered users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
// Route to handle user registration
router.post("/register", userController.registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: login users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tokens'
 */

// Route to handle user login
router.post("/login", loginController.login);

/**
 * @swagger
 * /users/refreshToken:
 *   post:
 *     summary:got a new access token using the refresh token
 *     tags: [Users]
 *     description: need to provide the refresh token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *       403:
 *       401:
 *       500:
 *         description: access & refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tokens'
 */
//refresh token
router.post("/refreshToken", refreshToken.refreshToken);

/**
 * @swagger
 * /users/userId:
 *   get:
 *     summary: get a user id
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *       404:
 *       500:
 *       422:
 *         description: users id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */


//get user by uid

router.get("/:userId", authenticate, getUserById.getOneUserById);

/**
 * @swagger
 * /users/userId:
 *   put:
 *     summary: put a user id
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *       404:
 *       500:
 *       422:
 *         description: users id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tokens'
 */
//edit user information
router.put("/:userId", authenticate, updateUser.UpdateUser);


/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: logout a user
 *     tags: [Users]
 *     description: need to provide the access token in the auth header
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: logout completed successfully
 */


//logout
router.post("/logout", logout.logout);

/**
 * @swagger
 * /users/googleSignIn:
 *   post:
 *     summary: sign in throw google
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *       500:
 *         description: sign in with google
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tokens'
 */
//google sign in
router.post("/googleSignIn", google.GoogleSignIn);

module.exports = router;
