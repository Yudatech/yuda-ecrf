const moment = require('moment');
moment.locale('zh-cn');

const getButtonConfig = require('../config/common/getButtonConfig');
const getCommitCaseConfig = require('../config/getCommitCaseConfig');
const getCaseFormConfig = require('../config/getCaseFormConfig');
const getCaseSecondAuthConfig = require('../config/getCaseSecondAuthConfig');
const commitHelpers = require('./commitHelpers');

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
const Question = mongoose.model('Question');
const History = mongoose.model('History');

const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const logger = require('../logger');
const loggerHelper = require('../loggerHelper');

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
  logger.info(loggerHelper.createLogMessage(req.user, 'upload', 'accept document'), {
    filename: req.body.attachedDoc
  });
  // once we have written the photo to our filesystem, keep going!
  next();
};

exports.createCase = async (req, res) => {
  req.body.user = req.user._id;
  req.body.site = req.user.site._id;
  await (new Case(req.body)).save();
  logger.info(loggerHelper.createLogMessage(req.user, 'create', 'case'), req.body);
  res.redirect(`/overview/${req.body._id}`);
};

async function doRemoveCase(caseId) {
  await Case.remove({_id: caseId});
  await Screening.remove({case: caseId});
  await ScreeningChecklist.remove({case: caseId});
  await ReviewChecklist.remove({case: caseId});
  await Discontinuation.remove({case: caseId});
  await Cm.remove({case: caseId});
  await Sae.remove({case: caseId});
  await Ae.remove({case: caseId});
  await Surgery.remove({case: caseId});
  await Visit.remove({case: caseId});
  await Question.remove({case: caseId});
  await History.remove({case: caseId});
}

exports.removeCase = async (req, res) => {
  const caseId = req.params.caseId;
  await doRemoveCase(caseId);
  logger.info(loggerHelper.createLogMessage(req.user, 'remove', 'case', caseId));
  res.redirect('back');
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
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'case', newId));
  res.render('case/caseForm', {
    _id: newId,
    caseFormConfig: getCaseFormConfig(req.user.language),
    buttonConfig: getButtonConfig(req.user.language)
  });
};

exports.showAuditCaseForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const caseItem = await Case.findById(caseId);
  res.locals.case = caseItem;
  if (caseItem.status !== 'committed') {
    req.flash('error', `Case ${caseId} status is not committed anymore, you can not audit it.`);
    logger.warn(loggerHelper.createLogMessage(req.user, 'failed to audit', 'a not committed case', caseId));
    res.redirect('back');
  }
  else if (req.user.role !== 'supervisor' && req.user.role !== 'monitor') {
    req.flash('error', `You do not have permission to audit a case.`);
    logger.warn(loggerHelper.createLogMessage(req.user, 'do not have permission to audit', 'a case'));
    res.redirect('back');
  }
  else if (req.user.site._id.toString() !== caseItem.site._id.toString()) {
    req.flash('error', `You do not have permission audit this case.`);
    logger.warn(loggerHelper.createLogMessage(req.user, 'do not have permission to audit', 'a case'));
    res.redirect('back');
  }
  else {
    logger.info(loggerHelper.createLogMessage(req.user, 'show', 'audit case form', caseId));
    res.render('case-second-auth', {
      caseNav: CaseNav,
      buttonConfig: getButtonConfig(req.user.language),
      purpose: 'audit',
      config: getCaseSecondAuthConfig(req.user.language),
      caseId: req.params.caseId
    });
  }
};

exports.auditCase = async (req, res) => {
  const caseId = req.params.caseId;
  const caseItem = await Case.findById(caseId);
  res.locals.case = caseItem;
  if (caseItem.status !== 'committed') {
    req.flash('error', `Case ${caseId} status is not committed anymore, you can not audit it.`);
    logger.warn(loggerHelper.createLogMessage(req.user, 'failed to audit', 'a not committed case', caseId));
    res.redirect('back');
  }
  else if (req.user.role !== 'supervisor' && req.user.role !== 'monitor') {
    req.flash('error', `You do not have permission to audit a case.`);
    logger.warn(loggerHelper.createLogMessage(req.user, 'do not have permission to audit', 'a case'));
    res.redirect('back');
  }
  else if (req.user.site._id.toString() !== caseItem.site._id.toString()) {
    req.flash('error', `You do not have permission audit this case.`);
    logger.warn(loggerHelper.createLogMessage(req.user, 'do not have permission to audit', 'a case'));
    res.redirect('back');
  }
  else {
    const password = req.body.password;
    req.user.authenticate(password, function(err, model) {
      if (model === false) {
        req.flash('error', 'Wrong password.');
        logger.warn(loggerHelper.createLogMessage(req.user, 'input wrong', 'password when audit', caseId));
        res.redirect('back');
      }
      else {
        caseItem.audit(req.user._id, function(err, caseNew) {
          if (err) {
            req.flash('error', err.toString());
            logger.warn(err);
            res.redirect('back');
          }
          else {
            res.locals.case = caseNew;
            logger.info(loggerHelper.createLogMessage(req.user, 'audit', 'case', caseId));
            res.redirect(`/overview/${caseId}`);
          }
        });
      }
    });
  }
};

