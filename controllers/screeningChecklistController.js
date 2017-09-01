const moment = require('moment');

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

const tableName = 'screeningchecklist';

exports.screeningChecklistForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId, req.user.language);
  const screeningChecklistItem = await getScreeningChecklistItemByCaseId(req.params.caseId);
  const config = getScreeningChecklistConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningChecklistItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'screeningchecklist', req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
    else if (config.formConfigs[key].type === 'date') {
      config.formConfigs[key].value = moment(screeningChecklistItem[key]).format('MM/DD/YYYY');
    }
  });
  res.render('screening-checklist', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: req.params.caseId
  });
};

exports.updateScreeningChecklist = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreeningChecklist(caseId, req.body);
  res.redirect(`/screeningchecklist/${caseId}`);
};
