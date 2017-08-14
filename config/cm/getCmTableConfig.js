const config = {
  title: {
    zh: '合并用药情况'
  },
  headers: [{
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
    name: 'dosemtd',
    text: {
      zh: '给药途径'
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
      zh: '用药原因'
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
