const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Ae = mongoose.model('Ae');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
const getAeConfig = require('../config/ae/getAeConfig');
const getAeTableConfig = require('../config/ae/getAeTableConfig');
const getAeLevelConfig = require('../config/ae/getAeLevelConfig');
const getAeRelConfig = require('../config/ae/getAeRelConfig');
const getAeResConfig = require('../config/ae/getAeResConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

const logger = require('../logger');
const loggerHelper = require('../loggerHelper');

async function getAeListByCaseId(caseId) {
  const aeList = await Ae.find({
    case: caseId
  });
  return aeList;
}

function getAeLevelText(aeserv, lang) {
  const match = getAeLevelConfig(lang).find((item) => {
    return item.value === aeserv;
  });
  return match === undefined ? '' : match.text;
}

function getAeRelText(aerel, lang) {
  const match = getAeRelConfig(lang).find((item) => {
    return item.value === aerel;
  });
  return match === undefined ? '' : match.text;
}

function getAeResText(aeres, lang) {
  const match = getAeResConfig(lang).find((item) => {
    return item.value === aeres;
  });
  return match === undefined ? '' : match.text;
}

const tableName = 'ae';

exports.aeTable = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId, req.user.language);
  const aeList = await getAeListByCaseId(req.params.caseId);
  const aeListFormated = aeList.map((item) => {
    return {
      _id: item._id,
      case: item.case,
      event: item.event,
      aeserv: getAeLevelText(item.aeserv, req.user.language),
      aestdtc: moment(item.aestdtc).format('ll'),
      aeeddtc: moment(item.aeeddtc).format('ll'),
      aerel: getAeRelText(item.aerel, req.user.language),
      aeres_1: getAeResText(item.aeres_1, req.user.language)
    };
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'ae table', req.params.caseId));
  res.render('ae/aeTable', {
    caseNav: CaseNav,
    config: getAeTableConfig(req.user.language),
    buttonConfig: getButtonConfig(req.user.language),
    aeList: aeListFormated,
    caseId: req.params.caseId
  });
};

exports.aeForm = async (req, res) => {
  const caseId = req.params.caseId;
  const aeId = req.params.aeId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const aeSourceConfig = await helpers.getAeSourceConfig(caseId, req.user.language);
  let ae;

  if (aeId !== undefined) {
    const aeItem = await Ae.findById(aeId);
    ae = aeItem.toObject();
  }
  else {
    ae = {
      case: caseId
    };
  }

  const config = getAeConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
    }

    if (key === 'aestdtc') {
      config.formConfigs[key].date = {
        name: 'aestdtc_date',
        value: ae.aestdtc ? moment(ae.aestdtc).format('MM/DD/YYYY') : ''
      };
      config.formConfigs[key].time = {
        name: 'aestdtc_time',
        value: ae.aestdtc ? moment(ae.aestdtc).format('HH:mm') : ''
      };
    }
    else if (key === 'aeeddtc') {
      config.formConfigs[key].date = {
        name: 'aeeddtc_date',
        value: ae.aeeddtc ? moment(ae.aeeddtc).format('MM/DD/YYYY') : ''
      };
      config.formConfigs[key].time = {
        name: 'aeeddtc_time',
        value: ae.aeeddtc ? moment(ae.aeeddtc).format('HH:mm') : ''
      };
    }
    else if (key === 'aeorigion') {
      config.formConfigs[key].options = aeSourceConfig;
      config.formConfigs[key].value = ae[key];
    }
    else {
      config.formConfigs[key].value = ae[key];
    }

    if (aeId !== undefined) {
      config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'ae', req.params.caseId, config.formConfigs[key], aeId);
    }

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'ae', caseId));
  res.render('ae/aeForm', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: caseId,
    aeId: aeId
  });
};

exports.createAe = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getAeConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  req.body.case = caseId;
  if (req.body.aestdtc_date !== '' && req.body.aestdtc_time !== '') {
    req.body.aestdtc = `${req.body.aestdtc_date} ${req.body.aestdtc_time}`;
  }
  if (req.body.aeeddtc_date !== '' && req.body.aeeddtc_time !== '') {
    req.body.aeeddtc = `${req.body.aeeddtc_date} ${req.body.aeeddtc_time}`;
  }
  await (new Ae(req.body)).save();
  logger.info(loggerHelper.createLogMessage(req.user, 'create', 'ae', caseId), req.body);
  res.redirect(`/aelist/${caseId}`);
};

exports.updateAe = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getAeConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  req.body.case = caseId;
  const aeId = req.params.aeId;
  req.body.aestdtc = `${req.body.aestdtc_date} ${req.body.aestdtc_time}`;
  req.body.aeeddtc = `${req.body.aeeddtc_date} ${req.body.aeeddtc_time}`;
  await Ae.findByIdAndUpdate(aeId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'ae', caseId), req.body);
  res.redirect(`/aelist/${caseId}`);
};

exports.removeAe = async (req, res) => {
  const caseId = req.params.caseId;
  const id = req.params.aeId;
  await Ae.findByIdAndRemove(id);
  logger.info(loggerHelper.createLogMessage(req.user, 'remove', 'ae', caseId), {id});
  res.redirect(`/aelist/${caseId}`);
};
