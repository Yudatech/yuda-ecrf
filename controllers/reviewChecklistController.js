const moment = require('moment');

const mongoose = require('mongoose');
const ReviewChecklist = mongoose.model('ReviewChecklist');
const Screening = mongoose.model('Screening');

const helpers = require('./helpers');
const getReviewChecklistConfig = require('../config/getReviewChecklistConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

const logger = require('../logger');
const loggerHelper = require('../loggerHelper');

async function createReviewChecklist(caseId, obj) {
  obj.case = caseId;
  await (new ReviewChecklist(obj)).save();
}

async function updateReviewChecklist(caseId, obj) {
  await ReviewChecklist.findOneAndUpdate({
    case: caseId
  }, obj);
}

async function createOrUpdateReviewChecklist(caseId, obj) {
  const reviewChecklistItem = await ReviewChecklist.findOne({
    case: caseId
  });
  if (reviewChecklistItem === null) {
    await createReviewChecklist(caseId, obj);
  }
  else {
    await updateReviewChecklist(caseId, obj);
  }
}

async function getReviewChecklistItemByCaseId(caseId) {
  let reviewItem = await ReviewChecklist.findOne({
    case: caseId
  });
  if (!reviewItem) {
    reviewItem = {
      case: caseId
    };
  }
  return reviewItem;
}

const tableName = 'reviewchecklist';

exports.reviewChecklistForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId, req.user.language);
  const reviewChecklistItem = await getReviewChecklistItemByCaseId(req.params.caseId);
  const screeningItem = await Screening.findOne({case: req.params.caseId});
  const config = getReviewChecklistConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = reviewChecklistItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'reviewchecklist', req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
    else if (config.formConfigs[key].type === 'date') {
      config.formConfigs[key].value = reviewChecklistItem[key] ? moment(reviewChecklistItem[key]).format('MM/DD/YYYY') : '';
      if (key === 'reviewcheckdate') {
        const screeningcheckDate = '';
        config.formConfigs[key].extra = JSON.stringify({screeningdate: screeningcheckDate});
      }
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'reviewchecklist', req.params.caseId));
  res.render('review-checklist', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: req.params.caseId
  });
};

exports.updateReviewChecklist = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getReviewChecklistConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  if (req.body.reviewcheckdate === '') {
    delete req.body.reviewcheckdate;
  }
  await createOrUpdateReviewChecklist(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'reviewchecklist', caseId), req.body);
  res.redirect(`/reviewchecklist/${caseId}`);
};
