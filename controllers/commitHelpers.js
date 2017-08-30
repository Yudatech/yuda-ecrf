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
const Case = mongoose.model('Case');

const getCommitCaseConfig = require('../config/getCommitCaseConfig');

const getScreeningBasicConfig = require('../config/screening/getScreeningBasicConfig');
const getScreeningAssistantConfig = require('../config/screening/getScreeningAssistantConfig');
const getScreeningConMedConfig = require('../config/screening/getScreeningConMedConfig');
const getScreeningDignoseConfig = require('../config/screening/getScreeningDignoseConfig');
const getScreeningDiseaseConfig = require('../config/screening/getScreeningDiseaseConfig');
const getScreeningExclusionConfig = require('../config/screening/getScreeningExclusionConfig');
const getScreeningInclusionConfig = require('../config/screening/getScreeningInclusionConfig');
const getScreeningLabConfig = require('../config/screening/getScreeningLabConfig');
const getScreeningMethodConfig = require('../config/screening/getScreeningMethodConfig');
const getScreeningRegionConfig = require('../config/screening/getScreeningRegionConfig');
const getScreeningVitalSignConfig = require('../config/screening/getScreeningVitalSignConfig');

const getScreeningChecklistConfig = require('../config/getScreeningChecklistConfig');
const getReviewChecklistConfig = require('../config/getReviewChecklistConfig');

function doMustTrueCheck(value) {
  return value === true;
}

function doMustFalseCheck(value) {
  return value === false;
}

function doDateCheck(value, start, end) {
  return value >= start && value < end;
}

function doReviewChecklistCustomValidation(caseId, key, obj, ruleConfig, validateResult, cmList) {
  if (obj[key] !== true) {
    return true;
  }
  else {
    if (cmList.length === 0 || cmList.find((item) => item.source === 1) === undefined) {
      if (validateResult.children === undefined) {
        validateResult.children = [];
      }
      validateResult.children.push({
        pass: false,
        message: ruleConfig.message,
        link: `/cmlist/${caseId}`
      });
      return false;
    }
  }
}

function doCommitValidation(caseId, key, obj, rules, extra, validateResult) {
  const failed = rules.find((ruleConfig) => {
    let result = true;
    const ruleName = ruleConfig.rule;
    if (ruleName === 'must_true') {
      result = doMustTrueCheck(obj[key]);
    }
    else if (ruleName === 'must_false') {
      result = doMustFalseCheck(obj[key]);
    }
    else if (ruleName === 'date') {
      const start = ruleConfig.start === 'now' ? new Date().valueOf() : extra[ruleConfig.start];
      const end = ruleConfig.end === 'now' ? new Date().valueOf() : extra[ruleConfig.end];
      result = doDateCheck(obj[key].valueOf(), start, end);
    }
    else if (ruleName === 'custom') {
      if (key === 'reviewcheck_3' || key === 'reviewcheck_4') {
        result = doReviewChecklistCustomValidation(caseId, key, obj, ruleConfig, validateResult, extra.cmList);
      }
    }
    return result === false;
  });
  return failed === undefined;
}

function doCommitValidationForWholeTable(caseId, validateResult, commitCaseConfig, formConfigs, model, extra) {
  Object.keys(formConfigs).forEach((key) => {
    const config = formConfigs[key];
    if (config.commit !== undefined) {
      const result = doCommitValidation(caseId, key, model, config.commit, extra, validateResult);
      if (result === false) {
        validateResult.pass = false;
        validateResult.invalidFields.push(key);
      }
    }
  });
  if (validateResult.pass === false) {
    validateResult.link = `${validateResult.linkBase}/${caseId}`;
    validateResult.message = `${validateResult.text} ${commitCaseConfig.ongoing}`;
  }
  else {
    validateResult.message = `${validateResult.text} ${commitCaseConfig.finish}`;
  }
}

function initValidateResult(config) {
  const result = {
    name: '',
    pass: true,
    resultText: '',
    link: ''
  };
  return Object.assign({invalidFields: []}, result, config);
}

function getCommitCaseConfigItem(configs, name) {
  return configs.find((item) => {
    return item.name === name;
  });
}

