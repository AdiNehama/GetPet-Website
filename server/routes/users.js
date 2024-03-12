var express = require('express');
var userController = require('../controllers/users/userController');
var loginController = require('../controllers/users/loginController');
const authenticate = require('../middelware/authMiddelware')
var allUsers = require('../controllers/users/allUsersContoller');


var router = express.Router();

/* GET users listing. */
router.get('/',authenticate, allUsers.FetchAllUsers);
// Route to handle user registration
router.post('/register', userController.registerUser);
// Route to handle user login
router.post('/login', loginController.login);
//logout route






module.exports = router;
