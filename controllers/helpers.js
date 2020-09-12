const CaseNav = require('../config/CaseNav');

const moment = require('moment');

const mongoose = require('mongoose');
const Ae = mongoose.model('Ae');
const Surgery = mongoose.model('Surgery');
const Visit = mongoose.model('Visit');

const getAeSourceConfig = require('../config/ae/getAeSourceConfig');
const getCmSourceConfig = require('../config/cm/getCmSourceConfig');

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
        text: getPostoperativeDayText(item.postoperativeday)
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
  const visitItems = visitList.filter((item) => item.case === caseId);
  const saeSourceOptions = [];
  if (surgeryItem && visitItems.length > 0) {
    visitItems.filter(item => item.postoperative_2_1 === 3 || item.postoperative_2_1 === 4).forEach((item) => {
      saeSourceOptions.push({
        value: item._id.toString(),
        text: getPostoperativeDayText(item.postoperativeday)
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
  const visits = [];
  const visitItems = await Visit.find({
    case: caseId
  });
  if (surgeryItem && visitItems.length > 0) {
    visitItems.filter(item => item.postoperative_2_1 === 1 || item.postoperative_2_1 === 2 || item.postoperative_2_1 === 3 || item.postoperative_2_1 === 4).forEach((item) => {
      visits.push({
        _id: item._id,
        postoperativedayText: getPostoperativeDayText(item.postoperativeday)
      });
    });
  }
  return getAeSourceConfig(lang, visits);
};

exports.getAeSourceConfigSync = function (caseId, lang, surgeryList, visitList) {
  const surgeryItem = surgeryList.find((item) => item.case === caseId);
  const visitItems = visitList.filter((item) => item.case === caseId);
  const visits = [];
  if (surgeryItem && visitItems.length > 0) {
    visitItems.filter(item => item.postoperative_2_1 === 1 || item.postoperative_2_1 === 2 || item.postoperative_2_1 === 3 || item.postoperative_2_1 === 4).forEach((item) => {
      visits.push({
        _id: item._id.toString(),
        postoperativedayText: getPostoperativeDayText(item.postoperativeday)
      });
    });
  }
  return getAeSourceConfig(lang, visits);
}

exports.getCmSourceConfig = async function (caseId, lang) {
  const surgeryItem = await Surgery.findOne({
    case: caseId
  });
  const visits = [];
  const visitItems = await Visit.find({
    case: caseId
  });
  if (surgeryItem && visitItems.length > 0) {
    visitItems.forEach((item) => {
      visits.push({
        _id: item._id.toString(),
        postoperativedayText: getPostoperativeDayText(item.postoperativeday)
      });
    });
  }
  return getCmSourceConfig(lang, visits);
};

exports.getVisitNameList = async function (caseId, lang) {
  const surgeryItem = await Surgery.findOne({
    case: caseId
  });
  const visits = [];
  const visitItems = await Visit.find({
    case: caseId
  });
  if (surgeryItem && visitItems.length > 0) {
    visitItems.forEach((item) => {
      visits.push({
        _id: item._id.toString(),
        postoperativedayText: getPostoperativeDayText(item.postoperativeday)
      });
    });
  }
  const aeSourceConfig = getAeSourceConfig(lang, visits);
  aeSourceConfig.shift();
  return aeSourceConfig;
};

const completeList = [{ text: 'POD 1-3', value: 0 }, { text: 'POD 4-6', value: 1 }, { text: 'POD 7-9', value: 2 }, { text: 'POD 10-12', value: 3 }, { text: 'POD 13-15', value: 4 }, { text: 'POD 16-18', value: 5 }, { text: 'POD 19-21', value: 6 }, { text: 'POD 22-24', value: 7 }, { text: 'POD 25-27', value: 8 }, { text: 'POD 28-30', value: 9 }];

exports.getCompletePostoperativeDayList = function () {
  return completeList;
}

exports.getPostoperativeDayConfig = async function (caseId, currentValue) {
  const visitItems = await Visit.find({
    case: caseId
  });
  const existList = visitItems.map(item => item.postoperativeday);
  return completeList.filter(item => existList.indexOf(item.value) === -1 || item.value === currentValue);
}

function getPostoperativeDayText(postoperativeDayValue) {
  const match = completeList.find(item => item.value === postoperativeDayValue);
  return match ? match.text : '';
}

exports.getPostoperativeDayText = getPostoperativeDayText;
