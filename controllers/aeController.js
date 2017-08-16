const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Ae = mongoose.model('Ae');

const helpers = require('./helpers');
const getAeConfig = require('../config/ae/getAeConfig');
const getAeTableConfig = require('../config/ae/getAeTableConfig');
const getAeLevelConfig = require('../config/ae/getAeLevelConfig');
const getAeRelConfig = require('../config/ae/getAeRelConfig');
const getAeResConfig = require('../config/ae/getAeResConfig');
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
    aeTableConfig: getAeTableConfig(),
    buttonConfig: getButtonConfig(),
    aeList: aeListFormated,
    caseId: req.params.caseId
  });
};

exports.aeForm = async (req, res) => {
  const caseId = req.params.caseId;
  const aeId = req.params.aeId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId);
  let ae;

  if (aeId !== undefined) {
    const aeItem = await Ae.findById(aeId);
    ae = {
      _id: aeItem._id,
      case: aeItem.case,
      aeorigion: aeItem.aeorigion,
      event: aeItem.event,
      aestdtc_date: moment(aeItem.aestdtc).format('MM/DD/YYYY'),
      aestdtc_time: moment(aeItem.aestdtc).format('HH:mm'),
      aeeddtc_date: moment(aeItem.aeeddtc).format('MM/DD/YYYY'),
      aeeddtc_time: moment(aeItem.aeeddtc).format('HH:mm'),
      aeserv: aeItem.aeserv,
      aeact: aeItem.aeact,
      aerpt: aeItem.aerpt,
      aerel: aeItem.aerel,
      aeres_1: aeItem.aeres_1,
      aeres_2: aeItem.aeres_2,
      aesae: aeItem.aesae,
      aedevicedft: aeItem.aedevicedft,
      aediscon: aeItem.aediscon
    };
  }
  else {
    ae = {
      case: caseId
    };
  }

  res.render('ae/aeForm', {
    caseNav: CaseNav,
    aeConfig: getAeConfig(),
    aeLevelConfig: getAeLevelConfig(),
    aeRelConfig: getAeRelConfig(),
    aeResConfig: getAeResConfig(),
    buttonConfig: getButtonConfig(),
    ae: ae,
    caseId: caseId
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
  await Ae.findByIdAndUpdate(aeId, req.body);
  res.redirect(`/aelist/${caseId}`);
};

exports.removeAe = async (req, res) => {
  const caseId = req.params.caseId;
  const id = req.params.aeId;
  await Ae.findByIdAndRemove(id);
  res.redirect(`/aelist/${caseId}`);
};
