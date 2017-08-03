const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '诊断方法'
  },
  options: [{
    name: 'method_1',
    text: {
      zh: '内窥镜检查'
    }
  }, {
    name: 'method_2',
    text: {
      zh: 'CT检查'
    }
  }, {
    name: 'method_3',
    text: {
      zh: '气钡双重造影'
    }
  }, {
    name: 'method_4',
    text: {
      zh: '肛门指诊'
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
