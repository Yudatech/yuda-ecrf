const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '临床、病理诊断及分期'
  },
  options: [{
    name: 'dignose_1',
    text: {
      zh: '病理诊断'
    }
  }, {
    name: 'dignose_2',
    text: {
      zh: '入组前临床诊断'
    }
  }, {
    name: 'dignose_3',
    text: {
      zh: '临床分期 (若适用)'
    }
  }, {
    name: 'dignose_4',
    text: {
      zh: '转移灶'
    }
  }, {
    name: 'dignose_5',
    text: {
      zh: '转移灶部位'
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
