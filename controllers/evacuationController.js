const moment = require('moment');
moment.locale('en');

const mongoose = require('mongoose');
const Case = mongoose.model('Case');
const Evacuation = mongoose.model('Evacuation');
const Surgery = mongoose.model('Surgery');
const EvacuationFollowup = mongoose.model('EvacuationFollowup');

const helpers = require('./helpers');
const decorationHelper = require('./decorationHelper');
const getEvacuationConfig = require('../config/evacuation/getEvacuationConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

const logger = require('../logger');
const loggerHelper = require('../loggerHelper');
const getEvacuationFollowupConfig = require('../config/evacuation/getEvacuationFollowupConfig');

async function createEvacuation(caseId, obj) {
  obj.case = caseId;
  await new Evacuation(obj).save();
}

async function updateEvacuation(caseId, obj) {
  await Evacuation.findOneAndUpdate(
    {
      case: caseId,
    },
    obj
  );
}

async function createOrUpdateEvacuation(caseId, obj) {
  const evacuationItem = await Evacuation.findOne({
    case: caseId,
  });
  if (evacuationItem === null) {
    await createEvacuation(caseId, obj);
  } else {
    await updateEvacuation(caseId, obj);
  }
}

async function getEvacuationItemByCaseId(caseId) {
  let evacuationItem = await Evacuation.findOne({
    case: caseId,
  });
  if (!evacuationItem) {
    evacuationItem = {
      case: caseId,
    };
  }
  return evacuationItem;
}

async function getFollowupListByCaseId(caseId) {
  const followupList = await EvacuationFollowup.find({
    case: caseId,
  });
  return followupList;
}

function getDaysAfterSurgery(surgerydtc, followupdtc) {
  const surgerydtcValue = moment(surgerydtc).valueOf();
  const followupdtcValue = moment(followupdtc).valueOf();
  return Math.floor((followupdtcValue - surgerydtcValue) / 24 / 60 / 60 / 1000);
}

const tableName = 'evacuation';

exports.evacuationForm = async (req, res) => {
  const CaseNav = helpers.appendCaseIdToCaseNav(req.params.caseId, req.user.language);
  const evacuationItem = await getEvacuationItemByCaseId(req.params.caseId);
  const config = getEvacuationConfig(req.user.language);

  const surgery = await Surgery.findOne({
    case: req.params.caseId,
  });
  const surgerydtc = surgery && surgery.surgerydtc ? surgery.surgerydtc : null;

  const followupConfig = getEvacuationFollowupConfig(req.user.language);
  const followupList = await getFollowupListByCaseId(req.params.caseId);
  let lastFollowupDate = '';
  const followupListFormatted = followupList.map((item) => {
    let statusValues = '';
    if (item['status'] === 1) {
      const statusKeys = ['status_1', 'status_2', 'status_3', 'status_4'];
      statusValues = statusKeys
        .map((key) => {
          if (item[key] === true) {
            return followupConfig.formConfigs[key].text;
          }
          return undefined;
        })
        .filter((item) => item)
        .join(', ');
    } else if (item['status'] === 0) {
      const options = decorationHelper[followupConfig.formConfigs['status'].optionsGetter](req.user.language);
      statusValues = options.find((i) => i.value === 0).text;
    }
    return {
      _id: item._id,
      case: item.case,
      postoperativedayValue: getDaysAfterSurgery(surgerydtc, item.assessmentdtc),
      assessmentdtcRaw: item.assessmentdtc,
      assessmentdtc: moment(item.assessmentdtc).format('ll'),
      postoperativeday: helpers.getPostoperativeDayText(getDaysAfterSurgery(surgerydtc, item.assessmentdtc)),
      status: statusValues,
    };
  });
  followupListFormatted.sort(function (a, b) {
    let vA = parseFloat(a.postoperativedayValue);
    let vB = parseFloat(b.postoperativedayValue);
    if (vA < vB) {
      return -1;
    } else if (vA > vB) {
      return 1;
    } else {
      return 0;
    }
  });
  if (followupListFormatted.length) {
    lastFollowupDate = moment(followupListFormatted[followupListFormatted.length - 1].assessmentdtcRaw).format(
      'YYYY/MM/DD'
    );
  }

  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
    }
    if (key === 'evacuationdtc') {
      config.formConfigs[key].value = evacuationItem.evacuationdtc
        ? moment(evacuationItem.evacuationdtc).format('YYYY/MM/DD')
        : '';
      const startDateStr = surgerydtc === null ? null : moment(surgerydtc).format('YYYY/MM/DD');
      config.formConfigs[key].extra = JSON.stringify({
        start: startDateStr,
        current: config.formConfigs[key].value,
        lock: lastFollowupDate,
      });
    } else {
      config.formConfigs[key].value = evacuationItem[key];
    }
    config.formConfigs[key].questionLink = helpers.getQuestionLink(
      tableName,
      'evacuation',
      req.params.caseId,
      config.formConfigs[key]
    );

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });

  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'evacuation', req.params.caseId));
  res.render('evacuation', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: req.params.caseId,
    canAdd: true,
    followupList: followupListFormatted,
  });
};

