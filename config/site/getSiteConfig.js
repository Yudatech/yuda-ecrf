const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '新建临床中心'
  },
  labels: [{
    name: 'sitename',
    text: {
      zh: '临床中心名称'
    }
  }, {
    name: 'sitetel',
    text: {
      zh: '电话'
    }
  }, {
    name: 'sitemail',
    text: {
      zh: '邮件'
    }
  }, {
    name: 'country',
    text: {
      zh: '所在国家'
    }
  }],
  buttons: [{
    name: 'saveNewSite',
    text: {
      zh: '保存'
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
  result.buttons = getOptionsLang(config.buttons);

  return result;
};
