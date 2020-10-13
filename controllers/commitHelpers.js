const mongoose = require('mongoose');
const Screening = mongoose.model('Screening');
const ReviewChecklist = mongoose.model('ReviewChecklist');
const Sae = mongoose.model('Sae');
const Ae = mongoose.model('Ae');
const Surgery = mongoose.model('Surgery');
const Visit = mongoose.model('Visit');
const Case = mongoose.model('Case');
const Evacuation = mongoose.model('Evacuation');

const getCommitCaseConfig = require('../config/getCommitCaseConfig');

const helpers = require('./helpers');

const getScreeningBasicConfig = require('../config/screening/getScreeningBasicConfig');
const getScreeningDignoseConfig = require('../config/screening/getScreeningDignoseConfig');
const getScreeningExclusionConfig = require('../config/screening/getScreeningExclusionConfig');
const getScreeningPrioRadiationTherapyConfig = require('../config/screening/getScreeningPrioRadiationTherapyConfig');
const getScreeningInclusionConfig = require('../config/screening/getScreeningInclusionConfig');
const getScreeningMethodConfig = require('../config/screening/getScreeningMethodConfig');
const getScreeningRegionConfig = require('../config/screening/getScreeningRegionConfig');

const getReviewChecklistConfig = require('../config/getReviewChecklistConfig');
const getSurgeryConfig = require('../config/surgery/getSurgeryConfig');
const getVisitConfig = require('../config/visit/getVisitConfig');
const getEvacuationConfig = require('../config/evacuation/getEvacuationConfig');
const getAeConfig = require('../config/ae/getAeConfig');
const getSaeConfig = require('../config/sae/getSaeConfig');

function doMustTrueCheck(value) {
  return value === true;
}

function doMustFalseCheck(value) {
  return value === false;
}

function doRequiredCheck(value) {
  return value !== undefined && value !== null && value !== '';
}

function doDateCheck(value, start, end) {
  if (start === null || end === null || value === null) {
    return false;
  }
  else {
    return value >= start && value <= end;
  }
}

function doOnlyOnceCheck(fieldName, ruleConfig, listToCheck) {
  const matches = listToCheck.filter((item) => {
    return item[fieldName] === ruleConfig.value;
  });
  return matches.length === 1;
}

function doConditionalRequireCheck(value, requiredValue, currentValue) {
  if (requiredValue === currentValue) {
    return value !== undefined;
  }
  else {
    return true;
  }
}

function doReviewChecklistCustomValidation(caseId, key, obj, ruleConfig, validateResult) {
  if (obj[key] !== true) {
    return true;
  }
  else {
    return true
  }
}

function doSurgeryCustomValidation(caseId, key, obj, ruleConfig, validateResult, aeList) {
  if (obj[key] !== true) {
    return true;
  }
  else {
    if (aeList.length === 0 || aeList.find((item) => item.aeorigion === 'surgery') === undefined) {
      if (validateResult.children === undefined) {
        validateResult.children = [];
      }
      validateResult.children.push({
        pass: false,
        message: ruleConfig.message,
        link: `/aelist/${caseId}`
      });
      return false;
    }
  }
}

function doVisitCustomValidation(caseId, key, obj, ruleConfig, validateResult, aeList, saeList, errors) {
  if (obj[key] === 0) {
    return true;
  }
  else {
    if (key === 'postoperative_2_1') {
      const validateValue = obj[key];
      if (validateValue === 3 || validateValue === 4) {
        if (saeList.length === 0 || saeList.find((item) => item.saeorigion === obj._id.toString()) === undefined) {
          if (validateResult.children === undefined) {
            validateResult.children = [];
          }
          validateResult.children.push({
            pass: false,
            message: errors.error_2.text,
            link: `/saelist/${caseId}`
          });
          return false;
        }
      }
      else if (validateValue === 1 || validateValue === 2) {
        if (aeList.length === 0 || aeList.find((item) => item.aeorigion === obj._id.toString()) === undefined) {
          if (validateResult.children === undefined) {
            validateResult.children = [];
          }
          validateResult.children.push({
            pass: false,
            message: errors.error_1.text,
            link: `/aelist/${caseId}`
          });
          return false;
        }
      }
    }
  }
}

