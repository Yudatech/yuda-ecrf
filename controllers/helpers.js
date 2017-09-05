const CaseNav = require('../config/CaseNav');

const moment = require('moment');

const mongoose = require('mongoose');
const Ae = mongoose.model('Ae');
const Surgery = mongoose.model('Surgery');
const Visit = mongoose.model('Visit');

const getAeSourceConfig = require('../config/ae/getAeSourceConfig');
const getCmSourceConfig = require('../config/cm/getCmSourceConfig');

exports.appendCaseIdToCaseNav = function(caseId, lang) {
  const navs = JSON.parse(JSON.stringify(CaseNav));
  if (lang === undefined) {
    lang = 'zh';
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

exports.getQuestionLink = function(table, linkBase, caseId, formConfig, secondaryId) {
  if (secondaryId === undefined) {
    return `/new/question?table=${table}&caseId=${caseId}&field=${formConfig.name}&linkBase=${linkBase}`;
  }
  else {
    return `/new/question?table=${table}&caseId=${caseId}&field=${formConfig.name}&secondaryId=${secondaryId}&linkBase=${linkBase}`;
  }
};

exports.getSaeSourceOptions = async function(caseId) {
  const aeList = await Ae.find({
    case: caseId
  });
  const saeSourceOptions = aeList.map((item) => {
    return {
      value: item._id.toString(),
      text: item.event
    };
  });
  return saeSourceOptions;
};

exports.getAeSourceConfig = async function(caseId, lang) {
  const surgeryItem = await Surgery.findOne({
    case: caseId
  });
  const visits = [];
  const visitItems = await Visit.find({
    case: caseId
  });
  if (surgeryItem && visitItems.length > 0) {
    const surgerydtc = surgeryItem.surgerydtc;
    const surgerydtcValue = moment(surgerydtc).valueOf();
    visitItems.forEach((item) => {
      const visitdtcValue = moment(item.visitdtc).valueOf();
      visits.push({
        _id: item._id,
        visitnum: item.visitnum,
        days: (visitdtcValue - surgerydtcValue) / 24 / 60 / 60 / 1000
      });
    });
  }
  return getAeSourceConfig(lang, visits);
};

exports.getCmSourceConfig = async function(caseId, lang) {
  const surgeryItem = await Surgery.findOne({
    case: caseId
  });
  const visits = [];
  const visitItems = await Visit.find({
    case: caseId
  });
  if (surgeryItem && visitItems.length > 0) {
    const surgerydtc = surgeryItem.surgerydtc;
    const surgerydtcValue = moment(surgerydtc).valueOf();
    visitItems.forEach((item) => {
      const visitdtcValue = moment(item.visitdtc).valueOf();
      visits.push({
        _id: item._id,
        visitnum: item.visitnum,
        days: (visitdtcValue - surgerydtcValue) / 24 / 60 / 60 / 1000
      });
    });
  }
  return getCmSourceConfig(lang, visits);
};
