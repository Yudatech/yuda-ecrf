const express = require('express');
const router = express.Router(); // eslint-disable-line

const { catchErrors } = require('../handlers/errorHandlers');

const mainController = require('../controllers/mainController');
const siteController = require('../controllers/siteController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const caseController = require('../controllers/caseController');
const reviewChecklistController = require('../controllers/reviewChecklistController');
const discontinuationController = require('../controllers/discontinuationController');
const surgeryController = require('../controllers/surgeryController');
const aeController = require('../controllers/aeController');
const saeController = require('../controllers/saeController');
const visitController = require('../controllers/visitController');
const questionController = require('../controllers/questionController');
const screeningController = require('../controllers/screeningController');
const lifeAssessmentController = require('../controllers/lifeAssessmentController');
const evacuationController = require('../controllers/evacuationController');
const pathologicalController = require('../controllers/pathologicalController');

router.get('/', authController.isLoggedIn, mainController.homePage);

router.get('/search',
  authController.isLoggedIn,
  catchErrors(mainController.searchPage)
);

/**
 * Router for user
 */
// show login form
router.get('/login', userController.loginForm);
// do login
router.post('/login', authController.login);
// do logout
router.get('/logout', authController.isLoggedIn, authController.logout);
// show users table
router.get('/users', authController.isLoggedIn, userController.usersTable);
// show form to create new user
router.get('/register', authController.isLoggedIn, userController.registerForm);
// create new user
router.post('/user',
  authController.isLoggedIn,
  userController.validateRegister,
  userController.register
);
// open user to edit
router.get('/user/:id',
  authController.isLoggedIn,
  catchErrors(userController.registerForm)
);
// update user
router.post('/user/:id',
  authController.isLoggedIn,
  catchErrors(userController.updateUser)
);
// remove user
router.get('/remove/user/:id',
  authController.isLoggedIn,
  catchErrors(userController.removeUser)
);
// set user language
router.get('/set/userlang/:lang',
  authController.isLoggedIn,
  catchErrors(userController.setUserLang)
);

/**
 * Router for case
 */
// Show create case form
router.get('/case',
  authController.isLoggedIn,
  catchErrors(caseController.caseForm)
);
// create case
router.post('/case',
  authController.isLoggedIn,
  caseController.uploadAcceptDoc,
  catchErrors(caseController.saveAcceptDoc),
  catchErrors(caseController.createCase)
);
router.post('/upload/acceptdoc/:caseId',
  authController.isLoggedIn,
  caseController.uploadAcceptDoc,
  catchErrors(caseController.saveAcceptDoc),
  catchErrors(caseController.updateAcceptDoc)
);

router.get('/remove/case/:caseId',
  authController.isLoggedIn,
  catchErrors(caseController.removeCase)
);

router.get('/commit/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(caseController.showCaseCommitForm)
);
router.post('/commit/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCasePermission),
  catchErrors(caseController.commitCase)
);

router.get('/audit/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(caseController.showAuditCaseForm)
);

router.post('/audit/:caseId',
  authController.isLoggedIn,
  catchErrors(caseController.auditCase)
);

router.get('/lock/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(caseController.showLockCaseForm)
);

router.post('/lock/:caseId',
  authController.isLoggedIn,
  catchErrors(caseController.lockCase)
);

router.get('/overview/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.caseOverviewForm)
);

router.get('/screening-basic/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(screeningController.caseBasicForm)
);
router.post('/screening-basic/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseBasic)
);

router.get('/screening-inclusion/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(screeningController.caseInclusionForm)
);
router.post('/screening-inclusion/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseInclusion)
);

router.get('/screening-exclusion/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(screeningController.caseExclusionForm)
);
router.post('/screening-exclusion/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseExclusion)
);

router.get('/screening-prioradiationtherapy/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(screeningController.casePrioRadiationTherapyForm)
);
router.post('/screening-prioradiationtherapy/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCasePrioRadiationTherapy)
);

router.get('/screening-method/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(screeningController.caseMethodForm)
);
router.post('/screening-method/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseMethod)
);

router.get('/screening-region/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(screeningController.caseRegionForm)
);
router.post('/screening-region/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseRegion)
);

router.get('/screening-dignose/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(screeningController.caseDignoseForm)
);
router.post('/screening-dignose/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(screeningController.updateCaseDignose)
);

// Router for review-checklist
router.get('/reviewchecklist/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(reviewChecklistController.reviewChecklistForm)
);
router.post('/reviewchecklist/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(reviewChecklistController.updateReviewChecklist)
);

// Router for discontinuation
router.get('/discontinuation/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(discontinuationController.discontinuationForm)
);
router.post('/discontinuation/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(discontinuationController.updateDiscontinuation)
);

// Router for surgery
router.get('/surgery/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(surgeryController.surgeryForm)
);
router.post('/surgery/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(surgeryController.updateSurgery)
);

// Router for life quality
router.get('/life/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(lifeAssessmentController.lifeAssessmentForm)
);
router.post('/life/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(lifeAssessmentController.updateLifeAssessment)
);

// Router for evacuation
router.get('/evacuation/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(evacuationController.evacuationForm)
);
router.post('/evacuation/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(evacuationController.updateEvacuation)
);

// Router for pathological
router.get('/pathological/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(pathologicalController.pathologicalForm)
);
router.post('/pathological/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(pathologicalController.updatePathological)
);

// Router for ae
router.get('/aelist/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(aeController.aeTable)
);
router.get('/ae/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(aeController.aeForm)
);
router.post('/ae/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(aeController.createAe)
);
router.get('/ae/:caseId/:aeId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(aeController.aeForm)
);
router.post('/ae/:caseId/:aeId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(aeController.updateAe)
);
router.get('/remove/ae/:caseId/:aeId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(aeController.removeAe)
);

// Router for sae
router.get('/saelist/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(saeController.saeTable)
);
router.get('/sae/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(saeController.saeForm)
);
router.post('/sae/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(saeController.createSae)
);
router.get('/sae/:caseId/:saeId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(saeController.saeForm)
);
router.post('/sae/:caseId/:saeId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(saeController.updateSae)
);
router.get('/remove/sae/:caseId/:saeId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(saeController.removeSae)
);

// Router for visit
router.get('/visitlist/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(visitController.visitTable)
);
router.get('/visit/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(visitController.visitForm)
);
router.post('/visit/:caseId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(visitController.createVisit)
);
router.get('/visit/:caseId/:visitId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(questionController.checkQuestionedFields),
  catchErrors(visitController.visitForm)
);
router.post('/visit/:caseId/:visitId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(visitController.updateVisit)
);
router.get('/remove/visit/:caseId/:visitId',
  authController.isLoggedIn,
  catchErrors(authController.checkCaseStatus),
  catchErrors(authController.checkCasePermission),
  catchErrors(visitController.removeVisit)
);

// Router for question


/**
 * Router for site
 */
// show sites table
router.get('/sites',
  authController.isLoggedIn,
  catchErrors(siteController.sitesTable)
);
// site form to create new site
router.get('/site',
  authController.isLoggedIn,
  catchErrors(siteController.siteForm)
);
// create new site
router.post('/site',
  authController.isLoggedIn,
  catchErrors(siteController.createSite)
);
// open site to edit
router.get('/site/:id',
  authController.isLoggedIn,
  catchErrors(siteController.siteForm)
);
// update site
router.post('/site/:id',
  authController.isLoggedIn,
  catchErrors(siteController.updateSite)
);
// remove site
router.get('/remove/site/:id',
  authController.isLoggedIn,
  catchErrors(siteController.removeSite)
);

/**
 * Router for question
 */
router.get('/new/question',
  authController.isLoggedIn,
  catchErrors(questionController.startQuestion)
);
router.post('/comment/:questionId',
  authController.isLoggedIn,
  catchErrors(authController.checkQuestionPermission),
  catchErrors(authController.checkQuestionStatus),
  catchErrors(questionController.addNewComment)
);
router.get('/question/:questionId',
  authController.isLoggedIn,
  catchErrors(authController.checkQuestionPermission),
  catchErrors(authController.checkQuestionStatus),
  catchErrors(questionController.showQuestionPage)
);
router.post('/question/:questionId',
  authController.isLoggedIn,
  catchErrors(authController.checkQuestionPermission),
  catchErrors(authController.checkQuestionStatus),
  catchErrors(questionController.updateQuestion)
);

router.get('/remove/question/:questionId',
  authController.isLoggedIn,
  catchErrors(questionController.removeQuestion)
);

router.get('/export',
  authController.isLoggedIn,
  catchErrors(caseController.exportCases)
);

module.exports = router;
