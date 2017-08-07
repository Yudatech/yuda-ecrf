const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '临床中心列表'
  },
  headers: [{
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
  }, {
    name: 'operations',
    text: {
      zh: '操作'
    }
  }],
  buttons: [{
    name: 'createNewSite',
    text: {
      zh: '新建临床中心'
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
  result.buttons = getOptionsLang(config.buttons);

  return result;
};
