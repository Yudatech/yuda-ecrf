const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '添加合并用药'
  },
  formConfigs: [{
    name: 'drug',
    type: 'textfield',
    text: {
      zh: '药物名称'
    }
  }, {
    name: 'dosing',
    type: 'textfield',
    text: {
      zh: '剂量'
    }
  }, {
    name: 'dosemtd_1',
    type: 'select',
    optionsGetter: 'getDoseMethodsConfig',
    text: {
      zh: '给药途径'
    }
  }, {
    name: 'dosemtd_2',
    type: 'textfield',
    text: {
      zh: '给药途径 其他，请注明'
    }
  }, {
    name: 'cmstdtc',
    type: 'date',
    text: {
      zh: '开始日期'
    }
  }, {
    name: 'cmeddtc',
    type: 'date',
    text: {
      zh: '结束日期'
    }
  }, {
    name: 'cmrsn',
    type: 'textarea',
    text: {
      zh: '用药原因/目的'
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
