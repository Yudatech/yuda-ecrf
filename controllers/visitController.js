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
    visit.visitdtc = moment(visitItem.visitdtc).format('MM/DD/YYYY');
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
