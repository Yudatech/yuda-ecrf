const express = require('express');
const router = express.Router(); // eslint-disable-line

const mainController = require('../controllers/mainController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// Do work here
router.get('/', mainController.homePage);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  userController.register,
  mainController.homePage
);

module.exports = router;