exports.updateEvacuation = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getEvacuationConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  if (req.body.evacuationdtc === '') {
    delete req.body.evacuationdtc;
  }
  const caseItem = await Case.findById(caseId);
  const origianlModel = await getEvacuationItemByCaseId(caseId);
  let originalValue = origianlModel;
  if (origianlModel.toObject) {
    originalValue = origianlModel.toObject();
  }
  if (originalValue._id) {
    originalValue._id = originalValue._id.toString();
  }
  const logData = {
    original: originalValue,
    update: req.body,
  };
  await createOrUpdateEvacuation(caseId, req.body);
  logger.info(loggerHelper.createLogMessage(req.user, 'update', 'evacuation', caseId, caseItem.status), logData);
  res.redirect(`/evacuation/${caseId}`);
};

exports.evacuationFollowupForm = async (req, res) => {
  const caseId = req.params.caseId;
  const followupId = req.params.followupId;
  const CaseNav = helpers.appendCaseIdToCaseNav(caseId, req.user.language);
  let evacuationFollowup;

  if (followupId !== undefined) {
    const evacuationFollowupItem = await EvacuationFollowup.findById(followupId);
    evacuationFollowup = evacuationFollowupItem.toObject();
  } else {
    evacuationFollowup = {
      case: caseId,
    };
  }

  const surgery = await Surgery.findOne({
    case: req.params.caseId,
  });
  const surgerydtc = surgery && surgery.surgerydtc ? surgery.surgerydtc : null;

  const config = getEvacuationFollowupConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    if (config.formConfigs[key].type === 'select' || config.formConfigs[key].type === 'radio') {
      config.formConfigs[key].options = decorationHelper[config.formConfigs[key].optionsGetter](req.user.language);
    }
    if (key === 'assessmentdtc') {
      config.formConfigs[key].value = evacuationFollowup.assessmentdtc
        ? moment(evacuationFollowup.assessmentdtc).format('YYYY/MM/DD')
        : '';
      const startDateStr = surgerydtc === null ? null : moment(surgerydtc).format('YYYY/MM/DD');
      config.formConfigs[key].extra = JSON.stringify({
        start: startDateStr,
      });
    } else if (key === 'postoperativeday') {
      const assessmentDate = evacuationFollowup.assessmentdtc;
      if (surgerydtc && assessmentDate) {
        const daysAfterSurgery = getDaysAfterSurgery(surgerydtc, assessmentDate);
        config.formConfigs[key].value = 'Postoperative day (POD) ' + daysAfterSurgery;
      } else {
        config.formConfigs[key].value = '';
      }
    } else {
      config.formConfigs[key].value = evacuationFollowup[key];
    }
    if (followupId !== undefined) {
      config.formConfigs[key].questionLink = helpers.getQuestionLink(
        'evacuationfollowup',
        'evacuationfollowup',
        req.params.caseId,
        config.formConfigs[key],
        followupId
      );
    }

    if (config.formConfigs[key].type === 'checkbox' && config.formConfigs[key].value === undefined) {
      config.formConfigs[key].value = false;
    }
  });
  logger.info(loggerHelper.createLogMessage(req.user, 'show', 'evacuationfollowup', req.params.caseId));
  res.render('evacuation-followup', {
    caseNav: CaseNav,
    config,
    buttonConfig: getButtonConfig(req.user.language),
    caseId: caseId,
    followupId: evacuationFollowup._id,
  });
};

exports.createEvacuationFollowup = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getEvacuationFollowupConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  req.body.case = caseId;
  if (req.body.assessmentdtc === '') {
    delete req.body.assessmentdtc;
  }
  await new EvacuationFollowup(req.body).save();
  const caseItem = await Case.findById(caseId);
  const logData = {
    update: req.body,
  };
  logger.info(
    loggerHelper.createLogMessage(req.user, 'create', 'evacuationfollowup', req.params.caseId, caseItem.status),
    logData
  );
  res.redirect(`/evacuation/${caseId}`);
};

exports.updateEvacuationFollowup = async (req, res) => {
  const caseId = req.params.caseId;
  const config = getEvacuationFollowupConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    const type = config.formConfigs[key].type;
    if (type === 'textarea' || type === 'textfield' || type === 'numberfield') {
      if (req.body[key] !== undefined) {
        req.body[key] = req.sanitizeBody(key).escape();
      }
    }
  });
  req.body.case = caseId;
  if (req.body.assessmentdtc === '') {
    delete req.body.assessmentdtc;
  }
  const followupId = req.params.followupId;
  const caseItem = await Case.findById(caseId);
  const originalModel = await EvacuationFollowup.findById(followupId);
  const originalValue = originalModel.toObject();
  originalValue._id = originalValue._id.toString();
  const logData = {
    original: originalValue,
    update: req.body,
  };
  await EvacuationFollowup.findByIdAndUpdate(followupId, req.body);
  logger.info(
    loggerHelper.createLogMessage(req.user, 'update', 'evacuationfollowup', req.params.caseId, caseItem.status),
    logData
  );
  res.redirect(`/evacuation/${caseId}`);
};

exports.removeEvacuationFollowup = async (req, res) => {
  const caseId = req.params.caseId;
  const id = req.params.followupId;
  await EvacuationFollowup.findByIdAndRemove(id);
  const caseItem = await Case.findById(caseId);
  logger.info(
    loggerHelper.createLogMessage(req.user, 'remove', 'evacuationfollowup', req.params.caseId, caseItem.status),
    { id }
  );
  res.redirect(`/evacuation/${caseId}`);
};
