const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Surgery = mongoose.model('Surgery');

const helpers = require('./helpers');
const getSurgeryConfig = require('../config/surgery/getSurgeryConfig');
const getSurgeryAnastomoticMethodsConfig = require('../config/surgery/getSurgeryAnastomoticMethodsConfig');
const getSurgeryDmhDmhcModelConfig = require('../config/surgery/getSurgeryDmhDmhcModelConfig');
const getSurgeryLapAidModelConfig = require('../config/surgery/getSurgeryLapAidModelConfig');
const getSurgeryMethodsConfig = require('../config/surgery/getSurgeryMethodsConfig');
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

exports.surgeryForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId);
  const surgeryItem = await getSurgeryItemByCaseId(req.params.caseId);
  const config = getSurgeryConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    if (key === 'device_1') {
      config.formConfigs[key].value = surgeryItem.key;
      config.formConfigs[key].options = getSurgeryLapAidModelConfig();
    }
    else if (key === 'device_2') {
      config.formConfigs[key].value = surgeryItem.key;
      config.formConfigs[key].options = getSurgeryDmhDmhcModelConfig();
    }
    else if (key === 'surgery_8') {
      config.formConfigs[key].value = surgeryItem.key;
      config.formConfigs[key].options = getSurgeryAnastomoticMethodsConfig();
    }
    else if (key === 'surgery_9') {
      config.formConfigs[key].value = surgeryItem.key;
      config.formConfigs[key].options = getSurgeryMethodsConfig();
    }
    else if (key === 'surgerydtc') {
      config.formConfigs[key].value = moment(surgeryItem.surgerydtc).format('MM/DD/YYYY');
    }
    else {
      config.formConfigs[key].value = surgeryItem[key];
    }
  });
  res.render('surgery', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(),
    caseId: req.params.caseId
  });
};

exports.updateSurgery = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateSurgery(caseId, req.body);
  res.redirect(`/surgery/${caseId}`);
};
