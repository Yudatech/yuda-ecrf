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
    visit = {
      _id: visitItem._id,
      case: visitItem.case,
      visitnum: visitItem.visitnum,
      visitdtc: moment(visitItem.visitdtc).format('MM/DD/YYYY'),
      visittype: visitItem.visittype,
      visitreason: visitItem.visitreason,
      visittreat: visitItem.visittreat,
      visitres: visitItem.visitres,
      param_1: visitItem.param_1,
      param_2: visitItem.param_2,
      param_3: visitItem.param_3,
      param_4: visitItem.param_4,
      param_5: visitItem.param_5,
      param_6: visitItem.param_6,
      param_7: visitItem.param_7,
      param_8: visitItem.param_8,
      param_9: visitItem.param_9,
      param_10: visitItem.param_10,
      param_11: visitItem.param_11,
      param_12: visitItem.param_12,
      param_13: visitItem.param_13,
      param_14: visitItem.param_14,
      param_15: visitItem.param_15,
      param_16: visitItem.param_16,
      param_17: visitItem.param_17,
      param_18: visitItem.param_18,
      param_19: visitItem.param_19,
      param_20: visitItem.param_20,
      param_21: visitItem.param_21,
      param_22: visitItem.param_22
    };
  }
  else {
    visit = {
      case: caseId
    };
  }

  res.render('visit/visitForm', {
    caseNav: CaseNav,
    visitConfig: getVisitConfig(),
    visitFoodTypesConfig: getVisitFoodTypesConfig(),
    visitParam14Config: getVisitParam14Config(),
    visitParam1Config: getVisitParam1Config(),
    visitParam2Config: getVisitParam2Config(),
    visitParam3Config: getVisitParam3Config(),
    visitParam8Config: getVisitParam8Config(),
    visitResConfig: getVisitResConfig(),
    visitTypesConfig: getVisitTypesConfig(),
    buttonConfig: getButtonConfig(),
    visit: visit,
    caseId: caseId
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
