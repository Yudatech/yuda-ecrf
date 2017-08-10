const CaseNav = require('../config/CaseNav');
const getSexConfig = require('../config/common/getSexConfig');
const getScreeningBasicConfig = require('../config/screening/getScreeningBasicConfig');
const getScreeningInclusionConfig = require('../config/screening/getScreeningInclusionConfig');
const getScreeningExclusionConfig = require('../config/screening/getScreeningExclusionConfig');
const getScreeningDiseaseConfig = require('../config/screening/getScreeningDiseaseConfig');
const getScreeningConMedConfig = require('../config/screening/getScreeningConMedConfig');
const getScreeningVitalSignConfig = require('../config/screening/getScreeningVitalSignConfig');
const getAbdominalExamResultConfig = require('../config/common/getAbdominalExamResultConfig');
const getScreeningLabConfig = require('../config/screening/getScreeningLabConfig');
const getLabResultEvaluationConfig = require('../config/common/getLabResultEvaluationConfig');
const getScreeningAssistantConfig = require('../config/screening/getScreeningAssistantConfig');
const getAssistantExamResultConfig = require('../config/common/getAssistantExamResultConfig');
const getScreeningMethodConfig = require('../config/screening/getScreeningMethodConfig');
const getScreeningRegionConfig = require('../config/screening/getScreeningRegionConfig');
const getScreeningDignoseConfig = require('../config/screening/getScreeningDignoseConfig');
const getClinicalStageConfig = require('../config/common/getClinicalStageConfig');

const getCaseFormConfig = require('../config/getCaseFormConfig');

exports.caseForm = (req, res) => {
  res.render('case/caseForm', {
    caseFormConfig: getCaseFormConfig()
  });
};

exports.caseBasicForm = (req, res) => {
  res.render('case/screening-basic', {
    caseNav: CaseNav,
    config: getScreeningBasicConfig(),
    sexConfig: getSexConfig()
  });
};

exports.caseInclusionForm = (req, res) => {
  res.render('case/screening-inclusion', {
    caseNav: CaseNav,
    config: getScreeningInclusionConfig()
  });
};

exports.caseExclusionForm = (req, res) => {
  res.render('case/screening-exclusion', {
    caseNav: CaseNav,
    config: getScreeningExclusionConfig()
  });
};

exports.caseDiseaseForm = (req, res) => {
  res.render('case/screening-disease', {
    caseNav: CaseNav,
    config: getScreeningDiseaseConfig()
  });
};

exports.caseConMedForm = (req, res) => {
  res.render('case/screening-conmed', {
    caseNav: CaseNav,
    config: getScreeningConMedConfig()
  });
};

exports.caseVitalSignForm = (req, res) => {
  res.render('case/screening-vitalsign', {
    caseNav: CaseNav,
    config: getScreeningVitalSignConfig(),
    abdominalExamResultConfig: getAbdominalExamResultConfig()
  });
};

exports.caseLabForm = (req, res) => {
  res.render('case/screening-lab', {
    caseNav: CaseNav,
    config: getScreeningLabConfig(),
    labResultEvaluationConfig: getLabResultEvaluationConfig()
  });
};

exports.caseAssistantForm = (req, res) => {
  res.render('case/screening-assistant', {
    caseNav: CaseNav,
    config: getScreeningAssistantConfig(),
    assistantExamResultConfig: getAssistantExamResultConfig()
  });
};

exports.caseMethodForm = (req, res) => {
  res.render('case/screening-method', {
    caseNav: CaseNav,
    config: getScreeningMethodConfig()
  });
};

exports.caseRegionForm = (req, res) => {
  res.render('case/screening-region', {
    caseNav: CaseNav,
    config: getScreeningRegionConfig()
  });
};

exports.caseDignoseForm = (req, res) => {
  res.render('case/screening-dignose', {
    caseNav: CaseNav,
    config: getScreeningDignoseConfig(),
    clinicalStageConfig: getClinicalStageConfig()
  });
};
