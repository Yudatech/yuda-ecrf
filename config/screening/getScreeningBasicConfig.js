const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '人口学资料',
    en: 'Demographic data'
  },
  formConfigs: [{
    name: 'sex',
    type: 'select',
    optionsGetter: 'getSexConfig',
    text: {
      zh: '性别',
      en: 'Gender'
    }
  }, {
    name: 'birth',
    type: 'numberfield',
    step: '1',
    text: {
      zh: '出生年份',
      en: 'Year of Birth'
    }
  }, {
    name: 'weight',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '体重(KG)',
      en: 'Body Weight'
    }
  }, {
    name: 'height',
    type: 'numberfield',
    step: '1',
    text: {
      zh: '身高(CM)',
      en: 'Height'
    }
  }],
  errors: [{
    name: 'exclusion',
    text: {
      zh: '该患者不符合入组标准'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs);
  result.errors = getOptionsLang(config.errors);
  result.title = config.title[lang];

  return result;
};
