const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Cm = mongoose.model('Cm');

const helpers = require('./helpers');
const getCmConfig = require('../config/cm/getCmConfig');
const getCmTableConfig = require('../config/cm/getCmTableConfig');
const getDoseMethodsConfig = require('../config/cm/getDoseMethodsConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

async function getCmListByCaseId(caseId) {
  const cmList = await Cm.find({
    case: caseId
  });
  return cmList;
}

exports.cmTable = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId);
  const cmList = await getCmListByCaseId(req.params.caseId);
  const cmListFormated = cmList.map((item) => {
    const cm = {
      _id: item._id,
      case: item.case,
      drug: item.drug,
      dosing: item.dosing,
      cmstdtc: moment(item.cmstdtc).format('ll'),
      cmeddtc: moment(item.cmeddtc).format('ll'),
      cmrsn: item.cmrsn
    };
    if (item.dosemtd_1 === 4) {
      cm.dosemtd = item.dosemtd_2;
    }
    else {
      cm.dosemtd = getDoseMethodsConfig().find((method) => {
        return method.value === item.dosemtd_1;
      }).text;
    }
    return cm;
  });
  res.render('cm/cmTable', {
    caseNav: CaseNav,
    cmTableConfig: getCmTableConfig(),
    buttonConfig: getButtonConfig(),
    cmList: cmListFormated,
    caseId: req.params.caseId
  });
};

exports.cmForm = async (req, res) => {
  const caseId = req.params.caseId;
  const cmId = req.params.cmId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  let cm;

  if (cmId !== undefined) {
    const cmItem = await Cm.findById(cmId);
    cm = {
      _id: cmItem._id,
      case: cmItem.case,
      drug: cmItem.drug,
      dosing: cmItem.dosing,
      dosemtd_1: cmItem.dosemtd_1,
      dosemtd_2: cmItem.dosemtd_2,
      cmstdtc: moment(cmItem.cmstdtc).format('MM/DD/YYYY'),
      cmeddtc: moment(cmItem.cmeddtc).format('MM/DD/YYYY'),
      cmrsn: cmItem.cmrsn
    };
  }
  else {
    cm = {
      case: caseId
    };
  }

  res.render('cm/cmForm', {
    caseNav: CaseNav,
    cmConfig: getCmConfig(),
    doseMethodsConfig: getDoseMethodsConfig(),
    buttonConfig: getButtonConfig(),
    cm: cm,
    caseId: caseId
  });
};

exports.createCm = async (req, res) => {
  const caseId = req.params.caseId;
  req.body.case = caseId;
  await (new Cm(req.body)).save();
  res.redirect(`/cmlist/${caseId}`);
};

exports.updateCm = async (req, res) => {
  const caseId = req.params.caseId;
  req.body.case = caseId;
  const cmId = req.params.cmId;
  await Cm.findByIdAndUpdate(cmId, req.body);
  res.redirect(`/cmlist/${caseId}`);
};
