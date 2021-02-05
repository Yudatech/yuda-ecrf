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
        zh: '病变位置',
        en: 'Location of the disease'
      }
    }
  ],
  formConfigs: [{
    name: 'region_3',
    type: 'checkbox',
    commit: [{
      rule: 'atleast_one_true',
      fields: 'region_3,region_4,region_5,region_6,region_7',
    }],
    text: {
      zh: '降结肠',
      en: 'Descending colon'
    }
  }, {
    name: 'region_4',
    type: 'checkbox',
    commit: [{
      rule: 'atleast_one_true',
      fields: 'region_3,region_4,region_5,region_6,region_7',
    }],
    text: {
      zh: '乙状结肠',
      en: 'Sigmoid colon'
    }
  }, {
    name: 'region_5',
    type: 'checkbox',
    commit: [{
      rule: 'atleast_one_true',
      fields: 'region_3,region_4,region_5,region_6,region_7',
    }],
    text: {
      zh: '直肠上段 (距离肛缘10-15cm以上)',
      en: 'Upper rectum (10 - 15 cm above the anal verge)'
    }
  }, {
    name: 'region_6',
    type: 'checkbox',
    commit: [{
      rule: 'atleast_one_true',
      fields: 'region_3,region_4,region_5,region_6,region_7',
    }],
    text: {
      zh: '直肠下段',
      en: 'Lower rectum (0 - 5 cm above the anal verge)'
    }
  }, {
    name: 'region_7',
    type: 'checkbox',
    commit: [{
      rule: 'atleast_one_true',
      fields: 'region_3,region_4,region_5,region_6,region_7',
    }],
    text: {
      zh: '直肠中段',
      en: 'Mid rectum (5 - 10 cm above the anal verge)'
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
