const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '病例概况',
    en: 'Case overview'
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
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.labels = getOptionsLang(config.labels);
  result.title = config.title[lang];

  return result;
};
