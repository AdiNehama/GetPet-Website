var express = require('express');
var userController = require('../controllers/users/userController');
var loginController = require('../controllers/users/loginController');
const authenticate = require('../middelware/authMiddelware')
var allUsers = require('../controllers/users/allUsersContoller');
const getUserById = require('../controllers/users/getUserByIdController');
const updateUser = require('../controllers/users/updateUserController');
const refreshToken = require('../controllers/users/refreshTokensController');
const logout = require('../controllers/users/logoutController');


var router = express.Router();

/* GET users listing. */
router.get('/',authenticate, allUsers.FetchAllUsers);
// Route to handle user registration
router.post('/register', userController.registerUser);
// Route to handle user login
router.post('/login', loginController.login);
//refresh token
router.post('/refreshToken', refreshToken.refreshToken);
//get user by uid
router.get('/:userId',authenticate, getUserById.getOneUserById); 
//edit user information
router.put('/:userId',authenticate, updateUser.UpdateUser);
//logout
router.post('/logout', logout.logout);








module.exports = router;
