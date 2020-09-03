const moment = require('moment');
moment.locale('en');

const mongoose = require('mongoose');
const Cm = mongoose.model('Cm');
const Case = mongoose.model('Case');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
const getCmConfig = require('../config/cm/getCmConfig');
const getCmTableConfig = require('../config/cm/getCmTableConfig');
const getDoseMethodsConfig = require('../config/cm/getDoseMethodsConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

const logger = require('../logger');
const loggerHelper = require('../loggerHelper');

async function getCmListByCaseId(caseId) {
  const cmList = await Cm.find({
    case: caseId
  });
  return cmList;
}

const tableName = 'cm';

exports.cmTable = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId, req.user.language);
  const cmList = await getCmListByCaseId(req.params.caseId);
  const cmListFormated = cmList.map((item) => {
    const cm = {
      _id: item._id,
      case: item.case,
      drug: item.drug,
      dosing: item.dosing,
      cmstdtc: moment(item.cmstdtc).format('ll'),
      cmeddtc: moment(item.cmeddtc).format('ll'),
      cmrsn: item.cmrsn
    };
    if (item.dosemtd_1 === 4) {
      cm.dosemtd = item.dosemtd_2;
    }
    else if (item.dosemtd_1 === null) {
      cm.dosemtd = '';
    }
    else {
      cm.dosemtd = getDoseMethodsConfig(req.user.language).find((method) => {
        return method.value === item.dosemtd_1;
      }).text;
    }
    return cm;
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'cm table', req.params.caseId));
  res.render('cm/cmTable', {
    caseNav: CaseNav,
    config: getCmTableConfig(req.user.language),
    buttonConfig: getButtonConfig(req.user.language),
    cmList: cmListFormated,
    caseId: req.params.caseId
  });
};

exports.cmForm = async (req, res) => {
  const caseId = req.params.caseId;
  const cmId = req.params.cmId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const cmSourceConfig = await helpers.getCmSourceConfig(caseId, req.user.language);
  let cm;

  if (cmId !== undefined) {
    const cmItem = await Cm.findById(cmId);
    cm = cmItem.toObject();
  }
  else {
    cm = {
      case: caseId
    };
  }

  const config = getCmConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
    }
    if (key === 'cmstdtc') {
      config.formConfigs[key].value = cm.cmstdtc ? moment(cm.cmstdtc).format('YYYY/MM/DD') : '';
    }
    else if (key === 'cmeddtc') {
      config.formConfigs[key].value = cm.cmeddtc ? moment(cm.cmeddtc).format('YYYY/MM/DD') : '';
    }
    else if (key === 'source') {
      config.formConfigs[key].options = cmSourceConfig;
      config.formConfigs[key].value = cm[key];
    }
    else {
      config.formConfigs[key].value = cm[key];
    }

    if (cmId !== undefined) {
      config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'cm', req.params.caseId, config.formConfigs[key], cmId);
    }

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'cm', caseId));
  res.render('cm/cmForm', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: caseId,
    cmId: cm._id
  });
};

exports.createCm = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getCmConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  req.body.case = caseId;
  if (req.body.cmstdtc === '') {
    delete req.body.cmstdtc;
  }
  if (req.body.cmeddtc === '') {
    delete req.body.cmeddtc;
  }
  await (new Cm(req.body)).save();
  const caseItem = await Case.findById(caseId);
  const logData = {
    update: req.body
  };
  logger.info(loggerHelper.createLogMessage(req.user, 'create', 'cm', caseId, caseItem.status), logData);
  res.redirect(`/cmlist/${caseId}`);
};

exports.updateCm = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getCmConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  req.body.case = caseId;
  if (req.body.cmstdtc === '') {
    delete req.body.cmstdtc;
  }
  if (req.body.cmeddtc === '') {
    delete req.body.cmeddtc;
  }
  const cmId = req.params.cmId;
  const caseItem = await Case.findById(caseId);
  const originalModel = await Cm.findById(cmId);
  const originalValue = originalModel.toObject();
  originalValue._id = originalValue._id.toString();
  const logData = {
    original: originalValue,
    update: req.body
  };
  await Cm.findByIdAndUpdate(cmId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'cm', caseId, caseItem.status), logData);
  res.redirect(`/cmlist/${caseId}`);
};

exports.removeCm = async (req, res) => {
  const caseId = req.params.caseId;
  const id = req.params.cmId;
  await Cm.findByIdAndRemove(id);
  const caseItem = await Case.findById(caseId);
  logger.info(loggerHelper.createLogMessage(req.user, 'remove', 'cm', caseId, caseItem.status), { id });
  res.redirect(`/cmlist/${caseId}`);
};
