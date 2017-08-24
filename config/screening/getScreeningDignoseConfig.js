const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '临床、病理诊断及分期',
    en: 'Clinical diagnosis, pathological diagnosis and staging'
  },
  formConfigs: [{
    name: 'dignose_1',
    type: 'textfield',
    text: {
      zh: '病理诊断',
      en: 'Pathological diagnosis'
    }
  }, {
    name: 'dignose_2',
    type: 'textfield',
    text: {
      zh: '入组前临床诊断',
      en: 'Clinical diagnosis before inclusion'
    }
  }, {
    name: 'dignose_3',
    type: 'select',
    optionsGetter: 'getClinicalStageConfig',
    text: {
      zh: '临床分期 (若适用)',
      en: 'TNM staging (if applicable)'
    }
  }, {
    name: 'dignose_4',
    type: 'checkbox',
    text: {
      zh: '转移灶',
      en: 'Metastases'
    }
  }, {
    name: 'dignose_5',
    type: 'textfield',
    text: {
      zh: '转移灶部位',
      en: 'organ/tissue:'
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
