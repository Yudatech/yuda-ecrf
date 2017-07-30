const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// Do work here
router.get('/', authController.isLoggedIn, mainController.homePage);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  userController.register,
  mainController.homePage
)

module.exports = router;
