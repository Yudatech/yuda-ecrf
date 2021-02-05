const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '病理诊断',
    en: 'Pathological diagnosis'
  },
  formConfigs: [{
    name: 'pathological_1',
    type: 'textarea',
    required: true,
    commit: [{
      rule: 'required'
    }],
    text: {
      zh: '病理诊断',
      en: 'Pathological diagnosis (ICD10/TNM)'
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
