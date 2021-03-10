const moment = require('moment');
moment.locale('en');
const mongoose = require('mongoose');
const Screening = mongoose.model('Screening');
const ReviewChecklist = mongoose.model('ReviewChecklist');
const Sae = mongoose.model('Sae');
const Ae = mongoose.model('Ae');
const Surgery = mongoose.model('Surgery');
const Visit = mongoose.model('Visit');
const Case = mongoose.model('Case');
const Evacuation = mongoose.model('Evacuation');
const Pathological = mongoose.model('Pathological');
const Followup = mongoose.model('Followup');
const EvacuationFollowup = mongoose.model('EvacuationFollowup');

const getCommitCaseConfig = require('../config/getCommitCaseConfig');

const helpers = require('./helpers');

const decorationHelper = require('./decorationHelper');

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
const getPathologicalConfig = require('../config/getPathologicalConfig');
const getFollowupConfig = require('../config/followup/getFollowupConfig');
const getEvacuationFollowupConfig = require('../config/evacuation/getEvacuationFollowupConfig');

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
  } else {
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
    return value !== undefined && value !== null && value !== '';
  } else {
    return true;
  }
}

function doConditionalRequireExtraCheck(key, obj, rule) {
  const requiredValue = rule.value;
  const currentValue = obj[rule.field];
  const baseFieldRequiredValue = rule.baseFieldValue;
  const baseFieldCurrentValue = obj[rule.baseField];
  const value = obj[key];
  if (requiredValue === currentValue && baseFieldCurrentValue === baseFieldRequiredValue) {
    return value !== undefined && value !== '';
  } else {
    return true;
  }
}

function doConditionalRequireMultipleValuesCheck(value, requiredValues, currentValue) {
  if (requiredValues.find((item) => item === currentValue) !== undefined) {
    return value !== undefined && value !== '';
  } else {
    return true;
  }
}

function doConditionalRequireMultipleValuesExtraCheck(value, requiredValues, currentValue, obj, rule) {
  const baseField1RequiredValue = rule.baseField1Value;
  const baseField1CurrentValue = obj[rule.baseField1];
  const baseField2RequiredValue = rule.baseField2Value;
  const baseField2CurrentValue = obj[rule.baseField2];
  if (
    baseField1CurrentValue === baseField1RequiredValue &&
    baseField2CurrentValue === baseField2RequiredValue &&
    requiredValues.find((item) => item === currentValue) !== undefined
  ) {
    return value !== undefined && value !== '';
  } else {
    return true;
  }
}

function doAtLeastOneTrueCheck(value, fields, extra) {
  const fieldArray = fields.split(',');
  const foundTrue = fieldArray.find((item) => extra[item] === true);
  return foundTrue !== undefined;
}

function doConditionalAtleastOneCheck(key, obj, rule) {
  const conditionField = rule.conditionField;
  const conditionValue = rule.conditionValue;
  if (obj[conditionField] === conditionValue) {
    const fields = rule.fields.split(',');
    const match = fields.find((field) => obj[field]);
    return match !== undefined;
  } else {
    return true;
  }
}

function doConditionalAtleastOneExtraCheck(key, obj, rule) {
  const baseFieldRequiredValue = rule.baseFieldValue;
  const baseFieldCurrentValue = obj[rule.baseField];
  const conditionField = rule.conditionField;
  const conditionValue = rule.conditionValue;
  if (obj[conditionField] === conditionValue && baseFieldRequiredValue === baseFieldCurrentValue) {
    const fields = rule.fields.split(',');
    const match = fields.find((field) => obj[field]);
    return match !== undefined;
  } else {
    return true;
  }
}

function doAtleastOneCheck(key, obj, rule) {
  const fields = rule.fields.split(',');
  const match = fields.find((field) => obj[field]);
  return match !== undefined;
}

function doConditionalAtleastOneTrueCheck(key, obj, rule) {
  const conditionField = rule.conditionField;
  const conditionValue = rule.conditionValue;
  if (obj[conditionField] === conditionValue) {
    const fields = rule.fields.split(',');
    const match = fields.find((field) => obj[field] === true);
    return match !== undefined;
  } else {
    return true;
  }
}

