const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Discontinuation = mongoose.model('Discontinuation');
const Case = mongoose.model('Case');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
const getDiscontinuationConfig = require('../config/getDiscontinuationConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

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
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId);
  const discontinuationItem = await getDiscontinuationItemByCaseId(req.params.caseId);
  const config = getDiscontinuationConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter]();
    }
    if (key === 'discontinuedt') {
      config.formConfigs[key].value = moment(discontinuationItem.discontinuedt).format('MM/DD/YYYY');
    }
    else {
      config.formConfigs[key].value = discontinuationItem[key];
    }
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, req.params.caseId, config.formConfigs[key]);

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  res.render('discontinuation', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(),
    caseId: req.params.caseId
  });
};

exports.updateDiscontinuation = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateDiscontinuation(caseId, req.body);
  const caseItem = await Case.findByIdAndUpdate(caseId, {status: 'quit'}, {new: true});
  res.locals.case = caseItem;
  res.redirect(`/discontinuation/${caseId}`);
};
