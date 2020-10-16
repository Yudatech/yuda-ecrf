const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '首诊(筛选)',
    en: 'Preoperative Screening'
  },
  subtitles: [
    {
      name: 'subtitle_1',
      text: {
        zh: '直肠癌的先前放射疗法',
        en: 'Preoperative radiotherapy (rectal cancer)'
      }
    }
  ],
  formConfigs: [{
    name: 'priorradiationtherapy_1',
    type: 'select',
    optionsGetter: 'getPriorRadiationTherapyConfig',
    text: {
      zh: '直肠癌的先前放射疗法',
      en: 'Preoperative radiotherapy for rectal cancer.'
    }
  }, {
    name: 'priorradiationtherapy_2',
    type: 'textfield',
    commit: [{
      rule: 'conditional_require',
      field: 'priorradiationtherapy_1',
      value: 0
    }],
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
    lang = 'en';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];
  result.subtitles = getOptionsLang(config.subtitles, lang);
  result.errors = getOptionsLang(config.errors, lang);

  return result;
};
