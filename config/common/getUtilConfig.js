const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  utils: [{
    name: 'all',
    text: {
      zh: '全部',
      en: 'All'
    }
  }, {
    name: 'user',
    text: {
      zh: '用户',
      en: 'User'
    }
  }, {
    name: 'status',
    text: {
      zh: '状态',
      en: 'Status'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.utils = getOptionsLang(config.utils, lang);

  return result;
};
