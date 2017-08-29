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
      zh: '降结肠',
      en: 'Descending colon'
    }
  }, {
    name: 'region_2',
    type: 'checkbox',
    text: {
      zh: '乙状结肠',
      en: 'Sigmoid colon'
    }
  }, {
    name: 'region_3',
    type: 'checkbox',
    text: {
      zh: '直肠上段 (距离肛缘15cm以上)',
      en: 'Upper rectum (15 cm above the anal rim)'
    }
  }, {
    name: 'region_4',
    type: 'checkbox',
    text: {
      zh: '其他位置',
      en: 'Other location'
    }
  }, {
    name: 'region_5',
    type: 'textarea',
    required: true,
    text: {
      zh: '请注明',
      en: 'Please specify:'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];

  return result;
};
