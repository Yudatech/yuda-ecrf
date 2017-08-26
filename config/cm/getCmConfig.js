const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '添加合并用药',
    en: 'Add Concomitant Medication'
  },
  formConfigs: [{
    name: 'source',
    type: 'select',
    optionsGetter: 'getCmSourceConfig',
    text: {
      zh: '来源',
      en: 'Source'
    }
  }, {
    name: 'drug',
    type: 'textfield',
    text: {
      zh: '药物名称',
      en: 'Name (Commercial name)'
    }
  }, {
    name: 'dosing',
    type: 'textfield',
    text: {
      zh: '剂量',
      en: 'Dose'
    }
  }, {
    name: 'dosemtd_1',
    type: 'select',
    optionsGetter: 'getDoseMethodsConfig',
    text: {
      zh: '给药途径',
      en: 'Administration'
    }
  }, {
    name: 'dosemtd_2',
    type: 'textfield',
    text: {
      zh: '给药途径 其他，请注明',
      en: 'Other, please specify:'
    }
  }, {
    name: 'cmstdtc',
    type: 'date',
    text: {
      zh: '开始日期',
      en: 'Date of start'
    }
  }, {
    name: 'cmeddtc',
    type: 'date',
    text: {
      zh: '结束日期',
      en: 'Date of end'
    }
  }, {
    name: 'cmrsn',
    type: 'textarea',
    text: {
      zh: '用药原因/目的',
      en: 'Reason'
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
