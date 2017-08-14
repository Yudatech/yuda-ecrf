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
const getButtonConfig = require('../config/common/getButtonConfig');

const getCaseFormConfig = require('../config/getCaseFormConfig');

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
  console.log(obj);
  await (new Screening(obj)).save();
}

async function updateScreening(caseId, obj) {
  await Screening.findOneAndUpdate({
    case: caseId
  }, obj);
}

exports.caseBasicForm = async (req, res) => {
  const caseId = req.params.caseId;
  const caseItem = await Case.findOne({
    case: caseId
  });
  res.render('case/screening-basic', {
    caseNav: CaseNav,
    config: getScreeningBasicConfig(),
    sexConfig: getSexConfig(),
    buttonConfig: getButtonConfig(),
    caseObj: caseItem || {case: caseId}
  });
};

exports.updateCaseBasic = async (req, res) => {
  const caseId = req.params.caseId;
  const caseItem = await Case.findOne({
    case: caseId
  });
  if (caseItem === null) {
    await createScreening(caseId, req.body);
  }
  else {
    await updateScreening(caseId, req.body);
  }
  res.redirect(`/screening/basic/${caseId}`);
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
