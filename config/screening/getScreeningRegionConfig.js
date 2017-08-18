const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '病变位置'
  },
  formConfigs: [{
    name: 'region_1',
    type: 'checkbox',
    text: {
      zh: '降结肠'
    }
  }, {
    name: 'region_2',
    type: 'checkbox',
    text: {
      zh: '乙状结肠'
    }
  }, {
    name: 'region_3',
    type: 'checkbox',
    text: {
      zh: '直肠上段 (距离肛缘15cm以上)'
    }
  }, {
    name: 'region_4',
    type: 'checkbox',
    text: {
      zh: '其他位置'
    }
  }, {
    name: 'region_5',
    type: 'textarea',
    text: {
      zh: '其他位置，请注明'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs);
  result.title = config.title[lang];

  return result;
};
