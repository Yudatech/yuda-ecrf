const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '诊断方法',
    en: 'Methods of diagnosis'
  },
  formConfigs: [{
    name: 'method_1',
    type: 'checkbox',
    text: {
      zh: '内窥镜检查',
      en: 'Endoscopy'
    }
  }, {
    name: 'method_2',
    type: 'checkbox',
    text: {
      zh: 'CT检查',
      en: 'CT'
    }
  }, {
    name: 'method_3',
    type: 'checkbox',
    text: {
      zh: '气钡双重造影',
      en: 'Double colonic contrast X-ray'
    }
  }, {
    name: 'method_4',
    type: 'checkbox',
    text: {
      zh: '肛门指诊',
      en: 'Rectal examination'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];

  return result;
};
