const CaseNav = require('../config/CaseNav');
const getSexConfig = require('../config/getSexConfig');
const getScreeningBasicConfig = require('../config/getScreeningBasicConfig');
const getScreeningInclusionConfig = require('../config/getScreeningInclusionConfig');
const getScreeningExclusionConfig = require('../config/getScreeningExclusionConfig');
const getScreeningDiseaseConfig = require('../config/getScreeningDiseaseConfig');
const getScreeningConMedConfig = require('../config/getScreeningConMedConfig');
const getScreeningVitalSignConfig = require('../config/getScreeningVitalSignConfig');
const getAbdominalExamResultConfig = require('../config/getAbdominalExamResultConfig');
const getScreeningLabConfig = require('../config/getScreeningLabConfig');
const getLabResultEvaluationConfig = require('../config/getLabResultEvaluationConfig');
const getScreeningAssistantConfig = require('../config/getScreeningAssistantConfig');
const getAssistantExamResultConfig = require('../config/getAssistantExamResultConfig');

exports.caseForm = (req, res) => {
  res.render('case');
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