exports.validateScreeningForm = async function(caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const screeningItem = await Screening.findOne({
    case: caseId
  });
  const screeningValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'screening'));

  // 未填表，直接返回
  if (screeningItem === null) {
    screeningValidateResult.pass = false;
    screeningValidateResult.link = `${screeningValidateResult.linkBase}/${caseId}`;
    screeningValidateResult.message = `${screeningValidateResult.text} ${commitCaseConfig.empty}`;
  }
  else {
    const caseItem = await Case.findById(caseId);
    const extra = {
      subjAcceptDate: caseItem.subjAcceptDate.valueOf()
    };
    screeningValidateResult.children = screeningValidateResult.children.map((item) => {
      return initValidateResult(item);
    });

    screeningValidateResult.children.forEach((childResult) => {
      let formConfigs;
      if (childResult.name === 'screening-basic') {
        formConfigs = getScreeningBasicConfig(lang).formConfigs;
      }
      else if (childResult.name === 'screening-inclusion') {
        formConfigs = getScreeningInclusionConfig(lang).formConfigs;        
      }
      else if (childResult.name === 'screening-exclusion') {
        formConfigs = getScreeningExclusionConfig(lang).formConfigs;
      }
      else if (childResult.name === 'screening-method') {
        formConfigs = getScreeningMethodConfig(lang).formConfigs;
      }
      else if (childResult.name === 'screening-region') {
        formConfigs = getScreeningRegionConfig(lang).formConfigs;
      }
      else if (childResult.name === 'screening-lab') {
        formConfigs = getScreeningLabConfig(lang).formConfigs;
      }
      else if (childResult.name === 'screening-assistant') {
        formConfigs = getScreeningAssistantConfig(lang).formConfigs;
      }
      else if (childResult.name === 'screening-disease') {
        formConfigs = getScreeningDiseaseConfig(lang).formConfigs;
      }
      else if (childResult.name === 'screening-dignose') {
        formConfigs = getScreeningDignoseConfig(lang).formConfigs;
      }
      else if (childResult.name === 'screening-conmed') {
        formConfigs = getScreeningConMedConfig(lang).formConfigs;
      }
      else if (childResult.name === 'screening-vitalsign') {
        formConfigs = getScreeningVitalSignConfig(lang).formConfigs;
      }

      doCommitValidationForWholeTable(caseId, childResult, commitCaseConfig, formConfigs, screeningItem, extra);
    });

    screeningValidateResult.message = screeningValidateResult.text;
  }

  return screeningValidateResult;
};

exports.validateScreeningChecklistForm = async function(caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const screeningChecklistItem = await ScreeningChecklist.findOne({
    case: caseId
  });
  const screeningChecklistValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'screeningchecklist'));

  if (screeningChecklistItem === null) {
    screeningChecklistValidateResult.pass = false;
    screeningChecklistValidateResult.link = `${screeningChecklistValidateResult.linkBase}/${caseId}`;
    screeningChecklistValidateResult.message = `${screeningChecklistValidateResult.text} ${commitCaseConfig.empty}`;
  }
  else {
    const formConfigs = getScreeningChecklistConfig(lang).formConfigs;
    doCommitValidationForWholeTable(caseId, screeningChecklistValidateResult, commitCaseConfig, formConfigs, screeningChecklistItem);
  }
  return screeningChecklistValidateResult;
};

exports.validateReviewChecklistForm = async function(caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const reviewChecklistItem = await ReviewChecklist.findOne({
    case: caseId
  });
  const reviewChecklistValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'reviewchecklist'));

  if (reviewChecklistItem === null) {
    reviewChecklistValidateResult.pass = false;
    reviewChecklistValidateResult.link = `${reviewChecklistValidateResult.linkBase}/${caseId}`;
    reviewChecklistValidateResult.message = `${reviewChecklistValidateResult.text} ${commitCaseConfig.empty}`;
  }
  else {
    const caseItem = await Case.findById(caseId);
    const cmList = await Cm.find({
      case: caseId
    });
    const extra = {
      subjAcceptDate: caseItem.subjAcceptDate.valueOf(),
      cmList
    };
    const formConfigs = getReviewChecklistConfig(lang).formConfigs;
    doCommitValidationForWholeTable(caseId, reviewChecklistValidateResult, commitCaseConfig, formConfigs, reviewChecklistItem, extra);
  }
  return reviewChecklistValidateResult;
};
