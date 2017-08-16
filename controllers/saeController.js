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
    sae = {
      _id: saeItem._id,
      case: saeItem.case,
      saeorigion: saeItem.saeorigion,
      saetpe: saeItem.saetpe,
      saedtc: moment(saeItem.saedtc).format('MM/DD/YYYY'),
      saeterm: saeItem.saeterm,
      saeanti: saeItem.saeanti,
      saecaus_1: saeItem.saecaus_1,
      saecaus_2: moment(saeItem.saecaus_2).format('MM/DD/YYYY'),
      saecaus_3: saeItem.saecaus_3,
      saestdtc: moment(saeItem.saestdtc).format('MM/DD/YYYY'),
      saenoticedtc: moment(saeItem.saenoticedtc).format('MM/DD/YYYY'),
      saeact: saeItem.saeact,
      saeres_1: saeItem.saeres_1,
      saeres_2: saeItem.saeres_2,
      saerel: saeItem.saerel,
      saerpt_1: saeItem.saerpt_1,
      saerpt_2: saeItem.saerpt_2,
      saedesc: saeItem.saedesc
    };
  }
  else {
    sae = {
      case: caseId
    };
  }

  res.render('sae/saeForm', {
    caseNav: CaseNav,
    saeConfig: getSaeConfig(),
    saeActConfig: getSaeActConfig(),
    saeCauseConfig: getSaeCauseConfig(),
    saeRelConfig: getSaeRelConfig(),
    saeReportConfig: getSaeReportConfig(),
    saeResConfig: getSaeResConfig(),
    saeTypesConfig: getSaeTypesConfig(),
    buttonConfig: getButtonConfig(),
    sae: sae,
    caseId: caseId
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
