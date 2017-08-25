const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Sae = mongoose.model('Sae');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
const getSaeConfig = require('../config/sae/getSaeConfig');
const getSaeTableConfig = require('../config/sae/getSaeTableConfig');
const getSaeTypesConfig = require('../config/sae/getSaeTypesConfig');
const getSaeCauseConfig = require('../config/sae/getSaeCauseConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

async function getSaeListByCaseId(caseId) {
  const saeList = await Sae.find({
    case: caseId
  });
  return saeList;
}

function getSaeTypeText(value) {
  return getSaeTypesConfig().find((item) => {
    return item.value === value;
  }).text;
}

function getSaeCauseText(value) {
  return getSaeCauseConfig().find((item) => {
    return item.value === value;
  }).text;
}

const tableName = 'sae';

exports.saeTable = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId);
  const saeList = await getSaeListByCaseId(req.params.caseId);
  const saeListFormated = saeList.map((item) => {
    return {
      _id: item._id,
      case: item.case,
      saetpe: getSaeTypeText(item.saetpe),
      saedtc: moment(item.saedtc).format('ll'),
      saestdtc: moment(item.saestdtc).format('ll'),
      saeanti: getSaeCauseText(item.saeanti)
    };
  });
  res.render('sae/saeTable', {
    caseNav: CaseNav,
    saeTableConfig: getSaeTableConfig(),
    buttonConfig: getButtonConfig(),
    saeList: saeListFormated,
    caseId: req.params.caseId
  });
};

exports.saeForm = async (req, res) => {
  const caseId = req.params.caseId;
  const saeId = req.params.saeId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
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

  const config = getSaeConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter]();
    }
    if (key === 'saedtc') {
      config.formConfigs[key].value = moment(sae.saedtc).format('MM/DD/YYYY');
    }
    else if (key === 'saecaus_2') {
      config.formConfigs[key].value = moment(sae.saecaus_2).format('MM/DD/YYYY');
    }
    else if (key === 'saestdtc') {
      config.formConfigs[key].value = moment(sae.saestdtc).format('MM/DD/YYYY');
    }
    else if (key === 'saenoticedtc') {
      config.formConfigs[key].value = moment(sae.saenoticedtc).format('MM/DD/YYYY');
    }
    else {
      config.formConfigs[key].value = sae[key];
    }

    if (saeId !== undefined) {
      config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, req.params.caseId, config.formConfigs[key], saeId);
    }

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });

  res.render('sae/saeForm', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(),
    caseId: caseId,
    saeId: saeId
  });
};

exports.createSae = async (req, res) => {
  const caseId = req.params.caseId;
  req.body.case = caseId;
  await (new Sae(req.body)).save();
  res.redirect(`/saelist/${caseId}`);
};

exports.updateSae = async (req, res) => {
  const caseId = req.params.caseId;
  req.body.case = caseId;
  const saeId = req.params.saeId;
  await Sae.findByIdAndUpdate(saeId, req.body);
  res.redirect(`/saelist/${caseId}`);
};

exports.removeSae = async (req, res) => {
  const caseId = req.params.caseId;
  const id = req.params.saeId;
  await Sae.findByIdAndRemove(id);
  res.redirect(`/saelist/${caseId}`);
};
