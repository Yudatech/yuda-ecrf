const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '辅助检查'
  },
  formConfigs: [{
    name: 'assistant_1',
    type: 'select',
    text: {
      zh: '心电图'
    }
  }, {
    name: 'assistant_2',
    type: 'textarea',
    text: {
      zh: '心电图(异常，有临床意义),请注明'
    }
  }, {
    name: 'assistant_3',
    type: 'select',
    text: {
      zh: '腹部B超'
    }
  }, {
    name: 'assistant_4',
    type: 'textarea',
    text: {
      zh: '腹部B超(异常，有临床意义),请注明'
    }
  }, {
    name: 'assistant_5',
    type: 'select',
    text: {
      zh: '胸部CT/胸部X线'
    }
  }, {
    name: 'assistant_6',
    type: 'textarea',
    text: {
      zh: '胸部CT/胸部X线(异常，有临床意义),请注明'
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
