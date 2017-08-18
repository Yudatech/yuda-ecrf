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
const getButtonConfig = require('../config/common/getButtonConfig');

const getCaseFormConfig = require('../config/getCaseFormConfig');

const helpers = require('./helpers');

const mongoose = require('mongoose');
const Case = mongoose.model('Case');
const Screening = mongoose.model('Screening');

const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    }
    else {
      next({
        message: 'That filetype isn\'t allowed!'
      }, false);
    }
  }
};

exports.uploadAcceptDoc = multer(multerOptions).single('attachedDoc');

exports.saveAcceptDoc = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.attachedDoc = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.write(`./public/uploads/${req.body.attachedDoc}`);
  // once we have written the photo to our filesystem, keep going!
  next();
};

exports.createCase = async (req, res) => {
  req.body.user = req.user._id;
  await (new Case(req.body)).save();
  res.redirect(`/screening/basic/${req.body._id}`);
};

exports.caseForm = async (req, res) => {
  const userAbbr = req.user.userabbr;
  const userCases = await Case.find({
    user: req.user._id
  });
  const caseIndexArray = userCases.map((item) => {
    const caseId = item._id;
    return parseInt(caseId.split(userAbbr)[1]);
  });
  let max = caseIndexArray.length === 0 ? 0 : Math.max(...caseIndexArray);
  max++;
  max = '' + max;
  const num = 4;
  const newId = `${userAbbr}${'0'.repeat(num - max.length)}${max}`;
  res.render('case/caseForm', {
    _id: newId,
    caseFormConfig: getCaseFormConfig()
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
  const caseItem = await Case.findOne({
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

exports.caseBasicForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId);
  const screeningItem = await getScreeningItemByCaseId(req.params.caseId);
  const config = getScreeningBasicConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    if (key === 'sex') {
      config.formConfigs[key].value = screeningItem.sex;
      config.formConfigs[key].options = getSexConfig();
    }
    else {
      config.formConfigs[key].value = screeningItem[key];
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
  res.redirect(`/screening/basic/${caseId}`);
};

exports.caseInclusionForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningInclusionConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
  });
  res.render('case/screening-inclusion', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config: getScreeningInclusionConfig(),
    caseId: req.params.caseId
  });
};

exports.updateCaseInclusion = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening/inclusion/${caseId}`);
};

exports.caseExclusionForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningExclusionConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
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
  res.redirect(`/screening/exclusion/${caseId}`);
};

exports.caseDiseaseForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningDiseaseConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
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
  res.redirect(`/screening/disease/${caseId}`);
};

exports.caseConMedForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningConMedConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = screeningItem[key];
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
  res.redirect(`/screening/conmed/${caseId}`);
};

exports.caseVitalSignForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  const config = getScreeningVitalSignConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    if (key === 'vitalsign_4') {
      config.formConfigs[key].value = screeningItem.vitalsign_4;
      config.formConfigs[key].options = getAbdominalExamResultConfig();
    }
    else {
      config.formConfigs[key].value = screeningItem[key];
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
  res.redirect(`/screening/vitalsign/${caseId}`);
};

exports.caseLabForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  res.render('case/screening-lab', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config: getScreeningLabConfig(),
    labResultEvaluationConfig: getLabResultEvaluationConfig(),
    screeningObj: screeningItem
  });
};

exports.updateCaseLab = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening/lab/${caseId}`);
};

exports.caseAssistantForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  res.render('case/screening-assistant', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config: getScreeningAssistantConfig(),
    assistantExamResultConfig: getAssistantExamResultConfig(),
    screeningObj: screeningItem
  });
};

exports.updateCaseAssistant = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening/assistant/${caseId}`);
};

exports.caseMethodForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  res.render('case/screening-method', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config: getScreeningMethodConfig(),
    screeningObj: screeningItem
  });
};

exports.updateCaseMethod = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening/method/${caseId}`);
};

exports.caseRegionForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  res.render('case/screening-region', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config: getScreeningRegionConfig(),
    screeningObj: screeningItem
  });
};

exports.updateCaseRegion = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening/region/${caseId}`);
};

exports.caseDignoseForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const screeningItem = await getScreeningItemByCaseId(caseId);
  res.render('case/screening-dignose', {
    caseNav: CaseNav,
    buttonConfig: getButtonConfig(),
    config: getScreeningDignoseConfig(),
    clinicalStageConfig: getClinicalStageConfig(),
    screeningObj: screeningItem
  });
};

exports.updateCaseDignose = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateScreening(caseId, req.body);
  res.redirect(`/screening/dignose/${caseId}`);
};
