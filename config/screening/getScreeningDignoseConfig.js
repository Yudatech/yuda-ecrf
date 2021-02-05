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
        en: 'Preoperative diagnosis'
      }
    }
  ],
  formConfigs: [{
    name: 'dignose_1',
    type: 'select',
    commit: [{
      rule: 'required'
    }],
    optionsGetter: 'getPreoperativeDiagnosisConfig',
    text: {
      zh: '术前诊断',
      en: 'Preoperative diagnosis'
    }
  }, {
    name: 'dignose_2',
    type: 'select',
    commit: [{
      rule: 'required'
    }],
    optionsGetter: 'getASAClassificationConfig',
    text: {
      zh: 'ASA分类',
      en: 'ASA-classification'
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
