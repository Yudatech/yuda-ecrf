const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '人口学资料'
  },
  formConfigs: [{
    name: 'sex',
    type: 'select',
    text: {
      zh: '性别'
    }
  }, {
    name: 'birth',
    type: 'numberfield',
    step: '1',
    text: {
      zh: '出生年份'
    }
  }, {
    name: 'weight',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '体重(KG)'
    }
  }, {
    name: 'height',
    type: 'numberfield',
    step: '1',
    text: {
      zh: '身高(CM)'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs);
  result.title = config.title[lang];

  return result;
};
