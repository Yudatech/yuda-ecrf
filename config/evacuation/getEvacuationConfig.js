const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '取出植入物',
    en: 'Evacuation of the implant'
  },
  formConfigs: [{
    name: 'evacuationdtc',
    type: 'date',
    commit: [{
      rule: 'date',
      start: 'surgerydtc',
      end: 'now'
    }],
    text: {
      zh: '取出日期',
      en: 'Date of evacuation'
    }
  }, {
    name: 'evacuationtype',
    type: 'select',
    optionsGetter: 'getEvacuationTypesConfig',
    text: {
      zh: '取出方式',
      en: 'Evacuation'
    }
  }, {
    name: 'evacuation_1',
    type: 'textarea',
    text: {
      zh: '病理诊断',
      en: 'Pathological diagnosis'
    }
  }],
  errors: []
};

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];
  result.errors = getOptionsLang(config.errors, lang);

  return result;
};
