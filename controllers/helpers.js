const CaseNav = require('../config/CaseNav');

const moment = require('moment');

const mongoose = require('mongoose');
const Ae = mongoose.model('Ae');
const Surgery = mongoose.model('Surgery');
const Visit = mongoose.model('Visit');

const getAeSourceConfig = require('../config/ae/getAeSourceConfig');

function getDaysAfterSurgery(surgerydtc, visitdtc) {
  const surgerydtcValue = moment(surgerydtc).valueOf();
  const visitdtcValue = moment(visitdtc).valueOf();
  return Math.floor((visitdtcValue - surgerydtcValue) / 24 / 60 / 60 / 1000);
}

exports.appendCaseIdToCaseNav = function (caseId, lang) {
  const navs = JSON.parse(JSON.stringify(CaseNav));
  if (lang === undefined) {
    lang = 'en';
  }
  navs.forEach((item) => {
    item.caseId = caseId;
    item.title = item.title[lang];
    if (item.children) {
      item.children.forEach((child) => {
        child.caseId = caseId;
        child.title = child.title[lang];
      });
    }
  });
  return navs;
};

exports.getQuestionLink = function (table, linkBase, caseId, formConfig, secondaryId) {
  if (secondaryId === undefined) {
    return `/new/question?table=${table}&caseId=${caseId}&field=${formConfig.name}&linkBase=${linkBase}`;
  }
  else {
    return `/new/question?table=${table}&caseId=${caseId}&field=${formConfig.name}&secondaryId=${secondaryId}&linkBase=${linkBase}`;
  }
};

exports.getSaeSourceOptions = async function (caseId) {
  const surgeryItem = await Surgery.findOne({
    case: caseId
  });
  const surgerydtc = (surgeryItem && surgeryItem.surgerydtc) ? surgeryItem.surgerydtc : null;
  const aeItems = await Ae.find({
    case: caseId
  });
  const saeSourceOptions = [];
  const visitItems = await Visit.find({
    case: caseId
  });
  if (surgeryItem && visitItems.length > 0) {
    visitItems.filter(item => item.postoperative_2_1 === 3 || item.postoperative_2_1 === 4).forEach((item) => {
      saeSourceOptions.push({
        value: item._id.toString(),
        text: getPostoperativeDayText(getDaysAfterSurgery(surgerydtc, item.assessmentdtc))
      });
    });
  }
  if (aeItems && aeItems.length > 0) {
    aeItems.forEach(aeItem => {
      if (aeItem.aesae) {
        saeSourceOptions.push({
          value: aeItem._id.toString(),
          text: aeItem.event
        });
      }
    })
  }
  saeSourceOptions.push({
    value: 'other',
    text: 'Other'
  });
  return saeSourceOptions;
};

exports.getSaeSourceOptionsSync = function (caseId, surgeryList, visitList) {
  const surgeryItem = surgeryList.find((item) => item.case === caseId);
  const surgerydtc = (surgeryItem && surgeryItem.surgerydtc) ? surgeryItem.surgerydtc : null;
  const visitItems = visitList.filter((item) => item.case === caseId);
  const saeSourceOptions = [];
  if (surgeryItem && visitItems.length > 0) {
    visitItems.filter(item => item.postoperative_2_1 === 3 || item.postoperative_2_1 === 4).forEach((item) => {
      saeSourceOptions.push({
        value: item._id.toString(),
        text: getPostoperativeDayText(getDaysAfterSurgery(surgerydtc, item.assessmentdtc))
      });
    });
  }
  saeSourceOptions.push({
    value: 'other',
    text: 'Other'
  });
  return saeSourceOptions;
}

exports.getAeSourceConfig = async function (caseId, lang) {
  const surgeryItem = await Surgery.findOne({
    case: caseId
  });
  const surgerydtc = (surgeryItem && surgeryItem.surgerydtc) ? surgeryItem.surgerydtc : null;
  const visits = [];
  const visitItems = await Visit.find({
    case: caseId
  });
  if (surgeryItem && visitItems.length > 0) {
    visitItems.filter(item => item.postoperative_2_1 === 1 || item.postoperative_2_1 === 2 || item.postoperative_2_1 === 3 || item.postoperative_2_1 === 4).forEach((item) => {
      visits.push({
        _id: item._id,
        postoperativedayText: getPostoperativeDayText(getDaysAfterSurgery(surgerydtc, item.assessmentdtc))
      });
    });
  }
  return getAeSourceConfig(lang, visits);
};

exports.getAeSourceConfigSync = function (caseId, lang, surgeryList, visitList) {
  const surgeryItem = surgeryList.find((item) => item.case === caseId);
  const surgerydtc = (surgeryItem && surgeryItem.surgerydtc) ? surgeryItem.surgerydtc : null;
  const visitItems = visitList.filter((item) => item.case === caseId);
  const visits = [];
  if (surgeryItem && visitItems.length > 0) {
    visitItems.filter(item => item.postoperative_2_1 === 1 || item.postoperative_2_1 === 2 || item.postoperative_2_1 === 3 || item.postoperative_2_1 === 4).forEach((item) => {
      visits.push({
        _id: item._id.toString(),
        postoperativedayText: getPostoperativeDayText(getDaysAfterSurgery(surgerydtc, item.assessmentdtc))
      });
    });
  }
  return getAeSourceConfig(lang, visits);
}

exports.getVisitNameList = async function (caseId, lang) {
  return completeList;
};

const completeList = [
  { text: 'POD 1', value: 0 },
  { text: 'POD 2', value: 1 },
  { text: 'POD 3', value: 2 },
  { text: 'POD 4', value: 3 },
  { text: 'POD 5', value: 4 },
  { text: 'POD 6', value: 5 },
  { text: 'POD 7', value: 6 },
  { text: 'POD 8', value: 7 },
  { text: 'POD 9', value: 8 },
  { text: 'POD 10', value: 9 },
  { text: 'POD 11', value: 10 },
  { text: 'POD 12', value: 11 },
  { text: 'POD 13', value: 12 },
  { text: 'POD 14', value: 13 },
  { text: 'POD 15', value: 14 },
  { text: 'POD 16', value: 15 },
  { text: 'POD 17', value: 16 },
  { text: 'POD 18', value: 17 },
  { text: 'POD 19', value: 18 },
  { text: 'POD 20', value: 19 },
  { text: 'POD 21', value: 20 },
  { text: 'POD 22', value: 21 },
  { text: 'POD 23', value: 22 },
  { text: 'POD 24', value: 23 },
  { text: 'POD 25', value: 24 },
  { text: 'POD 26', value: 25 },
  { text: 'POD 27', value: 26 },
  { text: 'POD 28', value: 27 },
  { text: 'POD 29', value: 28 },
  { text: 'POD 30', value: 29 }
];

exports.getCompletePostoperativeDayList = function () {
  return completeList;
}

exports.getPostoperativeDayConfig = async function (caseId, currentValue) {
  return completeList;
}

function getPostoperativeDayText(postoperativeDayValue) {
  return 'POD ' + postoperativeDayValue;
}

exports.getPostoperativeDayText = getPostoperativeDayText;
