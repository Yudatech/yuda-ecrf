const moment = require('moment');
moment.locale('en');

const mongoose = require('mongoose');
const Screening = mongoose.model('Screening');
const ReviewChecklist = mongoose.model('ReviewChecklist');
const Discontinuation = mongoose.model('Discontinuation');
const Sae = mongoose.model('Sae');
const Ae = mongoose.model('Ae');
const Surgery = mongoose.model('Surgery');
const Visit = mongoose.model('Visit');
const Evacuation = mongoose.model('Evacuation');
const Followup = mongoose.model('Followup');
const EvacuationFollowup = mongoose.model('EvacuationFollowup');

const getScreeningBasicConfig = require('../config/screening/getScreeningBasicConfig');
const getScreeningInclusionConfig = require('../config/screening/getScreeningInclusionConfig');
const getScreeningExclusionConfig = require('../config/screening/getScreeningExclusionConfig');
const getScreeningPrioRadiationTherapyConfig = require('../config/screening/getScreeningPrioRadiationTherapyConfig');
const getScreeningMethodConfig = require('../config/screening/getScreeningMethodConfig');
const getScreeningRegionConfig = require('../config/screening/getScreeningRegionConfig');
const getScreeningDignoseConfig = require('../config/screening/getScreeningDignoseConfig');

const getReviewChecklistConfig = require('../config/getReviewChecklistConfig');
const getDiscontinuationConfig = require('../config/getDiscontinuationConfig');
const getSaeConfig = require('../config/sae/getSaeConfig');
const getAeConfig = require('../config/ae/getAeConfig');
const getSurgeryConfig = require('../config/surgery/getSurgeryConfig');
const getLifeAssessmentConfig = require('../config/life/getLifeAssessmentConfig');
const getVisitConfig = require('../config/visit/getVisitConfig');
const getEvacuationConfig = require('../config/evacuation/getEvacuationConfig');

const decorationHelper = require('./decorationHelper');

const helpers = require('./helpers');
const getEvacuationFollowupConfig = require('../config/evacuation/getEvacuationFollowupConfig');
const getFollowupConfig = require('../config/followup/getFollowupConfig');

exports.getConfigForQuestion = function (table, field, lang) {
  if (table === 'screening') {
    let formConfigs;

    formConfigs = getScreeningBasicConfig(lang).formConfigs;
    if (formConfigs[field]) {
      return getScreeningBasicConfig(lang);
    }
    formConfigs = getScreeningDignoseConfig(lang).formConfigs;
    if (formConfigs[field]) {
      return getScreeningDignoseConfig(lang);
    }
    formConfigs = getScreeningExclusionConfig(lang).formConfigs;
    if (formConfigs[field]) {
      return getScreeningExclusionConfig(lang);
    }
    formConfigs = getScreeningPrioRadiationTherapyConfig(lang).formConfigs;
    if (formConfigs[field]) {
      return getScreeningPrioRadiationTherapyConfig(lang);
    }
    formConfigs = getScreeningInclusionConfig(lang).formConfigs;
    if (formConfigs[field]) {
      return getScreeningInclusionConfig(lang);
    }
    formConfigs = getScreeningMethodConfig(lang).formConfigs;
    if (formConfigs[field]) {
      return getScreeningMethodConfig(lang);
    }
    formConfigs = getScreeningRegionConfig(lang).formConfigs;
    if (formConfigs[field]) {
      return getScreeningRegionConfig(lang);
    }
  } else if (table === 'reviewchecklist') {
    return getReviewChecklistConfig(lang);
  } else if (table === 'discontinuation') {
    return getDiscontinuationConfig(lang);
  } else if (table === 'sae') {
    return getSaeConfig(lang);
  } else if (table === 'ae') {
    return getAeConfig(lang);
  } else if (table === 'surgery') {
    const surgeryConfig = getSurgeryConfig(lang);
    surgeryConfig.title = surgeryConfig.title;
    return surgeryConfig;
  } else if (table === 'visit') {
    return getVisitConfig(lang);
  } else if (table === 'life') {
    return getLifeAssessmentConfig(lang);
  } else if (table === 'evacuation') {
    return getEvacuationConfig(lang);
  } else if (table === 'evacuationfollowup') {
    return getEvacuationFollowupConfig(lang);
  } else if (table === 'followup') {
    return getFollowupConfig(lang);
  }
};

