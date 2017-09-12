const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '病例概况',
    en: 'Case overview'
  },
  auditTitle: {
    zh: '审核信息',
    en: 'Auditing Information'
  },
  labels: [{
    name: '_id',
    text: {
      zh: '受试者编号',
      en: 'Subject Identification No.'
    }
  }, {
    name: 'subjname',
    text: {
      zh: '受试者姓名',
      en: 'Subject Name'
    }
  }, {
    name: 'subjabbr',
    text: {
      zh: '受试者姓名缩写',
      en: 'Subject abbreviation'
    }
  }, {
    name: 'subjAcceptDate',
    text: {
      zh: '知情同意书签署日期',
      en: 'Informed Consent filling date'
    }
  }, {
    name: 'attachedDoc',
    text: {
      zh: '知情同意书签字页预览',
      en: 'Informed Consent signature page preview'
    }
  }],
  auditMessage: [{
    name: 'role',
    text: {
      zh: '签字人',
      en: 'Auditor'
    }
  }, {
    name: 'name',
    text: {
      zh: '签字人姓名',
      en: 'Name'
    }
  }, {
    name: 'date',
    text: {
      zh: '签字时间',
      en: 'Date'
    }
  }],
  attachmentDesc:{
    zh: '知情同意书签字页上传后不得修改，请确认上传文件无误。',
    en: 'The signature page of ICF can not be modified after uploading, please confirm that the document is correctly uploaded.'
  }
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.labels = getOptionsLang(config.labels, lang);
  result.auditMessage = getOptionsLang(config.auditMessage, lang);
  result.title = config.title[lang];
  result.auditTitle = config.auditTitle[lang];
  result.attachmentDesc = config.attachmentDesc[lang];

  return result;
};
