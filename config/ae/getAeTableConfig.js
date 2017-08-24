const config = {
  title: {
    zh: '不良事件',
    en: 'AE'
  },
  headers: [{
    name: 'event',
    text: {
      zh: '事件 (名称及症状)',
      en: 'Event'
    }
  }, {
    name: 'aestdtc',
    text: {
      zh: '发生时间',
      en: 'Date of onset'
    }
  }, {
    name: 'aeeddtc',
    text: {
      zh: '结束时间',
      en: 'Date of stop'
    }
  }, {
    name: 'aeserv',
    text: {
      zh: '严重程度',
      en: 'Severity'
    }
  }, {
    name: 'aerel',
    text: {
      zh: '与试验器械和/或试验操作的关系',
      en: 'Related to investigational device/procedure'
    }
  }, {
    name: 'aeres_1',
    text: {
      zh: '转归',
      en: 'Outcome'
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
