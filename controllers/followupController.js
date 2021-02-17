const moment = require('moment');
moment.locale('en');

const mongoose = require('mongoose');
const Followup = mongoose.model('Followup');
const Case = mongoose.model('Case');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
const getFollowupConfig = require('../config/followup/getFollowupConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

const logger = require('../logger');
const loggerHelper = require('../loggerHelper');

async function createFollowup(caseId, obj) {
  obj.case = caseId;
  await (new Followup(obj)).save();
}

async function updateFollowup(caseId, obj) {
  await Followup.findOneAndUpdate({
    case: caseId
  }, obj);
}

async function createOrUpdateFollowup(caseId, obj) {
  const followupItem = await Followup.findOne({
    case: caseId
  });
  if (followupItem === null) {
    await createFollowup(caseId, obj);
  }
  else {
    await updateFollowup(caseId, obj);
  }
}

async function getFollowupItemByCaseId(caseId) {
  let followupItem = await Followup.findOne({
    case: caseId
  });
  if (!followupItem) {
    followupItem = {
      case: caseId
    };
  }
  return followupItem;
}

const tableName = 'followup';

exports.followupForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId, req.user.language);
  const followupItem = await getFollowupItemByCaseId(req.params.caseId);
  const config = getFollowupConfig(req.user.language);

  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select' || config.formConfigs[key].type === 'radio') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
    }
    config.formConfigs[key].value = followupItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'followup', req.params.caseId, config.formConfigs[key]);

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }

    if (key === 'followup_20_1' || key === 'followup_20_2' || key === 'followup_21_1' || key === 'followup_21_2' || key === 'followup_21_3' || key === 'followup_21_4' || key === 'followup_25' || key === 'followup_27_1') {
      config.formConfigs[key].value = followupItem[key] ? moment(followupItem[key]).format('YYYY/MM/DD') : '';
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'followup', req.params.caseId));
  res.render('followup', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: req.params.caseId
  });
};

exports.updateFollowup = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getFollowupConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });

  const caseItem = await Case.findById(caseId);
  const origianlModel = await getFollowupItemByCaseId(caseId);
  let originalValue = origianlModel;
  if (origianlModel.toObject) {
    originalValue = origianlModel.toObject();
  }
  if (originalValue._id) {
    originalValue._id = originalValue._id.toString();
  }
  const logData = {
    original: originalValue,
    update: req.body
  };
  await createOrUpdateFollowup(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'followup', caseId, caseItem.status), logData);
  res.redirect(`/followup/${caseId}`);
};
