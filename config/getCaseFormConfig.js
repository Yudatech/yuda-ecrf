const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '新建病例',
    en: 'Create new case'
  },
  labels: [{
    name: '_id',
    text: {
      zh: '受试者编号',
      en: 'Subject Identification No.'
    }
  }, {
    name: 'subjname',
    required: true,
    text: {
      zh: '受试者姓名',
      en: 'Subject Name'
    }
  }, {
    name: 'subjabbr',
    required: true,
    text: {
      zh: '受试者姓名缩写',
      en: 'Subject abbreviation'
    }
  }, {
    name: 'subjAcceptDate',
    required: true,
    text: {
      zh: '知情同意书签署日期',
      en: 'Informed Consent filling date'
    }
  }, {
    name: 'attachedDoc',
    text: {
      zh: '知情同意书签字页上传',
      en: 'Upload Informed Consent signature page'
    }
  }],
  infoDescription:{
    zh: '此处内容填写完毕，点击保存后不可更改，请确认填写内容无误。',
    en: 'The information on this page can not be modified after clicking "save" bottom, please confirm that the information is correct.'
  }
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.labels = getOptionsLang(config.labels, lang);
  result.title = config.title[lang];
  result.infoDescription = config.infoDescription[lang];

  return result;
};
