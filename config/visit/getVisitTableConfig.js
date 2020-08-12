const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '访视',
    en: 'Postoperative visit'
  },
  headers: [{
    name: 'postoperativeday',
    text: {
      zh: '术后天数',
      en: 'Postoperative day'
    }
  }, {
    name: 'assessmentdtc',
    text: {
      zh: '评估日期',
      en: 'Assessment date'
    }
  }, {
    name: 'postoperative_1',
    text: {
      zh: '出院评估',
      en: 'Discharge assessment'
    }
  }, {
    name: 'postoperative_2',
    text: {
      zh: '有术后并发症',
      en: 'Has postoperative complications'
    }
  }, {
    name: 'postoperative_2_1',
    text: {
      zh: 'Clavien-Dindo分类',
      en: 'Clavien-Dindo Classification'
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

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
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
