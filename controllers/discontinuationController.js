const moment = require('moment');
moment.locale('en');

const mongoose = require('mongoose');
const Discontinuation = mongoose.model('Discontinuation');
const Case = mongoose.model('Case');
const Surgery = mongoose.model('Surgery');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
const getDiscontinuationConfig = require('../config/getDiscontinuationConfig');
const getButtonConfig = require('../config/common/getButtonConfig');
const getCaseSecondAuthConfig = require('../config/getCaseSecondAuthConfig');
const getDiscontinuationCheckConfig = require('../config/getDiscontinuationCheckConfig');
const getCaseStatusConfig = require('../config/common/getCaseStatusConfig');

const commitHelpers = require('./commitHelpers');

async function createDiscontinuation(caseId, obj) {
  obj.case = caseId;
  await (new Discontinuation(obj)).save();
}

async function updateDiscontinuation(caseId, obj) {
  await Discontinuation.findOneAndUpdate({
    case: caseId
  }, obj);
}

async function createOrUpdateDiscontinuation(caseId, obj) {
  const discontinuationItem = await Discontinuation.findOne({
    case: caseId
  });
  if (discontinuationItem === null) {
    await createDiscontinuation(caseId, obj);
  }
  else {
    await updateDiscontinuation(caseId, obj);
  }
}

async function getDiscontinuationItemByCaseId(caseId) {
  let discontinuationItem = await Discontinuation.findOne({
    case: caseId
  });
  if (!discontinuationItem) {
    discontinuationItem = {
      case: caseId
    };
  }
  return discontinuationItem;
}

const tableName = 'discontinuation';

exports.discontinuationForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId, req.user.language);
  const discontinuationItem = await getDiscontinuationItemByCaseId(req.params.caseId);
  const surgeryItem = await Surgery.findOne({
    case: req.params.caseId
  });
  const caseItem = await Case.findById(req.params.caseId);
  const config = getDiscontinuationConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
    }
    if (key === 'discontinuedt') {
      config.formConfigs[key].value = discontinuationItem.discontinuedt ? moment(discontinuationItem.discontinuedt).format('YYYY/MM/DD') : '';
      const surgerydate = surgeryItem ? moment(surgeryItem.surgerydtc).format('YYYY/MM/DD') : moment().format('YYYY/MM/DD');
      config.formConfigs[key].extra = JSON.stringify({ surgerydate: surgerydate });
    }
    else {
      config.formConfigs[key].value = discontinuationItem[key];
    }
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'discontinuation', req.params.caseId, config.formConfigs[key]);

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });

  res.render('discontinuation', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: req.params.caseId,
    secondAuthConfig: getCaseSecondAuthConfig(req.user.language),
    caseStatus: caseItem.status
  });
};

exports.updateDiscontinuation = async (req, res) => {
  req.user.authenticate(req.body.password, async function (err, model) {
    if (model === false) {
      req.flash('error', 'Wrong password.');
      res.redirect('back');
    }
    else {
      delete req.body.password;
      const caseId = req.params.caseId;
      const config = getDiscontinuationConfig(req.user.language);
      Object.keys(config.formConfigs).forEach((key) => {
        const type = config.formConfigs[key].type;
        if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
          if (req.body[key] !== undefined) {
            req.body[key] = req.sanitizeBody(key).escape();
          }
        }
      });
      if (req.body.discontinuedt === '') {
        delete req.body.discontinuedt;
      }
      await createOrUpdateDiscontinuation(caseId, req.body);

      const result = [];
      const discontinuebeforesurgery = req.body.discontinuebeforesurgery;
      if (discontinuebeforesurgery === true) {
        result.push(await commitHelpers.validateScreeningForm(caseId, req.user.language));
      }
      else {
        result.push(await commitHelpers.validateScreeningForm(caseId, req.user.language));
        result.push(await commitHelpers.validateReviewChecklistForm(caseId, req.user.language));
        result.push(await commitHelpers.validateSurgeryForm(caseId, req.user.language));
      }

      const discontinuationCompleted = result.find((item) => {
        return item.pass === false;
      }) === undefined;

      if (discontinuationCompleted) {
        const caseItem = await Case.findByIdAndUpdate(caseId, { status: 'quit' }, { new: true });
        res.locals.case = caseItem;
        res.redirect(`/discontinuation/${caseId}`);
      }
      else {
        const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
        const discontinuationCheckConfig = getDiscontinuationCheckConfig();
        res.locals.case = await Case.findById(caseId);
        res.locals.caseStatusText = getCaseStatusConfig(req.user.language);
        res.render('discontinuation-check', {
          caseNav: CaseNav,
          caseId,
          config: discontinuationCheckConfig,
          buttonConfig: getButtonConfig(req.user.language),
          result: result
        });
      }
    }
  });
};