function doAeCustomValidation(caseId, key, obj, ruleConfig, validateResult, saeList, idToAppend) {
  if (obj[key] !== true) {
    return true;
  }
  else {
    if (saeList.length === 0 || saeList.find((item) => item.saeorigion.toString() === obj._id.toString()) === undefined) {
      if (validateResult.children === undefined) {
        validateResult.children = [];
      }
      validateResult.children.push({
        pass: false,
        message: ruleConfig.message,
        link: `/saelist/${caseId}`
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
    else if (ruleName === 'required') {
      result = doRequiredCheck(obj[key]);
    }
    else if (ruleName === 'date') {
      let start;
      if (ruleConfig.start === undefined) {
        start = -1;
      }
      else {
        start = ruleConfig.start === 'now' ? new Date().valueOf() : extra[ruleConfig.start];
      }
      const end = ruleConfig.end === 'now' ? new Date().valueOf() : extra[ruleConfig.end];
      const date = obj[key] === undefined ? null : obj[key].valueOf();
      result = doDateCheck(date, start, end);
    }
    else if (ruleName === 'custom') {
      if (key === 'reviewcheck_3' || key === 'reviewcheck_4') {
        result = doReviewChecklistCustomValidation(caseId, key, obj, ruleConfig, validateResult);
      }
      else if (key === 'surgery_14') {
        result = doSurgeryCustomValidation(caseId, key, obj, ruleConfig, validateResult, extra.aeList);
      }
      else if (key === 'postoperative_2_1') {
        result = doVisitCustomValidation(caseId, key, obj, ruleConfig, validateResult, extra.aeList, extra.saeList, extra.errors);
      }
      else if (key === 'aesae') {
        result = doAeCustomValidation(caseId, key, obj, ruleConfig, validateResult, extra.saeList, extra.idToAppend);
      }
    }
    else if (ruleName === 'only_once') {
      result = doOnlyOnceCheck(key, ruleConfig, extra[key]);
    }
    else if (ruleName === 'conditional_require') {
      result = doConditionalRequireCheck(obj[key], ruleConfig.value, extra[ruleConfig.field]);
    }
    else if (ruleName === 'custom_date') {
      if (key === 'saedtc') {
        const date = obj[key] === undefined ? null : obj[key].valueOf();
        let end;
        const now = new Date().valueOf();
        if (obj.saestdtc === undefined) {
          end = now;
        }
        else {
          const saestdtc = obj.saestdtc.valueOf() + 24 * 60 * 60 * 1000;
          end = saestdtc > now ? now : saestdtc;
        }
        result = doDateCheck(date, 0, end);
      }
    }
    if (result === false && ruleConfig.message) {
      validateResult.message = ruleConfig.message;
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
    if (extra && extra.idToAppend !== undefined) {
      validateResult.link = validateResult.link + '/' + extra.idToAppend;
    }
    validateResult.message = validateResult.text;
    validateResult.resultText = commitCaseConfig.ongoing;
    validateResult.resultType = 'ongoing';
  }
  else {
    validateResult.message = validateResult.text;
    validateResult.resultText = commitCaseConfig.finish;
    validateResult.resultType = 'finish';
  }
}

function initValidateResult(config) {
  const result = {
    name: '',
    pass: true,
    resultText: '',
    link: ''
  };
  return Object.assign({ invalidFields: [] }, result, config);
}

function getCommitCaseConfigItem(configs, name) {
  return configs.find((item) => {
    return item.name === name;
  });
}

exports.validateCaseOverview = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const caseItem = await Case.findById(caseId);
  const caseOverviewValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'overview'));

  caseOverviewValidateResult.pass = true;
  caseOverviewValidateResult.message = caseOverviewValidateResult.text;
  caseOverviewValidateResult.resultText = commitCaseConfig.finish;
  caseOverviewValidateResult.resultType = 'finish';

  return caseOverviewValidateResult;
};

exports.validateScreeningForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const screeningItem = await Screening.findOne({
    case: caseId
  });
  const screeningValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'screening'));

  // 未填表，直接返回
  if (screeningItem === null) {
    screeningValidateResult.pass = false;
    screeningValidateResult.link = `${screeningValidateResult.linkBase}/${caseId}`;
    screeningValidateResult.message = screeningValidateResult.text;
    screeningValidateResult.resultText = commitCaseConfig.empty;
    screeningValidateResult.resultType = 'empty';
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
      else if (childResult.name === 'screening-prioradiationtherapy') {
        formConfigs = getScreeningPrioRadiationTherapyConfig(lang).formConfigs;
      }
      else if (childResult.name === 'screening-method') {
        formConfigs = getScreeningMethodConfig(lang).formConfigs;
      }
      else if (childResult.name === 'screening-region') {
        formConfigs = getScreeningRegionConfig(lang).formConfigs;
      }
      else if (childResult.name === 'screening-dignose') {
        formConfigs = getScreeningDignoseConfig(lang).formConfigs;
      }

      doCommitValidationForWholeTable(caseId, childResult, commitCaseConfig, formConfigs, screeningItem, extra);
    });

    screeningValidateResult.message = screeningValidateResult.text;
  }

  return screeningValidateResult;
};

