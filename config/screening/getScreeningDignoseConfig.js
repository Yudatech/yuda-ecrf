const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '临床、病理诊断及分期'
  },
  formConfigs: [{
    name: 'dignose_1',
    type: 'textfield',
    text: {
      zh: '病理诊断'
    }
  }, {
    name: 'dignose_2',
    type: 'textfield',
    text: {
      zh: '入组前临床诊断'
    }
  }, {
    name: 'dignose_3',
    type: 'select',
    text: {
      zh: '临床分期 (若适用)'
    }
  }, {
    name: 'dignose_4',
    type: 'checkbox',
    text: {
      zh: '转移灶'
    }
  }, {
    name: 'dignose_5',
    type: 'textfield',
    text: {
      zh: '转移灶部位'
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
