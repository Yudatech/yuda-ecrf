const express = require('express');
const router = express.Router(); // eslint-disable-line

const mainController = require('../controllers/mainController');
const siteController = require('../controllers/siteController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.get('/', mainController.homePage);

// Router for site
router.get('/site', siteController.siteForm);
router.post('/site', siteController.createSite);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  userController.register,
  mainController.homePage
);

module.exports = router;
