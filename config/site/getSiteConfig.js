const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '新建临床中心'
  },
  formConfigs: [{
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
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs);
  result.title = config.title[lang];

  return result;
};
