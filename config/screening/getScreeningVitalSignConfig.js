const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '体格检查'
  },
  formConfigs: [{
    name: 'vitalsign_1',
    type: 'checkbox',
    text: {
      zh: '神清'
    }
  }, {
    name: 'vitalsign_2',
    type: 'checkbox',
    text: {
      zh: '心脏杂音'
    }
  }, {
    name: 'vitalsign_3',
    type: 'checkbox',
    text: {
      zh: '呼吸音清晰'
    }
  }, {
    name: 'vitalsign_4',
    type: 'select',
    optionsGetter: 'getAbdominalExamResultConfig',
    text: {
      zh: '腹部检查'
    }
  }, {
    name: 'vitalsign_5',
    type: 'numberfield',
    step: '1',
    text: {
      zh: '脉搏 (次/分)'
    }
  }, {
    name: 'vitalsign_6',
    type: 'checkbox',
    text: {
      zh: '肿瘤可触及'
    }
  }, {
    name: 'vitalsign_7',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '血压 (mmHg)'
    }
  }, {
    name: 'vitalsign_8',
    type: 'checkbox',
    text: {
      zh: '肝脏可触及'
    }
  }, {
    name: 'vitalsign_9',
    type: 'textarea',
    text: {
      zh: '其他相关情况'
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
