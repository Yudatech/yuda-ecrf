const express = require('express');
const router = express.Router(); // eslint-disable-line

const mainController = require('../controllers/mainController');
const siteController = require('../controllers/siteController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const caseController = require('../controllers/caseController');

router.get('/', mainController.homePage);

// Router for site
router.get('/site', siteController.siteForm);
router.post('/site', siteController.createSite);

// Router for user
router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  userController.register,
  mainController.homePage
);

// Router for case
router.get('/case', caseController.caseForm);
router.get('/screening/basic', caseController.caseBasicForm);
router.get('/screening/inclusion', caseController.caseInclusionForm);
router.get('/screening/exclusion', caseController.caseExclusionForm);
router.get('/screening/disease', caseController.caseDiseaseForm);
router.get('/screening/conmed', caseController.caseConMedForm);
router.get('/screening/vitalsign', caseController.caseVitalSignForm);
router.get('/screening/lab', caseController.caseLabForm);
router.get('/screening/assistant', caseController.caseAssistantForm);
router.get('/screening/method', caseController.caseMethodForm);
router.get('/screening/region', caseController.caseRegionForm);

module.exports = router;
