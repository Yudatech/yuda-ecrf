const getOptionsLang = require('../configHelpers').getOptionsLang;

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
      en: 'Number of day after surgery'
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
  }],
  removeConfirm: [{
    name: 'message',
    text: {
      zh: '确认删除访视',
      en: 'Confirm to remove visit'
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
  result.removeConfirm = getOptionsLang(config.removeConfirm, lang);

  return result;
};
