const moment = require('moment');
moment.locale('en');

const mongoose = require('mongoose');
const Case = mongoose.model('Case');
const Life = mongoose.model('Life');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
const getLifeAssessmentConfig = require('../config/life/getLifeAssessmentConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

const logger = require('../logger');
const loggerHelper = require('../loggerHelper');

async function createLife(caseId, obj) {
  obj.case = caseId;
  await (new Life(obj)).save();
}

async function updateLife(caseId, obj) {
  await Life.findOneAndUpdate({
    case: caseId
  }, obj);
}

async function createOrUpdateLife(caseId, obj) {
  const lifeItem = await Life.findOne({
    case: caseId
  });
  if (lifeItem === null) {
    await createLife(caseId, obj);
  }
  else {
    await updateLife(caseId, obj);
  }
}

async function getLifeItemByCaseId(caseId) {
  let lifeItem = await Life.findOne({
    case: caseId
  });
  if (!lifeItem) {
    lifeItem = {
      case: caseId
    };
  }
  return lifeItem;
}

const tableName = 'life';

exports.lifeAssessmentForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId, req.user.language);
  const lifeItem = await getLifeItemByCaseId(req.params.caseId);
  const config = getLifeAssessmentConfig(req.user.language);

  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
    }
    if (key === 'assessmentdtc') {
      config.formConfigs[key].value = lifeItem.assessmentdtc ? moment(lifeItem.assessmentdtc).format('YYYY/MM/DD') : '';
    }
    else {
      config.formConfigs[key].value = lifeItem[key];
    }
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'life', req.params.caseId, config.formConfigs[key]);

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'life', req.params.caseId));
  res.render('life', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: req.params.caseId
  });
};

exports.updateLifeAssessment = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getLifeAssessmentConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  if (req.body.assessmentdtc === '') {
    delete req.body.assessmentdtc;
  }
  const caseItem = await Case.findById(caseId);
  const origianlModel = await getLifeItemByCaseId(caseId);
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
  await createOrUpdateLife(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'life', caseId, caseItem.status), logData);
  res.redirect(`/life/${caseId}`);
};
