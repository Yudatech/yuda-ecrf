const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '辅助检查'
  },
  options: [{
    name: 'assistant_1',
    text: {
      zh: '心电图'
    }
  }, {
    name: 'assistant_2',
    text: {
      zh: '心电图(异常，有临床意义),请注明'
    }
  }, {
    name: 'assistant_3',
    text: {
      zh: '腹部B超'
    }
  }, {
    name: 'assistant_4',
    text: {
      zh: '腹部B超(异常，有临床意义),请注明'
    }
  }, {
    name: 'assistant_5',
    text: {
      zh: '胸部CT/胸部X线'
    }
  }, {
    name: 'assistant_6',
    text: {
      zh: '胸部CT/胸部X线(异常，有临床意义),请注明'
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
