const moment = require('moment');
moment.locale('en');

const mongoose = require('mongoose');
const Visit = mongoose.model('Visit');
const Surgery = mongoose.model('Surgery');
const Case = mongoose.model('Case');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
const getVisitConfig = require('../config/visit/getVisitConfig');
const getVisitTableConfig = require('../config/visit/getVisitTableConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

const logger = require('../logger');
const loggerHelper = require('../loggerHelper');

async function getVisitListByCaseId(caseId) {
  const visitList = await Visit.find({
    case: caseId
  });
  return visitList;
}

function getDaysAfterSurgery(surgerydtc, visitdtc) {
  const surgerydtcValue = moment(surgerydtc).valueOf();
  const visitdtcValue = moment(visitdtc).valueOf();
  return Math.floor((visitdtcValue - surgerydtcValue) / 24 / 60 / 60 / 1000);
}

const tableName = 'visit';

exports.visitTable = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId, req.user.language);

  const cdClassificationsConfig = decorationHelper.getCDClassificationConfig(req.user.language);

  const visitList = await getVisitListByCaseId(req.params.caseId);
  const visitListFormated = visitList.map((item) => {
    const match = cdClassificationsConfig.find(cdItem => cdItem.value === item.postoperative_2_1);
    return {
      _id: item._id,
      case: item.case,
      postoperativedayValue: item.postoperativeday,
      assessmentdtc: moment(item.visitdtc).format('ll'),
      postoperativeday: helpers.getPostoperativeDayText(item.postoperativeday),
      postoperative_1: item.postoperative_1 === true ? 'Yes' : 'No',
      postoperative_2: item.postoperative_2 === true ? 'Yes' : 'No',
      postoperative_2_1: match ? match.text : ''
    };
  });
  visitListFormated.sort(function (a, b) {
    let vA = parseFloat(a.postoperativedayValue);
    let vB = parseFloat(b.postoperativedayValue);
    if (vA < vB) {
      return -1;
    }
    else if (vA > vB) {
      return 1;
    }
    else {
      return 0;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'visit table', req.params.caseId));
  res.render('visit/visitTable', {
    caseNav: CaseNav,
    config: getVisitTableConfig(req.user.language),
    buttonConfig: getButtonConfig(req.user.language),
    visitList: visitListFormated,
    caseId: req.params.caseId
  });
};

exports.visitForm = async (req, res) => {
  const caseId = req.params.caseId;
  const visitId = req.params.visitId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
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

  const surgery = await Surgery.findOne({
    case: req.params.caseId
  });
  const surgerydtc = (surgery && surgery.surgerydtc) ? surgery.surgerydtc : null;

  const postoperativedayConfig = await helpers.getPostoperativeDayConfig(req.params.caseId, visit.postoperativeday);

  const config = getVisitConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      if (key === 'postoperativeday') {
        config.formConfigs[key].options = postoperativedayConfig;
      }
      else {
        config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
      }
    }
    if (key === 'assessmentdtc') {
      config.formConfigs[key].value = visit.assessmentdtc ? moment(visit.assessmentdtc).format('MM/DD/YYYY') : '';
      const startDateStr = surgerydtc === null ? null : moment(surgerydtc).format('MM/DD/YYYY');
      config.formConfigs[key].extra = JSON.stringify({
        start: startDateStr
      });
    }
    else {
      config.formConfigs[key].value = visit[key];
    }
    if (visitId !== undefined) {
      config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'visit', req.params.caseId, config.formConfigs[key], visitId);
    }

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'visit', req.params.caseId));
  res.render('visit/visitForm', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: caseId,
    visitId: visit._id
  });
};

exports.createVisit = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getVisitConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  req.body.case = caseId;
  if (req.body.assessmentdtc === '') {
    delete req.body.assessmentdtc;
  }
  await (new Visit(req.body)).save();
  const caseItem = await Case.findById(caseId);
  const logData = {
    update: req.body
  };
  logger.info(loggerHelper.createLogMessage(req.user, 'create', 'visit', req.params.caseId, caseItem.status), logData);
  res.redirect(`/visitlist/${caseId}`);
};

exports.updateVisit = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getVisitConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  req.body.case = caseId;
  if (req.body.assessmentdtc === '') {
    delete req.body.assessmentdtc;
  }
  const visitId = req.params.visitId;
  const caseItem = await Case.findById(caseId);
  const originalModel = await Visit.findById(visitId);
  const originalValue = originalModel.toObject();
  originalValue._id = originalValue._id.toString();
  const logData = {
    original: originalValue,
    update: req.body
  };
  await Visit.findByIdAndUpdate(visitId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'visit', req.params.caseId, caseItem.status), logData);
  res.redirect(`/visitlist/${caseId}`);
};

exports.removeVisit = async (req, res) => {
  const caseId = req.params.caseId;
  const id = req.params.visitId;
  await Visit.findByIdAndRemove(id);
  const caseItem = await Case.findById(caseId);
  logger.info(loggerHelper.createLogMessage(req.user, 'remove', 'visit', req.params.caseId, caseItem.status), { id });
  res.redirect(`/visitlist/${caseId}`);
};
