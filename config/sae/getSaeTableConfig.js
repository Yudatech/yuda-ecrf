const config = {
  title: {
    zh: '严重不良事件'
  },
  headers: [{
    name: 'saetpe',
    text: {
      zh: '报告类型'
    }
  }, {
    name: 'saedtc',
    text: {
      zh: '报告时间'
    }
  }, {
    name: 'saecaus_1',
    text: {
      zh: '报告时间'
    }
  }, {
    name: 'saestdtc',
    text: {
      zh: 'SAE发生时间'
    }
  }, {
    name: 'operations',
    text: {
      zh: '操作'
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
