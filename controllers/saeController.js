const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Sae = mongoose.model('Sae');

const helpers = require('./helpers');
const getSaeConfig = require('../config/sae/getSaeConfig');
const getSaeTableConfig = require('../config/sae/getSaeTableConfig');
const getSaeActConfig = require('../config/sae/getSaeActConfig');
const getSaeReportConfig = require('../config/sae/getSaeReportConfig');
const getSaeRelConfig = require('../config/sae/getSaeRelConfig');
const getSaeResConfig = require('../config/sae/getSaeResConfig');
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
      saecaus_1: getSaeCauseText(item.saecaus_1)
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
    if (key === 'saetpe') {
      config.formConfigs[key].value = sae[key];
      config.formConfigs[key].options = getSaeTypesConfig();
    }
    else if (key === 'saedtc') {
      config.formConfigs[key].value = moment(sae.saedtc).format('MM/DD/YYYY');
    }
    else if (key === 'saecaus_1') {
      config.formConfigs[key].value = sae[key];
      config.formConfigs[key].options = getSaeCauseConfig();
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
    else if (key === 'saeact') {
      config.formConfigs[key].value = sae[key];
      config.formConfigs[key].options = getSaeActConfig();
    }
    else if (key === 'saeres_1') {
      config.formConfigs[key].value = sae[key];
      config.formConfigs[key].options = getSaeResConfig();
    }
    else if (key === 'saerel') {
      config.formConfigs[key].value = sae[key];
      config.formConfigs[key].options = getSaeRelConfig();
    }
    else if (key === 'saerpt_1' || key === 'saerpt_2') {
      config.formConfigs[key].value = sae[key];
      config.formConfigs[key].options = getSaeReportConfig();
    }
    else {
      config.formConfigs[key].value = sae[key];
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