exports.getValueForQuestion = async function (table, caseId, secondaryId) {
  let item;
  if (table === 'screening') {
    item = await Screening.findOne({
      case: caseId,
    });
  } else if (table === 'reviewchecklist') {
    item = await ReviewChecklist.findOne({
      case: caseId,
    });
  } else if (table === 'discontinuation') {
    item = await Discontinuation.findOne({
      case: caseId,
    });
  } else if (table === 'sae') {
    item = await Sae.findById(secondaryId);
  } else if (table === 'ae') {
    item = await Ae.findById(secondaryId);
  } else if (table === 'surgery') {
    item = await Surgery.findOne({
      case: caseId,
    });
  } else if (table === 'visit') {
    item = await Visit.findById(secondaryId);
  } else if (table === 'evacuation') {
    item = await Evacuation.findOne({
      case: caseId,
    });
  } else if (table === 'evacuationfollowup') {
    item = await EvacuationFollowup.findById(secondaryId);
  } else if (table === 'followup') {
    item = await Followup.findOne({
      case: caseId,
    });
  }
  return item;
};

exports.updateValueForQuestion = async function (table, caseId, secondaryId, field, value) {
  const obj = {};
  obj[field] = value;
  if (table === 'screening') {
    await Screening.findOneAndUpdate(
      {
        case: caseId,
      },
      obj
    );
  } else if (table === 'reviewchecklist') {
    await ReviewChecklist.findOneAndUpdate(
      {
        case: caseId,
      },
      obj
    );
  } else if (table === 'discontinuation') {
    await Discontinuation.findOneAndUpdate(
      {
        case: caseId,
      },
      obj
    );
  } else if (table === 'sae') {
    await Sae.findByIdAndUpdate(secondaryId, obj);
  } else if (table === 'ae') {
    await Ae.findByIdAndUpdate(secondaryId, obj);
  } else if (table === 'surgery') {
    await Surgery.findOneAndUpdate(
      {
        case: caseId,
      },
      obj
    );
  } else if (table === 'visit') {
    await Visit.findByIdAndUpdate(secondaryId, obj);
  } else if (table === 'evacuation') {
    await Evacuation.findOneAndUpdate(
      {
        case: caseId,
      },
      obj
    );
  } else if (table === 'evacuationfollowup') {
    await EvacuationFollowup.findByIdAndUpdate(secondaryId, obj);
  } else if (table === 'followup') {
    await Followup.findOneAndUpdate(
      {
        case: caseId,
      },
      obj
    );
  }
};

exports.appendValueAndOptionsToFormConfig = function (fieldConfig, fieldValue, aeSourceConfig, saeSourceConfig) {
  if (fieldConfig.type === 'date') {
    fieldConfig.value = moment(fieldValue).format('YYYY/MM/DD');
  } else if (fieldConfig.name === 'aestdtc') {
    fieldConfig.date = {
      name: 'aestdtc_date',
      value: moment(fieldValue).format('YYYY/MM/DD'),
    };
    fieldConfig.time = {
      name: 'aestdtc_time',
      value: moment(fieldValue).format('HH:mm'),
    };
  } else if (fieldConfig.name === 'aeeddtc') {
    fieldConfig.date = {
      name: 'aeeddtc_date',
      value: moment(fieldValue).format('YYYY/MM/DD'),
    };
    fieldConfig.time = {
      name: 'aeeddtc_time',
      value: moment(fieldValue).format('HH:mm'),
    };
  } else if (fieldConfig.name === 'saestdtc') {
    fieldConfig.date = {
      name: 'saestdtc_date',
      value: moment(fieldValue).format('YYYY/MM/DD'),
    };
    fieldConfig.time = {
      name: 'saestdtc_time',
      value: moment(fieldValue).format('HH:mm'),
    };
  } else if (fieldConfig.name === 'saenoticedtc') {
    fieldConfig.date = {
      name: 'saenoticedtc_date',
      value: moment(fieldValue).format('YYYY/MM/DD'),
    };
    fieldConfig.time = {
      name: 'saenoticedtc_time',
      value: moment(fieldValue).format('HH:mm'),
    };
  } else if (fieldConfig.name === 'saedtc') {
    fieldConfig.date = {
      name: 'saedtc_date',
      value: moment(fieldValue).format('YYYY/MM/DD'),
    };
    fieldConfig.time = {
      name: 'saedtc_time',
      value: moment(fieldValue).format('HH:mm'),
    };
  } else {
    fieldConfig.value = fieldValue;
  }

  if (fieldConfig.type === 'select' || fieldConfig.type === 'radio') {
    if (fieldConfig.name === 'postoperativeday') {
      fieldConfig.options = helpers.getCompletePostoperativeDayList();
    } else {
      fieldConfig.options = decorationHelper[fieldConfig.optionsGetter]();
    }
  } else if (fieldConfig.type === 'customselect') {
    if (fieldConfig.name === 'saeorigion') {
      fieldConfig.options = saeSourceConfig;
    } else if (fieldConfig.name === 'aeorigion') {
      fieldConfig.options = aeSourceConfig;
    }
  }

  return fieldConfig;
};
