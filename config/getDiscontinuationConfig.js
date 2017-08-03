const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '中途退出试验'
  },
  options: [{
    name: 'discontinuersn_1',
    text: {
      zh: '进行试验相关手术前，受试者希望退出试验'
    }
  }, {
    name: 'discontinuersn_2',
    text: {
      zh: '临床研究者认为不良事件和器械缺陷将引起受试者严重或永久性损伤'
    }
  }, {
    name: 'discontinuersn_3',
    text: {
      zh: '临床研究者认为受试者应被排除或受试者自己认为应被排除'
    }
  }, {
    name: 'discontinuersn_4',
    text: {
      zh: '临床研究者认为受试者应被排除或受试者自己认为应被排除,请注明原因'
    }
  }, {
    name: 'discontinuersn_5',
    text: {
      zh: '受试者违反知情同意书中所列条款或不能遵从临床研究者医嘱'
    }
  }, {
    name: 'discontinuersn_6',
    text: {
      zh: '其他原因'
    }
  }, {
    name: 'discontinuersn_7',
    text: {
      zh: '其他原因，请注明'
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
