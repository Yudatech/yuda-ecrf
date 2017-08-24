const config = {
  title: {
    zh: '访视',
    en: 'Postoperative visit'
  },
  headers: [{
    name: 'visitid',
    text: {
      zh: '访视ID',
      en: 'Visit ID'
    }
  }, {
    name: 'visitdtc',
    text: {
      zh: '访视日期',
      en: 'Date'
    }
  }, {
    name: 'daysaftersurgery',
    text: {
      zh: '术后天数',
      en: '(Nomber of date after the surgery'
    }
  }, {
    name: 'visitnum',
    text: {
      zh: '当天第n次访视',
      en: 'Patient rounds no. of the day'
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
