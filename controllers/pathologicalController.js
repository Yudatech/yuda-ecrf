const moment = require('moment');
moment.locale('en');

const mongoose = require('mongoose');
const Case = mongoose.model('Case');
const Pathological = mongoose.model('Pathological');

const helpers = require('./helpers');
const getPathologicalConfig = require('../config/getPathologicalConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

const logger = require('../logger');
const loggerHelper = require('../loggerHelper');

async function createPathological(caseId, obj) {
  obj.case = caseId;
  await (new Pathological(obj)).save();
}

async function updatePathological(caseId, obj) {
  await Pathological.findOneAndUpdate({
    case: caseId
  }, obj);
}

async function createOrUpdatePathological(caseId, obj) {
  const pathologicalItem = await Pathological.findOne({
    case: caseId
  });
  if (pathologicalItem === null) {
    await createPathological(caseId, obj);
  }
  else {
    await updatePathological(caseId, obj);
  }
}

async function getPathologicalItemByCaseId(caseId) {
  let pathologicalItem = await Pathological.findOne({
    case: caseId
  });
  if (!pathologicalItem) {
    pathologicalItem = {
      case: caseId
    };
  }
  return pathologicalItem;
}

const tableName = 'pathological';

exports.pathologicalForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId, req.user.language);
  const evacuationItem = await getPathologicalItemByCaseId(req.params.caseId);
  const config = getPathologicalConfig(req.user.language);

  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = evacuationItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'pathological', req.params.caseId, config.formConfigs[key]);
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'pathological', req.params.caseId));
  res.render('pathological', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: req.params.caseId
  });
};

exports.updatePathological = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getPathologicalConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  const caseItem = await Case.findById(caseId);
  const origianlModel = await getPathologicalItemByCaseId(caseId);
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
  await createOrUpdatePathological(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'pathological', caseId, caseItem.status), logData);
  res.redirect(`/pathological/${caseId}`);
};
