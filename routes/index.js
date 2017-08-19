const express = require('express');
const router = express.Router(); // eslint-disable-line

const {catchErrors} = require('../handlers/errorHandlers');

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
const visitController = require('../controllers/visitController');
const questionController = require('../controllers/questionController');

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
router.get('/user/:id', catchErrors(userController.registerForm));
// update user
router.post('/user/:id', catchErrors(userController.updateUser));
// remove user
router.get('/remove/user/:id', catchErrors(userController.removeUser));

/**
 * Router for case
 */ 
// Show create case form
router.get('/case', catchErrors(caseController.caseForm));
// create case
router.post('/case',
  caseController.uploadAcceptDoc,
  catchErrors(caseController.saveAcceptDoc),
  catchErrors(caseController.createCase)
);

router.get('/overview/:caseId', catchErrors(caseController.caseOverviewForm));

router.get('/screening/basic/:caseId', catchErrors(caseController.caseBasicForm));
router.post('/screening/basic/:caseId', catchErrors(caseController.updateCaseBasic));

router.get('/screening/inclusion/:caseId', catchErrors(caseController.caseInclusionForm));
router.post('/screening/inclusion/:caseId', catchErrors(caseController.updateCaseInclusion));

router.get('/screening/exclusion/:caseId', catchErrors(caseController.caseExclusionForm));
router.post('/screening/exclusion/:caseId', catchErrors(caseController.updateCaseExclusion));

router.get('/screening/disease/:caseId', catchErrors(caseController.caseDiseaseForm));
router.post('/screening/disease/:caseId', catchErrors(caseController.updateCaseDisease));

router.get('/screening/conmed/:caseId', catchErrors(caseController.caseConMedForm));
router.post('/screening/conmed/:caseId', catchErrors(caseController.updateCaseConMed));

router.get('/screening/vitalsign/:caseId', catchErrors(caseController.caseVitalSignForm));
router.post('/screening/vitalsign/:caseId', catchErrors(caseController.updateCaseVitalSign));

router.get('/screening/lab/:caseId', catchErrors(caseController.caseLabForm));
router.post('/screening/lab/:caseId', catchErrors(caseController.updateCaseLab));

router.get('/screening/assistant/:caseId', catchErrors(caseController.caseAssistantForm));
router.post('/screening/assistant/:caseId', catchErrors(caseController.updateCaseAssistant));

router.get('/screening/method/:caseId', catchErrors(caseController.caseMethodForm));
router.post('/screening/method/:caseId', catchErrors(caseController.updateCaseMethod));

router.get('/screening/region/:caseId', catchErrors(caseController.caseRegionForm));
router.post('/screening/region/:caseId', catchErrors(caseController.updateCaseRegion));

router.get('/screening/dignose/:caseId', catchErrors(caseController.caseDignoseForm));
router.post('/screening/dignose/:caseId', catchErrors(caseController.updateCaseDignose));

// Router for screening-checklist
router.get('/screening-checklist/:caseId', catchErrors(screeningChecklistController.screeningChecklistForm));
router.post('/screening-checklist/:caseId', catchErrors(screeningChecklistController.updateScreeningChecklist));

// Router for review-checklist
router.get('/review-checklist/:caseId', catchErrors(reviewChecklistController.reviewChecklistForm));
router.post('/review-checklist/:caseId', catchErrors(reviewChecklistController.updateReviewChecklist));

// Router for discontinuation
router.get('/discontinuation/:caseId', catchErrors(discontinuationController.discontinuationForm));
router.post('/discontinuation/:caseId', catchErrors(discontinuationController.updateDiscontinuation));

// Router for surgery
router.get('/surgery/:caseId', catchErrors(surgeryController.surgeryForm));
router.post('/surgery/:caseId', catchErrors(surgeryController.updateSurgery));

// Router for cm
router.get('/cmlist/:caseId', catchErrors(cmController.cmTable));
router.get('/cm/:caseId', catchErrors(cmController.cmForm));
router.post('/cm/:caseId', catchErrors(cmController.createCm));
router.get('/cm/:caseId/:cmId', catchErrors(cmController.cmForm));
router.post('/cm/:caseId/:cmId', catchErrors(cmController.updateCm));
router.get('/remove/cm/:caseId/:cmId', catchErrors(cmController.removeCm));

// Router for ae
router.get('/aelist/:caseId', catchErrors(aeController.aeTable));
router.get('/ae/:caseId', catchErrors(aeController.aeForm));
router.post('/ae/:caseId', catchErrors(aeController.createAe));
router.get('/ae/:caseId/:aeId', catchErrors(aeController.aeForm));
router.post('/ae/:caseId/:aeId', catchErrors(aeController.updateAe));
router.get('/remove/ae/:caseId/:aeId', catchErrors(aeController.removeAe));

// Router for sae
router.get('/saelist/:caseId', catchErrors(saeController.saeTable));
router.get('/sae/:caseId', catchErrors(saeController.saeForm));
router.post('/sae/:caseId', catchErrors(saeController.createSae));
router.get('/sae/:caseId/:saeId', catchErrors(saeController.saeForm));
router.post('/sae/:caseId/:saeId', catchErrors(saeController.updateSae));
router.get('/remove/sae/:caseId/:saeId', catchErrors(saeController.removeSae));

// Router for visit
router.get('/visitlist/:caseId', catchErrors(visitController.visitTable));
router.get('/visit/:caseId', catchErrors(visitController.visitForm));
router.post('/visit/:caseId', catchErrors(visitController.createVisit));
router.get('/visit/:caseId/:visitId', catchErrors(visitController.visitForm));
router.post('/visit/:caseId/:visitId', catchErrors(visitController.updateVisit));
router.get('/remove/visit/:caseId/:visitId', catchErrors(visitController.removeVisit));

// Router for question


/**
 * Router for site
 */
// show sites table
router.get('/sites', catchErrors(siteController.sitesTable));
// site form to create new site
router.get('/site', catchErrors(siteController.siteForm));
// create new site
router.post('/site', catchErrors(siteController.createSite));
// open site to edit
router.get('/site/:id', catchErrors(siteController.siteForm));
// update site
router.post('/site/:id', catchErrors(siteController.updateSite));
// remove site
router.get('/remove/site/:id', catchErrors(siteController.removeSite));

/**
 * Router for question
 */
router.get('/new/question', catchErrors(questionController.startQuestion));
router.post('/comment/:questionId', catchErrors(questionController.addNewComment));
router.get('/question/:questionId', catchErrors(questionController.showQuestionPage));

module.exports = router;
