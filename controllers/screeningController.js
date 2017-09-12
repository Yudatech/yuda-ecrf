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
const getReviewUserConfig = require('../config/common/getReviewUserConfig');

const getCaseOverviewConfig = require('../config/getCaseOverviewConfig');
const getCaseFormConfig = require('../config/getCaseFormConfig');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');

const mongoose = require('mongoose');
const Case = mongoose.model('Case');
const User = mongoose.model('User');
const Screening = mongoose.model('Screening');

const logger = require('../logger');
const loggerHelper = require('../loggerHelper');

exports.caseOverviewForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const caseItem = await Case.findById(caseId);
  const caseObj = caseItem.toObject();
  const config = {
    _id: caseObj._id,
    subjname: caseObj.subjname,
    subjabbr: caseObj.subjabbr,
    subjAcceptDate: moment(caseObj.subjAcceptDate).format('ll'),
    attachedDoc: caseObj.attachedDoc
  };
  const auditInfo = [];
  const auditUserConfig = getReviewUserConfig(req.user.language);
  if (caseItem.auditBy && caseItem.auditBy.length) {
    if (caseItem.auditBy[0]) {
      const userInfo = await User.findById(caseItem.auditBy[0].user);
      const userRole = auditUserConfig.find((item) => item.value === userInfo.role).text;
      const auditDate = moment(caseItem.auditBy[0].auditDate).format('ll');
      auditInfo.push({
        role: userRole,
        name: userInfo.username,
        auditDate: auditDate
      });
    }
    else if (caseItem.auditBy[1]) {
      const userInfo = await User.findById(caseItem.auditBy[1].user);
      const userRole = auditUserConfig.find((item) => item.value === userInfo.role).text;
      const auditDate = moment(caseItem.auditBy[1].auditDate).format('ll');
      auditInfo.push({
        role: userRole,
        name: userInfo.username,
        auditDate: auditDate
      });
    }
  }
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'case overview', caseId));
  res.render('case-overview', {
    caseNav: CaseNav,
    caseId,
    auditInfo,
    caseOverviewConfig: config,
    buttonConfig: getButtonConfig(req.user.language),
    config: getCaseOverviewConfig(req.user.language),
    caseFormConfig: getCaseFormConfig(req.user.language)
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
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId, req.user.language);
  const caseItem = await Case.findById(req.params.caseId);
  const screeningItem = await getScreeningItemByCaseId(req.params.caseId);
  const config = getScreeningBasicConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
    }
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'screening-basic', req.params.caseId, config.formConfigs[key]);

    if (key === 'screeningdate') {
      config.formConfigs[key].value = moment(screeningItem[key]).format('MM/DD/YYYY');
      const startDateStr = moment(caseItem.subjAcceptDate).format('MM/DD/YYYY');
      config.formConfigs[key].extra = JSON.stringify({
        start: startDateStr
      });
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'screening-basic', req.params.caseId));
  res.render('case/screening-basic', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: req.params.caseId
  });
};

exports.updateCaseBasic = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getScreeningBasicConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  await createOrUpdateScreening(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'screening-basic', req.params.caseId), req.body);
  res.redirect(`/screening-basic/${caseId}`);
};

exports.caseInclusionForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningInclusionConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'screening-inclusion', req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'screening-inclusion', caseId));
  res.render('case/screening-inclusion', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(req.user.language),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseInclusion = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getScreeningInclusionConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  await createOrUpdateScreening(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'screening-inclusion', req.params.caseId), req.body);
  res.redirect(`/screening-inclusion/${caseId}`);
};

exports.caseExclusionForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningExclusionConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'screening-exclusion', req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'screening-exclusion', caseId));
  res.render('case/screening-exclusion', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(req.user.language),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseExclusion = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getScreeningExclusionConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  await createOrUpdateScreening(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'screening-exclusion', caseId), req.body);
  res.redirect(`/screening-exclusion/${caseId}`);
};

exports.caseDiseaseForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningDiseaseConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'screening-disease', req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'screening-disease', caseId));
  res.render('case/screening-disease', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(req.user.language),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseDisease = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getScreeningDiseaseConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  await createOrUpdateScreening(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'screening-disease', caseId), req.body);
  res.redirect(`/screening-disease/${caseId}`);
};

exports.caseConMedForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningConMedConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'screening-conmed', req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'screening-conmed', caseId));
  res.render('case/screening-conmed', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(req.user.language),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseConMed = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getScreeningConMedConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  await createOrUpdateScreening(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'screening-conmed', caseId), req.body);
  res.redirect(`/screening-conmed/${caseId}`);
};

exports.caseVitalSignForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningVitalSignConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
    }
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'screening-vitalsign', req.params.caseId, config.formConfigs[key]);
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
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'screening-vitalsign', caseId));
  res.render('case/screening-vitalsign', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(req.user.language),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseVitalSign = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getScreeningVitalSignConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  await createOrUpdateScreening(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'screening-vitalsign', caseId), req.body);
  res.redirect(`/screening-vitalsign/${caseId}`);
};

exports.caseLabForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningLabConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
    }
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'screening-lab', req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }

    // 对于某些参数，根据性别的不同需要有不同的上下限
    const sexIndex = screeningItem.sex === 1 ? 'female' : 'male';
    if (key === 'lab_1' || key === 'lab_5') {
      config.formConfigs[key].validation = config.formConfigs[key].validation[sexIndex];
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'screening-lab', caseId));
  res.render('case/screening-lab', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(req.user.language),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseLab = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getScreeningLabConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  await createOrUpdateScreening(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'screening-lab', caseId), req.body);
  res.redirect(`/screening-lab/${caseId}`);
};

exports.caseAssistantForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningAssistantConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
    }
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'screening-assistant', req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'screening-assistant', caseId));
  res.render('case/screening-assistant', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(req.user.language),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseAssistant = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getScreeningAssistantConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  await createOrUpdateScreening(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'screening-assistant', caseId), req.body);
  res.redirect(`/screening-assistant/${caseId}`);
};

exports.caseMethodForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningMethodConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'screening-method', req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'screening-method', caseId));
  res.render('case/screening-method', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(req.user.language),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseMethod = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getScreeningMethodConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  await createOrUpdateScreening(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'screening-method', caseId), req.body);
  res.redirect(`/screening-method/${caseId}`);
};

exports.caseRegionForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningRegionConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'screening-region', req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'screening-region', caseId));
  res.render('case/screening-region', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(req.user.language),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseRegion = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getScreeningRegionConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  await createOrUpdateScreening(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'screening-region', caseId), req.body);
  res.redirect(`/screening-region/${caseId}`);
};

exports.caseDignoseForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningDignoseConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
    }
    config.formConfigs[key].value = screeningItem[key];
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'screening-dignose', req.params.caseId, config.formConfigs[key]);
    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'screening-dignose', caseId));
  res.render('case/screening-dignose', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(req.user.language),
    config,
    caseId: req.params.caseId
  });
};

exports.updateCaseDignose = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getScreeningDignoseConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  await createOrUpdateScreening(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'screening-exclusion', caseId), req.body);
  res.redirect(`/screening-dignose/${caseId}`);
};