function doReviewChecklistCustomValidation(caseId, key, obj, ruleConfig, validateResult) {
  if (obj[key] !== true) {
    return true;
  } else {
    return true;
  }
}

function doSurgeryCustomValidation(caseId, key, obj, ruleConfig, validateResult, aeList) {
  if (obj[key] !== true) {
    return true;
  } else {
    if (aeList.length === 0 || aeList.find((item) => item.aeorigion === 'surgery') === undefined) {
      if (validateResult.children === undefined) {
        validateResult.children = [];
      }
      validateResult.children.push({
        pass: false,
        message: ruleConfig.message,
        link: `/aelist/${caseId}`,
      });
      return false;
    }
  }
}

function doVisitCustomValidation(
  caseId,
  key,
  obj,
  ruleConfig,
  validateResult,
  aeList,
  saeList,
  postoperative_2,
  errors
) {
  if ((obj[key] === undefined || obj[key] === null) && postoperative_2 === 0) {
    return false;
  }
  if (obj[key] === 0) {
    return true;
  } else {
    if (key === 'postoperative_2_1') {
      const validateValue = obj[key];
      if (validateValue !== 1 || obj['postoperative_2'] !== 0) return true;
      if (helpers.isVisitSaeSource(obj)) {
        if (saeList.length === 0 || saeList.find((item) => item.saeorigion === obj._id.toString()) === undefined) {
          if (validateResult.children === undefined) {
            validateResult.children = [];
          }
          validateResult.children.push({
            pass: false,
            message: errors.error_2.text,
            link: `/saelist/${caseId}`,
          });
          return false;
        }
      } else if (helpers.isVisitAeSource(obj) && !helpers.isVisitSaeSource(obj)) {
        if (aeList.length === 0 || aeList.find((item) => item.aeorigion === obj._id.toString()) === undefined) {
          if (validateResult.children === undefined) {
            validateResult.children = [];
          }
          validateResult.children.push({
            pass: false,
            message: errors.error_1.text,
            link: `/aelist/${caseId}`,
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
  } else {
    if (
      saeList.length === 0 ||
      saeList.find((item) => item.saeorigion.toString() === obj._id.toString()) === undefined
    ) {
      if (validateResult.children === undefined) {
        validateResult.children = [];
      }
      validateResult.children.push({
        pass: false,
        message: ruleConfig.message,
        link: `/saelist/${caseId}`,
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
    } else if (ruleName === 'must_false') {
      result = doMustFalseCheck(obj[key]);
    } else if (ruleName === 'required') {
      result = doRequiredCheck(obj[key]);
    } else if (ruleName === 'date') {
      let start;
      if (ruleConfig.start === undefined) {
        start = -1;
      } else {
        start = ruleConfig.start === 'now' ? new Date().valueOf() : extra[ruleConfig.start];
      }
      const end = ruleConfig.end === 'now' ? new Date().valueOf() : extra[ruleConfig.end];
      const date = obj[key] === undefined ? null : obj[key].valueOf();
      result = doDateCheck(date, start, end);
    } else if (ruleName === 'custom') {
      if (key === 'reviewcheck_3' || key === 'reviewcheck_4') {
        result = doReviewChecklistCustomValidation(caseId, key, obj, ruleConfig, validateResult);
      } else if (key === 'surgery_14') {
        result = doSurgeryCustomValidation(caseId, key, obj, ruleConfig, validateResult, extra.aeList);
      } else if (key === 'postoperative_2_1') {
        result = doVisitCustomValidation(
          caseId,
          key,
          obj,
          ruleConfig,
          validateResult,
          extra.aeList,
          extra.saeList,
          extra.postoperative_2,
          extra.errors
        );
      } else if (key === 'aesae') {
        result = doAeCustomValidation(caseId, key, obj, ruleConfig, validateResult, extra.saeList, extra.idToAppend);
      }
    } else if (ruleName === 'only_once') {
      result = doOnlyOnceCheck(key, ruleConfig, extra[key]);
    } else if (ruleName === 'conditional_require') {
      result = doConditionalRequireCheck(obj[key], ruleConfig.value, extra[ruleConfig.field]);
    } else if (ruleName === 'conditional_require_extra') {
      result = doConditionalRequireExtraCheck(key, obj, ruleConfig);
    } else if (ruleName === 'conditional_require_multiple_values') {
      result = doConditionalRequireMultipleValuesCheck(obj[key], ruleConfig.values, obj[ruleConfig.field]);
    } else if (ruleName === 'conditional_require_multiple_values_extra') {
      result = doConditionalRequireMultipleValuesExtraCheck(
        obj[key],
        ruleConfig.values,
        obj[ruleConfig.field],
        obj,
        ruleConfig
      );
    } else if (ruleName === 'atleast_one_true') {
      result = doAtLeastOneTrueCheck(obj[key], ruleConfig.fields, extra);
    } else if (ruleName === 'custom_date') {
      if (key === 'saedtc') {
        const date = obj[key] === undefined ? null : obj[key].valueOf();
        let end;
        const now = new Date().valueOf();
        if (obj.saestdtc === undefined) {
          end = now;
        } else {
          const saestdtc = obj.saestdtc.valueOf() + 24 * 60 * 60 * 1000;
          end = saestdtc > now ? now : saestdtc;
        }
        result = doDateCheck(date, 0, end);
      }
    } else if (ruleName === 'conditional_atleast_one') {
      result = doConditionalAtleastOneCheck(key, obj, ruleConfig);
    } else if (ruleName === 'conditional_atleast_one_extra') {
      result = doConditionalAtleastOneExtraCheck(key, obj, ruleConfig);
    } else if (ruleName === 'atleast_one') {
      result = doAtleastOneCheck(key, obj, ruleConfig);
    } else if (ruleName === 'conditional_atleast_one_true') {
      result = doConditionalAtleastOneTrueCheck(key, obj, ruleConfig);
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
  } else {
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
    link: '',
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

  if (!caseItem.attachedDoc) {
    caseOverviewValidateResult.pass = false;
    caseOverviewValidateResult.link = `${caseOverviewValidateResult.linkBase}/${caseId}`;
    caseOverviewValidateResult.message = caseOverviewValidateResult.text;
    caseOverviewValidateResult.resultText = commitCaseConfig.ongoing;
    caseOverviewValidateResult.resultType = 'ongoig';
    caseOverviewValidateResult.errors = [commitCaseConfig.errorMessages.error_2.text];
  } else {
    caseOverviewValidateResult.pass = true;
    caseOverviewValidateResult.message = caseOverviewValidateResult.text;
    caseOverviewValidateResult.resultText = commitCaseConfig.finish;
    caseOverviewValidateResult.resultType = 'finish';
  }

  return caseOverviewValidateResult;
};

exports.validateScreeningForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const screeningItem = await Screening.findOne({
    case: caseId,
  });
  const screeningValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'screening'));

  // 未填表，直接返回
  if (screeningItem === null) {
    screeningValidateResult.pass = false;
    screeningValidateResult.link = `${screeningValidateResult.linkBase}/${caseId}`;
    screeningValidateResult.message = screeningValidateResult.text;
    screeningValidateResult.resultText = commitCaseConfig.empty;
    screeningValidateResult.resultType = 'empty';
  } else {
    const caseItem = await Case.findById(caseId);
    const extra = {
      subjAcceptDate: caseItem.subjAcceptDate.valueOf(),
    };
    screeningValidateResult.children = screeningValidateResult.children.map((item) => {
      return initValidateResult(item);
    });

    screeningValidateResult.children.forEach((childResult) => {
      let formConfigs;
      if (childResult.name === 'screening-basic') {
        formConfigs = getScreeningBasicConfig(lang).formConfigs;
      } else if (childResult.name === 'screening-inclusion') {
        formConfigs = getScreeningInclusionConfig(lang).formConfigs;
      } else if (childResult.name === 'screening-exclusion') {
        formConfigs = getScreeningExclusionConfig(lang).formConfigs;
      } else if (childResult.name === 'screening-prioradiationtherapy') {
        formConfigs = getScreeningPrioRadiationTherapyConfig(lang).formConfigs;
        extra.priorradiationtherapy_1 = screeningItem ? screeningItem.priorradiationtherapy_1 : undefined;
      } else if (childResult.name === 'screening-method') {
        formConfigs = getScreeningMethodConfig(lang).formConfigs;
        extra.method_1 = screeningItem ? screeningItem.method_1 : false;
        extra.method_2 = screeningItem ? screeningItem.method_2 : false;
      } else if (childResult.name === 'screening-region') {
        formConfigs = getScreeningRegionConfig(lang).formConfigs;
        extra.region_3 = screeningItem ? screeningItem.region_3 : false;
        extra.region_4 = screeningItem ? screeningItem.region_4 : false;
        extra.region_5 = screeningItem ? screeningItem.region_5 : false;
        extra.region_6 = screeningItem ? screeningItem.region_6 : false;
        extra.region_7 = screeningItem ? screeningItem.region_7 : false;
      } else if (childResult.name === 'screening-dignose') {
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
    case: caseId,
  });
  const reviewChecklistValidateResult = initValidateResult(
    getCommitCaseConfigItem(commitCaseConfig.records, 'reviewchecklist')
  );

  if (reviewChecklistItem === null) {
    reviewChecklistValidateResult.pass = false;
    reviewChecklistValidateResult.link = `${reviewChecklistValidateResult.linkBase}/${caseId}`;
    reviewChecklistValidateResult.message = reviewChecklistValidateResult.text;
    reviewChecklistValidateResult.resultText = commitCaseConfig.empty;
    reviewChecklistValidateResult.resultType = 'empty';
  } else {
    const caseItem = await Case.findById(caseId);
    const extra = {
      subjAcceptDate: caseItem.subjAcceptDate.valueOf(),
    };
    const formConfigs = getReviewChecklistConfig(lang).formConfigs;
    doCommitValidationForWholeTable(
      caseId,
      reviewChecklistValidateResult,
      commitCaseConfig,
      formConfigs,
      reviewChecklistItem,
      extra
    );
  }
  return reviewChecklistValidateResult;
};

exports.validateSurgeryForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const surgeryItem = await Surgery.findOne({
    case: caseId,
  });
  const surgeryValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'surgery'));

  if (surgeryItem === null) {
    surgeryValidateResult.pass = false;
    surgeryValidateResult.link = `${surgeryValidateResult.linkBase}/${caseId}`;
    surgeryValidateResult.message = surgeryValidateResult.text;
    surgeryValidateResult.resultText = commitCaseConfig.empty;
    surgeryValidateResult.resultType = 'empty';
  } else {
    const reviewItem = await ReviewChecklist.findOne({
      case: caseId,
    });

    const aeList = await Ae.find({
      case: caseId,
    });

    const extra = {
      reviewcheckdate: reviewItem && reviewItem.reviewcheckdate ? reviewItem.reviewcheckdate.valueOf() : '',
      aeList,
      surgery_4: surgeryItem.surgery_4,
      surgery_5: surgeryItem.surgery_5,
      surgery_6: surgeryItem.surgery_6,
      surgery_16: surgeryItem.surgery_16,
      surgery_17: surgeryItem.surgery_17,
    };
    const formConfigs = getSurgeryConfig(lang).formConfigs;
    doCommitValidationForWholeTable(caseId, surgeryValidateResult, commitCaseConfig, formConfigs, surgeryItem, extra);
  }
  return surgeryValidateResult;
};

function getDaysAfterSurgery(surgerydtc, visitdtc) {
  const surgerydtcValue = moment(surgerydtc).valueOf();
  const visitdtcValue = moment(visitdtc).valueOf();
  return Math.floor((visitdtcValue - surgerydtcValue) / 24 / 60 / 60 / 1000);
}

exports.validateVisitForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const visitList = await Visit.find({
    case: caseId,
  });
  const visitValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'visit'));

  if (visitList.length === 0) {
    visitValidateResult.pass = false;
    visitValidateResult.link = `/visitlist/${caseId}`;
    visitValidateResult.message = visitValidateResult.text;
    visitValidateResult.resultText = commitCaseConfig.empty;
    visitValidateResult.resultType = 'empty';
  } else {
    visitValidateResult.message = `${visitValidateResult.text}`;
    visitValidateResult.resultText = commitCaseConfig.finish;
    visitValidateResult.resultType = 'finish';
    const surgeryItem = await Surgery.findOne({
      case: caseId,
    });
    const surgerydtc = surgeryItem && surgeryItem.surgerydtc ? surgeryItem.surgerydtc : null;
    const aeList = await Ae.find({
      case: caseId,
    });
    const saeList = await Sae.find({
      case: caseId,
    });
    const formConfigs = getVisitConfig(lang).formConfigs;
    const extra = {
      surgerydtc: !surgeryItem || surgeryItem.surgerydtc === undefined ? null : surgeryItem.surgerydtc.valueOf(),
      aeList,
      saeList,
      errors: getVisitConfig(lang).errors,
    };
    visitValidateResult.children = [];
    visitList.forEach((visitItem) => {
      const daysAfterSurgery = getDaysAfterSurgery(surgerydtc, visitItem.assessmentdtc);
      const visitItemValidateResult = {
        pass: true,
        linkBase: `/visit`,
        invalidFields: [],
        text: 'POD ' + daysAfterSurgery,
      };
      extra.idToAppend = visitItem._id.toString();
      extra.postoperative_1 = visitItem.postoperative_1;
      visitValidateResult.children.push(visitItemValidateResult);
      doCommitValidationForWholeTable(caseId, visitItemValidateResult, commitCaseConfig, formConfigs, visitItem, extra);
    });

    const falseItem = visitValidateResult.children.find((item) => item.pass === false);
    if (falseItem) {
      visitValidateResult.resultText = commitCaseConfig.ongoing;
      visitValidateResult.resultType = 'ongoing';
      visitValidateResult.pass = false;
    }
  }
  return visitValidateResult;
};

async function getFollowupListByCaseId(caseId) {
  const followupList = await EvacuationFollowup.find({
    case: caseId,
  });
  return followupList;
}

exports.validateEvacuationForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const evacuationItem = await Evacuation.findOne({
    case: caseId,
  });
  const evacuationValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'evacuation'));

  if (evacuationItem === null) {
    evacuationValidateResult.pass = false;
    evacuationValidateResult.link = `${evacuationValidateResult.linkBase}/${caseId}`;
    evacuationValidateResult.message = evacuationValidateResult.text;
    evacuationValidateResult.resultText = commitCaseConfig.empty;
    evacuationValidateResult.resultType = 'empty';
  } else {
    const surgeryItem = await Surgery.findOne({
      case: caseId,
    });

    const surgerydtc = surgeryItem && surgeryItem.surgerydtc ? surgeryItem.surgerydtc : null;

    const followupConfig = getEvacuationFollowupConfig(lang);
    const followupList = await getFollowupListByCaseId(caseId);
    let lastFollowupDate;
    const followupListFormatted = followupList.map((item) => {
      let statusValues = '';
      if (item['status'] === 1) {
        const statusKeys = ['status_1', 'status_2', 'status_3', 'status_4'];
        statusValues = statusKeys
          .map((key) => {
            if (item[key] === true) {
              return followupConfig.formConfigs[key].text;
            }
            return undefined;
          })
          .filter((item) => item)
          .join(', ');
      } else if (item['status'] === 0) {
        const options = decorationHelper[followupConfig.formConfigs['status'].optionsGetter](lang);
        statusValues = options.find((i) => i.value === 0).text;
      }
      return {
        _id: item._id,
        case: item.case,
        postoperativedayValue: getDaysAfterSurgery(surgerydtc, item.assessmentdtc),
        assessmentdtcRaw: item.assessmentdtc,
        assessmentdtc: moment(item.assessmentdtc).format('ll'),
        postoperativeday: helpers.getPostoperativeDayText(getDaysAfterSurgery(surgerydtc, item.assessmentdtc)),
        status: statusValues,
      };
    });
    followupListFormatted.sort(function (a, b) {
      let vA = parseFloat(a.postoperativedayValue);
      let vB = parseFloat(b.postoperativedayValue);
      if (vA < vB) {
        return -1;
      } else if (vA > vB) {
        return 1;
      } else {
        return 0;
      }
    });
    if (followupListFormatted.length) {
      lastFollowupDate = followupListFormatted[followupListFormatted.length - 1].assessmentdtcRaw.valueOf();
    }
    const currentDate = evacuationItem.evacuationdtc.valueOf();
    if (lastFollowupDate && currentDate) {
      if (currentDate < lastFollowupDate) {
        evacuationValidateResult.pass = false;
        evacuationValidateResult.link = `${evacuationValidateResult.linkBase}/${caseId}`;
        evacuationValidateResult.message = evacuationValidateResult.text;
        evacuationValidateResult.resultText = commitCaseConfig.ongoing;
        evacuationValidateResult.resultType = 'ongoing';
        return evacuationValidateResult;
      }
    }

    const extra = {
      surgerydtc: surgeryItem && surgeryItem.surgerydtc ? surgeryItem.surgerydtc.valueOf() : null,
    };
    const formConfigs = getEvacuationConfig(lang).formConfigs;
    doCommitValidationForWholeTable(
      caseId,
      evacuationValidateResult,
      commitCaseConfig,
      formConfigs,
      evacuationItem,
      extra
    );
  }
  return evacuationValidateResult;
};

