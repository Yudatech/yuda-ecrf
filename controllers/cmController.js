const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Cm = mongoose.model('Cm');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
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

const tableName = 'cm';

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
    else if (item.dosemtd_1 === null) {
      cm.dosemtd = '';
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
    config: getCmTableConfig(),
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
    cm = cmItem.toObject();
  }
  else {
    cm = {
      case: caseId
    };
  }

  const config = getCmConfig();
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter]();
    }
    if (key === 'cmstdtc') {
      config.formConfigs[key].value = moment(cm.cmstdtc).format('MM/DD/YYYY');
    }
    else if (key === 'cmeddtc') {
      config.formConfigs[key].value = moment(cm.cmeddtc).format('MM/DD/YYYY');
    }
    else {
      config.formConfigs[key].value = cm[key];
    }

    if (cmId !== undefined) {
      config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'cm', req.params.caseId, config.formConfigs[key], cmId);
    }

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });

  res.render('cm/cmForm', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(),
    caseId: caseId,
    cmId: cm._id
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

exports.removeCm = async (req, res) => {
  const caseId = req.params.caseId;
  const id = req.params.cmId;
  await Cm.findByIdAndRemove(id);
  res.redirect(`/cmlist/${caseId}`);
};
