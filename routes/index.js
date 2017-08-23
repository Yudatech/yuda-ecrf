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
const screeningController = require('../controllers/screeningController');

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
router.get('/commit/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(caseController.showCaseCommitForm)
);
router.post('/commit/:caseId',
  catchErrors(authController.checkCasePermission),
  catchErrors(caseController.commitCase)
);

router.get('/overview/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.caseOverviewForm)
);

router.get('/screening-basic/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.caseBasicForm)
);
router.post('/screening-basic/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseBasic)
);

router.get('/screening-inclusion/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.caseInclusionForm)
);
router.post('/screening-inclusion/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseInclusion)
);

router.get('/screening-exclusion/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.caseExclusionForm)
);
router.post('/screening-exclusion/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseExclusion)
);

router.get('/screening-disease/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.caseDiseaseForm)
);
router.post('/screening-disease/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseDisease)
);

router.get('/screening-conmed/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.caseConMedForm)
);
router.post('/screening-conmed/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseConMed)
);

router.get('/screening-vitalsign/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.caseVitalSignForm)
);
router.post('/screening-vitalsign/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseVitalSign)
);

router.get('/screening-lab/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.caseLabForm)
);
router.post('/screening-lab/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseLab)
);

router.get('/screening-assistant/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.caseAssistantForm)
);
router.post('/screening-assistant/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseAssistant)
);

router.get('/screening-method/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.caseMethodForm)
);
router.post('/screening-method/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseMethod)
);

router.get('/screening-region/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.caseRegionForm)
);
router.post('/screening-region/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseRegion)
);

router.get('/screening-dignose/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.caseDignoseForm)
);
router.post('/screening-dignose/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseDignose)
);

// Router for screening-checklist
router.get('/screeningchecklist/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningChecklistController.screeningChecklistForm)
);
router.post('/screeningchecklist/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningChecklistController.updateScreeningChecklist)
);

// Router for review-checklist
router.get('/reviewchecklist/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(reviewChecklistController.reviewChecklistForm)
);
router.post('/reviewchecklist/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(reviewChecklistController.updateReviewChecklist)
);

// Router for discontinuation
router.get('/discontinuation/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(discontinuationController.discontinuationForm)
);
router.post('/discontinuation/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(discontinuationController.updateDiscontinuation)
);

// Router for surgery
router.get('/surgery/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(surgeryController.surgeryForm)
);
router.post('/surgery/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(surgeryController.updateSurgery)
);

// Router for cm
router.get('/cmlist/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(cmController.cmTable)
);
router.get('/cm/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(cmController.cmForm)
);
router.post('/cm/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(cmController.createCm)
);
router.get('/cm/:caseId/:cmId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(cmController.cmForm)
);
router.post('/cm/:caseId/:cmId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(cmController.updateCm)
);
router.get('/remove/cm/:caseId/:cmId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(cmController.removeCm)
);

// Router for ae
router.get('/aelist/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(aeController.aeTable)
);
router.get('/ae/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(aeController.aeForm)
);
router.post('/ae/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(aeController.createAe)
);
router.get('/ae/:caseId/:aeId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(aeController.aeForm)
);
router.post('/ae/:caseId/:aeId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(aeController.updateAe)
);
router.get('/remove/ae/:caseId/:aeId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(aeController.removeAe)
);

// Router for sae
router.get('/saelist/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(saeController.saeTable)
);
router.get('/sae/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(saeController.saeForm)
);
router.post('/sae/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(saeController.createSae)
);
router.get('/sae/:caseId/:saeId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(saeController.saeForm)
);
router.post('/sae/:caseId/:saeId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(saeController.updateSae)
);
router.get('/remove/sae/:caseId/:saeId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(saeController.removeSae)
);

// Router for visit
router.get('/visitlist/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(visitController.visitTable)
);
router.get('/visit/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(visitController.visitForm)
);
router.post('/visit/:caseId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(visitController.createVisit)
);
router.get('/visit/:caseId/:visitId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(visitController.visitForm)
);
router.post('/visit/:caseId/:visitId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(visitController.updateVisit)
);
router.get('/remove/visit/:caseId/:visitId',
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(visitController.removeVisit)
);

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
router.post('/comment/:questionId',
  catchErrors(authController.checkQuestionPermission),
  catchErrors(authController.checkQuestionStatus),
  catchErrors(questionController.addNewComment)
);
router.get('/question/:questionId',
  catchErrors(authController.checkQuestionPermission),
  catchErrors(questionController.showQuestionPage)
);
router.post('/question/:questionId',
  catchErrors(authController.checkQuestionPermission),
  catchErrors(authController.checkQuestionStatus),
  catchErrors(questionController.updateQuestion)
);

module.exports = router;
