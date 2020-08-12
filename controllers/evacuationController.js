const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Case = mongoose.model('Case');
const Evacuation = mongoose.model('Evacuation');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
const getEvacuationConfig = require('../config/evacuation/getEvacuationConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

const logger = require('../logger');
const loggerHelper = require('../loggerHelper');

async function createEvacuation(caseId, obj) {
  obj.case = caseId;
  await (new Evacuation(obj)).save();
}

async function updateEvacuation(caseId, obj) {
  await Evacuation.findOneAndUpdate({
    case: caseId
  }, obj);
}

async function createOrUpdateEvacuation(caseId, obj) {
  const evacuationItem = await Evacuation.findOne({
    case: caseId
  });
  if (evacuationItem === null) {
    await createEvacuation(caseId, obj);
  }
  else {
    await updateEvacuation(caseId, obj);
  }
}

async function getEvacuationItemByCaseId(caseId) {
  let evacuationItem = await Evacuation.findOne({
    case: caseId
  });
  if (!evacuationItem) {
    evacuationItem = {
      case: caseId
    };
  }
  return evacuationItem;
}

const tableName = 'evacuation';

exports.evacuationForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId, req.user.language);
  const evacuationItem = await getEvacuationItemByCaseId(req.params.caseId);
  const config = getEvacuationConfig(req.user.language);

  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
    }
    if (key === 'evacuationdtc') {
      config.formConfigs[key].value = evacuationItem.evacuationdtc ? moment(evacuationItem.evacuationdtc).format('MM/DD/YYYY') : '';
    }
    else {
      config.formConfigs[key].value = evacuationItem[key];
    }
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'evacuation', req.params.caseId, config.formConfigs[key]);

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'evacuation', req.params.caseId));
  res.render('evacuation', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: req.params.caseId
  });
};

exports.updateEvacuation = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getEvacuationConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  if (req.body.evacuationdtc === '') {
    delete req.body.evacuationdtc;
  }
  const caseItem = await Case.findById(caseId);
  const origianlModel = await getEvacuationItemByCaseId(caseId);
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
  await createOrUpdateEvacuation(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'evacuation', caseId, caseItem.status), logData);
  res.redirect(`/evacuation/${caseId}`);
};
