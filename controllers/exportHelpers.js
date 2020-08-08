const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Screening = mongoose.model('Screening');
const ReviewChecklist = mongoose.model('ReviewChecklist');
const Discontinuation = mongoose.model('Discontinuation');
const Cm = mongoose.model('Cm');
const Sae = mongoose.model('Sae');
const Ae = mongoose.model('Ae');
const Surgery = mongoose.model('Surgery');
const Visit = mongoose.model('Visit');

const getScreeningBasicConfig = require('../config/screening/getScreeningBasicConfig');
const getScreeningInclusionConfig = require('../config/screening/getScreeningInclusionConfig');
const getScreeningExclusionConfig = require('../config/screening/getScreeningExclusionConfig');
const getScreeningDiseaseConfig = require('../config/screening/getScreeningDiseaseConfig');
const getScreeningConMedConfig = require('../config/screening/getScreeningConMedConfig');
const getScreeningMethodConfig = require('../config/screening/getScreeningMethodConfig');
const getScreeningRegionConfig = require('../config/screening/getScreeningRegionConfig');
const getScreeningDignoseConfig = require('../config/screening/getScreeningDignoseConfig');

const getReviewChecklistConfig = require('../config/getReviewChecklistConfig');
const getDiscontinuationConfig = require('../config/getDiscontinuationConfig');
const getCmConfig = require('../config/cm/getCmConfig');
const getSaeConfig = require('../config/sae/getSaeConfig');
const getAeConfig = require('../config/ae/getAeConfig');
const getSurgeryConfig = require('../config/surgery/getSurgeryConfig');
const getVisitConfig = require('../config/visit/getVisitConfig');

const decorationHelper = require('./decorationHelper');

const dateFormat = 'YYYY-MM-DD';
const datetimeFormat = 'YYYY-MM-DD HH:mm';

exports.getConfigForQuestion = function(table, lang) {
  let formConfigs;
  if (table === 'screening') {
    formConfigs = {};

    formConfigs = Object.assign(formConfigs, getScreeningBasicConfig(lang).formConfigs);
    formConfigs = Object.assign(formConfigs, getScreeningConMedConfig(lang).formConfigs);
    formConfigs = Object.assign(formConfigs, getScreeningDignoseConfig(lang).formConfigs);
    formConfigs = Object.assign(formConfigs, getScreeningDiseaseConfig(lang).formConfigs);
    formConfigs = Object.assign(formConfigs, getScreeningExclusionConfig(lang).formConfigs);
    formConfigs = Object.assign(formConfigs, getScreeningInclusionConfig(lang).formConfigs);
    formConfigs = Object.assign(formConfigs, getScreeningMethodConfig(lang).formConfigs);
    formConfigs = Object.assign(formConfigs, getScreeningRegionConfig(lang).formConfigs);
  }
  else if (table === 'reviewchecklist') {
    formConfigs = getReviewChecklistConfig(lang).formConfigs;
  }
  else if (table === 'discontinuation') {
    formConfigs = getDiscontinuationConfig(lang).formConfigs;
  }
  else if (table === 'cm') {
    formConfigs = getCmConfig(lang).formConfigs;
  }
  else if (table === 'sae') {
    formConfigs = getSaeConfig(lang).formConfigs;
  }
  else if (table === 'ae') {
    formConfigs = getAeConfig(lang).formConfigs;
  }
  else if (table === 'surgery') {
    formConfigs = getSurgeryConfig(lang).formConfigs;
  }
  else if (table === 'visit') {
    formConfigs = getVisitConfig(lang).formConfigs;
  }

  return formConfigs;
};

function getUsername(auditBy, userList, role) {
  if (!auditBy || auditBy.length === 0) {
    return '';
  }
  const matches = auditBy.map((auditByItem) => {
    return userList.find((userItem) => {
      return userItem._id.toString() === auditByItem.user.toString();
    });
  });
  const user = matches.find((item) => item.role === role);
  return user ? user.username : '';
}

exports.getExportCommonData = function(config, caseList, userList, caseStatusConfig) {
  return caseList.map((caseItem) => {
    const configItem = JSON.parse(JSON.stringify(config));
    const result = {};
    configItem.forEach((item) => {
      if (item.name === 'caseId') {
        item.value = caseItem._id;
      }
      else if (item.name === 'subjname') {
        item.value = caseItem.subjname;
      }
      else if (item.name === 'status') {
        item.value = caseStatusConfig[caseItem.status].text;
      }
      else if (item.name === 'createDate') {
        item.value = moment(caseItem.createDate).format(dateFormat);
      }
      else if (item.name === 'siteName') {
        item.value = caseItem.user.site.sitename;
      }
      else if (item.name === 'craName') {
        item.value = caseItem.user.username;
      }
      else if (item.name === 'monitorName') {
        item.value = getUsername(caseItem.auditBy, userList, 'monitor');
      }
      else if (item.name === 'supervisorName') {
        item.value = getUsername(caseItem.auditBy, userList, 'supervisor');
      }
      result[item.name] = item;
    });
    return result;
  });
};

exports.addDataToWorksheet = function(worksheet, commonColumnDefs, dataColumnDefs, commonData, data, aeSourceConfigList, saeSourceConfigList) {
  const caseIdArray = commonData.map((item) => {
    const caseIdObj = item.caseId; 
    return caseIdObj.value;
  });
  const dataIncluded = data.filter((item) => {
    return caseIdArray.includes(item.case);
  });
  dataIncluded.forEach((record) => {
    const caseId = record.case;
    const commonRecord = commonData[caseIdArray.indexOf(caseId)];
    const dataToAdd = {};
    commonColumnDefs.forEach((commonColumn) => {
      dataToAdd[commonColumn.name] = commonRecord[commonColumn.name].value;
    });
    dataColumnDefs.forEach((dataColumn) => {
      let value = record[dataColumn.name];
      const type = dataColumn.type;
      if (value === undefined) {
        if (type === 'checkbox') {
          value = false;
        }
        else {
          value = '';
        }
      }
      else {
        if (type === 'select' && dataColumn.optionsGetter) {
          const options = decorationHelper[dataColumn.optionsGetter]();
          const match = options.find((option) => {
            return option.value === value;
          });
          if (match) {
            value = match.text;
          }
        }
        else if (type === 'date') {
          value = moment(value).format(dateFormat);
        }
        else if (type === 'datetime') {
          value = moment(value).format(datetimeFormat);
        }

        if (dataColumn.name === 'aeorigion') {
          const aeSourceConfig = aeSourceConfigList[caseId];
          const matchAeSource = aeSourceConfig.find((aeSource) => aeSource.value === value);
          if (matchAeSource) {
            value = matchAeSource.text;
          }
        }
        else if (dataColumn.name === 'saeorigion') {
          const saeSourceConfig = saeSourceConfigList[caseId];
          const matchSaeSource = saeSourceConfig.find((saeSource) => saeSource.value === value);
          if (matchSaeSource) {
            value = matchSaeSource.text;
          }
        }
      }
      dataToAdd[dataColumn.name] = value;
    });
    worksheet.addRow(dataToAdd);
  });
};
