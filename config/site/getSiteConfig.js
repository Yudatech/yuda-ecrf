const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '新建临床中心',
    en: 'Creat a new Site'
  },
  formConfigs: [{
    name: 'sitename',
    text: {
      zh: '临床中心名称',
      en: 'Investigation center：'
    }
  }, {
    name: 'sitetel',
    text: {
      zh: '电话',
      en: 'Tel:'
    }
  }, {
    name: 'sitemail',
    text: {
      zh: '邮件',
      en: 'email:'
    }
  }, {
    name: 'country',
    text: {
      zh: '所在国家',
      en: 'Country:'
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
