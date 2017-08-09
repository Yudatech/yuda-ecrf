const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '病变位置'
  },
  options: [{
    name: 'region_1',
    text: {
      zh: '降结肠'
    }
  }, {
    name: 'region_2',
    text: {
      zh: '乙状结肠'
    }
  }, {
    name: 'region_3',
    text: {
      zh: '直肠上段 (距离肛缘15cm以上)'
    }
  }, {
    name: 'region_4',
    text: {
      zh: '其他位置'
    }
  }, {
    name: 'region_5',
    text: {
      zh: '其他位置，请注明'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = getOptionsLang(config.options);
  result.title = config.title[lang];

  return result;
};
