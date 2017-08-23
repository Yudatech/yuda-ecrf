const moment = require('moment');
moment.locale('zh-cn');

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

const getScreeningBasicConfig = require('../config/screening/getScreeningBasicConfig');
const getScreeningInclusionConfig = require('../config/screening/getScreeningInclusionConfig');
const getScreeningExclusionConfig = require('../config/screening/getScreeningExclusionConfig');
const getScreeningDiseaseConfig = require('../config/screening/getScreeningDiseaseConfig');
const getScreeningConMedConfig = require('../config/screening/getScreeningConMedConfig');
const getScreeningVitalSignConfig = require('../config/screening/getScreeningVitalSignConfig');
const getScreeningLabConfig = require('../config/screening/getScreeningLabConfig');
const getScreeningAssistantConfig = require('../config/screening/getScreeningAssistantConfig');
const getScreeningMethodConfig = require('../config/screening/getScreeningMethodConfig');
const getScreeningRegionConfig = require('../config/screening/getScreeningRegionConfig');
const getScreeningDignoseConfig = require('../config/screening/getScreeningDignoseConfig');

const getScreeningChecklistConfig = require('../config/getScreeningChecklistConfig');
const getReviewChecklistConfig = require('../config/getReviewChecklistConfig');
const getDiscontinuationConfig = require('../config/getDiscontinuationConfig');
const getCmConfig = require('../config/cm/getCmConfig');
const getSaeConfig = require('../config/sae/getSaeConfig');
const getAeConfig = require('../config/ae/getAeConfig');
const getSurgeryConfig = require('../config/surgery/getSurgeryConfig');
const getVisitConfig = require('../config/visit/getVisitConfig');

exports.getConfigForQuestion = function(table, field) {
  if (table === 'screening') {
    let formConfigs;

    formConfigs = getScreeningBasicConfig().formConfigs;
    if (formConfigs[field]) {
      return getScreeningBasicConfig();
    }
    formConfigs = getScreeningAssistantConfig().formConfigs;
    if (formConfigs[field]) {
      return getScreeningAssistantConfig();
    }
    formConfigs = getScreeningConMedConfig().formConfigs;
    if (formConfigs[field]) {
      return getScreeningConMedConfig();
    }
    formConfigs = getScreeningDignoseConfig().formConfigs;
    if (formConfigs[field]) {
      return getScreeningDignoseConfig();
    }
    formConfigs = getScreeningDiseaseConfig().formConfigs;
    if (formConfigs[field]) {
      return getScreeningDiseaseConfig();
    }
    formConfigs = getScreeningExclusionConfig().formConfigs;
    if (formConfigs[field]) {
      return getScreeningExclusionConfig();
    }
    formConfigs = getScreeningInclusionConfig().formConfigs;
    if (formConfigs[field]) {
      return getScreeningInclusionConfig();
    }
    formConfigs = getScreeningLabConfig().formConfigs;
    if (formConfigs[field]) {
      return getScreeningLabConfig();
    }
    formConfigs = getScreeningMethodConfig().formConfigs;
    if (formConfigs[field]) {
      return getScreeningMethodConfig();
    }
    formConfigs = getScreeningRegionConfig().formConfigs;
    if (formConfigs[field]) {
      return getScreeningRegionConfig();
    }
    formConfigs = getScreeningVitalSignConfig().formConfigs;
    if (formConfigs[field]) {
      return getScreeningVitalSignConfig();
    }
  }
  else if (table === 'screeningchecklist') {
    return getScreeningChecklistConfig();
  }
  else if (table === 'reviewchecklist') {
    return getReviewChecklistConfig();
  }
  else if (table === 'discontinuation') {
    return getDiscontinuationConfig();
  }
  else if (table === 'cm') {
    return getCmConfig();
  }
  else if (table === 'sae') {
    return getSaeConfig();
  }
  else if (table === 'ae') {
    return getAeConfig();
  }
  else if (table === 'surgery') {
    const surgeryConfig = getSurgeryConfig();
    surgeryConfig.title = surgeryConfig.title.surgery;
    return surgeryConfig;
  }
  else if (table === 'visit') {
    return getVisitConfig();
  }
};

exports.getValueForQuestion = async function(table, caseId, secondaryId) {
  let item;
  if (table === 'screening') {
    item = await Screening.findOne({
      case: caseId
    });
  }
  else if (table === 'screeningchecklist') {
    item = await ScreeningChecklist.findOne({
      case: caseId
    });
  }
  else if (table === 'reviewchecklist') {
    item = await ReviewChecklist.findOne({
      case: caseId
    });
  }
  else if (table === 'discontinuation') {
    item = await Discontinuation.findOne({
      case: caseId
    });
  }
  else if (table === 'cm') {
    item = await Cm.findById(secondaryId);
  }
  else if (table === 'sae') {
    item = await Sae.findById(secondaryId);
  }
  else if (table === 'ae') {
    item = await Ae.findById(secondaryId);
  }
  else if (table === 'surgery') {
    item = await Surgery.findById(secondaryId);
  }
  else if (table === 'visit') {
    item = await Visit.findById(secondaryId);
  }
  return item;
};

exports.updateValueForQuestion = async function(table, caseId, secondaryId, field, value) {
  const obj = {};
  obj[field] = value;
  if (table === 'screening') {
    await Screening.findOneAndUpdate({
      case: caseId
    }, obj);
  }
  else if (table === 'screeningchecklist') {
    await ScreeningChecklist.findOneAndUpdate({
      case: caseId
    }, obj);
  }
  else if (table === 'reviewchecklist') {
    await ReviewChecklist.findOneAndUpdate({
      case: caseId
    }, obj);
  }
  else if (table === 'discontinuation') {
    await Discontinuation.findOneAndUpdate({
      case: caseId
    }, obj);
  }
  else if (table === 'cm') {
    await Cm.findByIdAndUpdate(secondaryId, obj);
  }
  else if (table === 'sae') {
    await Sae.findByIdAndUpdate(secondaryId, obj);
  }
  else if (table === 'ae') {
    await Ae.findByIdAndUpdate(secondaryId, obj);
  }
  else if (table === 'surgery') {
    await Surgery.findByIdAndUpdate(secondaryId, obj);
  }
  else if (table === 'visit') {
    await Visit.findByIdAndUpdate(secondaryId, obj);
  }
};

exports.appendValueToFormConfig = function(fieldConfig, fieldValue) {
  if (fieldConfig.type === 'date') {
    fieldConfig.value = moment(fieldValue).format('MM/DD/YYYY');
  }
  else if (fieldConfig.name === 'aestdtc') {
    fieldConfig.date = {
      name: 'aestdtc_date',
      value: moment(fieldValue).format('MM/DD/YYYY')
    };
    fieldConfig.time = {
      name: 'aestdtc_time',
      value: moment(fieldValue).format('HH:mm')
    };
  }
  else if (fieldConfig.name === 'aeeddtc') {
    fieldConfig.date = {
      name: 'aeeddtc_date',
      value: moment(fieldValue).format('MM/DD/YYYY')
    };
    fieldConfig.time = {
      name: 'aeeddtc_time',
      value: moment(fieldValue).format('HH:mm')
    };
  }
  else {
    fieldConfig.value = fieldValue;
  }
  return fieldConfig;
};
