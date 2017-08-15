const express = require('express');
const router = express.Router(); // eslint-disable-line

const mainController = require('../controllers/mainController');
const siteController = require('../controllers/siteController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const caseController = require('../controllers/caseController');
const screeningChecklistController = require('../controllers/screeningChecklistController');
const reviewChecklistController = require('../controllers/reviewChecklistController');
const discontinuationController = require('../controllers/discontinuationController');
const surgeryController = require('../controllers/surgeryController');
const cmController = require('../controllers/cmController');
const aeController = require('../controllers/aeController');
const saeController = require('../controllers/saeController');

router.get('/', authController.isLoggedIn, mainController.homePage);

/**
 * Router for user
 */
// show login form
router.get('/login', userController.loginForm);
// do login
router.post('/login', authController.login);
// do logout
router.get('/logout', authController.logout);
// show users table
router.get('/users', userController.usersTable);
// show form to create new user
router.get('/register', userController.registerForm);
// create new user
router.post('/user',
  userController.validateRegister,
  userController.register
);
// open user to edit
router.get('/user/:id', userController.registerForm);
// update user
router.post('/user/:id', userController.updateUser);
// remove user
router.get('/remove/user/:id', userController.removeUser);

/**
 * Router for case
 */ 
// Show create case form
router.get('/case', caseController.caseForm);
// create case
router.post('/case', caseController.uploadAcceptDoc, caseController.saveAcceptDoc, caseController.createCase);

router.get('/screening/basic/:caseId', caseController.caseBasicForm);
router.post('/screening/basic/:caseId', caseController.updateCaseBasic);

router.get('/screening/inclusion/:caseId', caseController.caseInclusionForm);
router.post('/screening/inclusion/:caseId', caseController.updateCaseInclusion);

router.get('/screening/exclusion/:caseId', caseController.caseExclusionForm);
router.post('/screening/exclusion/:caseId', caseController.updateCaseExclusion);

router.get('/screening/disease/:caseId', caseController.caseDiseaseForm);
router.post('/screening/disease/:caseId', caseController.updateCaseDisease);

router.get('/screening/conmed/:caseId', caseController.caseConMedForm);
router.post('/screening/conmed/:caseId', caseController.updateCaseConMed);

router.get('/screening/vitalsign/:caseId', caseController.caseVitalSignForm);
router.post('/screening/vitalsign/:caseId', caseController.updateCaseVitalSign);

router.get('/screening/lab/:caseId', caseController.caseLabForm);
router.post('/screening/lab/:caseId', caseController.updateCaseLab);

router.get('/screening/assistant/:caseId', caseController.caseAssistantForm);
router.post('/screening/assistant/:caseId', caseController.updateCaseAssistant);

router.get('/screening/method/:caseId', caseController.caseMethodForm);
router.post('/screening/method/:caseId', caseController.updateCaseMethod);

router.get('/screening/region/:caseId', caseController.caseRegionForm);
router.post('/screening/region/:caseId', caseController.updateCaseRegion);

router.get('/screening/dignose/:caseId', caseController.caseDignoseForm);
router.post('/screening/dignose/:caseId', caseController.updateCaseDignose);

// Router for screening-checklist
router.get('/screening-checklist/:caseId', screeningChecklistController.screeningChecklistForm);
router.post('/screening-checklist/:caseId', screeningChecklistController.updateScreeningChecklist);

// Router for review-checklist
router.get('/review-checklist/:caseId', reviewChecklistController.reviewChecklistForm);
router.post('/review-checklist/:caseId', reviewChecklistController.updateReviewChecklist);

// Router for discontinuation
router.get('/discontinuation/:caseId', discontinuationController.discontinuationForm);
router.post('/discontinuation/:caseId', discontinuationController.updateDiscontinuation);

// Router for surgery
router.get('/surgery/:caseId', surgeryController.surgeryForm);
router.post('/surgery/:caseId', surgeryController.updateSurgery);

// Router for cm
router.get('/cmlist/:caseId', cmController.cmTable);
router.get('/cm/:caseId', cmController.cmForm);
router.post('/cm/:caseId', cmController.createCm);
router.get('/cm/:caseId/:cmId', cmController.cmForm);
router.post('/cm/:caseId/:cmId', cmController.updateCm);

// Router for ae
router.get('/aelist/:caseId', aeController.aeTable);
router.get('/ae/:caseId', aeController.aeForm);
router.post('/ae/:caseId', aeController.createAe);
router.get('/ae/:caseId/:aeId', aeController.aeForm);
router.post('/ae/:caseId/:aeId', aeController.updateAe);

// Router for sae
router.get('/saelist/:caseId', saeController.saeTable);
router.get('/sae/:caseId', saeController.saeForm);
router.post('/sae/:caseId', saeController.createSae);
router.get('/sae/:caseId/:saeId', saeController.saeForm);
router.post('/sae/:caseId/:saeId', saeController.updateSae);

/**
 * Router for site
 */
// show sites table
router.get('/sites', siteController.sitesTable);
// site form to create new site
router.get('/site', siteController.siteForm);
// create new site
router.post('/site', siteController.createSite);
// open site to edit
router.get('/site/:id', siteController.siteForm);
// update site
router.post('/site/:id', siteController.updateSite);
// remove site
router.get('/remove/site/:id', siteController.removeSite);

module.exports = router;
