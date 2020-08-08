const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '手术诊断/指征',
    en: 'Diagnosis/Indication for surgery'
  },
  formConfigs: [{
    name: 'dignose_1',
    type: 'textarea',
    required: true,
    commit: [{
      rule: 'required'
    }],
    text: {
      zh: '手术诊断/指征',
      en: 'Diagnosis/Indication for surgery'
    }
  }]
};

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];

  return result;
};
