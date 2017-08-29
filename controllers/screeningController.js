const moment = require('moment');
moment.locale('zh-cn');

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
const getButtonConfig = require('../config/common/getButtonConfig');

const getCaseOverviewConfig = require('../config/getCaseOverviewConfig');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');

const mongoose = require('mongoose');
const Case = mongoose.model('Case');
const Screening = mongoose.model('Screening');

exports.caseOverviewForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const caseItem = await Case.findById(caseId);
  const caseObj = caseItem.toObject();
  const config = {
    _id: caseObj._id,
    subjname: caseObj.subjname,
    subjabbr: caseObj.subjabbr,
    subjAcceptDate: moment(caseObj.subjAcceptDate).format('ll'),
    attachedDoc: caseObj.attachedDoc
  };
  res.render('case-overview', {
    caseNav: CaseNav,
    caseOverviewConfig: config,
    buttonConfig: getButtonConfig(),
    config: getCaseOverviewConfig(req.user.language)
  });
};

async function createScreening(caseId, obj) {
  obj.case = caseId;
  await (new Screening(obj)).save();
}

async function updateScreening(caseId, obj) {
  await Screening.findOneAndUpdate({
    case: caseId
  }, obj);
}

async function createOrUpdateScreening(caseId, obj) {
  const caseItem = await Screening.findOne({
    case: caseId
  });
  if (caseItem === null) {
    await createScreening(caseId, obj);
  }
  else {
    await updateScreening(caseId, obj);
  }
}

async function getScreeningItemByCaseId(caseId) {
  let screeningItem = await Screening.findOne({
    case: caseId
  });
  if (!screeningItem) {
    screeningItem = {
      case: caseId
    };
  }
  return screeningItem;
}

const tableName = 'screening';

exports.caseBasicForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId);
  const caseItem = await Case.findById(req.params.caseId);
  const screeningItem = await getScreeningItemByCaseId(req.params.caseId);
  const config = getScreeningBasicConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter]();
    }
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, req.params.caseId, config.formConfigs[key]);

    if (key === 'screeningdate') {
      config.formConfigs[key].value = moment(screeningItem[key]).format('MM/DD/YYYY');
      const startDateStr = moment(caseItem.subjAcceptDate).format('MM/DD/YYYY');
      config.formConfigs[key].extra = JSON.stringify({
        start: startDateStr
      });
    }
  });
  res.render('case/screening-basic', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(),
    caseId: req.params.caseId
  });
};

exports.updateCaseBasic = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening-basic/${caseId}`);
};

exports.caseInclusionForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningInclusionConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  res.render('case/screening-inclusion', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseInclusion = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening-inclusion/${caseId}`);
};

exports.caseExclusionForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningExclusionConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  res.render('case/screening-exclusion', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseExclusion = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening-exclusion/${caseId}`);
};

exports.caseDiseaseForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningDiseaseConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  res.render('case/screening-disease', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseDisease = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening-disease/${caseId}`);
};

exports.caseConMedForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningConMedConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  res.render('case/screening-conmed', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseConMed = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening-conmed/${caseId}`);
};

exports.caseVitalSignForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningVitalSignConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter]();
    }
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }

    if (key === 'vitalsign_9') {
      const extraDataKeys = ['disease_6', 'disease_7', 'conmed_1', 'conmed_2', 'conmed_4'];
      const extraObj = {};
      extraDataKeys.forEach((item) => {
        extraObj[item] = screeningItem[item] === true;
      });
      config.formConfigs[key].extra = JSON.stringify(extraObj);
    }
  });
  res.render('case/screening-vitalsign', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseVitalSign = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening-vitalsign/${caseId}`);
};

exports.caseLabForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningLabConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter]();
    }
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }

    // 对于某些参数，根据性别的不同需要有不同的上下限
    const sexIndex = screeningItem.sex === 1 ? 'female' : 'male';
    if (key === 'lab_1' || key === 'lab_5') {
      config.formConfigs[key].validation = config.formConfigs[key].validation[sexIndex];
    }
  });
  res.render('case/screening-lab', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseLab = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening-lab/${caseId}`);
};

exports.caseAssistantForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningAssistantConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter]();
    }
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  res.render('case/screening-assistant', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseAssistant = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening-assistant/${caseId}`);
};

exports.caseMethodForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningMethodConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  res.render('case/screening-method', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseMethod = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening-method/${caseId}`);
};

exports.caseRegionForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningRegionConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  res.render('case/screening-region', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseRegion = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening-region/${caseId}`);
};

exports.caseDignoseForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningDignoseConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter]();
    }
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  res.render('case/screening-dignose', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseDignose = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening-dignose/${caseId}`);
};
