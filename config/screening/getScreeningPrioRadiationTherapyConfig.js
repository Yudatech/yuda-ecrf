const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '直肠癌的先前放射疗法',
    en: 'Prior radiation therapy for rectal cancer'
  },
  formConfigs: [{
    name: 'priorradiationtherapy_1',
    type: 'checkbox',
    text: {
      zh: '直肠癌的先前放射疗法',
      en: 'Prior radiation therapy for rectal cancer.'
    }
  }, {
    name: 'priorradiationtherapy_2',
    type: 'textfield',
    required: true,
    text: {
      zh: '请注明用量',
      en: 'Please specify dose:'
    }
  }],
  errors: []
};

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];
  result.errors = getOptionsLang(config.errors, lang);

  return result;
};