exports.validateReviewChecklistForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const reviewChecklistItem = await ReviewChecklist.findOne({
    case: caseId
  });
  const reviewChecklistValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'reviewchecklist'));

  if (reviewChecklistItem === null) {
    reviewChecklistValidateResult.pass = false;
    reviewChecklistValidateResult.link = `${reviewChecklistValidateResult.linkBase}/${caseId}`;
    reviewChecklistValidateResult.message = reviewChecklistValidateResult.text;
    reviewChecklistValidateResult.resultText = commitCaseConfig.empty;
    reviewChecklistValidateResult.resultType = 'empty';
  }
  else {
    const caseItem = await Case.findById(caseId);
    const extra = {
      subjAcceptDate: caseItem.subjAcceptDate.valueOf()
    };
    const formConfigs = getReviewChecklistConfig(lang).formConfigs;
    doCommitValidationForWholeTable(caseId, reviewChecklistValidateResult, commitCaseConfig, formConfigs, reviewChecklistItem, extra);
  }
  return reviewChecklistValidateResult;
};

exports.validateSurgeryForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const surgeryItem = await Surgery.findOne({
    case: caseId
  });
  const surgeryValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'surgery'));

  if (surgeryItem === null) {
    surgeryValidateResult.pass = false;
    surgeryValidateResult.link = `${surgeryValidateResult.linkBase}/${caseId}`;
    surgeryValidateResult.message = surgeryValidateResult.text;
    surgeryValidateResult.resultText = commitCaseConfig.empty;
    surgeryValidateResult.resultType = 'empty';
  }
  else {
    const reviewItem = await ReviewChecklist.findOne({
      case: caseId
    });
    const aeList = await Ae.find({
      case: caseId
    });
    const extra = {
      reviewcheckdate: reviewItem && reviewItem.reviewcheckdate ? reviewItem.reviewcheckdate.valueOf() : '',
      aeList
    };
    const formConfigs = getSurgeryConfig(lang).formConfigs;
    doCommitValidationForWholeTable(caseId, surgeryValidateResult, commitCaseConfig, formConfigs, surgeryItem, extra);
  }
  return surgeryValidateResult;
};

exports.validateVisitForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const visitList = await Visit.find({
    case: caseId
  });
  const visitNameList = await helpers.getVisitNameList(caseId, lang);
  const visitValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'visit'));

  if (visitList.length === 0) {
    visitValidateResult.pass = false;
    visitValidateResult.link = `/visitlist/${caseId}`;
    visitValidateResult.message = visitValidateResult.text;
    visitValidateResult.resultText = commitCaseConfig.empty;
    visitValidateResult.resultType = 'empty';
  }
  else {
    visitValidateResult.message = `${visitValidateResult.text}`;
    visitValidateResult.resultText = commitCaseConfig.finish;
    visitValidateResult.resultType = 'finish';
    const surgeryItem = await Surgery.findOne({
      case: caseId
    });
    const aeList = await Ae.find({
      case: caseId
    });
    const saeList = await Sae.find({
      case: caseId
    });
    const formConfigs = getVisitConfig(lang).formConfigs;
    const extra = {
      'surgerydtc': surgeryItem.surgerydtc === undefined ? null : surgeryItem.surgerydtc.valueOf(),
      aeList,
      saeList,
      errors: getVisitConfig(lang).errors
    };
    visitValidateResult.children = [];
    visitList.forEach((visitItem) => {
      const visitNameItem = visitNameList.find((item) => item.value === visitItem._id.toString());
      const visitItemValidateResult = {
        pass: true,
        linkBase: `/visit`,
        invalidFields: [],
        text: visitNameItem.text
      };
      extra.idToAppend = visitItem._id.toString();
      visitValidateResult.children.push(visitItemValidateResult);
      doCommitValidationForWholeTable(caseId, visitItemValidateResult, commitCaseConfig, formConfigs, visitItem, extra);
    });

    const falseItem = visitValidateResult.children.find((item) => item.pass === false);
    if (falseItem) {
      visitValidateResult.resultText = commitCaseConfig.ongoing;
      visitValidateResult.resultType = 'ongoing';
    }
  }
  return visitValidateResult;
};

