const mongoose = require('mongoose');
const ScreeningChecklist = mongoose.model('ScreeningChecklist');

const helpers = require('./helpers');
const getScreeningChecklistConfig = require('../config/getScreeningChecklistConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

async function createScreeningChecklist(caseId, obj) {
  obj.case = caseId;
  await (new ScreeningChecklist(obj)).save();
}

async function updateScreeningChecklist(caseId, obj) {
  await ScreeningChecklist.findOneAndUpdate({
    case: caseId
  }, obj);
}

async function createOrUpdateScreeningChecklist(caseId, obj) {
  const screeningChecklistItem = await ScreeningChecklist.findOne({
    case: caseId
  });
  if (screeningChecklistItem === null) {
    await createScreeningChecklist(caseId, obj);
  }
  else {
    await updateScreeningChecklist(caseId, obj);
  }
}

async function getScreeningChecklistItemByCaseId(caseId) {
  let screeningItem = await ScreeningChecklist.findOne({
    case: caseId
  });
  if (!screeningItem) {
    screeningItem = {
      case: caseId
    };
  }
  return screeningItem;
}

exports.screeningChecklistForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId);
  const screeningChecklistItem = await getScreeningChecklistItemByCaseId(req.params.caseId);
  res.render('screening-checklist', {
    caseNav: CaseNav,
    config: getScreeningChecklistConfig(),
    buttonConfig: getButtonConfig(),
    screeningChecklistObj: screeningChecklistItem
  });
};

exports.updateScreeningChecklist = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreeningChecklist(caseId, req.body);
  res.redirect(`/screening-checklist/${caseId}`);
};
