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
  const surgeryObj = {
    _id: surgeryItem._id,
    case: surgeryItem.case,
    device_1: surgeryItem.device_1,
    device_2: surgeryItem.device_2,
    surgery_1: surgeryItem.surgery_1,
    surgery_2: surgeryItem.surgery_2,
    surgery_3: surgeryItem.surgery_3,
    surgery_4: surgeryItem.surgery_4,
    surgery_5: surgeryItem.surgery_5,
    surgery_6: surgeryItem.surgery_6,
    surgery_7: surgeryItem.surgery_7,
    surgery_8: surgeryItem.surgery_8,
    surgery_9: surgeryItem.surgery_9,
    surgery_10: surgeryItem.surgery_10,
    surgery_11: surgeryItem.surgery_11,
    surgery_12: surgeryItem.surgery_12,
    surgery_13: surgeryItem.surgery_13,
    surgery_14: surgeryItem.surgery_14,
    surgery_15: surgeryItem.surgery_15,
    surgery_16: surgeryItem.surgery_16,
    surgery_17: surgeryItem.surgery_17,
    surgery_18: surgeryItem.surgery_18,
    surgerydtc: moment(surgeryItem.surgerydtc).format('ll')
  };
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
