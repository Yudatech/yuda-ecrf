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

const decorationHelper = require('./decorationHelper');

exports.getFormConfigForQuestion = function(table, field) {
  let fieldConfig;
  const formConfigs = {};

  if (table === 'screening') {
    Object.assign(formConfigs, getScreeningBasicConfig().formConfigs);
    Object.assign(formConfigs, getScreeningAssistantConfig().formConfigs);
    Object.assign(formConfigs, getScreeningConMedConfig());
    Object.assign(formConfigs, getScreeningDignoseConfig().formConfigs);
    Object.assign(formConfigs, getScreeningDiseaseConfig().formConfigs);
    Object.assign(formConfigs, getScreeningExclusionConfig().formConfigs);
    Object.assign(formConfigs, getScreeningInclusionConfig().formConfigs);
    Object.assign(formConfigs, getScreeningLabConfig().formConfigs);
    Object.assign(formConfigs, getScreeningMethodConfig().formConfigs);
    Object.assign(formConfigs, getScreeningRegionConfig().formConfigs);
    Object.assign(formConfigs, getScreeningVitalSignConfig().formConfigs);
  }
  else if (table === 'screeningchecklist') {
    Object.assign(formConfigs, getScreeningChecklistConfig().formConfigs);
  }
  else if (table === 'reviewchecklist') {
    Object.assign(formConfigs, getReviewChecklistConfig().formConfigs);
  }
  else if (table === 'discontinuation') {
    Object.assign(formConfigs, getDiscontinuationConfig().formConfigs);
  }
  else if (table === 'cm') {
    Object.assign(formConfigs, getCmConfig().formConfigs);
  }
  else if (table === 'sae') {
    Object.assign(formConfigs, getSaeConfig().formConfigs);
  }
  else if (table === 'ae') {
    Object.assign(formConfigs, getAeConfig().formConfigs);
  }
  else if (table === 'surgery') {
    Object.assign(formConfigs, getSurgeryConfig().formConfigs);
  }
  else if (table === 'visit') {
    Object.assign(formConfigs, getVisitConfig().formConfigs);
  }

  fieldConfig = formConfigs[field];
  if (fieldConfig.type === 'select') {
    fieldConfig.options = decorationHelper[fieldConfig.optionsGetter]();
  }
  return fieldConfig;
};

exports.getFieldValueForQuestion = async function(table, caseId, field, secondaryId) {
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
  return item[field];
};
