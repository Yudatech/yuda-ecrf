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
        zh: '人口学资料',
        en: 'Demographic data'
      }
    }
  ],
  formConfigs: [{
    name: 'sex',
    type: 'select',
    optionsGetter: 'getSexConfig',
    text: {
      zh: '性别',
      en: 'Gender'
    }
  }, {
    name: 'birth',
    type: 'date',
    requireCustomRange: true,
    text: {
      zh: '出生日期',
      en: 'Date of Birth'
    }
  }, {
    name: 'weight',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '体重(KG)',
      en: 'Body Weight (kg)'
    }
  }, {
    name: 'height',
    type: 'numberfield',
    step: '1',
    text: {
      zh: '身高(CM)',
      en: 'Height (cm)'
    }
  }],
  errors: [{
    name: 'exclusion',
    text: {
      zh: '该患者不符合入组标准',
      en: 'The patient does not fulfil the inclusion criteria'
    }
  }, {
    name: 'error_1',
    text: {
      zh: '病人年龄需在18以上',
      en: 'Male or female age ≥ 18 years'
    }
  }]
};

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.errors = getOptionsLang(config.errors, lang);
  result.title = config.title[lang];
  result.subtitles = getOptionsLang(config.subtitles, lang);

  return result;
};
