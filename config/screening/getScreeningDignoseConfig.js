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
        zh: '手术诊断/指征',
        en: 'Diagnosis/Planned surgery'
      }
    }
  ],
  formConfigs: [{
    name: 'dignose_1',
    type: 'textarea',
    required: true,
    commit: [{
      rule: 'required'
    }],
    text: {
      zh: '手术诊断/指征',
      en: 'Diagnosis (ICD-10)/Planned surgery'
    }
  }]
};

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];
  result.subtitles = getOptionsLang(config.subtitles, lang);

  return result;
};
