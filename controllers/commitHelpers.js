const mongoose = require('mongoose');
const Screening = mongoose.model('Screening');
const ScreeningChecklist = mongoose.model('ScreeningChecklist');
const ReviewChecklist = mongoose.model('ReviewChecklist');
const Discontinuation = mongoose.model('Discontinuation');
const Cm = mongoose.model('Cm');
const Sae = mongoose.model('Sae');
const Ae = mongoose.model('Ae');
const Surgery = mongoose.model('Surgery');
const Visit = mongoose.model('Visit');

const getCommitCaseConfig = require('../config/getCommitCaseConfig');

const result = {
  name: '',
  pass: true,
  resultText: '',
  link: ''
};

exports.validateScreeningForm = async function(caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const screeningItem = Screening.findOne({
    case: caseId
  });
  const screeningValidateResult = Object.assign({invalidFields: []}, result, commitCaseConfig.records[0]);

  // 未填表，直接返回
  if (screeningItem === undefined) {
    screeningValidateResult.pass = false;
    screeningValidateResult.link = `${screeningValidateResult.linkBase}/${caseId}`;
    screeningValidateResult.message = `${screeningValidateResult.text} ${commitCaseConfig.empty}`;
  }
  else {
    screeningValidateResult.children = commitCaseConfig.records[0].children.map((item) => {
      return Object.assign({invalidFields: []}, result, item);
    });

    const inclusionMustTrueFields = ['inclusion_1', 'inclusion_2', 'inclusion_3', 'inclusion_4'];
    const exclusionMustFalseFields = [
      'exclusion_1',
      'exclusion_2',
      'exclusion_3',
      'exclusion_4',
      'exclusion_5',
      'exclusion_6',
      'exclusion_7',
      'exclusion_8',
      'exclusion_9',
      'exclusion_10',
      'exclusion_11',
      'exclusion_12',
      'exclusion_13',
      'exclusion_14',
      'exclusion_15',
      'exclusion_16'
    ];

    const inclusionResultConfig = screeningValidateResult.children.find((item) => item.name === 'screening-inclusion');
    inclusionMustTrueFields.forEach((fieldName) => {
      if (screeningItem[fieldName] !== true) {
        inclusionResultConfig.pass = false;
        screeningValidateResult.pass = false;
        inclusionResultConfig.invalidFields.push(fieldName);
        inclusionResultConfig.link = `${inclusionResultConfig.linkBase}/${caseId}`;
      }
    });

    const exclusionResultConfig = screeningValidateResult.children.find((item) => item.name === 'screening-exclusion');
    exclusionMustFalseFields.forEach((fieldName) => {
      if (screeningItem[fieldName] !== false && screeningItem[fieldName] !== undefined) {
        exclusionResultConfig.pass = false;
        screeningValidateResult.pass = false;
        exclusionResultConfig.invalidFields.push(fieldName);
        exclusionResultConfig.link = `${exclusionResultConfig.linkBase}/${caseId}`;
      }
    });

    screeningValidateResult.children.forEach((item) => {
      if (item.pass === true) {
        item.message = `${item.text} ${commitCaseConfig.finish}`;
      }
      else {
        item.message = `${item.text} ${commitCaseConfig.ongoing}`;
      }
    });

    screeningValidateResult.message = screeningValidateResult.text;
  }

  return screeningValidateResult;
};

exports.validateScreeningChecklistForm = async function(caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
};
