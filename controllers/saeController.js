const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Sae = mongoose.model('Sae');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
const getSaeConfig = require('../config/sae/getSaeConfig');
const getSaeTableConfig = require('../config/sae/getSaeTableConfig');
const getSaeTypesConfig = require('../config/sae/getSaeTypesConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

const logger = require('../logger');
const loggerHelper = require('../loggerHelper');

async function getSaeListByCaseId(caseId) {
  const saeList = await Sae.find({
    case: caseId
  });
  return saeList;
}

function getSaeTypeText(value, lang) {
  const match = getSaeTypesConfig(lang).find((item) => {
    return item.value === value;
  });
  return match === undefined ? '' : match.text;
}

const tableName = 'sae';

exports.saeTable = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId, req.user.language);
  const saeList = await getSaeListByCaseId(req.params.caseId);
  const saeListFormated = saeList.map((item) => {
    return {
      _id: item._id,
      case: item.case,
      saetpe: getSaeTypeText(item.saetpe, req.user.language),
      saedtc: moment(item.saedtc).format('ll'),
      saestdtc: moment(item.saestdtc).format('ll'),
      saeanti: item.saeanti
    };
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'sae table', req.params.caseId));
  res.render('sae/saeTable', {
    caseNav: CaseNav,
    config: getSaeTableConfig(req.user.language),
    buttonConfig: getButtonConfig(req.user.language),
    saeList: saeListFormated,
    caseId: req.params.caseId
  });
};

exports.saeForm = async (req, res) => {
  const caseId = req.params.caseId;
  const saeId = req.params.saeId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const saeSourceOptions = await helpers.getSaeSourceOptions(caseId);
  let sae;

  if (saeId !== undefined) {
    const saeItem = await Sae.findById(saeId);
    sae = saeItem.toObject();
  }
  else {
    sae = {
      case: caseId
    };
  }

  const config = getSaeConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
    }
    else if (key === 'saecaus_2') {
      config.formConfigs[key].value = moment(sae.saecaus_2).format('MM/DD/YYYY');
    }
    else if (key === 'saestdtc') {
      config.formConfigs[key].date = {
        name: 'saestdtc_date',
        value: moment(sae.saestdtc).format('MM/DD/YYYY')
      };
      config.formConfigs[key].time = {
        name: 'saestdtc_time',
        value: moment(sae.saestdtc).format('HH:mm')
      };
    }
    else if (key === 'saenoticedtc') {
      config.formConfigs[key].date = {
        name: 'saenoticedtc_date',
        value: moment(sae.saenoticedtc).format('MM/DD/YYYY')
      };
      config.formConfigs[key].time = {
        name: 'saenoticedtc_time',
        value: moment(sae.saenoticedtc).format('HH:mm')
      };
    }
    else if (key === 'saedtc') {
      config.formConfigs[key].date = {
        name: 'saedtc_date',
        value: moment(sae.saedtc).format('MM/DD/YYYY')
      };
      config.formConfigs[key].time = {
        name: 'saedtc_time',
        value: moment(sae.saedtc).format('HH:mm')
      };
    }
    else if (key === 'saeorigion') {
      config.formConfigs[key].options = saeSourceOptions;
      config.formConfigs[key].value = sae[key];
    }
    else {
      config.formConfigs[key].value = sae[key];
    }

    if (saeId !== undefined) {
      config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'sae', req.params.caseId, config.formConfigs[key], saeId);
    }

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });

  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'sae', req.params.caseId));
  res.render('sae/saeForm', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: caseId,
    saeId: saeId
  });
};

exports.createSae = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getSaeConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  req.body.case = caseId;
  req.body.saestdtc = `${req.body.saestdtc_date} ${req.body.saestdtc_time}`;
  req.body.saenoticedtc = `${req.body.saenoticedtc_date} ${req.body.saenoticedtc_time}`;
  req.body.saedtc = `${req.body.saedtc_date} ${req.body.saedtc_time}`;
  await (new Sae(req.body)).save();
  logger.info(loggerHelper.createLogMessage(req.user, 'create', 'sae', req.params.caseId), req.body);
  res.redirect(`/saelist/${caseId}`);
};

exports.updateSae = async (req, res) => {
  const caseId = req.params.caseId;
  req.body.case = caseId;
  const saeId = req.params.saeId;
  req.body.saestdtc = `${req.body.saestdtc_date} ${req.body.saestdtc_time}`;
  req.body.saenoticedtc = `${req.body.saenoticedtc_date} ${req.body.saenoticedtc_time}`;
  req.body.saedtc = `${req.body.saedtc_date} ${req.body.saedtc_time}`;
  await Sae.findByIdAndUpdate(saeId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'sae', req.params.caseId), req.body);
  res.redirect(`/saelist/${caseId}`);
};

exports.removeSae = async (req, res) => {
  const caseId = req.params.caseId;
  const id = req.params.saeId;
  await Sae.findByIdAndRemove(id);
  logger.info(loggerHelper.createLogMessage(req.user, 'remove', 'sae', req.params.caseId), {id});
  res.redirect(`/saelist/${caseId}`);
};
