const config = {
  title: {
    zh: '严重不良事件'
  },
  headers: [{
    name: 'saetpe',
    text: {
      zh: '报告类型',
      en: 'Type of report'
    }
  }, {
    name: 'saedtc',
    text: {
      zh: '报告时间',
      en: 'Time of report'
    }
  }, {
    name: 'saecaus_1',
    text: {
      zh: 'SAE是否预期',
      en: 'Anticipated SAE?'
    }
  }, {
    name: 'saestdtc',
    text: {
      zh: 'SAE发生时间',
      en: 'Time of onset: '
    }
  }, {
    name: 'operations',
    text: {
      zh: '操作',
      en: 'Operations'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.headers = config.headers.map((item) => {
    return {
      name: item.name,
      text: item.text[lang]
    };
  });
  result.title = config.title[lang];

  return result;
};
