const moment = require('moment');
moment.locale('zh-cn');

const getButtonConfig = require('../config/common/getButtonConfig');
const getCommitCaseConfig = require('../config/getCommitCaseConfig');
const getCaseFormConfig = require('../config/getCaseFormConfig');

const helpers = require('./helpers');

const mongoose = require('mongoose');
const Case = mongoose.model('Case');
const Screening = mongoose.model('Screening');
const ScreeningChecklist = mongoose.model('ScreeningChecklist');
const ReviewChecklist = mongoose.model('ReviewChecklist');
const Discontinuation = mongoose.model('Discontinuation');
const Cm = mongoose.model('Cm');
const Sae = mongoose.model('Sae');
const Ae = mongoose.model('Ae');
const Surgery = mongoose.model('Surgery');
const Visit = mongoose.model('Visit');

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
  res.redirect(`/overview/${req.body._id}`);
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
    caseFormConfig: getCaseFormConfig(),
    buttonConfig: getButtonConfig()
  });
};

exports.commitCase = async (req, res) => {
  const caseId = req.params.caseId;
  const obj = {
    status: 'committed'
  };
  await Case.findByIdAndUpdate(caseId, obj);
  res.redirect('back');
};

exports.showCaseCommitForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const commitCaseConfig = getCommitCaseConfig();
  const configs = [];
  await Promise.all(commitCaseConfig.configs.map(async (item) => {
    item = await getCommitConfigMessage(caseId, item);
    configs.push(item);
  }));
  let finished = configs.find((config) => {
    return config.finished === false;
  }) === undefined;

  res.render('commit-case', {
    caseNav: CaseNav,
    caseId,
    configs,
    finished,
    buttonConfig: getButtonConfig()
  });
};

async function getCommitConfigMessage(caseId, config) {
  const commitCaseConfig = getCommitCaseConfig();
  const table = config.name;

  let items = [];
  if (table === 'screening') {
    items.push(await Screening.findOne({
      case: caseId
    }));
  }
  else if (table === 'screeningchecklist') {
    items.push(await ScreeningChecklist.findOne({
      case: caseId
    }));
  }
  else if (table === 'reviewchecklist') {
    items.push(await ReviewChecklist.findOne({
      case: caseId
    }));
  }
  else if (table === 'discontinuation') {
    items.push(await Discontinuation.findOne({
      case: caseId
    }));
  }
  else if (table === 'cm') {
    items = await Cm.find({
      case: caseId
    });
  }
  else if (table === 'sae') {
    items = await Sae.find({
      case: caseId
    });
  }
  else if (table === 'ae') {
    items = await Ae.find({
      case: caseId
    });
  }
  else if (table === 'surgery') {
    items = await Surgery.find({
      case: caseId
    });
  }
  else if (table === 'visit') {
    items = await Visit.find({
      case: caseId
    });
  }

  const total = config.total;
  if (items.length === 0 || items[0] === null) {
    config.message = commitCaseConfig.empty;
    config.finished = false;
  }
  else {
    let num = 0;
    items.forEach((item) => {
      const obj = item.toObject();
      let finished = 0;
      Object.keys(obj).forEach((key) => {
        if (key.charAt(0) !== '_' && obj[key] !== null) {
          finished++;
        }
      });
      num = num + (total - finished);
    });
    if (num === 0) {
      config.message = commitCaseConfig.finished;
      config.finished = true;
    }
    else {
      config.message = commitCaseConfig.ongoing.replace('__NUM__', num);
      config.finished = false;
    }
  }

  return config;
}