exports.validateEvacuationFollowupForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const evacuationFollowupList = await EvacuationFollowup.find({
    case: caseId,
  });
  const evacuationFollowupValidateResult = initValidateResult(
    getCommitCaseConfigItem(commitCaseConfig.records, 'evacuationfollowup')
  );

  if (evacuationFollowupList.length === 0) {
    const visitList = await Visit.find({
      case: caseId,
    });
    const mustAdd = visitList.find((visitItem) => {
      return visitItem.postoperative_1 === true && visitItem.postoperative_1_3 === 1;
    });
    if (mustAdd) {
      evacuationFollowupValidateResult.pass = false;
      evacuationFollowupValidateResult.link = `/evacuation/${caseId}`;
      evacuationFollowupValidateResult.message = evacuationFollowupValidateResult.text;
      evacuationFollowupValidateResult.resultText = commitCaseConfig.empty;
      evacuationFollowupValidateResult.resultType = 'empty';
    } else {
      evacuationFollowupValidateResult.pass = true;
      evacuationFollowupValidateResult.link = `/evacuation/${caseId}`;
      evacuationFollowupValidateResult.message = evacuationFollowupValidateResult.text;
      evacuationFollowupValidateResult.resultText = commitCaseConfig.finish;
      evacuationFollowupValidateResult.resultType = 'finish';
    }
  } else {
    evacuationFollowupValidateResult.message = `${evacuationFollowupValidateResult.text}`;
    evacuationFollowupValidateResult.resultText = commitCaseConfig.finish;
    evacuationFollowupValidateResult.resultType = 'finish';
    const surgeryItem = await Surgery.findOne({
      case: caseId,
    });
    const surgerydtc = surgeryItem && surgeryItem.surgerydtc ? surgeryItem.surgerydtc : null;
    const formConfigs = getEvacuationFollowupConfig(lang).formConfigs;
    const extra = {
      surgerydtc: !surgeryItem || surgeryItem.surgerydtc === undefined ? null : surgeryItem.surgerydtc.valueOf(),
    };
    evacuationFollowupValidateResult.children = [];
    evacuationFollowupList.forEach((evacuationFollowupItem) => {
      const daysAfterSurgery = getDaysAfterSurgery(surgerydtc, evacuationFollowupItem.assessmentdtc);
      const evacuationFollowupItemValidateResult = {
        pass: true,
        linkBase: `/evacuationfollowup`,
        invalidFields: [],
        text: 'POD ' + daysAfterSurgery,
      };
      extra.idToAppend = evacuationFollowupItem._id.toString();
      extra.status_1 = evacuationFollowupItem.status_1;
      extra.status_2 = evacuationFollowupItem.status_2;
      extra.status_3 = evacuationFollowupItem.status_3;
      extra.status_4 = evacuationFollowupItem.status_4;
      evacuationFollowupValidateResult.children.push(evacuationFollowupItemValidateResult);
      doCommitValidationForWholeTable(
        caseId,
        evacuationFollowupItemValidateResult,
        commitCaseConfig,
        formConfigs,
        evacuationFollowupItem,
        extra
      );
    });

    const falseItem = evacuationFollowupValidateResult.children.find((item) => item.pass === false);
    if (falseItem) {
      evacuationFollowupValidateResult.resultText = commitCaseConfig.ongoing;
      evacuationFollowupValidateResult.resultType = 'ongoing';
      evacuationFollowupValidateResult.pass = false;
    }
  }
  return evacuationFollowupValidateResult;
};

