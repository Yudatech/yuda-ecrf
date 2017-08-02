const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '人口学资料'
  },
  options: [{
    name: 'sex',
    text: {
      zh: '性别'
    }
  }, {
    name: 'birth',
    text: {
      zh: '出生年份'
    }
  }, {
    name: 'weight',
    text: {
      zh: '体重(KG)'
    }
  }, {
    name: 'height',
    text: {
      zh: '身高(CM)'
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
