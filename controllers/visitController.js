const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Visit = mongoose.model('Visit');
const Surgery = mongoose.model('Surgery');

const helpers = require('./helpers');
const getVisitConfig = require('../config/visit/getVisitConfig');
const getVisitTableConfig = require('../config/visit/getVisitTableConfig');
const getVisitFoodTypesConfig = require('../config/visit/getVisitFoodTypesConfig');
const getVisitParam1Config = require('../config/visit/getVisitParam1Config');
const getVisitParam2Config = require('../config/visit/getVisitParam2Config');
const getVisitParam3Config = require('../config/visit/getVisitParam3Config');
const getVisitParam8Config = require('../config/visit/getVisitParam8Config');
const getVisitParam14Config = require('../config/visit/getVisitParam14Config');
const getVisitResConfig = require('../config/visit/getVisitResConfig');
const getVisitTypesConfig = require('../config/visit/getVisitTypesConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

async function getVisitListByCaseId(caseId) {
  const visitList = await Visit.find({
    case: caseId
  });
  return visitList;
}

async function getDaysAfterSurgery(caseId, visitdtc){
  const surgery = Surgery.findOne({
    case: caseId
  });
  const surgerydtc = surgery.surgerydtc;
  const surgerydtcValue = moment(surgerydtc).valueOf();
  const visitdtcValue = moment(visitdtc).valueOf();
  return (visitdtcValue - surgerydtcValue) / 24 / 60 / 60 / 1000;
}

exports.visitTable = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId);
  const visitList = await getVisitListByCaseId(req.params.caseId);
  const visitListFormated = visitList.map((item) => {
    const daysaftersurgery = getDaysAfterSurgery(req.params.caseId, item.visitdtc);
    return {
      _id: item._id,
      case: item.case,
      visitdtc: moment(item.visitdtc).format('ll'),
      visitnum: item.visitnum,
      daysaftersurgery: daysaftersurgery,
      visitid: `${daysaftersurgery}.${item.visitnum}`
    };
  });
  res.render('visit/visitTable', {
    caseNav: CaseNav,
    visitTableConfig: getVisitTableConfig(),
    buttonConfig: getButtonConfig(),
    visitList: visitListFormated,
    caseId: req.params.caseId
  });
};

exports.visitForm = async (req, res) => {
  const caseId = req.params.caseId;
  const visitId = req.params.visitId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  let visit;

  if (visitId !== undefined) {
    const visitItem = await Visit.findById(visitId);
    visit = visitItem.toObject();
  }
  else {
    visit = {
      case: caseId
    };
  }

  const config = getVisitConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    if (key === 'visittype') {
      config.formConfigs[key].value = visit.key;
      config.formConfigs[key].options = getVisitTypesConfig();
    }
    else if (key === 'visitres') {
      config.formConfigs[key].value = visit.key;
      config.formConfigs[key].options = getVisitResConfig();
    }
    else if (key === 'param_1') {
      config.formConfigs[key].value = visit.key;
      config.formConfigs[key].options = getVisitParam1Config();
    }
    else if (key === 'param_2') {
      config.formConfigs[key].value = visit.key;
      config.formConfigs[key].options = getVisitParam2Config();
    }
    else if (key === 'param_3') {
      config.formConfigs[key].value = visit.key;
      config.formConfigs[key].options = getVisitParam3Config();
    }
    else if (key === 'param_8') {
      config.formConfigs[key].value = visit.key;
      config.formConfigs[key].options = getVisitParam8Config();
    }
    else if (key === 'param_13') {
      config.formConfigs[key].value = visit.key;
      config.formConfigs[key].options = getVisitFoodTypesConfig();
    }
    else if (key === 'param_14') {
      config.formConfigs[key].value = visit.key;
      config.formConfigs[key].options = getVisitParam14Config();
    }
    else if (key === 'param_15') {
      config.formConfigs[key].value = visit.key;
      config.formConfigs[key].options = getVisitParam14Config();
    }
    else if (key === 'visitdtc') {
      config.formConfigs[key].value = moment(visit.visitdtc).format('MM/DD/YYYY');
    }
    else {
      config.formConfigs[key].value = visit[key];
    }
  });

  res.render('visit/visitForm', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(),
    caseId: caseId,
    visitId: visit._id
  });
};

exports.createVisit = async (req, res) => {
  const caseId = req.params.caseId;
  req.body.case = caseId;
  await (new Visit(req.body)).save();
  res.redirect(`/visitlist/${caseId}`);
};

exports.updateVisit = async (req, res) => {
  const caseId = req.params.caseId;
  req.body.case = caseId;
  const visitId = req.params.visitId;
  await Visit.findByIdAndUpdate(visitId, req.body);
  res.redirect(`/visitlist/${caseId}`);
};

exports.removeVisit = async (req, res) => {
  const caseId = req.params.caseId;
  const id = req.params.visitId;
  await Visit.findByIdAndRemove(id);
  res.redirect(`/visitlist/${caseId}`);
};