exports.validatePathologicalForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const pathologicalItem = await Pathological.findOne({
    case: caseId,
  });
  const pathologicalValidateResult = initValidateResult(
    getCommitCaseConfigItem(commitCaseConfig.records, 'pathological')
  );

  if (pathologicalItem === null) {
    pathologicalValidateResult.pass = false;
    pathologicalValidateResult.link = `${pathologicalValidateResult.linkBase}/${caseId}`;
    pathologicalValidateResult.message = pathologicalValidateResult.text;
    pathologicalValidateResult.resultText = commitCaseConfig.empty;
    pathologicalValidateResult.resultType = 'empty';
  } else {
    const extra = {};
    const formConfigs = getPathologicalConfig(lang).formConfigs;
    doCommitValidationForWholeTable(
      caseId,
      pathologicalValidateResult,
      commitCaseConfig,
      formConfigs,
      pathologicalItem,
      extra
    );
  }
  return pathologicalValidateResult;
};

exports.validateFollowupForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const followupItem = await Followup.findOne({
    case: caseId,
  });
  const followupValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'followup'));

  if (followupItem === null) {
    followupValidateResult.pass = false;
    followupValidateResult.link = `${followupValidateResult.linkBase}/${caseId}`;
    followupValidateResult.message = followupValidateResult.text;
    followupValidateResult.resultText = commitCaseConfig.empty;
    followupValidateResult.resultType = 'empty';
  } else {
    const extra = followupItem;
    const formConfigs = getFollowupConfig(lang).formConfigs;
    doCommitValidationForWholeTable(caseId, followupValidateResult, commitCaseConfig, formConfigs, followupItem, extra);
  }
  return followupValidateResult;
};