exports.showLockCaseForm = async (req, res) => {
  const caseId = req.params.caseId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const caseItem = await Case.findById(caseId);
  res.locals.case = caseItem;
  if (caseItem.status === 'quit' || caseItem.status === 'locked') {
    req.flash('error', `Case ${caseId} is already finished, you can not lock it.`);
    logger.warn(loggerHelper.createLogMessage(req.user, 'failed to lock', 'already finished case', caseId));
    res.redirect('back');
  }
  else if (req.user.role !== 'admin') {
    req.flash('error', `You do not have permission to lock a case.`);
    logger.warn(loggerHelper.createLogMessage(req.user, 'do not have permission to lock', 'a case'));
    res.redirect('back');
  }
  else {
    logger.info(loggerHelper.createLogMessage(req.user, 'show', 'lock case form', caseId));
    res.render('case-second-auth', {
      caseNav: CaseNav,
      buttonConfig: getButtonConfig(req.user.language),
      purpose: 'lock',
      config: getCaseSecondAuthConfig(req.user.language),
      caseId: req.params.caseId
    });
  }
};

exports.lockCase = async (req, res) => {
  const caseId = req.params.caseId;
  const caseItem = await Case.findById(caseId);
  res.locals.case = caseItem;
  if (caseItem.status === 'quit' || caseItem.status === 'locked') {
    req.flash('error', `Case ${caseId} is already finished, you can not lock it.`);
    logger.warn(loggerHelper.createLogMessage(req.user, 'failed to lock', 'already finished case', caseId));
    res.redirect('back');
  }
  else if (req.user.role !== 'admin') {
    req.flash('error', `You do not have permission to lock a case.`);
    logger.warn(loggerHelper.createLogMessage(req.user, 'do not have permission to lock', 'a case'));
    res.redirect('back');
  }
  else {
    const password = req.body.password;
    req.user.authenticate(password, function(err, model) {
      if (model === false) {
        req.flash('error', 'Wrong password.');
        logger.warn(loggerHelper.createLogMessage(req.user, 'input wrong', 'password when lock', caseId));
        res.redirect('back');
      }
      else {
        caseItem.lock(req.user._id, function(err, caseNew) {
          if (err) {
            req.flash('error', err.toString());
            logger.warn(err);
            res.redirect('back');
          }
          else {
            res.locals.case = caseNew;
            logger.info(loggerHelper.createLogMessage(req.user, 'lock', 'case', caseId));
            res.redirect(`/overview/${caseId}`);
          }
        });
      }
    });
  }
};

exports.commitCase = async (req, res) => {
  const caseId = req.params.caseId;
  const caseItem = await Case.findById(caseId);
  res.locals.case = caseItem;
  if (caseItem.status !== 'open') {
    req.flash('error', `Case ${caseId} status is not open anymore, you can not commit it.`);
    logger.warn(loggerHelper.createLogMessage(req.user, 'failed to commit', 'a not open case', caseId));
    res.redirect('back');
  }
  else if (req.user.role !== 'cra') {
    req.flash('error', `You do not have permission to commit a case.`);
    logger.warn(loggerHelper.createLogMessage(req.user, 'do not have permission to commit', 'a case'));
    res.redirect('back');
  }
  else if (caseItem.user._id.toString() !== req.user._id.toString()) {
    req.flash('error', `You do not have permission to commit a case.`);
    logger.warn(loggerHelper.createLogMessage(req.user, 'do not have permission to commit', 'a case'));
    res.redirect('back');
  }
  else {
    const password = req.body.password;
    req.user.authenticate(password, function(err, model) {
      if (model === false) {
        req.flash('error', 'Wrong password.');
        logger.warn(loggerHelper.createLogMessage(req.user, 'input wrong', 'password when commit', caseId));
        res.redirect('back');
      }
      else {
        const obj = {
          status: 'committed'
        };
        Case.findByIdAndUpdate(caseId, obj, {new: true}, function(err, caseNew) {
          if (err) {
            req.flash('error', err.toString());
            logger.warn(err);
            res.redirect('back');
          }
          else {
            res.locals.case = caseNew;
            logger.info(loggerHelper.createLogMessage(req.user, 'commit', 'case', caseId));
            res.redirect(`/overview/${caseId}`);
          }
        });
      }
    });
  }
};

exports.showCaseCommitForm = async (req, res) => {
  const caseId = req.params.caseId;
  const caseItem = await Case.findById(caseId);
  res.locals.case = caseItem;
  if (caseItem.status !== 'open') {
    req.flash('error', `Case ${caseId} status is not open anymore, you can not commit it.`);
    res.redirect('back');
  }
  else if (req.user.role !== 'cra') {
    req.flash('error', `You do not have permission to commit a case.`);
    res.redirect('back');
  }
  else if (caseItem.user._id.toString() !== req.user._id.toString()) {
    req.flash('error', `You do not have permission to commit a case.`);
    res.redirect('back');
  }
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  const commitCaseConfig = getCommitCaseConfig();
  const result = [];
  result.push(await commitHelpers.validateScreeningForm(caseId, req.user.language));
  result.push(await commitHelpers.validateScreeningChecklistForm(caseId, req.user.language));
  result.push(await commitHelpers.validateReviewChecklistForm(caseId, req.user.language));
  result.push(await commitHelpers.validateSurgeryForm(caseId, req.user.language));
  result.push(await commitHelpers.validateVisitForm(caseId, req.user.language));
  result.push(await commitHelpers.validateCmForm(caseId, req.user.language));
  result.push(await commitHelpers.validateAeForm(caseId, req.user.language));
  result.push(await commitHelpers.validateSaeForm(caseId, req.user.language));

  const showForm = result.find((item) => {
    return item.pass === false;
  }) === undefined;

  logger.info(loggerHelper.createLogMessage(req.user, 'tried to commit', 'case', caseId));

  res.render('commit-case', {
    caseNav: CaseNav,
    caseId,
    config: commitCaseConfig,
    buttonConfig: getButtonConfig(),
    result: result,
    showForm
  });
};
