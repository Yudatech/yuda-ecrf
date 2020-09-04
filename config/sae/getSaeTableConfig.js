const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '严重不良事件报告表',
    en: 'Serious Advers Event (SAE)'
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
    name: 'saeanti',
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
  }],
  removeConfirm: [{
    name: 'message',
    text: {
      zh: '确认删除严重不良事件',
      en: 'Confirm to remove Severe Adverse Event'
    }
  }]
};

module.exports = function(lang) {
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