exports.validateAeForm = async function (caseId, lang) {
  const commitCaseConfig = getCommitCaseConfig(lang);
  const aeList = await Ae.find({
    case: caseId,
  });
  const aeValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'ae'));

  if (aeList.length === 0) {
    aeValidateResult.pass = null;
  } else {
    const saeList = await Sae.find({
      case: caseId,
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
        idToAppend: aeItem._id.toString(),
      };
      const aeItemValidateResult = {
        pass: true,
        linkBase: `/ae`,
        invalidFields: [],
        text: aeItem.event,
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
    case: caseId,
  });
  const aeList = await Ae.find({
    case: caseId,
  });
  const visitItems = await Visit.find({
    case: caseId,
  });
  const saeValidateResult = initValidateResult(getCommitCaseConfigItem(commitCaseConfig.records, 'sae'));

  const surgeryItem = await Surgery.findOne({
    case: caseId,
  });
  const surgerydtc = surgeryItem && surgeryItem.surgerydtc ? surgeryItem.surgerydtc : null;

  if (saeList.length === 0) {
    saeValidateResult.pass = null;
  } else {
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
        idToAppend: saeItem._id.toString(),
      };
      const aeItem = aeList.find((item) => {
        return item._id.toString() === saeItem.saeorigion;
      });
      let saeText = '';
      if (saeItem.saeorigion === 'other') {
        saeText = saeItem.saeorigion_1 ? saeItem.saeorigion_1 : 'other';
      } else {
        const matchVisit = visitItems.find((visitItem) => {
          return visitItem._id.toString() === saeItem.saeorigion;
        });
        if (matchVisit) {
          const daysAfterSurgery = getDaysAfterSurgery(surgerydtc, matchVisit.assessmentdtc);
          saeText = helpers.getPostoperativeDayText(daysAfterSurgery);
        }
      }
      const saeItemValidateResult = {
        pass: true,
        linkBase: `/sae`,
        invalidFields: [],
        text: aeItem ? aeItem.event : saeText,
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
