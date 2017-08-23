const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Visit = mongoose.model('Visit');
const Surgery = mongoose.model('Surgery');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
const getVisitConfig = require('../config/visit/getVisitConfig');
const getVisitTableConfig = require('../config/visit/getVisitTableConfig');
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

const tableName = 'visit';

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
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter]();
    }
    if (key === 'visitdtc') {
      config.formConfigs[key].value = moment(visit.visitdtc).format('MM/DD/YYYY');
    }
    else {
      config.formConfigs[key].value = visit[key];
    }
    if (visitId !== undefined) {
      config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, req.params.caseId, config.formConfigs[key], visitId);
    }

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
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