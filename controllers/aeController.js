const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Ae = mongoose.model('Ae');
const Surgery = mongoose.model('Surgery');
const Visit = mongoose.model('Visit');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
const getAeConfig = require('../config/ae/getAeConfig');
const getAeTableConfig = require('../config/ae/getAeTableConfig');
const getAeLevelConfig = require('../config/ae/getAeLevelConfig');
const getAeRelConfig = require('../config/ae/getAeRelConfig');
const getAeResConfig = require('../config/ae/getAeResConfig');
const getAeSourceConfig = require('../config/ae/getAeSourceConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

async function getAeListByCaseId(caseId) {
  const aeList = await Ae.find({
    case: caseId
  });
  return aeList;
}

function getAeLevelText(aeserv) {
  return getAeLevelConfig().find((item) => {
    return item.value === aeserv;
  }).text;
}

function getAeRelText(aerel) {
  return getAeRelConfig().find((item) => {
    return item.value === aerel;
  }).text;
}

function getAeResText(aeres) {
  return getAeResConfig().find((item) => {
    return item.value === aeres;
  }).text;
}

const tableName = 'ae';

exports.aeTable = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId);
  const aeList = await getAeListByCaseId(req.params.caseId);
  const aeListFormated = aeList.map((item) => {
    return {
      _id: item._id,
      case: item.case,
      event: item.event,
      aeserv: getAeLevelText(item.aeserv),
      aestdtc: moment(item.aestdtc).format('ll'),
      aeeddtc: moment(item.aeeddtc).format('ll'),
      aerel: getAeRelText(item.aerel),
      aeres_1: getAeResText(item.aeres_1)
    };
  });
  res.render('ae/aeTable', {
    caseNav: CaseNav,
    config: getAeTableConfig(),
    buttonConfig: getButtonConfig(),
    aeList: aeListFormated,
    caseId: req.params.caseId
  });
};

exports.aeForm = async (req, res) => {
  const caseId = req.params.caseId;
  const aeId = req.params.aeId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  const aeSourceConfig = await helpers.getAeSourceConfig(caseId);
  let ae;

  if (aeId !== undefined) {
    const aeItem = await Ae.findById(aeId);
    ae = aeItem.toObject();
    ae.aestdtc_date = moment(aeItem.aestdtc).format('MM/DD/YYYY');
    ae.aestdtc_time = moment(aeItem.aestdtc).format('HH:mm');
    ae.aeeddtc_date = moment(aeItem.aeeddtc).format('MM/DD/YYYY');
    ae.aeeddtc_time = moment(aeItem.aeeddtc).format('HH:mm');
  }
  else {
    ae = {
      case: caseId
    };
  }

  const config = getAeConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter]();
    }

    if (key === 'aestdtc') {
      config.formConfigs[key].date = {
        name: 'aestdtc_date',
        value: moment(ae.aestdtc).format('MM/DD/YYYY')
      };
      config.formConfigs[key].time = {
        name: 'aestdtc_time',
        value: moment(ae.aestdtc).format('HH:mm')
      };
    }
    else if (key === 'aeeddtc') {
      config.formConfigs[key].date = {
        name: 'aeeddtc_date',
        value: moment(ae.aeeddtc).format('MM/DD/YYYY')
      };
      config.formConfigs[key].time = {
        name: 'aeeddtc_time',
        value: moment(ae.aeeddtc).format('HH:mm')
      };
    }
    else if (key === 'aeorigion') {
      config.formConfigs[key].options = aeSourceConfig;
      config.formConfigs[key].value = ae[key];
    }
    else {
      config.formConfigs[key].value = ae[key];
    }

    if (aeId !== undefined) {
      config.formConfigs[key].questionLink = helpers.getQuestionLink(tableName, 'ae', req.params.caseId, config.formConfigs[key], aeId);
    }

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });

  res.render('ae/aeForm', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(),
    caseId: caseId,
    aeId: aeId
  });
};

exports.createAe = async (req, res) => {
  const caseId = req.params.caseId;
  req.body.case = caseId;
  req.body.aestdtc = `${req.body.aestdtc_date} ${req.body.aestdtc_time}`;
  req.body.aeeddtc = `${req.body.aeeddtc_date} ${req.body.aeeddtc_time}`;
  await (new Ae(req.body)).save();
  res.redirect(`/aelist/${caseId}`);
};

exports.updateAe = async (req, res) => {
  const caseId = req.params.caseId;
  req.body.case = caseId;
  const aeId = req.params.aeId;
  req.body.aestdtc = `${req.body.aestdtc_date} ${req.body.aestdtc_time}`;
  req.body.aeeddtc = `${req.body.aeeddtc_date} ${req.body.aeeddtc_time}`;
  await Ae.findByIdAndUpdate(aeId, req.body);
  res.redirect(`/aelist/${caseId}`);
};

exports.removeAe = async (req, res) => {
  const caseId = req.params.caseId;
  const id = req.params.aeId;
  await Ae.findByIdAndRemove(id);
  res.redirect(`/aelist/${caseId}`);
};
