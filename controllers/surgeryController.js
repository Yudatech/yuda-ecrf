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
  return surgeryItem;
}

exports.surgeryForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId);
  const surgeryItem = await getSurgeryItemByCaseId(req.params.caseId);
  let surgeryObj;
  if (!surgeryItem) {
    surgeryObj = {
      case: req.params.caseId
    };
  }
  else {
    surgeryObj = surgeryItem.toObject();
    surgeryObj.surgerydtc = moment(surgeryItem.surgerydtc).format('MM/DD/YYYY');
  }
  res.render('surgery', {
    caseNav: CaseNav,
    config: getSurgeryConfig(),
    surgeryAnastomoticMethodsConfig: getSurgeryAnastomoticMethodsConfig(),
    surgeryLapAidModelConfig: getSurgeryLapAidModelConfig(),
    surgeryDmhDmhcModelConfig: getSurgeryDmhDmhcModelConfig(),
    surgeryMethodsConfig: getSurgeryMethodsConfig(),
    buttonConfig: getButtonConfig(),
    surgeryObj: surgeryObj
  });
};

exports.updateSurgery = async (req, res) => {
  const caseId = req.params.caseId;
  await createOrUpdateSurgery(caseId, req.body);
  res.redirect(`/surgery/${caseId}`);
};
