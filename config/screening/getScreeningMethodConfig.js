const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '诊断方法'
  },
  formConfigs: [{
    name: 'method_1',
    type: 'checkbox',
    text: {
      zh: '内窥镜检查'
    }
  }, {
    name: 'method_2',
    type: 'checkbox',
    text: {
      zh: 'CT检查'
    }
  }, {
    name: 'method_3',
    type: 'checkbox',
    text: {
      zh: '气钡双重造影'
    }
  }, {
    name: 'method_4',
    type: 'checkbox',
    text: {
      zh: '肛门指诊'
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
