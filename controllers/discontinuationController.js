const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Discontinuation = mongoose.model('Discontinuation');

const helpers = require('./helpers');
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

exports.discontinuationForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId);
  const discontinuationItem = await getDiscontinuationItemByCaseId(req.params.caseId);
  const config = getDiscontinuationConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    if (key === 'discontinuedt') {
      config.formConfigs[key].value = moment(discontinuationItem.discontinuedt).format('MM/DD/YYYY');
    }
    else {
      config.formConfigs[key].value = discontinuationItem[key];
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
  res.redirect(`/discontinuation/${caseId}`);
};
