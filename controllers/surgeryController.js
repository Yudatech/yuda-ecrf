const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Surgery = mongoose.model('Surgery');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
const getSurgeryConfig = require('../config/surgery/getSurgeryConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

async function createSurgery(caseId, obj) {
  obj.case = caseId;
  await (new Surgery(obj)).save();
}

async function updateSurgery(caseId, obj) {
  await Surgery.findOneAndUpdate({
    case: caseId
  }, obj);
}

async function createOrUpdateSurgery(caseId, obj) {
  const surgeryItem = await Surgery.findOne({
    case: caseId
  });
  if (surgeryItem === null) {
    await createSurgery(caseId, obj);
  }
  else {
    await updateSurgery(caseId, obj);
  }
}

async function getSurgeryItemByCaseId(caseId) {
  let surgeryItem = await Surgery.findOne({
    case: caseId
  });
  if (!surgeryItem) {
    surgeryItem = {
      case: caseId
    };
  }
  return surgeryItem;
}

const tableName = 'surgery';

exports.surgeryForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId);
  const surgeryItem = await getSurgeryItemByCaseId(req.params.caseId);
  const config = getSurgeryConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter]();
    }
    if (key === 'surgerydtc') {
      config.formConfigs[key].value = moment(surgeryItem.surgerydtc).format('MM/DD/YYYY');
    }
    else {
      config.formConfigs[key].value = surgeryItem[key];
    }
    config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'surgery', req.params.caseId, config.formConfigs[key]);

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  res.render('surgery', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: req.params.caseId
  });
};

exports.updateSurgery = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateSurgery(caseId, req.body);
  res.redirect(`/surgery/${caseId}`);
};
