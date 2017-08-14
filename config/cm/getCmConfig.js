const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '添加合并用药'
  },
  labels: [{
    name: 'drug',
    text: {
      zh: '药物名称'
    }
  }, {
    name: 'dosing',
    text: {
      zh: '剂量'
    }
  }, {
    name: 'dosemtd_1',
    text: {
      zh: '给药途径'
    }
  }, {
    name: 'dosemtd_2',
    text: {
      zh: '给药途径 其他，请注明'
    }
  }, {
    name: 'cmstdtc',
    text: {
      zh: '开始日期'
    }
  }, {
    name: 'cmeddtc',
    text: {
      zh: '结束日期'
    }
  }, {
    name: 'cmrsn',
    text: {
      zh: '用药原因/目的'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.labels = getOptionsLang(config.labels);
  result.title = config.title[lang];

  return result;
};
