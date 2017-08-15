const config = {
  title: {
    zh: '访视'
  },
  headers: [{
    name: 'visitid',
    text: {
      zh: '访视ID'
    }
  }, {
    name: 'visitdtc',
    text: {
      zh: '访视日期'
    }
  }, {
    name: 'daysaftersurgery',
    text: {
      zh: '术后天数'
    }
  }, {
    name: 'visitnum',
    text: {
      zh: '当天第n次访视'
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
