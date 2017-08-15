const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '添加不良事件'
  },
  labels: [{
    name: 'aeorigion',
    text: {
      zh: '来源'
    }
  }, {
    name: 'event',
    text: {
      zh: '事件 (名称及症状)'
    }
  }, {
    name: 'aestdtc',
    text: {
      zh: '发生时间'
    }
  }, {
    name: 'aeeddtc',
    text: {
      zh: '结束时间'
    }
  }, {
    name: 'aeserv',
    text: {
      zh: '严重程度'
    }
  }, {
    name: 'aeact',
    text: {
      zh: '采取措施'
    }
  }, {
    name: 'aerpt',
    text: {
      zh: '报告'
    }
  }, {
    name: 'aerel',
    text: {
      zh: '与试验器械和/或试验操作的关系'
    }
  }, {
    name: 'aeres_1',
    text: {
      zh: '转归'
    }
  }, {
    name: 'aeres_2',
    text: {
      zh: '转归后遗症'
    }
  }, {
    name: 'aesae',
    text: {
      zh: 'SAE'
    }
  }, {
    name: 'aedevicedft',
    text: {
      zh: '器械缺陷'
    }
  }, {
    name: 'aediscon',
    text: {
      zh: '因该事件退出试验'
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
