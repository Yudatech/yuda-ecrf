const mongoose = require('mongoose');
const ReviewChecklist = mongoose.model('ReviewChecklist');

const helpers = require('./helpers');
const getReviewChecklistConfig = require('../config/getReviewChecklistConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

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

exports.reviewChecklistForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId);
  const reviewChecklistItem = await getReviewChecklistItemByCaseId(req.params.caseId);
  const config = getReviewChecklistConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = reviewChecklistItem[key];
  });
  res.render('review-checklist', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(),
    caseId: req.params.caseId
  });
};

exports.updateReviewChecklist = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateReviewChecklist(caseId, req.body);
  res.redirect(`/review-checklist/${caseId}`);
};