exports.validateEvacuationForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const evacuationItem = await Evacuation.findOne({
    case: caseId
  });
  const evacuationValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'evacuation'));

  if (evacuationItem === null) {
    evacuationValidateResult.pass = false;
    evacuationValidateResult.link = `${evacuationValidateResult.linkBase}/${caseId}`;
    evacuationValidateResult.message = evacuationValidateResult.text;
    evacuationValidateResult.resultText = commitCaseConfig.empty;
    evacuationValidateResult.resultType = 'empty';
  }
  else {
    const surgeryItem = await Surgery.findOne({
      case: caseId
    });
    const extra = {
      'surgerydtc': surgeryItem && surgeryItem.surgerydtc === undefined ? null : surgeryItem.surgerydtc.valueOf()
    };
    const formConfigs = getEvacuationConfig(lang).formConfigs;
    doCommitValidationForWholeTable(caseId, evacuationValidateResult, commitCaseConfig, formConfigs, evacuationItem, extra);
  }
  return evacuationValidateResult;
};

exports.validateAeForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const aeList = await Ae.find({
    case: caseId
  });
  const aeValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'ae'));

  if (aeList.length === 0) {
    aeValidateResult.pass = null;
  }
  else {
    const saeList = await Sae.find({
      case: caseId
    });
    aeValidateResult.message = `${aeValidateResult.text}`;
    aeValidateResult.resultText = commitCaseConfig.finish;
    aeValidateResult.resultType = 'finish';
    const formConfigs = getAeConfig(lang).formConfigs;
    aeValidateResult.children = [];
    aeList.forEach((aeItem) => {
      const extra = {
        aestdtc: aeItem.aestdtc === undefined ? null : aeItem.aestdtc.valueOf(),
        aeeddtc: aeItem.aeeddtc === undefined ? null : aeItem.aeeddtc.valueOf(),
        saeList: saeList,
        idToAppend: aeItem._id.toString()
      };
      const aeItemValidateResult = {
        pass: true,
        linkBase: `/ae`,
        invalidFields: [],
        text: aeItem.event
      };
      aeValidateResult.children.push(aeItemValidateResult);
      doCommitValidationForWholeTable(caseId, aeItemValidateResult, commitCaseConfig, formConfigs, aeItem, extra);
    });

    const falseItem = aeValidateResult.children.find((item) => item.pass === false);
    if (falseItem) {
      aeValidateResult.resultText = commitCaseConfig.ongoing;
      aeValidateResult.resultType = 'ongoing';
    }
  }
  return aeValidateResult;
};

exports.validateSaeForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const saeList = await Sae.find({
    case: caseId
  });
  const aeList = await Ae.find({
    case: caseId
  });
  const visitItems = await Visit.find({
    case: caseId
  });
  const saeValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'sae'));

  if (saeList.length === 0) {
    saeValidateResult.pass = null;
  }
  else {
    saeValidateResult.message = `${saeValidateResult.text}`;
    saeValidateResult.resultText = commitCaseConfig.finish;
    saeValidateResult.resultType = 'finish';
    const formConfigs = getSaeConfig(lang).formConfigs;
    saeValidateResult.children = [];
    saeList.forEach((saeItem) => {
      const extra = {
        saestdtc: saeItem.saestdtc === undefined ? null : saeItem.saestdtc.valueOf(),
        saecaus_1: saeItem.saecaus_1,
        saecaus_9: saeItem.saecause_9,
        idToAppend: saeItem._id.toString()
      };
      const aeItem = aeList.find((item) => {
        return item._id.toString() === saeItem.saeorigion;
      });
      let saeText = '';
      if (saeItem.saeorigion === 'other') {
        saeText = saeItem.saeorigion_1 ? saeItem.saeorigion_1 : 'other';
      }
      else {
        const matchVisit = visitItems.find(visitItem => {
          return visitItem._id.toString() === saeItem.saeorigion;
        });
        if (matchVisit) {
          saeText = helpers.getPostoperativeDayText(matchVisit.postoperativeday)
        }
      }
      const saeItemValidateResult = {
        pass: true,
        linkBase: `/sae`,
        invalidFields: [],
        text: aeItem ? aeItem.event : saeText
      };
      saeValidateResult.children.push(saeItemValidateResult);
      doCommitValidationForWholeTable(caseId, saeItemValidateResult, commitCaseConfig, formConfigs, saeItem, extra);
    });
    const falseItem = saeValidateResult.children.find((item) => item.pass === false);
    if (falseItem) {
      saeValidateResult.resultText = commitCaseConfig.ongoing;
      saeValidateResult.resultType = 'ongoing';
    }
  }
  return saeValidateResult;
};
