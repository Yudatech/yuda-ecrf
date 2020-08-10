const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '病变位置',
    en: 'Location of the disease'
  },
  formConfigs: [{
    name: 'region_1',
    type: 'checkbox',
    text: {
      zh: '升结肠',
      en: 'Ascending colon'
    }
  }, {
    name: 'region_2',
    type: 'checkbox',
    text: {
      zh: '横结肠',
      en: 'Transverse colon'
    }
  }, {
    name: 'region_3',
    type: 'checkbox',
    text: {
      zh: '降结肠',
      en: 'Descending colon'
    }
  }, {
    name: 'region_4',
    type: 'checkbox',
    text: {
      zh: '乙状结肠',
      en: 'Sigmoid colon'
    }
  }, {
    name: 'region_5',
    type: 'checkbox',
    text: {
      zh: '直肠上段 (距离肛缘11-15cm以上)',
      en: 'Upper rectum (11 - 15 cm above the anal verge)'
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

  return result;
};
